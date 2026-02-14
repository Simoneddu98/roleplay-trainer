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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 text-center max-w-md w-full space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Trivia completato!</h2>
            <p className="text-slate-500 mt-1">{message}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Risposte corrette</span>
              <span className="text-lg font-bold text-slate-900">
                {score / XP_PER_CORRECT}/{totalQuestions}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Percentuale</span>
              <span className="text-lg font-bold text-indigo-600">{percentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">XP guadagnati</span>
              <span className="text-lg font-bold text-amber-600 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                +{score}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={restartGame}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Rigioca
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-300 text-slate-700 bg-white rounded-xl font-medium hover:bg-slate-50 transition-colors cursor-pointer"
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Esci
          </button>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-900">Trivia Challenge</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
            <Zap className="w-4 h-4" />
            {score}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Domanda {currentIndex + 1} di {totalQuestions}
            </span>
            <span className="text-sm font-semibold text-indigo-600">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-5">
            <p className="text-white text-lg font-medium leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Answers */}
          <div className="p-6 space-y-3">
            {currentQ.answers.map((answer, i) => {
              let btnClass = 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 text-slate-800';

              if (gameState === 'answered') {
                if (i === currentQ.correctIndex) {
                  btnClass = 'border-emerald-400 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400/30';
                } else if (i === selectedAnswer && !isCorrect) {
                  btnClass = 'border-red-400 bg-red-50 text-red-800 ring-2 ring-red-400/30';
                } else {
                  btnClass = 'border-slate-200 bg-slate-50 text-slate-400';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={gameState === 'answered'}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-sm
                    transition-all duration-200 cursor-pointer disabled:cursor-default
                    flex items-center gap-3 ${btnClass}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0
                    ${gameState === 'answered' && i === currentQ.correctIndex
                      ? 'bg-emerald-500 text-white'
                      : gameState === 'answered' && i === selectedAnswer && !isCorrect
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{answer}</span>
                  {gameState === 'answered' && i === currentQ.correctIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {gameState === 'answered' && i === selectedAnswer && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback + Next */}
          {gameState === 'answered' && (
            <div className={`px-6 py-4 border-t flex items-center justify-between
              ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">Corretto! +{XP_PER_CORRECT} XP</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-semibold text-red-700">Sbagliato!</span>
                  </>
                )}
              </div>
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
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
