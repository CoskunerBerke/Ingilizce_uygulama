import React, { useState } from 'react';
import {
  BookOpen,
  Lightbulb,
  Volume2,
  Turtle,
  CheckCircle2,
  RotateCw,
  Sparkles,
  Play
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function StudyHubMode({
  levelData,
  masteredWords,
  onToggleMasteredWord,
  onStartGameMode
}) {
  const [subTab, setSubTab] = useState('vocab'); // 'vocab' | 'grammar'
  const [flippedIds, setFlippedIds] = useState({});

  const toggleFlip = (id) => {
    sound.playFlip();
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation between Vocab Deck and Grammar Cards */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-800/90 bg-slate-900/70 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-950 p-1.5">
          <button
            onClick={() => {
              sound.playClick();
              setSubTab('vocab');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              subTab === 'vocab'
                ? `bg-gradient-to-r ${levelData.color} text-white shadow-md`
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>3D Kelime Kartları ({levelData.vocabList.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setSubTab('grammar');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              subTab === 'grammar'
                ? `bg-gradient-to-r ${levelData.color} text-white shadow-md`
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lightbulb className="h-4 w-4" />
            <span>Gramer Formül Rehberi ({levelData.grammarLessons.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onStartGameMode(subTab === 'vocab' ? 'vocab_game' : 'sentence_builder')}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>
              {subTab === 'vocab' ? 'Kelime Oyununa Geç' : 'Cümle İnşaatçısını Oyna'}
            </span>
          </button>
        </div>
      </div>

      {subTab === 'vocab' ? (
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <p>
              💡 Kartların üzerine tıklayarak <strong className="text-slate-200">Türkçe anlamını ve örnek cümlesini</strong> görebilir, hoparlör ikonuyla <strong className="text-slate-200">İngilizce telaffuzunu</strong> dinleyebilirsiniz.
            </p>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-300">
              Öğrenilen: {levelData.vocabList.filter((w) => masteredWords.includes(w.id)).length} / {levelData.vocabList.length}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {levelData.vocabList.map((item) => {
              const isFlipped = Boolean(flippedIds[item.id]);
              const isMastered = masteredWords.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="group relative h-72 cursor-pointer rounded-3xl border border-slate-800 bg-slate-900/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
                  onClick={() => toggleFlip(item.id)}
                >
                  {!isFlipped ? (
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${levelData.badgeBg}`}>
                          {item.type}
                        </span>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => sound.speak(item.word, false)}
                            className="rounded-xl bg-slate-800 p-2 text-slate-300 transition hover:bg-indigo-600 hover:text-white"
                            title="Normal Hızda Telaffuz"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => sound.speak(item.word, true)}
                            className="rounded-xl bg-slate-800 p-2 text-slate-300 transition hover:bg-amber-600 hover:text-white"
                            title="Yavaş Telaffuz (Kaplumbağa Modu)"
                          >
                            <Turtle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="my-auto text-center">
                        <h3 className="font-display text-2xl font-bold tracking-wide text-white">
                          {item.word}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-slate-400">{item.phonetic}</p>
                        <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-slate-800/90 px-3 py-1 text-[11px] text-slate-300">
                          <span>Eş anlam:</span>
                          <strong className="text-indigo-300">{item.synonym}</strong>
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                        <span className="inline-flex items-center gap-1 text-slate-400 group-hover:text-indigo-300">
                          <RotateCw className="h-3.5 w-3.5" />
                          Anlamı için çevir
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleMasteredWord(item.id);
                          }}
                          className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 font-bold transition ${
                            isMastered
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{isMastered ? 'Öğrendim' : 'İşaretle'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-between bg-gradient-to-b from-indigo-950/40 to-slate-900/40 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                          {item.word}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.speak(item.example, false);
                          }}
                          className="inline-flex items-center gap-1 rounded-xl bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/30"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          Cümleyi Dinle
                        </button>
                      </div>

                      <div className="my-auto space-y-3">
                        <div>
                          <div className="text-[11px] font-semibold uppercase text-slate-400">
                            Türkçe Anlamı
                          </div>
                          <div className="mt-0.5 text-lg font-extrabold text-emerald-300">
                            {item.tr}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                          <p className="text-xs font-semibold text-white">
                            &ldquo;{item.example}&rdquo;
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">
                            {item.exampleTr}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Ön yüze dönmek için tıkla</span>
                        <RotateCw className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {levelData.grammarLessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${levelData.badgeBg}`}>
                    Modül {index + 1} • {levelData.id} Gramer
                  </span>
                  <Sparkles className={`h-5 w-5 ${levelData.accentText}`} />
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-white">
                  {lesson.title}
                </h3>
                <p className="text-xs font-semibold text-indigo-400">{lesson.trTitle}</p>

                {/* Formula Box */}
                <div className="mt-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/40 p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                    📐 Altın Formül
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-white">
                    {lesson.formula}
                  </div>
                </div>

                {/* Explanation */}
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {lesson.explanation}
                </p>

                {/* Pro Tip */}
                <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    <span>Püf Noktası (Pro Tip)</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-amber-100/90">
                    {lesson.proTip}
                  </p>
                </div>
              </div>

              {/* Examples */}
              <div className="mt-5 space-y-2.5 border-t border-slate-800 pt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Örnek Cümleler (Dinlemek İçin Tıkla)
                </div>
                {lesson.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => sound.speak(ex.en, false)}
                    className="w-full rounded-2xl border border-slate-800/90 bg-slate-950/70 p-3 text-left transition hover:border-indigo-500/40 hover:bg-slate-950"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-white">{ex.en}</span>
                      <Volume2 className="h-4 w-4 shrink-0 text-indigo-400" />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">{ex.tr}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
