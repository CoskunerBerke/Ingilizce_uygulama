import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Sparkles, X } from 'lucide-react';
import { PLACEMENT_QUESTIONS } from '../data/curriculumData';
import { sound } from '../utils/sound';

export default function PlacementModal({ isOpen, onClose, onApplyLevel }) {
  const [step, setStep] = useState(0);
  const [scoreWeight, setScoreWeight] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [finished, setFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = PLACEMENT_QUESTIONS[step];

  const handleAnswer = (opt) => {
    if (selectedOption) return;
    setSelectedOption(opt);
    const isCorrect = opt === currentQ.answer;
    if (isCorrect) {
      sound.playCorrect(1);
      setScoreWeight((prev) => prev + currentQ.weight);
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }

    setTimeout(() => {
      if (step + 1 < PLACEMENT_QUESTIONS.length) {
        setStep((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        sound.playVictory();
        setFinished(true);
      }
    }, 900);
  };

  const calculateRecommendedLevel = () => {
    // Total weight is 1+2+3+4+5+6 = 21
    if (scoreWeight <= 2) return 'A1';
    if (scoreWeight <= 5) return 'A2';
    if (scoreWeight <= 9) return 'B1';
    if (scoreWeight <= 14) return 'B2';
    if (scoreWeight <= 18) return 'C1';
    return 'C2';
  };

  const recommended = calculateRecommendedLevel();

  const handleResetAndClose = () => {
    setStep(0);
    setScoreWeight(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setFinished(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
        <button
          onClick={handleResetAndClose}
          className="absolute right-5 top-5 rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {!finished ? (
          <div>
            <div className="flex items-center gap-2 text-amber-400">
              <Compass className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Hızlı Seviye Tespit Sınavı (A1 → C2)
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Soru {step + 1} / {PLACEMENT_QUESTIONS.length}</span>
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 font-semibold text-indigo-300">
                Ölçülen Seviye: {currentQ.level}
              </span>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${((step + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h3 className="mt-6 text-lg font-bold leading-relaxed text-white sm:text-xl">
              {currentQ.question}
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {currentQ.options.map((opt) => {
                let btnStyle =
                  'border-slate-700/80 bg-slate-800/70 text-slate-200 hover:border-indigo-500/60 hover:bg-slate-800';
                if (selectedOption) {
                  if (opt === currentQ.answer) {
                    btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-200';
                  } else if (opt === selectedOption) {
                    btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-200';
                  }
                }
                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    disabled={Boolean(selectedOption)}
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${btnStyle}`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-indigo-600 shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-white">
              Önerilen Seviyen: <span className="text-indigo-400">{recommended}</span>
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {PLACEMENT_QUESTIONS.length} sorudan <strong className="text-white">{correctCount}</strong> tanesini doğru yanıtladın.
              Senin için en ideal oyun ve çalışma modülü <strong className="text-amber-300">{recommended}</strong> olarak belirlendi!
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => {
                  onApplyLevel(recommended);
                  handleResetAndClose();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-95"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{recommended} Seviyesinden Başla</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleResetAndClose}
                className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-700"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
