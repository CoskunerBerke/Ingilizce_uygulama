import React from 'react';
import {
  Sparkles,
  Flame,
  Trophy,
  Volume2,
  VolumeX,
  Compass,
  RotateCcw,
  GraduationCap
} from 'lucide-react';

export default function Navbar({
  selectedLevel,
  onSelectLevel,
  levels,
  xp,
  streak,
  unlockedBadges,
  muted,
  onToggleMute,
  onOpenPlacement,
  onOpenBadges,
  onResetProgress
}) {
  const rankNumber = Math.floor(xp / 250) + 1;
  const rankProgress = ((xp % 250) / 250) * 100;

  const getRankTitle = (lvl) => {
    if (lvl <= 1) return 'Çaylak Gezgin';
    if (lvl === 2) return 'Kelime Kaşifi';
    if (lvl === 3) return 'Cümle Ustası';
    if (lvl === 4) return 'Gramer Şövalyesi';
    if (lvl === 5) return 'Dil Akademisyeni';
    return 'C2 Poliglot Efsanesi';
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/25">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Lingua<span className="text-indigo-400">Quest</span>
              </span>
              <span className="hidden rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-300 sm:inline-block">
                A1 → C2 Game Lab
              </span>
            </div>
            <p className="text-xs text-slate-400">
              İngilizce Gramer &amp; Kelime Oyunu
            </p>
          </div>
        </div>

        {/* Quick Level Pills (A1 - C2) */}
        <div className="order-3 flex w-full items-center justify-between gap-1.5 overflow-x-auto rounded-2xl border border-slate-800/90 bg-slate-900/70 p-1.5 lg:order-2 lg:w-auto">
          {levels.map((lvl) => {
            const active = selectedLevel.id === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => onSelectLevel(lvl.id)}
                className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  active
                    ? `bg-gradient-to-r ${lvl.color} text-white shadow-md scale-105`
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <span>{lvl.id}</span>
                <span className="hidden text-[10px] font-medium opacity-90 xl:inline">
                  {lvl.trName.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gamification Stats & Actions */}
        <div className="order-2 flex items-center gap-2 sm:gap-3 lg:order-3">
          {/* Placement Test Button */}
          <button
            onClick={onOpenPlacement}
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
            title="Hangi seviyede olduğunu test et"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            <span className="hidden sm:inline">Seviye Tespit</span>
          </button>

          {/* Streak Counter */}
          <div
            className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5"
            title="Aktif Kombo Serisi"
          >
            <Flame className={`h-4 w-4 text-orange-400 ${streak > 0 ? 'animate-bounce' : ''}`} />
            <span className="text-xs font-bold text-orange-300">{streak}x</span>
          </div>

          {/* XP & Player Rank */}
          <div className="flex items-center gap-2.5 rounded-xl border border-indigo-500/30 bg-slate-900/90 px-3 py-1.5">
            <div className="flex items-center gap-1 text-indigo-400">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-extrabold text-white">{xp}</span>
              <span className="text-[10px] font-semibold text-indigo-300">XP</span>
            </div>
            <div className="hidden h-6 w-px bg-slate-800 sm:block" />
            <div className="hidden sm:block">
              <div className="flex items-center justify-between gap-2 text-[10px] font-semibold text-slate-300">
                <span>Sv.{rankNumber} {getRankTitle(rankNumber)}</span>
              </div>
              <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 transition-all duration-500"
                  style={{ width: `${rankProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Badges Modal Button */}
          <button
            onClick={onOpenBadges}
            className="relative flex items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-900 px-2.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            title="Kazanılan Rozetler"
          >
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-xs font-bold">{unlockedBadges.length}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            title={muted ? 'Sesi Aç' : 'Sesi Kapat'}
          >
            {muted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
          </button>

          {/* Reset Demo Progress */}
          <button
            onClick={onResetProgress}
            className="hidden rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300 md:inline-flex"
            title="Demo İlerlemesini Sıfırla"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
