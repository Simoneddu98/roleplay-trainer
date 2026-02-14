'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useStore';
import { getRandomQuestions, TriviaQuestion } from '@/data/trivia';
import {
  ArrowLeft, Trophy, RotateCcw, Zap, CheckCircle, XCircle, Brain,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PreparedQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

type GameState = 'playing' | 'answered' | 'finished';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function prepareQuestion(q: TriviaQuestion): PreparedQuestion {
  const answers = [...q.wrong, q.correct];
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return {
    question: q.question,
    answers,
    correctIndex: answers.indexOf(q.correct),
  };
}

function loadQuestions(): PreparedQuestion[] {
  return getRandomQuestions(10).map(prepareQuestion);
}

const XP_PER_CORRECT = 10;

// ─── Component ───────────────────────────────────────────────────────────────

export default function TriviaPage() {
  const router = useRouter();
  const { dispatch } = useAppStore();

  const [questions, setQuestions] = useState<PreparedQuestion[]>(() => loadQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('playing');

  const restartGame = useCallback(() => {
    setQuestions(loadQuestions());
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameState('playing');
  }, []);

  const handleAnswer = (answerIndex: number) => {
    if (gameState !== 'playing') return;
    setSelectedAnswer(answerIndex);
    setGameState('answered');

    if (answerIndex === questions[currentIndex].correctIndex) {
      setScore((s) => s + XP_PER_CORRECT);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      if (score > 0) {
        dispatch({ type: 'ADD_XP', payload: score });
      }
      setGameState('finished');
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setGameState('playing');
    }
  };

  const totalQuestions = questions.length;
  const currentQ = questions[currentIndex];

  // ─── Finished ────────────────────────────────────────────────────────────

  if (gameState === 'finished') {
    const percentage = Math.round((score / (totalQuestions * XP_PER_CORRECT)) * 100);
    const message = percentage >= 80 ? 'Eccezionale!' : percentage >= 50 ? 'Buon lavoro!' : 'Continua a esercitarti!';

    return (
      <div className="min-h-screen bg-[#06060a] flex items-center justify-center px-4">
        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] shadow-2xl shadow-violet-500/5 p-8 text-center max-w-md w-full space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/25">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Trivia completato!</h2>
            <p className="text-slate-500 mt-1">{message}</p>
          </div>

          <div className="bg-white/[0.04] rounded-xl p-5 space-y-3 border border-white/[0.06]">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Risposte corrette</span>
              <span className="text-lg font-bold text-white">
                {score / XP_PER_CORRECT}/{totalQuestions}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Percentuale</span>
              <span className="text-lg font-bold text-violet-400">{percentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">XP guadagnati</span>
              <span className="text-lg font-bold text-amber-400 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                +{score}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={restartGame}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Rigioca
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/[0.08] text-slate-300 bg-white/[0.03] rounded-xl font-medium hover:bg-white/[0.06] hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Playing / Answered ──────────────────────────────────────────────────

  const isCorrect = selectedAnswer === currentQ.correctIndex;

  return (
    <div className="min-h-screen bg-[#06060a]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#06060a]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Esci
          </button>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold text-white">Trivia Challenge</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-amber-400">
            <Zap className="w-4 h-4" />
            {score}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500">
              Domanda {currentIndex + 1} di {totalQuestions}
            </span>
            <span className="text-sm font-semibold text-violet-400">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-5">
            <p className="text-white text-lg font-medium leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Answers */}
          <div className="p-6 space-y-3">
            {currentQ.answers.map((answer, i) => {
              let btnClass = 'border-white/[0.08] bg-white/[0.02] hover:border-violet-500/40 hover:bg-violet-500/10 text-slate-300';

              if (gameState === 'answered') {
                if (i === currentQ.correctIndex) {
                  btnClass = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30';
                } else if (i === selectedAnswer && !isCorrect) {
                  btnClass = 'border-red-500/50 bg-red-500/10 text-red-300 ring-1 ring-red-500/30';
                } else {
                  btnClass = 'border-white/[0.04] bg-white/[0.01] text-slate-600';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={gameState === 'answered'}
                  className={`w-full text-left px-5 py-4 rounded-xl border font-medium text-sm
                    transition-all duration-200 cursor-pointer disabled:cursor-default
                    flex items-center gap-3 ${btnClass}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0
                    ${gameState === 'answered' && i === currentQ.correctIndex
                      ? 'bg-emerald-500 text-white'
                      : gameState === 'answered' && i === selectedAnswer && !isCorrect
                        ? 'bg-red-500 text-white'
                        : 'bg-white/[0.06] text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{answer}</span>
                  {gameState === 'answered' && i === currentQ.correctIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {gameState === 'answered' && i === selectedAnswer && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback + Next */}
          {gameState === 'answered' && (
            <div className={`px-6 py-4 border-t flex items-center justify-between
              ${isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/20'
                : 'bg-red-500/10 border-red-500/20'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-400">Corretto! +{XP_PER_CORRECT} XP</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-semibold text-red-400">Sbagliato!</span>
                  </>
                )}
              </div>
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 transition-all cursor-pointer"
              >
                {currentIndex + 1 >= totalQuestions ? 'Vedi risultati' : 'Prossima'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
