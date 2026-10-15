import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Turtle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowRight,
  Wand2,
  Lightbulb,
  Undo2,
  Headphones
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { getExpandedVocabForLevel, shuffleArray } from '../data/vocabBank';

const VOCAB_SUBMODES = [
  { id: 'quiz', label: 'Cümle Testi' },
  { id: 'match', label: 'Eşleştirme' },
  { id: 'listen', label: 'Dinle & Bul' },
  { id: 'spell', label: 'Harf Dizme' }
];

export default function VocabGameMode({
  levelData,
  subMode,
  onChangeSubMode,
  solvedWordIds = [],
  onMarkWordSolved,
  onAddXp,
  onIncrementStreak,
  onResetStreak
}) {
  const deckRef = useRef([]);
  const quizCursorRef = useRef(0);
  const matchCursorRef = useRef(0);

  // --- QUIZ & LISTEN SHARED WORD STATE ---
  const [currentWord, setCurrentWord] = useState(null);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [eliminatedOpts, setEliminatedOpts] = useState([]);

  // --- MATCH STATE ---
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);

  // --- SPELLING (HARF DİZME) STATE ---
  const [letterBank, setLetterBank] = useState([]);
  const [typedLetters, setTypedLetters] = useState([]);
  const [spellStatus, setSpellStatus] = useState('playing'); // 'playing' | 'correct' | 'wrong'

  // Build deck prioritizing words the user hasn't solved yet!
  const buildUserPrioritizedDeck = (lvlId, solvedList) => {
    const full = getExpandedVocabForLevel(lvlId);
    const unsolved = full.filter((w) => !solvedList.includes(w.id));
    const solved = full.filter((w) => solvedList.includes(w.id));
    return [...unsolved, ...solved];
  };

  const setupSpellingForWord = (wordObj) => {
    if (!wordObj) return;
    const cleanWord = wordObj.word.trim();
    const chars = cleanWord.split('').map((ch, i) => ({
      id: `ch-${i}-${ch}`,
      char: ch
    }));
    setLetterBank(shuffleArray(chars));
    setTypedLetters([]);
    setSpellStatus('playing');
  };

  const drawNextWord = (autoSpeak = false) => {
    if (
      deckRef.current.length === 0 ||
      quizCursorRef.current >= deckRef.current.length
    ) {
      deckRef.current = buildUserPrioritizedDeck(levelData.id, solvedWordIds);
      quizCursorRef.current = 0;
    }
    const nextWord = deckRef.current[quizCursorRef.current];
    quizCursorRef.current += 1;
    setCurrentWord(nextWord);
    setSelectedOpt(null);
    setEliminatedOpts([]);
    setupSpellingForWord(nextWord);

    if (autoSpeak && nextWord) {
      setTimeout(() => sound.speak(nextWord.word, false), 150);
    }
  };

  const drawNextMatchBoard = () => {
    if (
      deckRef.current.length === 0 ||
      matchCursorRef.current + 6 > deckRef.current.length
    ) {
      deckRef.current = buildUserPrioritizedDeck(levelData.id, solvedWordIds);
      matchCursorRef.current = 0;
    }
    const subset = deckRef.current.slice(
      matchCursorRef.current,
      matchCursorRef.current + 6
    );
    matchCursorRef.current += 6;

    const en = subset.map((w) => ({
      uid: `en-${w.id}`,
      pairId: w.id,
      text: w.word,
      lang: 'EN'
    }));
    const tr = subset.map((w) => ({
      uid: `tr-${w.id}`,
      pairId: w.id,
      text: w.tr,
      lang: 'TR'
    }));

    setCards(shuffleArray([...en, ...tr]));
    setSelectedCard(null);
    setMatchedIds([]);
    setWrongPair([]);
  };

  useEffect(() => {
    deckRef.current = buildUserPrioritizedDeck(levelData.id, solvedWordIds);
    quizCursorRef.current = 0;
    matchCursorRef.current = 0;
    drawNextWord(subMode === 'listen');
    drawNextMatchBoard();
  }, [levelData.id]);

  useEffect(() => {
    if (subMode === 'listen' && currentWord) {
      sound.speak(currentWord.word, false);
    }
    if (subMode === 'spell' && currentWord) {
      setupSpellingForWord(currentWord);
    }
  }, [subMode]);

  const getBlankedSentence = (sentence, word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    return regex.test(sentence)
      ? sentence.replace(regex, '_______')
      : `${sentence} (_______)`;
  };

  const handleUseJoker = () => {
    if (!currentWord || eliminatedOpts.length > 0 || selectedOpt) return;
    sound.playClick();
    const wrongs = currentWord.clozeOptions.filter((o) => o !== currentWord.word);
    setEliminatedOpts(shuffleArray(wrongs).slice(0, 2));
  };

  const handleSelectOption = (opt) => {
    if (selectedOpt || !currentWord || eliminatedOpts.includes(opt)) return;
    setSelectedOpt(opt);
    if (opt === currentWord.word) {
      sound.playCorrect(2);
      sound.speak(currentWord.word, false);
      onAddXp(20);
      onIncrementStreak();
      onMarkWordSolved(currentWord.id);
    } else {
      sound.playWrong();
      onResetStreak();
    }
  };

  // Match handler
  const handleCardTap = (card) => {
    if (matchedIds.includes(card.pairId) || wrongPair.length > 0) return;
    if (card.lang === 'EN') sound.speak(card.text, false);
    else sound.playClick();

    if (!selectedCard) {
      setSelectedCard(card);
      return;
    }
    if (selectedCard.uid === card.uid) {
      setSelectedCard(null);
      return;
    }

    if (selectedCard.pairId === card.pairId && selectedCard.lang !== card.lang) {
      sound.playCorrect(2);
      const next = [...matchedIds, card.pairId];
      setMatchedIds(next);
      setSelectedCard(null);
      onAddXp(20);
      onIncrementStreak();
      onMarkWordSolved(card.pairId);
      if (next.length === 6) {
        sound.playVictory();
        confetti({ particleCount: 55, spread: 60, origin: { y: 0.65 } });
      }
    } else {
      sound.playWrong();
      onResetStreak();
      setWrongPair([selectedCard.uid, card.uid]);
      setTimeout(() => {
        setWrongPair([]);
        setSelectedCard(null);
      }, 500);
    }
  };

  // Spelling handlers
  const handleTapLetter = (item) => {
    if (spellStatus === 'correct') return;
    sound.playClick();
    const nextTyped = [...typedLetters, item];
    const nextBank = letterBank.filter((x) => x.id !== item.id);
    setTypedLetters(nextTyped);
    setLetterBank(nextBank);

    if (nextBank.length === 0) {
      const formed = nextTyped.map((x) => x.char).join('');
      if (formed.toLowerCase() === currentWord.word.trim().toLowerCase()) {
        sound.playCorrect(3);
        sound.speak(currentWord.word, false);
        setSpellStatus('correct');
        onAddXp(30);
        onIncrementStreak();
        onMarkWordSolved(currentWord.id);
      } else {
        sound.playWrong();
        setSpellStatus('wrong');
        onResetStreak();
      }
    } else {
      setSpellStatus('playing');
    }
  };

  const handleRemoveLetter = (item) => {
    if (spellStatus === 'correct') return;
    sound.playClick();
    setSpellStatus('playing');
    setTypedLetters((prev) => prev.filter((x) => x.id !== item.id));
    setLetterBank((prev) => [...prev, item]);
  };

  const handleLetterHint = () => {
    if (!currentWord || spellStatus === 'correct') return;
    sound.playClick();
    const targetChars = currentWord.word.trim().split('');
    // Find how many leading letters are already correct
    let matchLen = 0;
    while (
      matchLen < typedLetters.length &&
      typedLetters[matchLen].char.toLowerCase() === targetChars[matchLen]?.toLowerCase()
    ) {
      matchLen++;
    }

    const correctSlice = typedLetters.slice(0, matchLen);
    const returnedSlice = typedLetters.slice(matchLen);
    const pool = [...letterBank, ...returnedSlice];

    const neededChar = targetChars[matchLen];
    if (!neededChar) return;

    const foundIdx = pool.findIndex(
      (item) => item.char.toLowerCase() === neededChar.toLowerCase()
    );
    if (foundIdx === -1) return;

    const picked = pool[foundIdx];
    const remainingPool = pool.filter((_, idx) => idx !== foundIdx);
    const nextTyped = [...correctSlice, picked];

    setTypedLetters(nextTyped);
    setLetterBank(remainingPool);

    if (remainingPool.length === 0) {
      sound.playCorrect(2);
      sound.speak(currentWord.word, false);
      setSpellStatus('correct');
      onAddXp(20);
      onMarkWordSolved(currentWord.id);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      {/* 4 Sub-Mode Switcher + Fresh Word Action */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {VOCAB_SUBMODES.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                sound.playClick();
                onChangeSubMode(m.id);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                subMode === m.id
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playClick();
            if (subMode === 'match') drawNextMatchBoard();
            else drawNextWord(subMode === 'listen');
          }}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>{subMode === 'match' ? 'Yeni 6 Kelime' : 'Farklı Kelime'}</span>
        </button>
      </div>

      {/* MODE 1: QUIZ (CÜMLE TESTİ) */}
      {subMode === 'quiz' && (
        <div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-950/60 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                Anlamı: {currentWord.tr} ({currentWord.type})
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleUseJoker}
                  disabled={eliminatedOpts.length > 0 || Boolean(selectedOpt)}
                  className="inline-flex items-center gap-1 rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 disabled:opacity-40 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-300"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  <span>%50 Ele</span>
                </button>
                <button
                  onClick={() => sound.speak(currentWord.example, false)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Volume2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Dinle</span>
                </button>
              </div>
            </div>

            <p className="mt-4 text-base font-bold leading-relaxed text-slate-900 dark:text-white sm:text-lg">
              {getBlankedSentence(currentWord.example, currentWord.word)}
            </p>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              {currentWord.exampleTr}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {currentWord.clozeOptions.map((opt) => {
              const isEliminated = eliminatedOpts.includes(opt);
              let style =
                'border-slate-200 bg-white text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100';
              if (isEliminated) {
                style =
                  'border-slate-100 bg-slate-50 text-slate-300 line-through opacity-45 cursor-not-allowed dark:border-slate-800/40 dark:bg-slate-900/30 dark:text-slate-600';
              } else if (selectedOpt) {
                if (opt === currentWord.word) {
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
                  onClick={() => handleSelectOption(opt)}
                  disabled={Boolean(selectedOpt) || isEliminated}
                  className={`flex min-h-[52px] items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-bold transition-all ${style}`}
                >
                  <span>{opt}</span>
                  {selectedOpt && opt === currentWord.word && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {selectedOpt === opt && opt !== currentWord.word && (
                    <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOpt && (
            <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800/70 sm:flex-row">
              <div className="text-xs text-slate-700 dark:text-slate-200">
                <strong>{currentWord.word}</strong> ({currentWord.phonetic}) = {currentWord.tr}{' '}
                <span className="text-slate-500 dark:text-slate-400">
                  • Eş anlam: {currentWord.synonym}
                </span>
              </div>
              <button
                onClick={() => drawNextWord(false)}
                className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 sm:w-auto"
              >
                <span>Yeni Kelimeye Geç</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: MATCH (EŞLEŞTİRME) */}
      {subMode === 'match' && (
        <div>
          {matchedIds.length === 6 ? (
            <div className="py-8 text-center">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Harika! Bu 6 Kelimeyi Eşleştirdin! 🎉
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                İlerlemen kaydedildi. Yeni 6 farklı kelimeyle devam et!
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  drawNextMatchBoard();
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Yeni 6 Farklı Kelime Getir</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {cards.map((card) => {
                const isMatched = matchedIds.includes(card.pairId);
                const isSelected = selectedCard?.uid === card.uid;
                const isWrong = wrongPair.includes(card.uid);

                let style =
                  'border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-100';
                if (isMatched) {
                  style =
                    'border-emerald-300 bg-emerald-50 text-emerald-700 opacity-35 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300';
                } else if (isWrong) {
                  style =
                    'border-rose-500 bg-rose-50 text-rose-700 animate-shake dark:bg-rose-500/20 dark:text-rose-200';
                } else if (isSelected) {
                  style =
                    'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/30 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-white';
                }

                return (
                  <button
                    key={card.uid}
                    onClick={() => handleCardTap(card)}
                    disabled={isMatched}
                    className={`flex min-h-[76px] flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${style}`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {card.lang}
                    </span>
                    <span className="mt-0.5 text-xs font-bold sm:text-sm">{card.text}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MODE 3: LISTEN & FIND (DİNLE & BUL) */}
      {subMode === 'listen' && (
        <div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center dark:border-slate-800/80 dark:bg-slate-950/60">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
              <Headphones className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Kelimeyi Dinle ve Doğru Yazılışını Seç
            </p>
            <p className="mt-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Türkçe İpucu: &ldquo;{currentWord.tr}&rdquo; ({currentWord.type})
            </p>

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => sound.speak(currentWord.word, false)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-500"
              >
                <Volume2 className="h-4 w-4" />
                <span>Normal Dinle</span>
              </button>
              <button
                onClick={() => sound.speak(currentWord.word, true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Turtle className="h-4 w-4 text-amber-500" />
                <span>Yavaş Dinle</span>
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {currentWord.clozeOptions.map((opt) => {
              let style =
                'border-slate-200 bg-white text-slate-800 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100';
              if (selectedOpt) {
                if (opt === currentWord.word) {
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
                  onClick={() => handleSelectOption(opt)}
                  disabled={Boolean(selectedOpt)}
                  className={`flex min-h-[52px] items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-bold transition-all ${style}`}
                >
                  <span>{opt}</span>
                  {selectedOpt && opt === currentWord.word && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {selectedOpt === opt && opt !== currentWord.word && (
                    <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOpt && (
            <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800/70 sm:flex-row">
              <div className="text-xs text-slate-700 dark:text-slate-200">
                <strong>{currentWord.word}</strong> ({currentWord.phonetic}) — &ldquo;{currentWord.example}&rdquo;
              </div>
              <button
                onClick={() => drawNextWord(true)}
                className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 sm:w-auto"
              >
                <span>Sonraki Sesli Kelime</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 4: SPELLING PUZZLE (HARF DİZME) */}
      {subMode === 'spell' && (
        <div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-950/60 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                Türkçesi: {currentWord.tr} ({currentWord.type})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLetterHint}
                  disabled={spellStatus === 'correct'}
                  className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-40 dark:bg-amber-500/15 dark:text-amber-300"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Harf İpucu</span>
                </button>
                <button
                  onClick={() => sound.speak(currentWord.word, false)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Volume2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Dinle</span>
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {getBlankedSentence(currentWord.example, currentWord.word)}
            </p>
          </div>

          {/* Assembled Letters Box */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Harflere sırasıyla dokunarak kelimeyi yaz:</span>
              {typedLetters.length > 0 && spellStatus !== 'correct' && (
                <button
                  onClick={() => setupSpellingForWord(currentWord)}
                  className="inline-flex items-center gap-1 font-semibold text-rose-500"
                >
                  <Undo2 className="h-3.5 w-3.5" />
                  Temizle
                </button>
              )}
            </div>

            <div
              className={`flex min-h-[64px] flex-wrap items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed p-3 transition-all ${
                spellStatus === 'correct'
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/10'
                  : spellStatus === 'wrong'
                  ? 'border-rose-500 bg-rose-50/70 animate-shake dark:bg-rose-500/10'
                  : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40'
              }`}
            >
              {typedLetters.length === 0 ? (
                <span className="text-xs text-slate-400">
                  {currentWord.word.trim().length} harfli kelime...
                </span>
              ) : (
                typedLetters.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleRemoveLetter(item)}
                    className="flex h-10 min-w-[36px] items-center justify-center rounded-xl bg-indigo-600 px-2.5 text-sm font-extrabold uppercase text-white shadow-sm"
                  >
                    {item.char === ' ' ? '␣' : item.char}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Scrambled Letter Tiles */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {letterBank.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTapLetter(item)}
                disabled={spellStatus === 'correct'}
                className="flex h-11 min-w-[40px] items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-extrabold uppercase text-slate-800 shadow-sm transition hover:border-indigo-400 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {item.char === ' ' ? '␣' : item.char}
              </button>
            ))}
          </div>

          {spellStatus === 'correct' && (
            <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/15 sm:flex-row">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                <span>Harika Yazdın: {currentWord.word} (+30 XP)</span>
              </div>
              <button
                onClick={() => drawNextWord(false)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 sm:w-auto"
              >
                <span>Sonraki Kelime</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
