'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { useRouter, useParams } from 'next/navigation';
import ScenarioVideo from '@/components/remotion/ScenarioVideo';
import { SCENARIOS } from '@/data/simulation-scenarios';
import { useAppStore } from '@/store/useStore';
import TriviaGame from '@/components/TriviaGame';
import { fetchGame } from '@/lib/triviamaker';
import {
  ArrowLeft, Pause, RotateCcw, Zap, CheckCircle2, Clapperboard, Play,
  Volume2, VolumeX,
} from 'lucide-react';

type Branch = 'none' | 'A' | 'B';
type SimState = 'playing' | 'paused-for-choice' | 'branch-playing' | 'completed';

export default function CourseSimulationPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const { dispatch } = useAppStore();
  const playerRef = useRef<PlayerRef>(null);

  const [branch, setBranch] = useState<Branch>('none');
  const [simState, setSimState] = useState<SimState>('playing');
  const [hasAwarded, setHasAwarded] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const lastSpokenLineRef = useRef<number>(-1);

  const scenario = SCENARIOS[courseId];
  const triviaGame = fetchGame(courseId);
  const [isQuizPassed, setIsQuizPassed] = useState(!triviaGame); // skip if no quiz

  // Monitor frame to auto-pause at decision point
  useEffect(() => {
    if (!scenario) return;
    const player = playerRef.current;
    if (!player) return;

    const handleFrameUpdate = (e: { detail: { frame: number } }) => {
      const frame = e.detail.frame;
      if (simState === 'playing' && branch === 'none' && frame >= scenario.config.pauseAtFrame) {
        player.pause();
        setSimState('paused-for-choice');
      }
      if (simState === 'branch-playing' && frame >= scenario.config.durationInFrames - 5) {
        setSimState('completed');
        if (!hasAwarded) {
          dispatch({ type: 'ADD_XP', payload: 50 });
          setHasAwarded(true);
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    player.addEventListener('frameupdate', handleFrameUpdate as any);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      player.removeEventListener('frameupdate', handleFrameUpdate as any);
    };
  }, [simState, branch, hasAwarded, dispatch, scenario]);

  // Voice synthesis: speak dialogue lines as they appear
  useEffect(() => {
    if (!scenario || !voiceEnabled) return;
    const player = playerRef.current;
    if (!player) return;

    const activeDialog =
      branch === 'A'
        ? [...scenario.dialogue, ...scenario.outcomes.A]
        : branch === 'B'
          ? [...scenario.dialogue, ...scenario.outcomes.B]
          : scenario.dialogue;

    const handleVoiceFrame = (e: { detail: { frame: number } }) => {
      const frame = e.detail.frame;
      const lineIndex = activeDialog.findIndex(
        (line) => frame >= line.startFrame && frame < line.startFrame + line.durationFrames
      );

      if (lineIndex !== -1 && lineIndex !== lastSpokenLineRef.current) {
        lastSpokenLineRef.current = lineIndex;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeDialog[lineIndex].text);
        utterance.lang = 'it-IT';
        // Prefer a Google Italian voice if available
        const voices = window.speechSynthesis.getVoices();
        const italianVoice =
          voices.find((v) => v.name.includes('Google') && v.lang.startsWith('it')) ??
          voices.find((v) => v.lang.startsWith('it'));
        if (italianVoice) utterance.voice = italianVoice;
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }

      // If no line is active, reset tracking so re-entering a line will speak again
      if (lineIndex === -1) {
        lastSpokenLineRef.current = -1;
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    player.addEventListener('frameupdate', handleVoiceFrame as any);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      player.removeEventListener('frameupdate', handleVoiceFrame as any);
      window.speechSynthesis.cancel();
    };
  }, [scenario, voiceEnabled, branch]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleBranchChoice = useCallback((chosen: 'A' | 'B') => {
    if (!scenario) return;
    setBranch(chosen);
    setSimState('branch-playing');
    setTimeout(() => {
      const player = playerRef.current;
      if (player) {
        player.seekTo(scenario.config.branchGoToFrame);
        player.play();
      }
    }, 100);
  }, [scenario]);

  const handleRestart = useCallback(() => {
    setBranch('none');
    setSimState('playing');
    setHasAwarded(false);
    lastSpokenLineRef.current = -1;
    window.speechSynthesis.cancel();
    const player = playerRef.current;
    if (player) {
      player.seekTo(0);
      player.play();
    }
  }, []);

  // Scenario not found
  if (!scenario) {
    return (
      <div className="min-h-screen bg-[#06060a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Simulazione non trovata</h1>
          <p className="text-slate-400">Lo scenario &quot;{courseId}&quot; non esiste.</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:from-violet-500 hover:to-purple-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06060a]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#06060a]/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          <div className="flex items-center gap-2">
            <Clapperboard className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold text-white">Simulazione Interattiva</span>
          </div>
          <button
            onClick={() => {
              setVoiceEnabled((v) => {
                if (v) window.speechSynthesis.cancel();
                return !v;
              });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              voiceEnabled
                ? 'bg-violet-600 text-white hover:bg-violet-700'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
            title={voiceEnabled ? 'Disattiva voce' : 'Attiva voce'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{voiceEnabled ? 'Voce ON' : 'Voce OFF'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {scenario.subtitle}
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            {isQuizPassed
              ? 'Guarda lo scenario e scegli come rispondere al momento decisivo.'
              : 'Supera il quiz di assessment per accedere alla simulazione.'}
          </p>
        </div>

        {/* Quiz Gate */}
        {!isQuizPassed && triviaGame && (
          <TriviaGame game={triviaGame} onPass={() => setIsQuizPassed(true)} />
        )}

        {/* Player Container */}
        {isQuizPassed && (<>
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl">
          <div className="aspect-video">
            <Player
              ref={playerRef}
              component={ScenarioVideo}
              inputProps={{
                branch,
                title: scenario.title,
                subtitle: scenario.subtitle,
                titleGradient: scenario.titleGradient,
                characterA: scenario.characterA,
                characterB: scenario.characterB,
                dialogue: scenario.dialogue,
                outcomes: scenario.outcomes,
              }}
              durationInFrames={scenario.config.durationInFrames}
              fps={scenario.config.fps}
              compositionWidth={scenario.config.width}
              compositionHeight={scenario.config.height}
              style={{ width: '100%', height: '100%' }}
              autoPlay
              controls={simState === 'branch-playing' || simState === 'completed'}
              acknowledgeRemotionLicense
            />
          </div>

          {/* Choice Overlay */}
          {simState === 'paused-for-choice' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="bg-white rounded-2xl p-8 mx-4 max-w-lg w-full shadow-2xl text-center space-y-6">
                <div>
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Pause className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Momento della decisione</h3>
                  <p className="text-sm text-slate-500 mt-2">
                    {scenario.options.prompt}
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleBranchChoice('A')}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 border-blue-200 bg-blue-50
                      hover:border-blue-400 hover:bg-blue-100 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        A
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{scenario.options.A.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{scenario.options.A.description}</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleBranchChoice('B')}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 border-violet-200 bg-violet-50
                      hover:border-violet-400 hover:bg-violet-100 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-violet-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        B
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{scenario.options.B.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{scenario.options.B.description}</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Completed Overlay */}
          {simState === 'completed' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="bg-white rounded-2xl p-8 mx-4 max-w-md w-full shadow-2xl text-center space-y-5">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Simulazione completata!</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Hai scelto la{' '}
                    <span className="font-semibold text-indigo-600">
                      {branch === 'A' ? scenario.options.A.label : scenario.options.B.label}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-amber-600 font-semibold">
                  <Zap className="w-5 h-5" />
                  +50 XP guadagnati
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRestart}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3
                      bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Riprova l&apos;altra scelta
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3
                      border border-slate-300 text-slate-700 bg-white rounded-xl font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 bg-white/[0.03] rounded-xl border border-white/[0.06] p-5">
          <h3 className="text-sm font-semibold text-white mb-2">Come funziona</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <Play className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
              Lo scenario si avvia automaticamente con un dialogo tra te e il cliente.
            </li>
            <li className="flex items-start gap-2">
              <Pause className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              Al momento cruciale il video si mette in pausa e ti chiede di scegliere.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              Ogni scelta porta a un esito diverso. Prova entrambe per guadagnare più XP!
            </li>
          </ul>
        </div>
        </>)}
      </div>
    </div>
  );
}
