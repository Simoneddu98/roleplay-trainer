'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TriviaGame as TriviaGameType, TriviaQuestion } from '@/lib/triviamaker';
import { Trophy, RotateCcw, BookOpen, Play, Timer, CheckCircle2, XCircle } from 'lucide-react';

interface TriviaGameProps {
  game: TriviaGameType;
  onPass: () => void;
}

type Phase = 'intro' | 'playing' | 'result';

const ANSWER_COLORS = [
  'from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-blue-400/30',
  'from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 border-orange-400/30',
  'from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border-emerald-400/30',
  'from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 border-pink-400/30',
];

const ANSWER_LABELS = ['A', 'B', 'C', 'D'];

const TIMER_SECONDS = 15;

export default function TriviaGame({ game, onPass }: TriviaGameProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shake, setShake] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question: TriviaQuestion | undefined = game.questions[currentQ];
  const totalQuestions = game.questions.length;
  const passed = score >= game.passingScore;

  // Timer countdown
  useEffect(() => {
    if (phase !== 'playing' || showFeedback) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up — treat as wrong answer
          clearInterval(timerRef.current!);
          setShowFeedback(true);
          setShake(true);
          setTimeout(() => setShake(false), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, currentQ, showFeedback]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (showFeedback || !question) return;

      if (timerRef.current) clearInterval(timerRef.current);
      setSelectedAnswer(index);
      setShowFeedback(true);

      if (index === question.correctIndex) {
        setScore((s) => s + 100);
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    },
    [showFeedback, question],
  );

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= totalQuestions) {
      setPhase('result');
    } else {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(TIMER_SECONDS);
    }
  }, [currentQ, totalQuestions]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(TIMER_SECONDS);
  }, []);

  // ─── Intro Screen ──────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-violet-600/20 rounded-full flex items-center justify-center mx-auto">
          <Trophy className="w-8 h-8 text-violet-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{game.title}</h2>
          <p className="text-slate-400 mt-2 max-w-md mx-auto">{game.description}</p>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <span>{totalQuestions} domande</span>
          <span>{TIMER_SECONDS}s per domanda</span>
          <span>Soglia: {game.passingScore} punti</span>
        </div>
        <button
          onClick={() => setPhase('playing')}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600
            text-white rounded-xl font-semibold hover:from-violet-500 hover:to-purple-500
            transition-all duration-200 shadow-lg shadow-violet-500/25 cursor-pointer"
        >
          <Play className="w-5 h-5" />
          Inizia Sfida
        </button>
      </div>
    );
  }

  // ─── Result Screen ──────────────────────────────────────────────────────────
  if (phase === 'result') {
    return (
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center space-y-6">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
            passed ? 'bg-emerald-600/20' : 'bg-red-600/20'
          }`}
        >
          {passed ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          ) : (
            <XCircle className="w-10 h-10 text-red-400" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            {passed ? 'Ottimo lavoro!' : 'Non hai superato il quiz'}
          </h2>
          <p className="text-slate-400 mt-2">
            Punteggio: <span className="font-bold text-white">{score}</span> / {totalQuestions * 100}
            {!passed && (
              <span className="block mt-1 text-sm">
                Servono almeno {game.passingScore} punti per accedere alla simulazione.
              </span>
            )}
          </p>
        </div>

        {passed ? (
          <button
            onClick={onPass}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600
              text-white rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500
              transition-all duration-200 shadow-lg shadow-emerald-500/25 cursor-pointer"
          >
            <Play className="w-5 h-5" />
            Procedi alla Simulazione
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600
                text-white rounded-xl font-semibold hover:from-violet-500 hover:to-purple-500
                transition-all duration-200 shadow-lg shadow-violet-500/25 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              Riprova
            </button>
            <p className="text-sm text-slate-500 flex items-center justify-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Consulta il dizionario per ripassare i concetti chiave.
            </p>
          </div>
        )}
      </div>
    );
  }

  // ─── Playing Screen ─────────────────────────────────────────────────────────
  if (!question) return null;

  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timeLeft > 5 ? 'bg-violet-500' : 'bg-red-500';

  return (
    <div className={`space-y-6 ${shake ? 'animate-shake' : ''}`}>
      {/* Progress + Score */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Domanda {currentQ + 1} / {totalQuestions}
        </span>
        <span className="text-sm font-semibold text-violet-400">
          <Trophy className="w-4 h-4 inline mr-1" />
          {score} punti
        </span>
      </div>

      {/* Timer bar */}
      <div className="relative h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 ${timerColor} rounded-full transition-all duration-1000 ease-linear`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>
      <div className="flex items-center gap-1.5 text-sm text-slate-500">
        <Timer className="w-4 h-4" />
        {timeLeft}s
      </div>

      {/* Question */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white leading-relaxed">{question.question}</h3>
      </div>

      {/* Answers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.answers.map((answer, i) => {
          let extraClasses = '';
          if (showFeedback) {
            if (i === question.correctIndex) {
              extraClasses = '!from-emerald-600 !to-emerald-500 !border-emerald-400/50 ring-2 ring-emerald-400/50';
            } else if (i === selectedAnswer && i !== question.correctIndex) {
              extraClasses = '!from-red-600 !to-red-500 !border-red-400/50 ring-2 ring-red-400/50';
            } else {
              extraClasses = 'opacity-50';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showFeedback}
              className={`flex items-center gap-3 px-5 py-4 rounded-xl border bg-gradient-to-r
                text-white font-medium text-left transition-all duration-200
                ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                ${ANSWER_COLORS[i]} ${extraClasses}`}
            >
              <span className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-sm font-bold shrink-0">
                {ANSWER_LABELS[i]}
              </span>
              <span className="text-sm">{answer}</span>
            </button>
          );
        })}
      </div>

      {/* Next button after feedback */}
      {showFeedback && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/[0.06] border border-white/[0.1]
              text-white rounded-xl font-medium hover:bg-white/[0.1] transition-colors cursor-pointer"
          >
            {currentQ + 1 >= totalQuestions ? 'Vedi Risultato' : 'Prossima Domanda'}
          </button>
        </div>
      )}
    </div>
  );
}
