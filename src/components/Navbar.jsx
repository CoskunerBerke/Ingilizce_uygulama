import React from 'react';
import {
  Flame,
  Sparkles,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  BookOpenCheck,
  User
} from 'lucide-react';

export default function Navbar({
  username,
  onOpenUserModal,
  xp,
  streak,
  theme,
  onToggleTheme,
  muted,
  onToggleMute
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        {/* Clean Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <BookOpenCheck className="h-5 w-5" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-lg">
            Lingua<span className="text-indigo-600 dark:text-indigo-400">Quest</span>
          </span>
        </div>

        {/* User Profile Pill + Stats & Theme/Sound Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Active Username Pill (Click to change user) */}
          <button
            onClick={onOpenUserModal}
            title="Kullanıcı Değiştir / Profil"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-800 transition hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          >
            <User className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="max-w-[90px] truncate sm:max-w-[130px]">
              {username || 'Giriş Yap'}
            </span>
          </button>

          {/* Streak Pill */}
          <div
            className="flex items-center gap-1 rounded-xl border border-orange-200 bg-orange-50 px-2 py-1.5 text-xs font-bold text-orange-600 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400"
            title="Kombo Serisi"
          >
            <Flame className="h-3.5 w-3.5 fill-current" />
            <span>{streak}</span>
          </div>

          {/* XP Pill */}
          <div
            className="flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
            title="Toplam Puan"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{xp}</span>
            <span className="hidden sm:inline">XP</span>
          </div>

          {/* Mute Toggle */}
          <button
            onClick={onToggleMute}
            aria-label={muted ? 'Sesi Aç' : 'Sesi Kapat'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {muted ? (
              <VolumeX className="h-4 w-4 text-rose-500" />
            ) : (
              <Volume2 className="h-4 w-4 text-slate-700 dark:text-slate-200" />
            )}
          </button>

          {/* Light / Dark Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Temayı Değiştir"
            className="flex h-9 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
