import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Zap,
  Puzzle,
  ShieldAlert,
  Swords,
  Sparkles,
  CheckCircle2,
  Compass,
  Award,
  Flame
} from 'lucide-react';
import { CEFR_LEVELS } from './data/curriculumData';
import Navbar from './components/Navbar';
import StudyHubMode from './components/StudyHubMode';
import VocabGameMode from './components/VocabGameMode';
import SentenceBuilderMode from './components/SentenceBuilderMode';
import GrammarDetectiveMode from './components/GrammarDetectiveMode';
import BossArenaMode from './components/BossArenaMode';
import PlacementModal from './components/PlacementModal';
import BadgesModal from './components/BadgesModal';
import { sound } from './utils/sound';

const GAME_TABS = [
  {
    id: 'study',
    label: 'Konu & 3D Kartlar',
    sub: 'Kelime & Gramer Rehberi',
    icon: BookOpen
  },
  {
    id: 'vocab_game',
    label: 'Kelime Düellosu',
    sub: 'Eşleştir & Boşluk Doldur',
    icon: Zap
  },
  {
    id: 'sentence_builder',
    label: 'Cümle İnşaatçısı',
    sub: 'Gramer Dizilim Oyunu',
    icon: Puzzle
  },
  {
    id: 'grammar_detective',
    label: 'Gramer Dedektifi',
    sub: 'Hata Avcısı & Test',
    icon: ShieldAlert
  },
  {
    id: 'boss_arena',
    label: 'Boss Savaşı',
    sub: 'Karma Meydan Okuma',
    icon: Swords
  }
];

export default function App() {
  const [selectedLevelId, setSelectedLevelId] = useState(() => {
    return localStorage.getItem('lq_level') || 'A1';
  });
  const [activeTab, setActiveTab] = useState('study');
  const [xp, setXp] = useState(() => Number(localStorage.getItem('lq_xp')) || 120);
  const [streak, setStreak] = useState(0);
  const [masteredWords, setMasteredWords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lq_mastered')) || ['a1-v1'];
    } catch {
      return ['a1-v1'];
    }
  });
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lq_badges')) || [];
    } catch {
      return [];
    }
  });
  const [muted, setMuted] = useState(false);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lq_level', selectedLevelId);
  }, [selectedLevelId]);

  useEffect(() => {
    localStorage.setItem('lq_xp', String(xp));
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('lq_mastered', JSON.stringify(masteredWords));
    if (masteredWords.length >= 10 && !unlockedBadges.includes('vocab_hunter')) {
      setUnlockedBadges((prev) => [...prev, 'vocab_hunter']);
    }
  }, [masteredWords]);

  useEffect(() => {
    localStorage.setItem('lq_badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  const currentLevel =
    CEFR_LEVELS.find((l) => l.id === selectedLevelId) || CEFR_LEVELS[0];

  const handleSelectLevel = (lvlId) => {
    sound.playClick();
    setSelectedLevelId(lvlId);
  };

  const handleAddXp = (amount) => {
    setXp((prev) => prev + amount);
  };

  const handleIncrementStreak = () => {
    setStreak((prev) => {
      const next = prev + 1;
      if (next >= 5 && !unlockedBadges.includes('combo_5')) {
        setUnlockedBadges((b) => (b.includes('combo_5') ? b : [...b, 'combo_5']));
      }
      return next;
    });
  };

  const handleResetStreak = () => {
    setStreak(0);
  };

  const handleToggleMasteredWord = (wordId) => {
    sound.playClick();
    setMasteredWords((prev) =>
      prev.includes(wordId) ? prev.filter((id) => id !== wordId) : [...prev, wordId]
    );
  };

  const handleMarkWordMastered = (wordId) => {
    setMasteredWords((prev) => (prev.includes(wordId) ? prev : [...prev, wordId]));
  };

  const handleUnlockBadge = (badgeId) => {
    setUnlockedBadges((prev) => (prev.includes(badgeId) ? prev : [...prev, badgeId]));
  };

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    sound.muted = next;
  };

  const handleResetProgress = () => {
    if (window.confirm('Tüm demo XP, kelime ve rozet ilerlemesini sıfırlamak istiyor musunuz?')) {
      setXp(0);
      setStreak(0);
      setMasteredWords([]);
      setUnlockedBadges([]);
      localStorage.removeItem('lq_xp');
      localStorage.removeItem('lq_mastered');
      localStorage.removeItem('lq_badges');
    }
  };

  // Daily Quests Status
  const quests = [
    {
      id: 'q1',
      label: '300 XP Puanına Ulaş',
      done: xp >= 300,
      progress: `${Math.min(xp, 300)} / 300 XP`
    },
    {
      id: 'q2',
      label: '5 Kelimeyi Öğrenildi İşaretle',
      done: masteredWords.length >= 5,
      progress: `${Math.min(masteredWords.length, 5)} / 5 Kelime`
    },
    {
      id: 'q3',
      label: '3x Kombo Serisi Yakala',
      done: streak >= 3 || unlockedBadges.includes('combo_5'),
      progress: streak >= 3 || unlockedBadges.includes('combo_5') ? 'Tamamlandı' : `${streak} / 3x`
    }
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl" />
      </div>

      {/* Top Navigation */}
      <Navbar
        selectedLevel={currentLevel}
        onSelectLevel={handleSelectLevel}
        levels={CEFR_LEVELS}
        xp={xp}
        streak={streak}
        unlockedBadges={unlockedBadges}
        muted={muted}
        onToggleMute={handleToggleMute}
        onOpenPlacement={() => setPlacementOpen(true)}
        onOpenBadges={() => setBadgesOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Level Selector Cards Grid (A1 to C2) */}
        <section className="mb-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                🎯 Seviyeni Seç (CEFR A1 → C2)
              </h2>
              <p className="text-xs text-slate-400">
                İstediğin seviyeye tıklayarak o seviyenin özel Kelime (Vocabulary) ve Dilbilgisi (Grammar) oyunlarına geçiş yap.
              </p>
            </div>
            <button
              onClick={() => setPlacementOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
            >
              <Compass className="h-4 w-4" />
              <span>Seviyemden emin değilim, test et →</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CEFR_LEVELS.map((lvl) => {
              const isSelected = lvl.id === currentLevel.id;
              const levelMasteredCount = lvl.vocabList.filter((w) =>
                masteredWords.includes(w.id)
              ).length;

              return (
                <button
                  key={lvl.id}
                  onClick={() => handleSelectLevel(lvl.id)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? `border-transparent bg-gradient-to-br ${lvl.color} text-white shadow-xl scale-[1.02] ring-2 ${lvl.ringColor}`
                      : 'border-slate-800/90 bg-slate-900/75 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-extrabold tracking-tight">
                        {lvl.id}
                      </span>
                      <span className="text-lg">{lvl.boss.emoji}</span>
                    </div>
                    <div
                      className={`mt-1 text-xs font-bold ${
                        isSelected ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {lvl.trName}
                    </div>
                    <p
                      className={`mt-1 line-clamp-2 text-[11px] leading-snug ${
                        isSelected ? 'text-white/85' : 'text-slate-400'
                      }`}
                    >
                      {lvl.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-semibold">
                    <span>
                      Kelime: {levelMasteredCount}/{lvl.vocabList.length}
                    </span>
                    <span>{lvl.grammarLessons.length} Gramer</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Active Level Banner + Daily Quests */}
        <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${currentLevel.color} p-6 text-white shadow-xl lg:col-span-8`}
          >
            <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AKTİF SEVİYE: {currentLevel.name}</span>
                </div>
                <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
                  {currentLevel.trName} Macerası
                </h1>
                <p className="max-w-xl text-xs text-white/90 sm:text-sm">
                  {currentLevel.subtitle} Önce 3D kartlarla kelime ve gramer formüllerini inceleyebilir veya doğrudan oyun modlarına atlayabilirsin!
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-2 rounded-2xl bg-black/25 p-4 backdrop-blur-sm sm:items-end">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                  Seviye Boss&apos;u
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentLevel.boss.emoji}</span>
                  <div className="text-left sm:text-right">
                    <div className="text-xs font-extrabold">{currentLevel.boss.name}</div>
                    <div className="text-[11px] text-white/75">{currentLevel.boss.trTitle}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('boss_arena');
                  }}
                  className="mt-1 inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-extrabold text-slate-900 shadow hover:bg-slate-100"
                >
                  <Swords className="h-3.5 w-3.5 text-rose-600" />
                  <span>Boss&apos;a Meydan Oku</span>
                </button>
              </div>
            </div>
          </div>

          {/* Daily Quests Box */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5 lg:col-span-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                <h3 className="font-display text-sm font-bold text-white">
                  Günlük Görevler
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-400">
                <Flame className="h-3.5 w-3.5" />
                Seri: {streak}x
              </span>
            </div>

            <div className="my-3 space-y-2">
              {quests.map((q) => (
                <div
                  key={q.id}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-xs ${
                    q.done
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2
                      className={`h-4 w-4 ${
                        q.done ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    />
                    <span>{q.label}</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold opacity-85">
                    {q.progress}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-400">
              İlerleme tarayıcına otomatik kaydedilir.
            </div>
          </div>
        </section>

        {/* 5 Game Mode Navigation Tabs */}
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {GAME_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                    isActive
                      ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                      : 'border-slate-800/90 bg-slate-900/70 text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isActive
                        ? `bg-gradient-to-br ${currentLevel.color} text-white shadow`
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-extrabold sm:text-sm">
                      {tab.label}
                    </div>
                    <div className="truncate text-[11px] text-slate-400">
                      {tab.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Active Game / Learning View */}
        <section className="min-h-[420px]">
          {activeTab === 'study' && (
            <StudyHubMode
              levelData={currentLevel}
              masteredWords={masteredWords}
              onToggleMasteredWord={handleToggleMasteredWord}
              onStartGameMode={(mode) => setActiveTab(mode)}
            />
          )}

          {activeTab === 'vocab_game' && (
            <VocabGameMode
              levelData={currentLevel}
              onAddXp={handleAddXp}
              onIncrementStreak={handleIncrementStreak}
              onResetStreak={handleResetStreak}
              onMarkWordMastered={handleMarkWordMastered}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === 'sentence_builder' && (
            <SentenceBuilderMode
              levelData={currentLevel}
              onAddXp={handleAddXp}
              onIncrementStreak={handleIncrementStreak}
              onResetStreak={handleResetStreak}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === 'grammar_detective' && (
            <GrammarDetectiveMode
              levelData={currentLevel}
              onAddXp={handleAddXp}
              onIncrementStreak={handleIncrementStreak}
              onResetStreak={handleResetStreak}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === 'boss_arena' && (
            <BossArenaMode
              levelData={currentLevel}
              streak={streak}
              onAddXp={handleAddXp}
              onIncrementStreak={handleIncrementStreak}
              onResetStreak={handleResetStreak}
              onUnlockBadge={handleUnlockBadge}
            />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4">
          LinguaQuest • Oyunlaştırılmış A1-C2 İngilizce Kelime (Vocabulary) &amp; Dilbilgisi (Grammar) Platformu
        </div>
      </footer>

      {/* Modals */}
      <PlacementModal
        isOpen={placementOpen}
        onClose={() => setPlacementOpen(false)}
        onApplyLevel={(lvl) => {
          setSelectedLevelId(lvl);
          setActiveTab('study');
        }}
      />

      <BadgesModal
        isOpen={badgesOpen}
        onClose={() => setBadgesOpen(false)}
        unlockedBadges={unlockedBadges}
        xp={xp}
        masteredCount={masteredWords.length}
      />
    </div>
  );
}
