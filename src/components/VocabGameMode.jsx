import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { getExpandedVocabForLevel, shuffleArray } from '../data/vocabBank';

export default function VocabGameMode({
  levelData,
  onAddXp,
  onIncrementStreak,
  onResetStreak
}) {
  const [subMode, setSubMode] = useState('quiz'); // 'quiz' | 'match'

  // Non-repeating 60-word shuffled queue per level
  const deckRef = useRef([]);
  const quizCursorRef = useRef(0);
  const matchCursorRef = useRef(0);

  // --- QUIZ (CLOZE) STATE ---
  const [currentWord, setCurrentWord] = useState(null);
  const [seenCount, setSeenCount] = useState(1);
  const [selectedOpt, setSelectedOpt] = useState(null);

  // --- MATCH STATE ---
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [matchRound, setMatchRound] = useState(1);

  // Pull next unseen word for Quiz
  const drawNextQuizWord = () => {
    if (
      deckRef.current.length === 0 ||
      quizCursorRef.current >= deckRef.current.length
    ) {
      deckRef.current = getExpandedVocabForLevel(levelData.id);
      quizCursorRef.current = 0;
    }
    const nextWord = deckRef.current[quizCursorRef.current];
    quizCursorRef.current += 1;
    setCurrentWord(nextWord);
    setSelectedOpt(null);
  };

  // Pull next 6 unseen words for Match Game
  const drawNextMatchBoard = () => {
    if (
      deckRef.current.length === 0 ||
      matchCursorRef.current + 6 > deckRef.current.length
    ) {
      deckRef.current = getExpandedVocabForLevel(levelData.id);
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
    deckRef.current = getExpandedVocabForLevel(levelData.id);
    quizCursorRef.current = 0;
    matchCursorRef.current = 0;
    setSeenCount(1);
    setMatchRound(1);
    drawNextQuizWord();
    drawNextMatchBoard();
  }, [levelData.id]);

  const getBlankedSentence = (sentence, word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    return regex.test(sentence)
      ? sentence.replace(regex, '_______')
      : `${sentence} (_______)`;
  };

  const handleSelectQuizOption = (opt) => {
    if (selectedOpt || !currentWord) return;
    setSelectedOpt(opt);
    if (opt === currentWord.word) {
      sound.playCorrect(2);
      sound.speak(currentWord.word, false);
      onAddXp(20);
      onIncrementStreak();
    } else {
      sound.playWrong();
      onResetStreak();
    }
  };

  const handleNextWord = () => {
    sound.playClick();
    setSeenCount((c) => c + 1);
    drawNextQuizWord();
  };

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

  if (!currentWord) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      {/* Top Sub-Mode Switcher & Instant New Word Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setSubMode('quiz')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              subMode === 'quiz'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Kelime Testi
          </button>
          <button
            onClick={() => setSubMode('match')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              subMode === 'match'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Eşleştirme
          </button>
        </div>

        {subMode === 'quiz' ? (
          <button
            onClick={handleNextWord}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Farklı Kelime Getir (#{seenCount})</span>
          </button>
        ) : (
          <button
            onClick={() => {
              sound.playClick();
              setMatchRound((r) => r + 1);
              drawNextMatchBoard();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Yeni 6 Kelime Getir (Tur {matchRound})</span>
          </button>
        )}
      </div>

      {subMode === 'quiz' ? (
        <div>
          {/* Meaning & Prompt */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-950/60 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                Anlamı: {currentWord.tr} ({currentWord.type})
              </span>
              <button
                onClick={() => sound.speak(currentWord.example, false)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Volume2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Cümleyi Dinle</span>
              </button>
            </div>

            <p className="mt-4 text-base font-bold leading-relaxed text-slate-900 dark:text-white sm:text-lg">
              {getBlankedSentence(currentWord.example, currentWord.word)}
            </p>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              {currentWord.exampleTr}
            </p>
          </div>

          {/* 4 Options */}
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {currentWord.clozeOptions.map((opt) => {
              let style =
                'border-slate-200 bg-white text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:hover:border-indigo-500/50';
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
                  onClick={() => handleSelectQuizOption(opt)}
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

          {/* Next Step Bar */}
          {selectedOpt && (
            <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800/70 sm:flex-row">
              <div className="text-xs text-slate-700 dark:text-slate-200">
                <strong>{currentWord.word}</strong> ({currentWord.phonetic}) = {currentWord.tr}{' '}
                <span className="text-slate-500 dark:text-slate-400">
                  • Eş anlam: {currentWord.synonym}
                </span>
              </div>
              <button
                onClick={handleNextWord}
                className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 sm:w-auto"
              >
                <span>Yeni Kelimeye Geç</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* MATCH SUB-MODE */
        <div>
          {matchedIds.length === 6 ? (
            <div className="py-8 text-center">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Harika! Bu 6 Kelimeyi Tamamladın! 🎉
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Şimdi hiç tekrar etmeyen yeni 6 kelimeyle devam et.
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setMatchRound((r) => r + 1);
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
    </div>
  );
}
