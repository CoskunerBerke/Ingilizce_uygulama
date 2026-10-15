import React, { useState } from 'react';
import {
  UserCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Trash2,
  BookOpenCheck
} from 'lucide-react';
import { getAllProfiles, deleteProfile } from '../utils/userStorage';

export default function UserAuthModal({ isOpen, onSelectUser, currentUsername, onClose }) {
  const [inputName, setInputName] = useState('');
  const [profilesMap, setProfilesMap] = useState(() => getAllProfiles());
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const existingProfiles = Object.values(profilesMap).sort(
    (a, b) => new Date(b.lastActiveAt || 0) - new Date(a.lastActiveAt || 0)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (trimmed.length < 2) {
      setError('Lütfen en az 2 karakterli bir kullanıcı adı girin.');
      return;
    }
    setError('');
    onSelectUser(trimmed);
    setInputName('');
  };

  const handleDelete = (e, uname) => {
    e.stopPropagation();
    if (window.confirm(`"${uname}" kullanıcısının kayıtlı ilerlemesini silmek istiyor musunuz?`)) {
      deleteProfile(uname);
      setProfilesMap(getAllProfiles());
    }
  };

  const getTotalSolvedWords = (prof) => {
    if (!prof.solvedWordsByLevel) return 0;
    return Object.values(prof.solvedWordsByLevel).reduce(
      (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
      0
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
            <BookOpenCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">
              Hoş Geldin! 👋
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kullanıcı adını yaz, her girdiğinde kaldığın yerden devam et.
            </p>
          </div>
        </div>

        {/* Form to enter new or existing username */}
        <form onSubmit={handleSubmit} className="mt-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Kullanıcı Adın
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Örn: Berke, Şeyma..."
              autoFocus
              maxLength={24}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-500 sm:text-sm"
            >
              <span>Başla</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {error && <p className="mt-1.5 text-xs font-semibold text-rose-500">{error}</p>}
        </form>

        {/* Saved Profiles List (Resume with 1 click) */}
        {existingProfiles.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
            <div className="mb-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Kayıtlı Profiller (Kaldığın Yerden Devam Et)</span>
            </div>

            <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
              {existingProfiles.map((prof) => {
                const totalWords = getTotalSolvedWords(prof);
                const isCurrent =
                  currentUsername &&
                  prof.username.toLowerCase() === currentUsername.toLowerCase();

                return (
                  <div
                    key={prof.username}
                    onClick={() => onSelectUser(prof.username)}
                    className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-3 transition ${
                      isCurrent
                        ? 'border-indigo-500 bg-indigo-50/70 dark:border-indigo-500/60 dark:bg-indigo-500/15'
                        : 'border-slate-200 bg-slate-50/70 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xs font-extrabold uppercase text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                        {prof.username.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-bold text-slate-900 dark:text-white">
                            {prof.username}
                          </span>
                          <span className="rounded-md bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {prof.selectedLevelId || 'A1'}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="inline-flex items-center gap-0.5 font-semibold text-indigo-600 dark:text-indigo-400">
                            <Sparkles className="h-3 w-3" />
                            {prof.xp || 0} XP
                          </span>
                          <span>•</span>
                          <span>{totalWords} Kelime Öğrenildi</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, prof.username)}
                        title="Profili Sil"
                        className="rounded-lg p-1.5 text-slate-400 opacity-70 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <UserCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentUsername && (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Vazgeç ({currentUsername} olarak devam et)
          </button>
        )}
      </div>
    </div>
  );
}
