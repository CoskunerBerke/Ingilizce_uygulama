import React, { useState, useEffect } from 'react';
import {
  Swords,
  Heart,
  Zap,
  ShieldPlus,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function BossArenaMode({
  levelData,
  streak,
  onAddXp,
  onIncrementStreak,
  onResetStreak,
  onUnlockBadge
}) {
  const boss = levelData.boss;

  const [deck, setDeck] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [bossHp, setBossHp] = useState(boss.hp);
  const [playerHearts, setPlayerHearts] = useState(3);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [doubleDamageActive, setDoubleDamageActive] = useState(false);
  const [powerups, setPowerups] = useState({ crit: 1, heal: 1 });
  const [bossShake, setBossShake] = useState(false);
  const [battleState, setBattleState] = useState('fighting'); // 'fighting' | 'victory' | 'defeat'

  const buildArenaDeck = () => {
    const vocabQuestions = levelData.vocabList.slice(0, 4).map((v) => ({
      id: `bv-${v.id}`,
      category: 'KELİME SALDIRISI',
      prompt: `"${v.tr}" anlamına gelen (${v.type}) İngilizce kelime hangisidir?`,
      subContext: `Örnek: ${v.example.replace(new RegExp(v.word, 'i'), '_____')}`,
      options: v.clozeOptions,
      answer: v.word,
      explanation: `${v.word} (${v.phonetic}) = ${v.tr}. Eş anlamlısı: ${v.synonym}.`
    }));

    const grammarQuestions = levelData.grammarQuizzes.map((g) => ({
      id: `bg-${g.id}`,
      category: `GRAMER BÜYÜSÜ • ${g.topic}`,
      prompt: g.question,
      subContext: null,
      options: g.options,
      answer: g.answer,
      explanation: g.explanation
    }));

    const combined = [...vocabQuestions, ...grammarQuestions].sort(() => Math.random() - 0.5);
    setDeck(combined);
    setQIdx(0);
    setBossHp(boss.hp);
    setPlayerHearts(3);
    setSelectedOpt(null);
    setDoubleDamageActive(false);
    setPowerups({ crit: 1, heal: 1 });
    setBattleState('fighting');
  };

  useEffect(() => {
    buildArenaDeck();
  }, [levelData.id]);

  const currentCard = deck[qIdx] || deck[0];

  const handleAnswer = (opt) => {
    if (selectedOpt || battleState !== 'fighting') return;
    setSelectedOpt(opt);

    const isCorrect = opt === currentCard.answer;
    if (isCorrect) {
      sound.playCorrect(streak + 1);
      onIncrementStreak();
      const baseDmg = Math.ceil(boss.hp / 5);
      const comboBonus = Math.min(streak * 4, 20);
      const totalDmg = (baseDmg + comboBonus) * (doubleDamageActive ? 2 : 1);

      setDoubleDamageActive(false);
      setBossShake(true);
      setTimeout(() => setBossShake(false), 450);

      const nextHp = Math.max(0, bossHp - totalDmg);
      setBossHp(nextHp);
      onAddXp(45);

      if (nextHp <= 0) {
        setTimeout(() => {
          sound.playVictory();
          setBattleState('victory');
          onAddXp(150);
          onUnlockBadge('first_win');
          onUnlockBadge('boss_slayer');
          if (levelData.id === 'C2') onUnlockBadge('c2_master');
          confetti({ particleCount: 110, spread: 80, origin: { y: 0.55 } });
        }, 700);
      }
    } else {
      sound.playWrong();
      onResetStreak();
      setDoubleDamageActive(false);
      const nextHearts = playerHearts - 1;
      setPlayerHearts(nextHearts);
      if (nextHearts <= 0) {
        setTimeout(() => {
          setBattleState('defeat');
        }, 700);
      }
    }
  };

  const handleNextTurn = () => {
    if (battleState !== 'fighting') return;
    setSelectedOpt(null);
    if (qIdx + 1 < deck.length) {
      setQIdx((i) => i + 1);
    } else {
      // Reshuffle if boss still has HP
      setDeck((prev) => [...prev].sort(() => Math.random() - 0.5));
      setQIdx(0);
    }
  };

  const handleUseCrit = () => {
    if (powerups.crit <= 0 || doubleDamageActive || selectedOpt) return;
    sound.playClick();
    setDoubleDamageActive(true);
    setPowerups((p) => ({ ...p, crit: p.crit - 1 }));
  };

  const handleUseHeal = () => {
    if (powerups.heal <= 0 || playerHearts >= 3) return;
    sound.playCorrect(1);
    setPlayerHearts((h) => Math.min(3, h + 1));
    setPowerups((p) => ({ ...p, heal: p.heal - 1 }));
  };

  if (!currentCard) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Arena Status Header (Boss vs Player) */}
      <div className="grid grid-cols-1 gap-4 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 p-6 shadow-xl md:grid-cols-12">
        {/* Boss Side */}
        <div className="flex items-center gap-4 md:col-span-7">
          <div
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-slate-700 bg-slate-950 text-4xl shadow-inner transition-transform ${
              bossShake ? 'animate-shake bg-rose-950 border-rose-500' : 'animate-float'
            }`}
          >
            {boss.emoji}
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-400">
                  {levelData.id} SEVİYE BOSS&apos;U • {boss.trTitle}
                </span>
                <h3 className="font-display text-xl font-bold text-white">{boss.name}</h3>
              </div>
              <span className="font-mono text-sm font-extrabold text-rose-300">
                {bossHp} / {boss.hp} HP
              </span>
            </div>

            {/* Boss HP Bar */}
            <div className="mt-2 h-3.5 w-full overflow-hidden rounded-full border border-slate-800 bg-slate-950 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 transition-all duration-500"
                style={{ width: `${(bossHp / boss.hp) * 100}%` }}
              />
            </div>

            <p className="mt-2 text-xs italic text-slate-400">{boss.quote}</p>
          </div>
        </div>

        {/* Player Hearts & Powerups */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-950/75 p-4 md:col-span-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Oyuncu Canı
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <Heart
                  key={i}
                  className={`h-5 w-5 transition-all ${
                    i <= playerHearts
                      ? 'fill-rose-500 text-rose-500 scale-100'
                      : 'text-slate-700 scale-90'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleUseCrit}
              disabled={powerups.crit <= 0 || doubleDamageActive || Boolean(selectedOpt)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                doubleDamageActive
                  ? 'border-amber-400 bg-amber-500/30 text-amber-200 animate-pulse'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 disabled:opacity-40'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>2x Kritik Vuruş ({powerups.crit})</span>
            </button>

            <button
              onClick={handleUseHeal}
              disabled={powerups.heal <= 0 || playerHearts >= 3}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-40"
            >
              <ShieldPlus className="h-3.5 w-3.5" />
              <span>+1 Can İksiri ({powerups.heal})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Battle Stage */}
      {battleState === 'victory' ? (
        <div className="rounded-3xl border border-emerald-500/40 bg-slate-900/95 p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 to-emerald-500 text-4xl shadow-lg">
            🏆
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-white">
            ZAFER! {boss.name} Mağlup Edildi!
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            {levelData.id} seviyesindeki Kelime ve Gramer sınavını geçerek <strong className="text-amber-300">+150 Bonus XP</strong> ve <strong className="text-emerald-300">Boss Avcısı</strong> rozetini kazandın!
          </p>
          <button
            onClick={buildArenaDeck}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-indigo-500"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Rövanş Maçı Yap</span>
          </button>
        </div>
      ) : battleState === 'defeat' ? (
        <div className="rounded-3xl border border-rose-500/40 bg-slate-900/95 p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 text-3xl">
            💔
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-white">
            Canların Tükendi! Ama Pes Etmek Yok!
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Boss&apos;un sadece <strong className="text-rose-400">{bossHp} HP</strong> canı kalmıştı. Hemen canlarını doldurup tekrar meydan oku!
          </p>
          <button
            onClick={buildArenaDeck}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-rose-500"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Canları Doldur &amp; Tekrar Savaş</span>
          </button>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300">
              <Swords className="h-3.5 w-3.5" />
              {currentCard.category}
            </span>
            {doubleDamageActive && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-300">
                <Flame className="h-3.5 w-3.5" />
                2X KRİTİK VURUŞ AKTİF!
              </span>
            )}
          </div>

          <h4 className="mt-4 text-lg font-bold leading-relaxed text-white sm:text-xl">
            {currentCard.prompt}
          </h4>
          {currentCard.subContext && (
            <p className="mt-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3 font-mono text-xs text-slate-300">
              {currentCard.subContext}
            </p>
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentCard.options.map((opt) => {
              let style =
                'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800';
              if (selectedOpt) {
                if (opt === currentCard.answer) {
                  style = 'border-emerald-500 bg-emerald-500/20 text-emerald-200';
                } else if (opt === selectedOpt) {
                  style = 'border-rose-500 bg-rose-500/20 text-rose-200 animate-shake';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={Boolean(selectedOpt)}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-bold transition-all ${style}`}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {selectedOpt && (
            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-4 sm:flex-row sm:items-center">
              <p className="text-xs leading-relaxed text-slate-200">
                💡 {currentCard.explanation}
              </p>
              <button
                onClick={handleNextTurn}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
              >
                <span>Saldırıya Devam Et</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
