import React, { useState, useEffect, useRef } from 'react';
import { Zap, Puzzle, BookOpen, CheckCircle2 } from 'lucide-react';
import { CEFR_LEVELS } from './data/curriculumData';
import Navbar from './components/Navbar';
import VocabGameMode from './components/VocabGameMode';
import GrammarDetectiveMode from './components/GrammarDetectiveMode';
import StudyHubMode from './components/StudyHubMode';
import UserAuthModal from './components/UserAuthModal';
import {
  getActiveUsername,
  setActiveUsername,
  getOrCreateProfile,
  saveProfile
} from './utils/userStorage';
import { sound } from './utils/sound';

const TABS = [
  { id: 'vocab', label: 'Kelime Oyunları', icon: Zap },
  { id: 'grammar', label: 'Gramer Oyunları', icon: Puzzle },
  { id: 'study', label: 'Konu & Kartlar', icon: BookOpen }
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('lq_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [username, setUsername] = useState(() => getActiveUsername());
  const [profile, setProfile] = useState(() => {
    const activeUser = getActiveUsername();
    return activeUser ? getOrCreateProfile(activeUser) : null;
  });
  const [userModalOpen, setUserModalOpen] = useState(() => !getActiveUsername());
  const [muted, setMuted] = useState(false);

  // Sticker Popup State: null | 'correct' | 'wrong'
  const [stickerState, setStickerState] = useState(null);
  const [stickerKey, setStickerKey] = useState(0);
  const stickerTimerRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('lq_theme', theme);
  }, [theme]);

  const triggerSticker = (type, durationMs = 2000) => {
    if (stickerTimerRef.current) clearTimeout(stickerTimerRef.current);
    setStickerKey((k) => k + 1);
    setStickerState(type);
    stickerTimerRef.current = setTimeout(() => {
      setStickerState(null);
    }, durationMs);
  };

  const updateProfile = (updater) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveProfile(next);
      return next;
    });
  };

  const handleSelectUser = (selectedName) => {
    sound.playClick();
    const loaded = getOrCreateProfile(selectedName);
    setActiveUsername(loaded.username);
    setUsername(loaded.username);
    setProfile(loaded);
    setUserModalOpen(false);
  };

  const selectedLevelId = profile?.selectedLevelId || 'A1';
  const activeTab = profile?.activeTab || 'vocab';
  const vocabSubMode = profile?.vocabSubMode || 'quiz';
  const grammarSubMode = profile?.grammarSubMode || 'quiz';
  const xp = profile?.xp || 0;
  const streak = profile?.streak || 0;

  const currentLevel =
    CEFR_LEVELS.find((l) => l.id === selectedLevelId) || CEFR_LEVELS[0];

  const solvedWordIdsForLevel =
    profile?.solvedWordsByLevel?.[currentLevel.id] || [];
  const solvedGrammarIdsForLevel =
    profile?.solvedGrammarByLevel?.[currentLevel.id] || [];

  const handleMarkWordSolved = (wordId) => {
    updateProfile((prev) => {
      const lvl = prev.selectedLevelId || 'A1';
      const existing = prev.solvedWordsByLevel?.[lvl] || [];
      if (existing.includes(wordId)) return prev;
      return {
        ...prev,
        solvedWordsByLevel: {
          ...(prev.solvedWordsByLevel || {}),
          [lvl]: [...existing, wordId]
        }
      };
    });
  };

  const handleMarkGrammarSolved = (grammarId) => {
    updateProfile((prev) => {
      const lvl = prev.selectedLevelId || 'A1';
      const existing = prev.solvedGrammarByLevel?.[lvl] || [];
      if (existing.includes(grammarId)) return prev;
      return {
        ...prev,
        solvedGrammarByLevel: {
          ...(prev.solvedGrammarByLevel || {}),
          [lvl]: [...existing, grammarId]
        }
      };
    });
  };

  const handleAddXp = (amount) => {
    updateProfile((prev) => ({
      ...prev,
      xp: (prev.xp || 0) + amount
    }));
  };

  const handleIncrementStreak = () => {
    // Show the heart-hands sticker on any correct answer!
    triggerSticker('correct', 1900);

    updateProfile((prev) => {
      const nextStreak = (prev.streak || 0) + 1;
      return {
        ...prev,
        streak: nextStreak,
        bestStreak: Math.max(prev.bestStreak || 0, nextStreak)
      };
    });
  };

  const handleResetStreak = () => {
    // Show the "Bombastik side eye" sticker on any wrong answer!
    triggerSticker('wrong', 2300);

    updateProfile((prev) => ({
      ...prev,
      streak: 0
    }));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    sound.muted = next;
  };

  const levelProgressPercent = Math.min(
    100,
    Math.round((solvedWordIdsForLevel.length / 60) * 100)
  );

  return (
    <div className="relative min-h-screen text-slate-900 transition-colors duration-200 dark:text-slate-100">
      {/* Full-Screen Moving Background Video */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover scale-105"
        >
          <source src="/bg-video.webm" type="video/webm" />
          <source
            src="https://upload.wikimedia.org/wikipedia/commons/transcoded/5/58/May_2024_aurora_timelapse_near_Calgary.webm/May_2024_aurora_timelapse_near_Calgary.webm.480p.vp9.webm"
            type="video/webm"
          />
        </video>
        <div className="absolute inset-0 bg-slate-100/65 backdrop-blur-[1px] transition-colors duration-300 dark:bg-slate-950/60" />
      </div>

      {/* Correct / Wrong Answer Sticker Overlay */}
      {stickerState && (
        <div
          key={stickerKey}
          onClick={() => setStickerState(null)}
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[2px]"
        >
          <div className="animate-pop flex flex-col items-center">
            <img
              src={stickerState === 'correct' ? '/correct-sticker.png' : '/wrong-sticker.png'}
              alt={stickerState === 'correct' ? 'Doğru Cevap Sticker' : 'Bombastik side eye'}
              className={`h-64 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] sm:h-80 ${
                stickerState === 'wrong' ? 'animate-shake' : ''
              }`}
            />
            <span
              className={`mt-2 rounded-full px-4 py-1.5 text-xs font-extrabold text-white shadow-lg ${
                stickerState === 'correct' ? 'bg-emerald-600/95' : 'bg-rose-600/95'
              }`}
            >
              {stickerState === 'correct'
                ? 'Harika! Doğru Cevap! 🫶 (Geçmek için dokun)'
                : 'Yanlış Cevap! 👀 (Kapatmak için dokun)'}
            </span>
          </div>
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar
          username={username}
          onOpenUserModal={() => setUserModalOpen(true)}
          xp={xp}
          streak={streak}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          muted={muted}
          onToggleMute={handleToggleMute}
        />

        <main className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-7">
          {/* User Resume Banner (Kaldığın Yerden Devam) */}
          {username && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
              <div className="flex items-center gap-2.5 text-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {username}
                  </span>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    olarak kaldığın yerden devam ediyorsun •{' '}
                    <strong className="text-indigo-600 dark:text-indigo-400">
                      {currentLevel.id} İlerlemesi: {solvedWordIdsForLevel.length}/60 Kelime •{' '}
                      {solvedGrammarIdsForLevel.length} Gramer
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex w-full items-center gap-3 sm:w-auto">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800 sm:w-24">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${levelProgressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  %{levelProgressPercent}
                </span>
              </div>
            </div>
          )}

          {/* 1. Clean Level Selector (A1 - C2) */}
          <section className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 drop-shadow-sm dark:text-slate-300">
                Seviye Seçin (A1 – C2)
              </span>
              <span className="rounded-lg bg-white/80 px-2.5 py-0.5 text-xs font-bold text-indigo-600 backdrop-blur-sm dark:bg-slate-900/80 dark:text-indigo-400">
                {currentLevel.id} • {currentLevel.trName}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {CEFR_LEVELS.map((lvl) => {
                const active = lvl.id === currentLevel.id;
                const lvlSolvedCount =
                  profile?.solvedWordsByLevel?.[lvl.id]?.length || 0;

                return (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      sound.playClick();
                      updateProfile({ selectedLevelId: lvl.id });
                    }}
                    className={`flex flex-col items-center justify-center rounded-2xl border py-2.5 px-2 text-center backdrop-blur-md transition-all ${
                      active
                        ? 'border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                        : 'border-slate-200/80 bg-white/85 text-slate-800 hover:border-indigo-400 dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="text-base font-extrabold leading-none sm:text-lg">
                      {lvl.id}
                    </span>
                    <span
                      className={`mt-1 truncate text-[10px] font-medium ${
                        active ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {lvlSolvedCount > 0 ? `${lvlSolvedCount}/60` : lvl.trName.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Simple 3-Tab Mode Selector */}
          <section className="mb-5">
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200/80 bg-white/85 p-1.5 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playClick();
                      updateProfile({ activeTab: tab.id });
                    }}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-bold transition-all sm:text-sm ${
                      active
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800/80'
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
                subMode={vocabSubMode}
                onChangeSubMode={(m) => updateProfile({ vocabSubMode: m })}
                solvedWordIds={solvedWordIdsForLevel}
                onMarkWordSolved={handleMarkWordSolved}
                onAddXp={handleAddXp}
                onIncrementStreak={handleIncrementStreak}
                onResetStreak={handleResetStreak}
              />
            )}

            {activeTab === 'grammar' && (
              <GrammarDetectiveMode
                levelData={currentLevel}
                subMode={grammarSubMode}
                onChangeSubMode={(m) => updateProfile({ grammarSubMode: m })}
                solvedGrammarIds={solvedGrammarIdsForLevel}
                onMarkGrammarSolved={handleMarkGrammarSolved}
                onAddXp={handleAddXp}
                onIncrementStreak={handleIncrementStreak}
                onResetStreak={handleResetStreak}
              />
            )}

            {activeTab === 'study' && <StudyHubMode levelData={currentLevel} />}
          </section>
        </main>
      </div>

      {/* Username Selection / Resume Modal */}
      <UserAuthModal
        isOpen={userModalOpen}
        currentUsername={username}
        onSelectUser={handleSelectUser}
        onClose={() => {
          if (username) setUserModalOpen(false);
        }}
      />
    </div>
  );
}
