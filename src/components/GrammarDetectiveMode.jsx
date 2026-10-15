import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Undo2,
  Volume2,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { EXTRA_GRAMMAR_QUIZZES, GRAMMAR_TRUE_FALSE } from '../data/grammarBank';
import { shuffleArray } from '../data/vocabBank';

const GRAMMAR_SUBMODES = [
  { id: 'quiz', label: 'Gramer Testi' },
  { id: 'builder', label: 'Cümle Kurma' },
  { id: 'tf', label: 'Doğru / Yanlış' }
];

export default function GrammarDetectiveMode({
  levelData,
  subMode,
  onChangeSubMode,
  solvedGrammarIds = [],
  onMarkGrammarSolved,
  onAddXp,
  onIncrementStreak,
  onResetStreak
}) {
  // --- 1. GRAMMAR QUIZ STATE ---
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  // --- 2. SENTENCE BUILDER STATE ---
  const puzzles = levelData.sentencePuzzles;
  const [pIdx, setPIdx] = useState(0);
  const [bank, setBank] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [buildStatus, setBuildStatus] = useState('playing');
  const [showHint, setShowHint] = useState(false);
  const [builderDone, setBuilderDone] = useState(false);

  // --- 3. TRUE / FALSE SPEED DUEL STATE ---
  const tfList = GRAMMAR_TRUE_FALSE[levelData.id] || GRAMMAR_TRUE_FALSE.A1;
  const [tfIdx, setTfIdx] = useState(0);
  const [tfChoice, setTfChoice] = useState(null); // true | false | null
  const [tfDone, setTfDone] = useState(false);

  const buildQuestionsList = () => {
    const base = levelData.grammarQuizzes || [];
    const extra = EXTRA_GRAMMAR_QUIZZES[levelData.id] || [];
    const all = [...base, ...extra];
    // Put unsolved questions first so returning user continues from where they left off
    const unsolved = all.filter((q) => !solvedGrammarIds.includes(q.id));
    const solved = all.filter((q) => solvedGrammarIds.includes(q.id));
    return [...unsolved, ...solved];
  };

  const initQuiz = () => {
    setQuestions(buildQuestionsList());
    setQIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setQuizDone(false);
  };

  const setupPuzzle = (idx) => {
    const p = puzzles[idx] || puzzles[0];
    const items = [...p.correctWords, ...p.distractors].map((w, i) => ({
      id: `w-${idx}-${i}-${w}`,
      word: w
    }));
    setBank(shuffleArray(items));
    setChosen([]);
    setBuildStatus('playing');
    setShowHint(false);
  };

  const initBuilder = () => {
    // Find first unsolved puzzle index for resume
    const firstUnsolvedIdx = puzzles.findIndex(
      (p) => !solvedGrammarIds.includes(p.id)
    );
    const startIdx = firstUnsolvedIdx !== -1 ? firstUnsolvedIdx : 0;
    setPIdx(startIdx);
    setBuilderDone(false);
    setupPuzzle(startIdx);
  };

  const initTf = () => {
    const firstUnsolvedTf = tfList.findIndex(
      (t) => !solvedGrammarIds.includes(t.id)
    );
    setTfIdx(firstUnsolvedTf !== -1 ? firstUnsolvedTf : 0);
    setTfChoice(null);
    setTfDone(false);
  };

  useEffect(() => {
    initQuiz();
    initBuilder();
    initTf();
  }, [levelData.id]);

  const currentQ = questions[qIdx] || levelData.grammarQuizzes[0];
  const currentP = puzzles[pIdx] || puzzles[0];
  const currentTf = tfList[tfIdx] || tfList[0];

  // Quiz handlers
  const handleSelectQuiz = (opt) => {
    if (selectedOpt) return;
    setSelectedOpt(opt);
    if (opt === currentQ.answer) {
      sound.playCorrect(2);
      setScore((s) => s + 1);
      onAddXp(25);
      onIncrementStreak();
      onMarkGrammarSolved(currentQ.id);
    } else {
      sound.playWrong();
      onResetStreak();
    }
  };

  const handleNextQuiz = () => {
    if (qIdx + 1 < questions.length) {
      setQIdx((i) => i + 1);
      setSelectedOpt(null);
    } else {
      sound.playVictory();
      setQuizDone(true);
      onAddXp(40);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.65 } });
    }
  };

  // Sentence Builder handlers
  const handleAddWord = (item) => {
    if (buildStatus === 'correct') return;
    sound.playClick();
    setBuildStatus('playing');
    setBank((prev) => prev.filter((x) => x.id !== item.id));
    setChosen((prev) => [...prev, item]);
  };

  const handleRemoveWord = (item) => {
    if (buildStatus === 'correct') return;
    sound.playClick();
    setBuildStatus('playing');
    setChosen((prev) => prev.filter((x) => x.id !== item.id));
    setBank((prev) => [...prev, item]);
  };

  const handleCheckSentence = () => {
    const userSentence = chosen.map((c) => c.word).join(' ');
    const targetSentence = currentP.correctWords.join(' ');
    if (userSentence === targetSentence) {
      sound.playCorrect(3);
      sound.speak(targetSentence, false);
      setBuildStatus('correct');
      onAddXp(30);
      onIncrementStreak();
      onMarkGrammarSolved(currentP.id);
    } else {
      sound.playWrong();
      setBuildStatus('wrong');
      setShowHint(true);
      onResetStreak();
    }
  };

  const handleNextPuzzle = () => {
    if (pIdx + 1 < puzzles.length) {
      const next = pIdx + 1;
      setPIdx(next);
      setupPuzzle(next);
    } else {
      sound.playVictory();
      setBuilderDone(true);
      onAddXp(50);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.65 } });
    }
  };

  // True/False handlers
  const handleSelectTf = (choiceBool) => {
    if (tfChoice !== null) return;
    setTfChoice(choiceBool);
    if (choiceBool === currentTf.isCorrect) {
      sound.playCorrect(2);
      onAddXp(25);
      onIncrementStreak();
      onMarkGrammarSolved(currentTf.id);
    } else {
      sound.playWrong();
      onResetStreak();
    }
  };

  const handleNextTf = () => {
    if (tfIdx + 1 < tfList.length) {
      setTfIdx((i) => i + 1);
      setTfChoice(null);
    } else {
      sound.playVictory();
      setTfDone(true);
      onAddXp(45);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.65 } });
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-slate-900/80 sm:p-7">
      {/* Sub-Mode Toggle */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {GRAMMAR_SUBMODES.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                sound.playClick();
                onChangeSubMode(m.id);
              }}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                subMode === m.id
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {subMode === 'quiz'
            ? `${qIdx + 1} / ${questions.length}`
            : subMode === 'builder'
            ? `${pIdx + 1} / ${puzzles.length}`
            : `${tfIdx + 1} / ${tfList.length}`}
        </span>
      </div>

      {/* SUBMODE 1: GRAMMAR QUIZ */}
      {subMode === 'quiz' &&
        (!quizDone ? (
          <div>
            <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-500"
                style={{ width: `${((qIdx + 1) / Math.max(questions.length, 1)) * 100}%` }}
              />
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-950/60 sm:p-5">
              <span className="inline-block rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                {currentQ.topic}
              </span>
              <h3 className="mt-3 text-base font-bold leading-relaxed text-slate-900 dark:text-white sm:text-lg">
                {currentQ.question}
              </h3>
            </div>

            <div className="mt-4 space-y-2.5">
              {currentQ.options.map((opt) => {
                let style =
                  'border-slate-200 bg-white text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100';
                if (selectedOpt) {
                  if (opt === currentQ.answer) {
                    style =
                      'border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-200';
                  } else if (opt === selectedOpt) {
                    style =
                      'border-rose-500 bg-rose-50 text-rose-800 animate-shake dark:border-rose-500 dark:bg-rose-500/15 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectQuiz(opt)}
                    disabled={Boolean(selectedOpt)}
                    className={`flex min-h-[52px] w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${style}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && opt === currentQ.answer && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    )}
                    {selectedOpt === opt && opt !== currentQ.answer && (
                      <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedOpt && (
              <div className="mt-5 flex flex-col justify-between gap-3 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800/70 sm:flex-row sm:items-center">
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                  💡 {currentQ.explanation}
                </p>
                <button
                  onClick={handleNextQuiz}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
                >
                  <span>Sonraki</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="mt-3 text-lg font-extrabold text-slate-900 dark:text-white">
              {levelData.id} Gramer Testi Tamamlandı!
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {questions.length} sorudan {score} doğru yanıt.
            </p>
            <button
              onClick={initQuiz}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Tekrar Çöz</span>
            </button>
          </div>
        ))}

      {/* SUBMODE 2: SENTENCE BUILDER */}
      {subMode === 'builder' &&
        (!builderDone ? (
          <div>
            <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-500"
                style={{ width: `${((pIdx + 1) / puzzles.length) * 100}%` }}
              />
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-950/60 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  {currentP.grammarTopic}
                </span>
                <button
                  onClick={() => setShowHint((h) => !h)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>İpucu</span>
                </button>
              </div>

              <p className="mt-3 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                &ldquo;{currentP.trPrompt}&rdquo;
              </p>

              {showHint && (
                <p className="mt-2 rounded-xl bg-amber-50 p-2.5 text-xs text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                  💡 {currentP.hint}
                </p>
              )}
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Cümlen (Kaldırmak için kelimeye dokun):</span>
                {chosen.length > 0 && buildStatus !== 'correct' && (
                  <button
                    onClick={() => setupPuzzle(pIdx)}
                    className="inline-flex items-center gap-1 font-semibold text-rose-500"
                  >
                    <Undo2 className="h-3.5 w-3.5" />
                    Sıfırla
                  </button>
                )}
              </div>

              <div
                className={`flex min-h-[72px] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-3.5 transition-all ${
                  buildStatus === 'correct'
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-500/10'
                    : buildStatus === 'wrong'
                    ? 'border-rose-500 bg-rose-50/60 animate-shake dark:bg-rose-500/10'
                    : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40'
                }`}
              >
                {chosen.length === 0 ? (
                  <span className="text-xs text-slate-400">
                    Aşağıdaki kelimelere dokunarak cümleyi oluştur...
                  </span>
                ) : (
                  chosen.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleRemoveWord(item)}
                      className="animate-pop rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm sm:text-sm"
                    >
                      {item.word}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {bank.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddWord(item)}
                  disabled={buildStatus === 'correct'}
                  className="min-h-[40px] rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 shadow-sm transition hover:border-indigo-400 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:text-sm"
                >
                  {item.word}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              {buildStatus === 'correct' ? (
                <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Doğru Cümle!</span>
                    <button
                      onClick={() => sound.speak(currentP.correctWords.join(' '), false)}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2 py-1 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      Dinle
                    </button>
                  </div>
                  <button
                    onClick={handleNextPuzzle}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 sm:w-auto"
                  >
                    <span>Sonraki Cümle</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleCheckSentence}
                  disabled={chosen.length === 0}
                  className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-40 sm:text-sm"
                >
                  Cümleyi Kontrol Et
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="mt-3 text-lg font-extrabold text-slate-900 dark:text-white">
              Tüm Cümleleri Kurdun!
            </h3>
            <button
              onClick={initBuilder}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Tekrar Oyna</span>
            </button>
          </div>
        ))}

      {/* SUBMODE 3: TRUE / FALSE GRAMMAR DUEL */}
      {subMode === 'tf' &&
        (!tfDone ? (
          <div>
            <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-500"
                style={{ width: `${((tfIdx + 1) / tfList.length) * 100}%` }}
              />
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center dark:border-slate-800/80 dark:bg-slate-950/60">
              <span className="inline-block rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                Bu Cümle Dilbilgisi Açısından Doğru mu?
              </span>
              <p className="mt-4 text-base font-extrabold leading-relaxed text-slate-900 dark:text-white sm:text-xl">
                &ldquo;{currentTf.sentence}&rdquo;
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSelectTf(true)}
                disabled={tfChoice !== null}
                className={`flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border text-sm font-extrabold transition-all ${
                  tfChoice === null
                    ? 'border-emerald-200 bg-emerald-50/60 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300'
                    : currentTf.isCorrect === true
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : tfChoice === true
                    ? 'border-rose-500 bg-rose-500 text-white animate-shake'
                    : 'border-slate-200 opacity-40 dark:border-slate-800'
                }`}
              >
                <Check className="h-5 w-5" />
                <span>DOĞRU CÜMLE</span>
              </button>

              <button
                onClick={() => handleSelectTf(false)}
                disabled={tfChoice !== null}
                className={`flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border text-sm font-extrabold transition-all ${
                  tfChoice === null
                    ? 'border-rose-200 bg-rose-50/60 text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300'
                    : currentTf.isCorrect === false
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : tfChoice === false
                    ? 'border-rose-500 bg-rose-500 text-white animate-shake'
                    : 'border-slate-200 opacity-40 dark:border-slate-800'
                }`}
              >
                <X className="h-5 w-5" />
                <span>HATALI CÜMLE</span>
              </button>
            </div>

            {tfChoice !== null && (
              <div className="mt-5 flex flex-col justify-between gap-3 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800/70 sm:flex-row sm:items-center">
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">
                    ✓ Doğru Hali: &ldquo;{currentTf.correction}&rdquo;
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    💡 {currentTf.reason}
                  </p>
                </div>
                <button
                  onClick={handleNextTf}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
                >
                  <span>Sonraki</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="mt-3 text-lg font-extrabold text-slate-900 dark:text-white">
              Doğru / Yanlış Düellosu Tamamlandı!
            </h3>
            <button
              onClick={initTf}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Tekrar Oyna</span>
            </button>
          </div>
        ))}
    </div>
  );
}
