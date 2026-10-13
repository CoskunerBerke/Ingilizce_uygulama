import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Wand2,
  BookCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function GrammarDetectiveMode({
  levelData,
  onAddXp,
  onIncrementStreak,
  onResetStreak,
  onUnlockBadge
}) {
  const questions = levelData.grammarQuizzes;
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [eliminatedOpts, setEliminatedOpts] = useState([]);
  const [jokerLeft, setJokerLeft] = useState(2);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQ = questions[qIndex] || questions[0];

  const resetQuiz = () => {
    setQIndex(0);
    setSelectedOpt(null);
    setEliminatedOpts([]);
    setJokerLeft(2);
    setScore(0);
    setFinished(false);
  };

  useEffect(() => {
    resetQuiz();
  }, [levelData.id]);

  const handleUseFiftyFifty = () => {
    if (jokerLeft <= 0 || eliminatedOpts.length > 0 || selectedOpt) return;
    sound.playClick();
    const wrongOptions = currentQ.options.filter((o) => o !== currentQ.answer);
    const toEliminate = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    setEliminatedOpts(toEliminate);
    setJokerLeft((j) => j - 1);
  };

  const handleSelectOption = (opt) => {
    if (selectedOpt || eliminatedOpts.includes(opt)) return;
    setSelectedOpt(opt);

    const isCorrect = opt === currentQ.answer;
    if (isCorrect) {
      sound.playCorrect(2);
      setScore((s) => s + 1);
      onAddXp(35);
      onIncrementStreak();
    } else {
      sound.playWrong();
      onResetStreak();
    }
  };

  const handleNext = () => {
    if (qIndex + 1 < questions.length) {
      setQIndex((i) => i + 1);
      setSelectedOpt(null);
      setEliminatedOpts([]);
    } else {
      sound.playVictory();
      setFinished(true);
      onAddXp(70);
      onUnlockBadge('first_win');
      if (levelData.id === 'C2') onUnlockBadge('c2_master');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  if (finished) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
          <Sparkles className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-white">
          Gramer Dedektifi Görevi Tamamlandı! 🕵️‍♂️
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          {questions.length} sorudan <strong className="text-emerald-400">{score}</strong> tanesini doğru çözdün!
        </p>
        <button
          onClick={resetQuiz}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Tekrar Çöz</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`h-5 w-5 ${levelData.accentText}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {currentQ.type === 'error' ? '🔍 Hata Avcısı (Doğru Cümleyi Bul)' : '⚡ Boşluk Doldurma'} • {currentQ.topic}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUseFiftyFifty}
            disabled={jokerLeft <= 0 || eliminatedOpts.length > 0 || Boolean(selectedOpt)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-300 transition hover:bg-purple-500/20 disabled:opacity-40"
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span>%50 Joker ({jokerLeft})</span>
          </button>

          <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-300">
            {qIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full bg-gradient-to-r ${levelData.color} transition-all duration-300`}
          style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
        <span className={`inline-block rounded-full border px-3 py-0.5 text-[11px] font-bold ${levelData.badgeBg}`}>
          Konu: {currentQ.topic}
        </span>
        <h3 className="mt-3 text-lg font-bold leading-relaxed text-white sm:text-xl">
          {currentQ.question}
        </h3>
      </div>

      {/* Options */}
      <div className="mt-6 space-y-3">
        {currentQ.options.map((opt, idx) => {
          const isEliminated = eliminatedOpts.includes(opt);
          let style =
            'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800/90';

          if (isEliminated) {
            style = 'border-slate-900 bg-slate-950/30 text-slate-600 line-through opacity-40 cursor-not-allowed';
          } else if (selectedOpt) {
            if (opt === currentQ.answer) {
              style = 'border-emerald-500 bg-emerald-500/20 text-emerald-200';
            } else if (opt === selectedOpt) {
              style = 'border-rose-500 bg-rose-500/20 text-rose-200 animate-shake';
            }
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelectOption(opt)}
              disabled={Boolean(selectedOpt) || isEliminated}
              className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${style}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>
              {selectedOpt && opt === currentQ.answer && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
              )}
              {selectedOpt === opt && opt !== currentQ.answer && (
                <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detailed Explanation Box */}
      {selectedOpt && (
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-5 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-300">
              <BookCheck className="h-4 w-4 text-indigo-400" />
              <span>Dilbilgisi Açıklaması</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
              {currentQ.explanation}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg hover:bg-indigo-500"
          >
            <span>Sonraki Soru</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
