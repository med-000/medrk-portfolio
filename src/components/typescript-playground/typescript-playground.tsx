"use client";

import { useMemo, useState } from "react";

import {
  createPracticeSummary,
  debugPracticeItems,
  filterPracticeItemsByLevel,
  formatProfile,
  getPracticeNote,
  levelLabels,
  practiceItems,
  type PracticeLevel,
} from "@/src/lib/typescript-practice";

export const TypeScriptPlayground = () => {
  const [name, setName] = useState("Riki");
  const [favoriteTech, setFavoriteTech] = useState("TypeScript");
  const [selectedLevel, setSelectedLevel] = useState<PracticeLevel>("basic");

  const filteredItems = useMemo(() => {
    return filterPracticeItemsByLevel(practiceItems, selectedLevel);
  }, [selectedLevel]);

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12'>
      <section className='rounded-2xl bg-neutral-950 px-8 py-14 text-white'>
        <p className='text-sm font-bold text-sky-300'>TypeScript Practice</p>
        <h1 className='mt-4 text-4xl font-bold'>
          JavaScriptからTypeScriptへ
        </h1>
        <p className='mt-4 max-w-2xl text-neutral-300'>
          型、arrow関数、type、mapを小さく触りながら練習します。
        </p>
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        <div className='rounded-xl border border-neutral-200 bg-white p-6'>
          <h2 className='text-xl font-bold text-neutral-900'>JavaScript</h2>
          <pre className='mt-4 overflow-x-auto rounded-lg bg-neutral-950 p-4 text-sm text-neutral-100'>
            <code>{`const name = "Riki";
const age = 20;`}</code>
          </pre>
          <p className='mt-4 text-sm leading-6 text-neutral-600'>
            JavaScriptは、値から型を判断して動きます。
          </p>
        </div>

        <div className='rounded-xl border border-neutral-200 bg-white p-6'>
          <h2 className='text-xl font-bold text-neutral-900'>TypeScript</h2>
          <pre className='mt-4 overflow-x-auto rounded-lg bg-neutral-950 p-4 text-sm text-neutral-100'>
            <code>{`const name: string = "Riki";
const age: number = 20;`}</code>
          </pre>
          <p className='mt-4 text-sm leading-6 text-neutral-600'>
            TypeScriptは、値にどんな型を期待するかを書けます。
          </p>
        </div>

        <div className='rounded-xl border border-neutral-200 bg-white p-6'>
          <h2 className='text-xl font-bold text-neutral-900'>arrow関数</h2>
          <pre className='mt-4 overflow-x-auto rounded-lg bg-neutral-950 p-4 text-sm text-neutral-100'>
            <code>{`const greet = (name: string) => {
  return \`Hello, \${name}\`;
};`}</code>
          </pre>
          <p className='mt-4 text-sm leading-6 text-neutral-600'>
            引数にも型を書けるので、間違った値を渡しにくくなります。
          </p>
        </div>
      </section>

      <section className='rounded-xl border border-neutral-200 bg-white p-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end'>
          <label className='flex flex-1 flex-col gap-2 text-sm font-bold text-neutral-700'>
            名前
            <input
              className='min-h-10 rounded-lg border border-neutral-200 px-3 font-normal outline-none transition focus:border-neutral-950'
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </label>
          <label className='flex flex-1 flex-col gap-2 text-sm font-bold text-neutral-700'>
            好きな技術
            <input
              className='min-h-10 rounded-lg border border-neutral-200 px-3 font-normal outline-none transition focus:border-neutral-950'
              onChange={(event) => setFavoriteTech(event.target.value)}
              value={favoriteTech}
            />
          </label>
        </div>
        <p className='mt-4 rounded-lg bg-neutral-100 p-4 text-sm font-bold text-neutral-800'>
          {formatProfile(name, favoriteTech)}
        </p>
        <p className='mt-3 text-sm text-neutral-600'>
          {createPracticeSummary(practiceItems)}
        </p>
        <button
          className='mt-4 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-700 transition hover:border-neutral-950'
          onClick={() => debugPracticeItems(practiceItems)}
          type='button'
        >
          Consoleに出す
        </button>
      </section>

      <section className='rounded-xl border border-neutral-200 bg-white p-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-neutral-900'>
              type / union / map の練習
            </h2>
            <p className='mt-2 text-sm text-neutral-600'>
              レベルを選ぶと、対応する練習項目だけ表示されます。
            </p>
          </div>
          <div className='flex flex-wrap gap-2'>
            {Object.entries(levelLabels).map(([level, label]) => {
              const typedLevel = level as PracticeLevel;
              const isSelected = selectedLevel === typedLevel;

              return (
                <button
                  className={
                    isSelected
                      ? "rounded-full bg-neutral-950 px-4 py-2 text-sm font-bold text-white"
                      : "rounded-full border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-700 transition hover:border-neutral-950"
                  }
                  key={level}
                  onClick={() => setSelectedLevel(typedLevel)}
                  type='button'
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          {filteredItems.map((item) => (
            <article
              className='rounded-xl border border-neutral-200 p-5'
              key={item.id}
            >
              <p className='text-xs font-bold uppercase text-neutral-500'>
                {levelLabels[item.level]}
              </p>
              <h3 className='mt-2 text-lg font-bold text-neutral-900'>
                {item.title}
              </h3>
              <p className='mt-3 text-sm text-neutral-600'>
                状態: {item.isDone ? "完了" : "これから"}
              </p>
              <p className='mt-2 text-sm text-neutral-500'>
                {getPracticeNote(item)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
