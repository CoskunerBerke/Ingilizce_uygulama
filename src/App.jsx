import React, { useState, useEffect } from 'react';
import { Zap, Puzzle, BookOpen } from 'lucide-react';
import { CEFR_LEVELS } from './data/curriculumData';
import Navbar from './components/Navbar';
import VocabGameMode from './components/VocabGameMode';
import GrammarDetectiveMode from './components/GrammarDetectiveMode';
import StudyHubMode from './components/StudyHubMode';
import { sound } from './utils/sound';

const TABS = [
  { id: 'vocab', label: 'Kelime Oyunu', icon: Zap },
  { id: 'grammar', label: 'Gramer Oyunu', icon: Puzzle },
  { id: 'study', label: 'Konu & Kartlar', icon: BookOpen }
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('lq_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [selectedLevelId, setSelectedLevelId] = useState(() => {
    return localStorage.getItem('lq_level') || 'A1';
  });

  const [activeTab, setActiveTab] = useState('vocab');
  const [xp, setXp] = useState(() => Number(localStorage.getItem('lq_xp')) || 0);
  const [streak, setStreak] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('lq_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lq_level', selectedLevelId);
  }, [selectedLevelId]);

  useEffect(() => {
    localStorage.setItem('lq_xp', String(xp));
  }, [xp]);

  const currentLevel =
    CEFR_LEVELS.find((l) => l.id === selectedLevelId) || CEFR_LEVELS[0];

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    sound.muted = next;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <Navbar
        xp={xp}
        streak={streak}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        muted={muted}
        onToggleMute={handleToggleMute}
      />

      <main className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-8">
        {/* 1. Clean Level Selector (A1 - C2) */}
        <section className="mb-6">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Seviye Seçin (A1 – C2)
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {currentLevel.id} • {currentLevel.trName}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {CEFR_LEVELS.map((lvl) => {
              const active = lvl.id === currentLevel.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedLevelId(lvl.id);
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl border py-2.5 px-2 text-center transition-all ${
                    active
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm dark:border-indigo-500 dark:bg-indigo-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-base font-extrabold leading-none sm:text-lg">
                    {lvl.id}
                  </span>
                  <span
                    className={`mt-1 truncate text-[10px] font-medium ${
                      active ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {lvl.trName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Simple 3-Tab Mode Selector */}
        <section className="mb-5">
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-bold transition-all sm:text-sm ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Single Active Game / Study Card */}
        <section>
          {activeTab === 'vocab' && (
            <VocabGameMode
              levelData={currentLevel}
              onAddXp={(val) => setXp((p) => p + val)}
              onIncrementStreak={() => setStreak((s) => s + 1)}
              onResetStreak={() => setStreak(0)}
            />
          )}

          {activeTab === 'grammar' && (
            <GrammarDetectiveMode
              levelData={currentLevel}
              onAddXp={(val) => setXp((p) => p + val)}
              onIncrementStreak={() => setStreak((s) => s + 1)}
              onResetStreak={() => setStreak(0)}
            />
          )}

          {activeTab === 'study' && <StudyHubMode levelData={currentLevel} />}
        </section>
      </main>
    </div>
  );
}
