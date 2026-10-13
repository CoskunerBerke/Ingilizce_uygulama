import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RotateCw, Lightbulb, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';
import { getExpandedVocabForLevel } from '../data/vocabBank';

export default function StudyHubMode({ levelData }) {
  const [subTab, setSubTab] = useState('vocab'); // 'vocab' | 'grammar'
  const [flipped, setFlipped] = useState({});
  const [visibleWords, setVisibleWords] = useState([]);
  const deckRef = useRef([]);
  const cursorRef = useRef(0);

  const loadNextBatch = () => {
    if (
      deckRef.current.length === 0 ||
      cursorRef.current + 8 > deckRef.current.length
    ) {
      deckRef.current = getExpandedVocabForLevel(levelData.id);
      cursorRef.current = 0;
    }
    const batch = deckRef.current.slice(cursorRef.current, cursorRef.current + 8);
    cursorRef.current += 8;
    setVisibleWords(batch);
    setFlipped({});
  };

  useEffect(() => {
    deckRef.current = getExpandedVocabForLevel(levelData.id);
    cursorRef.current = 0;
    loadNextBatch();
  }, [levelData.id]);

  const toggleCard = (id) => {
    sound.playFlip();
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      {/* Sub-Switch */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setSubTab('vocab')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              subTab === 'vocab'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Kelime Kartları
          </button>
          <button
            onClick={() => setSubTab('grammar')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
              subTab === 'grammar'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Gramer Özeti
          </button>
        </div>

        {subTab === 'vocab' && (
          <button
            onClick={() => {
              sound.playClick();
              loadNextBatch();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Yeni 8 Kelime Getir</span>
          </button>
        )}
      </div>

      {subTab === 'vocab' ? (
        <div>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Kartlara dokunarak Türkçe anlamını ve örnek cümlesini görebilir, sağ üstteki butonla sürekli yeni kelimeler getirebilirsiniz.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {visibleWords.map((item) => {
              const isFlipped = Boolean(flipped[item.id]);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCard(item.id)}
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-indigo-500/50"
                >
                  {!isFlipped ? (
                    <div className="flex flex-col justify-between gap-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                          {item.type}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.speak(item.word, false);
                          }}
                          className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          title="Telaffuzu Dinle"
                        >
                          <Volume2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </button>
                      </div>

                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                          {item.word}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {item.phonetic} • Eş anlam: {item.synonym}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        <RotateCw className="h-3 w-3" />
                        <span>Anlamı için dokun</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {item.word}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.speak(item.example, false);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                        >
                          <Volume2 className="h-3 w-3" />
                          Cümleyi Dinle
                        </button>
                      </div>

                      <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                        {item.tr}
                      </p>

                      <div className="rounded-xl bg-white p-2.5 text-xs dark:bg-slate-900">
                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                          &ldquo;{item.example}&rdquo;
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                          {item.exampleTr}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {levelData.grammarLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60 sm:p-5"
            >
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {lesson.title}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {lesson.trTitle}
              </p>

              <div className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50/70 px-3 py-2 font-mono text-xs font-bold text-indigo-900 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
                {lesson.formula}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300 sm:text-sm">
                {lesson.explanation}
              </p>

              <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>{lesson.proTip}</span>
              </div>

              <div className="mt-3 space-y-2">
                {lesson.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => sound.speak(ex.en, false)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs transition hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{ex.en}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{ex.tr}</div>
                    </div>
                    <Volume2 className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
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
