import React from 'react';
import {
  Trophy,
  Sparkles,
  Flame,
  BookOpen,
  Puzzle,
  Swords,
  Crown,
  X,
  Lock
} from 'lucide-react';
import { BADGES_LIST } from '../data/curriculumData';

const ICON_MAP = {
  Sparkles,
  Flame,
  BookOpen,
  Puzzle,
  Swords,
  Crown
};

export default function BadgesModal({ isOpen, onClose, unlockedBadges, xp, masteredCount }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/20 text-yellow-400">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              Başarımlar &amp; Rozet Koleksiyonu
            </h3>
            <p className="text-xs text-slate-400">
              Toplam {xp} XP • {masteredCount} Öğrenilen Kelime • {unlockedBadges.length} / {BADGES_LIST.length} Rozet Açıldı
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {BADGES_LIST.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            const IconComp = ICON_MAP[badge.icon] || Sparkles;

            return (
              <div
                key={badge.id}
                className={`flex items-start gap-3.5 rounded-2xl border p-4 transition ${
                  isUnlocked
                    ? badge.color
                    : 'border-slate-800 bg-slate-950/60 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900/90">
                  {isUnlocked ? (
                    <IconComp className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5 text-slate-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{badge.title}</h4>
                    {isUnlocked && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        Kazanıldı
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
