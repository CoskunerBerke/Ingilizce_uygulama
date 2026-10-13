import React, { useState, useEffect } from 'react';
import {
  Zap,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Layers,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function VocabGameMode({
  levelData,
  onAddXp,
  onIncrementStreak,
  onResetStreak,
  onMarkWordMastered,
  onUnlockBadge
}) {
  // Two fun sub-games: 'match' (Eşleştirme Arenası) & 'cloze' (Cümle İçinde Kelime Avı)
  const [gameMode, setGameMode] = useState('match');

  // --- STATE FOR SPEED MATCH GAME ---
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [matchMoves, setMatchMoves] = useState(0);

  // --- STATE FOR CONTEXTUAL CLOZE GAME ---
  const [clozeIndex, setClozeIndex] = useState(0);
  const [selectedClozeOption, setSelectedClozeOption] = useState(null);
  const [clozeScore, setClozeScore] = useState(0);
  const [clozeFinished, setClozeFinished] = useState(false);

  // Initialize Match Deck when level changes or reset
  const initMatchGame = () => {
    const subset = levelData.vocabList.slice(0, 6);
    const enCards = subset.map((item) => ({
      uid: `en-${item.id}`,
      pairId: item.id,
      text: item.word,
      sub: item.phonetic,
      lang: 'EN'
    }));
    const trCards = subset.map((item) => ({
      uid: `tr-${item.id}`,
      pairId: item.id,
      text: item.tr,
      sub: item.type,
      lang: 'TR'
    }));

    const combined = [...enCards, ...trCards].sort(() => Math.random() - 0.5);
    setCards(combined);
    setSelectedCard(null);
    setMatchedIds([]);
    setWrongPair([]);
    setMatchMoves(0);
  };

  const initClozeGame = () => {
    setClozeIndex(0);
    setSelectedClozeOption(null);
    setClozeScore(0);
    setClozeFinished(false);
  };

  useEffect(() => {
    initMatchGame();
    initClozeGame();
  }, [levelData.id]);

  const handleCardClick = (card) => {
    if (matchedIds.includes(card.pairId) || wrongPair.length > 0) return;
    if (card.lang === 'EN') {
      sound.speak(card.text, false);
    } else {
      sound.playClick();
    }

    if (!selectedCard) {
      setSelectedCard(card);
      return;
    }

    if (selectedCard.uid === card.uid) {
      setSelectedCard(null);
      return;
    }

    setMatchMoves((m) => m + 1);

    if (selectedCard.pairId === card.pairId && selectedCard.lang !== card.lang) {
      // Match found!
      sound.playCorrect(2);
      const nextMatched = [...matchedIds, card.pairId];
      setMatchedIds(nextMatched);
      setSelectedCard(null);
      onAddXp(25);
      onIncrementStreak();
      onMarkWordMastered(card.pairId);

      if (nextMatched.length === 6) {
        sound.playVictory();
        onAddXp(50);
        onUnlockBadge('first_win');
        if (levelData.id === 'C2') onUnlockBadge('c2_master');
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      }
    } else {
      // Mismatch
      sound.playWrong();
      onResetStreak();
      setWrongPair([selectedCard.uid, card.uid]);
      setTimeout(() => {
        setWrongPair([]);
        setSelectedCard(null);
      }, 650);
    }
  };

  // Cloze Quiz Handler
  const currentVocab = levelData.vocabList[clozeIndex] || levelData.vocabList[0];

  const getBlankedSentence = (sentence, word) => {
    const regex = new RegExp(word, 'i');
    if (regex.test(sentence)) {
      return sentence.replace(regex, '__________');
    }
    return `${sentence} (__________)`;
  };

  const handleClozeAnswer = (opt) => {
    if (selectedClozeOption) return;
    setSelectedClozeOption(opt);

    const isCorrect = opt === currentVocab.word;
    if (isCorrect) {
      sound.playCorrect(2);
      sound.speak(currentVocab.example, false);
      setClozeScore((s) => s + 1);
      onAddXp(30);
      onIncrementStreak();
      onMarkWordMastered(currentVocab.id);
    } else {
      sound.playWrong();
      onResetStreak();
    }
  };

  const handleNextCloze = () => {
    if (clozeIndex + 1 < levelData.vocabList.length) {
      setClozeIndex((i) => i + 1);
      setSelectedClozeOption(null);
    } else {
      sound.playVictory();
      setClozeFinished(true);
      onAddXp(60);
      onUnlockBadge('first_win');
      if (levelData.id === 'C2') onUnlockBadge('c2_master');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-mode switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-950 p-1.5">
          <button
            onClick={() => {
              sound.playClick();
              setGameMode('match');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
              gameMode === 'match'
                ? `bg-gradient-to-r ${levelData.color} text-white shadow`
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>1. Hızlı Kelime Eşleştirme</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setGameMode('cloze');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
              gameMode === 'cloze'
                ? `bg-gradient-to-r ${levelData.color} text-white shadow`
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>2. Cümle İçinde Kelime Avı</span>
          </button>
        </div>

        <button
          onClick={gameMode === 'match' ? initMatchGame : initClozeGame}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Yeniden Karıştır</span>
        </button>
      </div>

      {gameMode === 'match' ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Kelime Düellosu: İngilizce &amp; Türkçe Eşleştir
              </h3>
              <p className="text-xs text-slate-400">
                İngilizce kelimeye tıkladığında telaffuzunu duyarsın. Doğru Türkçe karşılığıyla eşleştirerek kombo yap!
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-300">
                Hamle: {matchMoves}
              </span>
              <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">
                Eşleşen: {matchedIds.length} / 6
              </span>
            </div>
          </div>

          {matchedIds.length === 6 ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Sparkles className="h-8 w-8" />
              </div>
              <h4 className="mt-4 font-display text-2xl font-bold text-white">
                Tebrikler! Tüm Kelimeleri Eşleştirdin! 🎉
              </h4>
              <p className="mt-1 text-sm text-slate-300">
                Toplam {matchMoves} hamlede {levelData.id} kelime tablosunu temizledin ve +200 XP kazandın.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={initMatchGame}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-bold text-white hover:bg-slate-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Tekrar Oyna</span>
                </button>
                <button
                  onClick={() => setGameMode('cloze')}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
                >
                  <span>Cümle İçinde Kelime Avına Geç</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {cards.map((card) => {
                const isMatched = matchedIds.includes(card.pairId);
                const isSelected = selectedCard?.uid === card.uid;
                const isWrong = wrongPair.includes(card.uid);

                let style =
                  'border-slate-800 bg-slate-950/90 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-900';
                if (isMatched) {
                  style =
                    'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 opacity-45 cursor-default scale-95';
                } else if (isWrong) {
                  style = 'border-rose-500 bg-rose-500/20 text-rose-200 animate-shake';
                } else if (isSelected) {
                  style =
                    'border-indigo-400 bg-indigo-500/25 text-white ring-2 ring-indigo-500/40 scale-[1.02]';
                }

                return (
                  <button
                    key={card.uid}
                    onClick={() => handleCardClick(card)}
                    disabled={isMatched}
                    className={`flex min-h-[104px] flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-200 ${style}`}
                  >
                    <span
                      className={`mb-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                        card.lang === 'EN'
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {card.lang === 'EN' ? '🇬🇧 ENGLISH' : '🇹🇷 TÜRKÇE'}
                    </span>
                    <span className="text-sm font-bold sm:text-base">{card.text}</span>
                    <span className="mt-1 text-[11px] text-slate-400">{card.sub}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl sm:p-8">
          {!clozeFinished ? (
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold uppercase tracking-wider text-indigo-400">
                  Bağlam İçinde Kelime Avı • {levelData.id}
                </span>
                <span>
                  Soru {clozeIndex + 1} / {levelData.vocabList.length} • Doğru: {clozeScore}
                </span>
              </div>

              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full bg-gradient-to-r ${levelData.color} transition-all duration-300`}
                  style={{
                    width: `${((clozeIndex + 1) / levelData.vocabList.length) * 100}%`
                  }}
                />
              </div>

              {/* Clue Box */}
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <HelpCircle className="h-4 w-4 text-amber-400" />
                    Türkçe Anlam İpucu: &ldquo;{currentVocab.tr}&rdquo; ({currentVocab.type})
                  </span>
                  <button
                    onClick={() => sound.speak(currentVocab.example, false)}
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-slate-700"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    Cümleyi Dinle
                  </button>
                </div>

                <p className="mt-4 text-lg font-bold leading-relaxed text-white sm:text-xl">
                  {getBlankedSentence(currentVocab.example, currentVocab.word)}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Çeviri: {currentVocab.exampleTr}
                </p>
              </div>

              {/* Options */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {currentVocab.clozeOptions.map((opt) => {
                  let btnClass =
                    'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-indigo-500/60 hover:bg-slate-800';
                  if (selectedClozeOption) {
                    if (opt === currentVocab.word) {
                      btnClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-200';
                    } else if (opt === selectedClozeOption) {
                      btnClass = 'border-rose-500 bg-rose-500/20 text-rose-200 animate-shake';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleClozeAnswer(opt)}
                      disabled={Boolean(selectedClozeOption)}
                      className={`flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-bold transition-all ${btnClass}`}
                    >
                      <span>{opt}</span>
                      {selectedClozeOption && opt === currentVocab.word && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      )}
                      {selectedClozeOption === opt && opt !== currentVocab.word && (
                        <XCircle className="h-5 w-5 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedClozeOption && (
                <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-4 sm:flex-row">
                  <div className="text-xs text-slate-200">
                    <strong className="text-indigo-300">{currentVocab.word}</strong> ({currentVocab.phonetic}):{' '}
                    {currentVocab.tr} — Eş anlamlısı: <span className="text-emerald-300">{currentVocab.synonym}</span>
                  </div>
                  <button
                    onClick={handleNextCloze}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    <span>Sonraki Kelime</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
                <Sparkles className="h-8 w-8" />
              </div>
              <h4 className="mt-4 font-display text-2xl font-bold text-white">
                Kelime Avı Tamamlandı!
              </h4>
              <p className="mt-2 text-sm text-slate-300">
                {levelData.vocabList.length} cümleden <strong className="text-emerald-400">{clozeScore}</strong> tanesini doğru tamamladın!
              </p>
              <button
                onClick={initClozeGame}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Tekrar Oyna</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
