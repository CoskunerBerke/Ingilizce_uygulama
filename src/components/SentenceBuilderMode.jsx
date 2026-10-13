import React, { useState, useEffect } from 'react';
import {
  Puzzle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Volume2,
  Sparkles,
  Undo2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function SentenceBuilderMode({
  levelData,
  onAddXp,
  onIncrementStreak,
  onResetStreak,
  onUnlockBadge
}) {
  const puzzles = levelData.sentencePuzzles;
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [availableBank, setAvailableBank] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [status, setStatus] = useState('playing'); // 'playing' | 'correct' | 'wrong'
  const [showHint, setShowHint] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const currentPuzzle = puzzles[puzzleIdx] || puzzles[0];

  const setupCurrentPuzzle = (idx) => {
    const p = puzzles[idx] || puzzles[0];
    const bankItems = [...p.correctWords, ...p.distractors].map((word, i) => ({
      id: `w-${idx}-${i}-${word}`,
      word
    }));
    // Shuffle bank
    const shuffled = [...bankItems].sort(() => Math.random() - 0.5);
    setAvailableBank(shuffled);
    setSelectedWords([]);
    setStatus('playing');
    setShowHint(false);
  };

  useEffect(() => {
    setPuzzleIdx(0);
    setCompletedCount(0);
    setAllDone(false);
    setupCurrentPuzzle(0);
  }, [levelData.id]);

  const handlePickWord = (item) => {
    if (status === 'correct') return;
    sound.playClick();
    setStatus('playing');
    setAvailableBank((prev) => prev.filter((w) => w.id !== item.id));
    setSelectedWords((prev) => [...prev, item]);
  };

  const handleRemoveWord = (item) => {
    if (status === 'correct') return;
    sound.playClick();
    setStatus('playing');
    setSelectedWords((prev) => prev.filter((w) => w.id !== item.id));
    setAvailableBank((prev) => [...prev, item]);
  };

  const handleClear = () => {
    if (status === 'correct') return;
    sound.playClick();
    setupCurrentPuzzle(puzzleIdx);
  };

  const handleCheckSentence = () => {
    const built = selectedWords.map((w) => w.word).join(' ');
    const target = currentPuzzle.correctWords.join(' ');

    if (built === target) {
      sound.playCorrect(3);
      sound.speak(target, false);
      setStatus('correct');
      onAddXp(40);
      onIncrementStreak();
      const nextCount = completedCount + 1;
      setCompletedCount(nextCount);
      if (nextCount >= 3) {
        onUnlockBadge('grammar_architect');
      }
    } else {
      sound.playWrong();
      setStatus('wrong');
      onResetStreak();
      setShowHint(true);
    }
  };

  const handleNextPuzzle = () => {
    if (puzzleIdx + 1 < puzzles.length) {
      const next = puzzleIdx + 1;
      setPuzzleIdx(next);
      setupCurrentPuzzle(next);
    } else {
      sound.playVictory();
      setAllDone(true);
      onAddXp(80);
      onUnlockBadge('first_win');
      onUnlockBadge('grammar_architect');
      if (levelData.id === 'C2') onUnlockBadge('c2_master');
      confetti({ particleCount: 85, spread: 70, origin: { y: 0.6 } });
    }
  };

  if (allDone) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400">
          <Sparkles className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-white">
          {levelData.id} Cümle İnşaatçısı Tamamlandı! 🏆
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          Tüm dilbilgisi yapılarını doğru dizilimle kurdun ve ekstra +80 XP bonus kazandın!
        </p>
        <button
          onClick={() => {
            setPuzzleIdx(0);
            setCompletedCount(0);
            setAllDone(false);
            setupCurrentPuzzle(0);
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Baştan Oyna</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Puzzle className={`h-5 w-5 ${levelData.accentText}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Cümle İnşaatçısı • {currentPuzzle.grammarTopic}
          </span>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
          Cümle {puzzleIdx + 1} / {puzzles.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full bg-gradient-to-r ${levelData.color} transition-all duration-300`}
          style={{ width: `${((puzzleIdx + 1) / puzzles.length) * 100}%` }}
        />
      </div>

      {/* Prompt Card */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            🇹🇷 Bu Cümleyi İngilizceye Çevir (Tuzak Kelimelere Dikkat!):
          </span>
          <button
            onClick={() => setShowHint((h) => !h)}
            className="inline-flex items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>{showHint ? 'İpucunu Gizle' : 'Gramer İpucu'}</span>
          </button>
        </div>

        <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
          &ldquo;{currentPuzzle.trPrompt}&rdquo;
        </h3>

        {showHint && (
          <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
            💡 <strong>Kural İpucu:</strong> {currentPuzzle.hint}
          </div>
        )}
      </div>

      {/* Construction Dropzone */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>Senin Cümlen (Kaldırmak için kelimenin üzerine tıkla):</span>
          {selectedWords.length > 0 && status !== 'correct' && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300"
            >
              <Undo2 className="h-3.5 w-3.5" />
              Temizle
            </button>
          )}
        </div>

        <div
          className={`flex min-h-[88px] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-4 transition-all ${
            status === 'correct'
              ? 'border-emerald-500/60 bg-emerald-500/10'
              : status === 'wrong'
              ? 'border-rose-500/60 bg-rose-500/10 animate-shake'
              : 'border-slate-700 bg-slate-950/60'
          }`}
        >
          {selectedWords.length === 0 ? (
            <span className="text-xs italic text-slate-500">
              Aşağıdaki kelime bloklarına tıklayarak cümleyi sırasıyla buraya diz...
            </span>
          ) : (
            selectedWords.map((item) => (
              <button
                key={item.id}
                onClick={() => handleRemoveWord(item)}
                className="animate-pop rounded-xl border border-indigo-500/50 bg-indigo-600 px-3.5 py-2 text-sm font-bold text-white shadow-md transition hover:bg-rose-600"
              >
                {item.word}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Word Bank */}
      <div className="mt-6">
        <div className="mb-2 text-xs text-slate-400">
          Kelime Havuzu ({currentPuzzle.distractors.length} adet tuzak kelime içerir):
        </div>
        <div className="flex flex-wrap gap-2.5">
          {availableBank.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePickWord(item)}
              disabled={status === 'correct'}
              className="rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-sm font-bold text-slate-100 shadow transition hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-slate-700 active:scale-95"
            >
              {item.word}
            </button>
          ))}
        </div>
      </div>

      {/* Action / Feedback Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-5">
        {status === 'correct' ? (
          <div className="flex w-full flex-col items-start justify-between gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Kusursuz Cümle! (+40 XP)</span>
                <button
                  onClick={() => sound.speak(currentPuzzle.correctWords.join(' '), false)}
                  className="ml-2 inline-flex items-center gap-1 rounded-lg bg-emerald-500/20 px-2 py-1 text-xs text-emerald-200 hover:bg-emerald-500/30"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  Dinle
                </button>
              </div>
              <p className="text-xs text-slate-300">{currentPuzzle.hint}</p>
            </div>

            <button
              onClick={handleNextPuzzle}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              <span>Sonraki Cümle</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="text-xs text-slate-400">
              {status === 'wrong' ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-rose-400">
                  <XCircle className="h-4 w-4" />
                  Dizilimde veya seçilen yardımcı fiilde hata var! İpucuna göz atıp tekrar dene.
                </span>
              ) : (
                <span>
                  Doğru cümle <strong>{currentPuzzle.correctWords.length}</strong> kelimeden oluşuyor. (Seçilen: {selectedWords.length})
                </span>
              )}
            </div>

            <button
              onClick={handleCheckSentence}
              disabled={selectedWords.length === 0}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-95 disabled:opacity-40"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Cümleyi Kontrol Et</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
