---
title: Next.jsでポートフォリオ作成！！~PlayページでTypeScript基礎練習~
tags: Next.js TypeScript JavaScript React
author: med-000
slide: false
---

# はじめに

みなさんこんにちは、今回は `/play` ページを使ってTypeScriptの基礎を練習できるページを作ります。

Next.jsのページ作成は少し触ってきましたが、TypeScriptそのものはまだ慣れていないと思います。
そこで今回は、難しい設計ではなく、以下の基礎に絞ります。

- JavaScriptとTypeScriptの違い
- `string` や `number` などの型
- arrow関数
- 関数宣言とarrow関数
- `type` でオブジェクトの形を作る
- union型で選択肢を制限する
- optional property
- `find`、`filter`、`map`
- `??`
- `console.log`
- `map` で配列から画面を作る
- `.ts` ファイルに裏側のロジックを分ける

:::note info
今回は `/play` を練習場として使います。
完成度の高いページを作るより、TypeScriptの文法を画面とコードで対応させることを優先します。
:::

:::note warn
TypeScriptは `.tsx` だけで使うものではありません。
画面を返さないロジックやデータ整理は、`.ts` ファイルに書くのもよくある形です。
コード量が増えてきたら、画面は `.tsx`、裏側の処理は `.ts` に分けると見通しが良くなります。
:::

# 本編

## 今回作るもの

`/play` に、TypeScriptの基礎を触れる練習ページを作ります。

作る機能は以下です。

- JavaScriptとTypeScriptのコード例を並べる
- arrow関数の例を表示する
- 入力欄に名前と好きな技術を入れる
- 入力値を関数に渡して文章を作る
- 練習レベルを選ぶ
- `map` で練習項目カードを表示する
- TypeScriptのロジックを `.ts` に分ける

## ファイル構成

今回触るファイルは3つです。

```txt
src/app/play/page.tsx
src/components/typescript-playground/typescript-playground.tsx
src/lib/typescript-practice.ts
```

`page.tsx` はページ本体です。
実際の練習UIは `TypeScriptPlayground` コンポーネントに分けます。
TypeScriptの型、データ、関数は `typescript-practice.ts` に分けます。

## .tsと.tsxの違い

ざっくり言うと、以下のように使い分けます。

- `.tsx`: JSXを書くファイル。画面のHTMLっぽいタグを書くときに使う
- `.ts`: JSXを書かないファイル。型、関数、データ、裏側のロジックを書くときに使う

例えば、これは JSX があるので `.tsx` です。

```tsx
export const Component = () => {
  return <div>Hello</div>;
};
```

一方で、これは画面を返していないので `.ts` に書けます。

```ts
export const formatProfile = (name: string, favoriteTech: string) => {
  return `${name}さんは${favoriteTech}を練習中です。`;
};
```

:::note info
「TypeScript = TSX」ではありません。
TSXは、TypeScriptでJSXを書くための拡張子です。
普通の関数や型だけなら `.ts` で十分です。
:::

## /playページを変更する

まず、`src/app/play/page.tsx` を変更します。

```diff_tsx:src/app/play/page.tsx
  import { MainLayout } from "../../layouts/main/main-layout";
+ import { TypeScriptPlayground } from "../../components/typescript-playground/typescript-playground";
 
  export default function Play() {
    return (
      <MainLayout>
-       <div className='mx-auto w-full max-w-5xl px-6 py-12'>
-         <h1 className='text-3xl font-bold text-neutral-900'>Play</h1>
-         <p className='mt-4 text-neutral-600'>これはPlayページです</p>
-       </div>
+       <TypeScriptPlayground />
      </MainLayout>
    );
  }
```

`MainLayout` はそのまま使うので、ヘッダーとフッターは表示されます。
中身だけ `TypeScriptPlayground` に置き換えます。

## TypeScriptPlaygroundを作る

次に、新しいファイルを作ります。

```txt
src/components/typescript-playground/typescript-playground.tsx
```

このコンポーネントでは入力欄やボタンを使うので、最初に `"use client"` を書きます。

```tsx:src/components/typescript-playground/typescript-playground.tsx
"use client";
```

## TypeScriptのロジック用ファイルを作る

先に、画面とは関係ないTypeScriptの練習場所を作ります。

```txt
src/lib/typescript-practice.ts
```

ここには、型、配列データ、関数を書きます。

画面に直接関係しないものを `.ts` に分けると、`TypeScriptPlayground` が長くなりすぎるのを防げます。

## console.logはどこに出るのか

まず、JavaScriptでもTypeScriptでもよく使う確認方法として `console.log` があります。

```ts
console.log("hello world");
```

Next.jsの画面側、つまりブラウザで動くコードに書いた `console.log` は、ブラウザの開発者ツールのConsoleに出ます。

Chromeなら、ページを開いた状態で以下を押します。

```txt
Command + Option + I
```

そして `Console` タブを見ると、ログが表示されます。

:::note warn
ターミナルに出るとは限りません。
ブラウザで動くコードの `console.log` はブラウザのConsole、サーバー側やNode.jsで動くコードの `console.log` はターミナルに出ます。
:::

`.ts` ファイルに `console.log` を書いた場合でも、その関数をブラウザ側のコンポーネントから呼べばブラウザのConsoleに出ます。
逆に、Node.jsで実行する練習ファイルとして動かすなら、ターミナル側に出ます。

ただし、このNext.jsプロジェクトでは、`.ts` ファイルをそのまま `node ファイル名.ts` で実行するわけではありません。
`.ts` はTypeScriptなので、実行するにはNext.jsやTypeScriptの変換・実行環境が必要です。

今回は「画面からimportして使う裏側ロジック」として `.ts` を作ります。

## union型を作る

まず、練習レベルを型として作ります。

```ts:src/lib/typescript-practice.ts
export type PracticeLevel = "basic" | "standard" | "challenge";
```

これは union型 です。

`PracticeLevel` には以下の3つだけ入れられます。

```txt
basic
standard
challenge
```

例えば、間違えて以下のように書くとTypeScriptが教えてくれます。

```ts
const level: PracticeLevel = "hard";
```

`"hard"` は `PracticeLevel` に含まれていないのでエラーになります。

`export` をつけているので、他のファイルからこの型をimportできます。

## typeでオブジェクトの形を作る

次に、練習項目1つ分の形を作ります。

```ts:src/lib/typescript-practice.ts
export type PracticeItem = {
  id: number;
  title: string;
  level: PracticeLevel;
  isDone: boolean;
  note?: string;
};
```

それぞれの意味はこうです。

- `id: number`: 番号
- `title: string`: タイトル文字
- `level: PracticeLevel`: 練習レベル
- `isDone: boolean`: 完了しているか
- `note?: string`: メモ。あってもなくてもよい

JavaScriptでは、この形をコードだけで強制するのは難しいです。
TypeScriptでは、`type` を使うことで「この形のデータを使う」と明示できます。

`note?: string` の `?` は、あってもなくてもよいプロパティという意味です。

```ts
note?: string;
```

これを optional property と呼びます。

## 配列データを作る

`PracticeItem[]` は、`PracticeItem` の配列という意味です。

```ts:src/lib/typescript-practice.ts
export const practiceItems: PracticeItem[] = [
  {
    id: 1,
    title: "let / const と型注釈を読む",
    level: "basic",
    isDone: true,
    note: "まずは値と型を見比べる",
  },
  {
    id: 2,
    title: "typeでオブジェクトの形を作る",
    level: "standard",
    isDone: false,
  },
];
```

この配列に `id` を入れ忘れたり、`level` に `"hard"` を入れたりすると、TypeScriptが教えてくれます。

## Recordでラベルを作る

画面に表示するラベルも用意します。

```ts:src/lib/typescript-practice.ts
export const levelLabels: Record<PracticeLevel, string> = {
  basic: "基礎",
  standard: "標準",
  challenge: "挑戦",
};
```

`Record<PracticeLevel, string>` は、`PracticeLevel` のそれぞれに `string` の値を持たせるという意味です。

つまり、以下の3つを必ず持つ必要があります。

```txt
basic
standard
challenge
```

## arrow関数を作る

名前と好きな技術から文章を作る関数を作ります。

```ts:src/lib/typescript-practice.ts
export const formatProfile = (name: string, favoriteTech: string) => {
  return `${name}さんは${favoriteTech}を練習中です。`;
};
```

これが arrow関数 です。

```ts
(name: string, favoriteTech: string) => {
  return "...";
}
```

TypeScriptでは、引数にも型を書けます。

- `name: string`
- `favoriteTech: string`

これにより、数値などを間違えて渡しにくくなります。

## function宣言も使える

関数はarrow関数だけではありません。
普通の `function` 宣言も使えます。

```ts:src/lib/typescript-practice.ts
export function formatLevelLabel(level: PracticeLevel): string {
  return levelLabels[level];
}
```

`: string` は、この関数が文字列を返すという意味です。

```ts
function 関数名(引数: 型): 戻り値の型 {
  return 値;
}
```

arrow関数とfunction宣言はどちらも使います。
最初は「どちらも関数を作る書き方」と考えて大丈夫です。

## filterやmapを関数に分ける

ロジックが増えたら、`.tsx` に全部書かず、`.ts` に関数として分けるのも手です。

```ts:src/lib/typescript-practice.ts
export const filterPracticeItemsByLevel = (
  items: PracticeItem[],
  level: PracticeLevel,
) => {
  return items.filter((item) => item.level === level);
};
```

これは、選んだレベルに合う練習項目だけを返す関数です。

次に、完了している件数を数える関数です。

```ts:src/lib/typescript-practice.ts
export const countDoneItems = (items: PracticeItem[]) => {
  return items.filter((item) => item.isDone).length;
};
```

さらに、表示用の文章を作る関数も作れます。

```ts:src/lib/typescript-practice.ts
export const createPracticeSummary = (items: PracticeItem[]) => {
  const doneCount = countDoneItems(items);

  return `全${items.length}件中${doneCount}件が完了しています。`;
};
```

タイトルだけを取り出すなら `map` を使います。

```ts:src/lib/typescript-practice.ts
export const getPracticeTitles = (items: PracticeItem[]) => {
  return items.map((item) => item.title);
};
```

1件だけ探すなら `find` を使います。

```ts:src/lib/typescript-practice.ts
export const findPracticeItemById = (
  items: PracticeItem[],
  id: number,
) => {
  return items.find((item) => item.id === id);
};
```

`find` は、条件に合う最初の1件を返します。
見つからない場合は `undefined` になります。

## ??で代わりの値を出す

`note` は optional property なので、存在しないことがあります。

そのため、メモがないときの代わりの文章を用意します。

```ts:src/lib/typescript-practice.ts
export const getPracticeNote = (item: PracticeItem) => {
  return item.note ?? "メモはまだありません。";
};
```

`??` は、左側が `null` または `undefined` のときに右側を使う書き方です。

```ts
値 ?? 代わりの値
```

`note` があるときはそのまま使い、ないときは `"メモはまだありません。"` を返します。

## console.log用の関数を作る

データの中身を確認したいときは、`console.log` を使えます。

```ts:src/lib/typescript-practice.ts
export const debugPracticeItems = (items: PracticeItem[]) => {
  console.log("TypeScript practice items:", items);
};
```

この関数をブラウザ側のコンポーネントから呼ぶと、ブラウザの開発者ツールのConsoleに表示されます。

:::note warn
`console.log` は確認には便利ですが、提出前や本番用コードでは不要なログを残しすぎないようにします。
:::

このように、画面に出す前の処理は `.ts` に置いておくと練習しやすいです。

## useStateとuseMemoをimportする

今回は、入力値や選択中のレベルを覚えるために `useState` を使います。

また、選択中のレベルに合う練習項目だけを作るために `useMemo` を使います。

```tsx:src/components/typescript-playground/typescript-playground.tsx
import { useMemo, useState } from "react";
```

## .tsのロジックをimportする

`TypeScriptPlayground` では、`.ts` に書いた型、データ、関数をimportします。

```tsx:src/components/typescript-playground/typescript-playground.tsx
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
```

`type PracticeLevel` のように書くと、型としてだけimportできます。
画面に出る値ではなく、TypeScriptのチェックに使うためのimportです。

`debugPracticeItems` は、ボタンを押したときに `console.log` を実行するために使います。
`getPracticeNote` は、optional property の `note` を表示するときに使います。

## useStateで入力値を持つ

コンポーネントの中で入力値をstateとして持ちます。

```tsx
const [name, setName] = useState("Riki");
const [favoriteTech, setFavoriteTech] = useState("TypeScript");
const [selectedLevel, setSelectedLevel] = useState<PracticeLevel>("basic");
```

`name` と `favoriteTech` は文字列です。
初期値に文字列を入れているので、TypeScriptが `string` と推測してくれます。

`selectedLevel` は `PracticeLevel` に制限したいので、明示的に書いています。

```tsx
useState<PracticeLevel>("basic")
```

これで、`selectedLevel` には `"basic"`、`"standard"`、`"challenge"` だけを入れられます。

## useMemoで表示する項目を絞り込む

選んだレベルに合う練習項目だけ表示します。

```tsx
const filteredItems = useMemo(() => {
  return filterPracticeItemsByLevel(practiceItems, selectedLevel);
}, [selectedLevel]);
```

実際の `filter` 処理は、さきほど `.ts` に作った `filterPracticeItemsByLevel` に分けています。

画面側の `.tsx` は「どの関数を使うか」に集中し、裏側の `.ts` は「どう絞り込むか」に集中できます。

## mapでボタンを作る

`Object.entries(levelLabels)` を使うと、ラベルの一覧からボタンを作れます。

```tsx
{Object.entries(levelLabels).map(([level, label]) => {
  const typedLevel = level as PracticeLevel;
  const isSelected = selectedLevel === typedLevel;

  return (
    <button
      key={level}
      onClick={() => setSelectedLevel(typedLevel)}
      type='button'
    >
      {label}
    </button>
  );
})}
```

`map` は、配列の中身を1つずつ別の形に変換するものです。

ここでは、`levelLabels` の中身をボタンに変換しています。

## mapでカードを表示する

練習項目も `map` で表示します。

```tsx
{filteredItems.map((item) => (
  <article key={item.id}>
    <p>{levelLabels[item.level]}</p>
    <h3>{item.title}</h3>
    <p>状態: {item.isDone ? "完了" : "これから"}</p>
  </article>
))}
```

`item.isDone ? "完了" : "これから"` は、条件によって表示を変える書き方です。

```ts
条件 ? trueのとき : falseのとき
```

`boolean` と一緒によく使います。

## 完成形

最後に完成形を載せておきます。

### `src/app/play/page.tsx`

```tsx:src/app/play/page.tsx
import { MainLayout } from "../../layouts/main/main-layout";
import { TypeScriptPlayground } from "../../components/typescript-playground/typescript-playground";

export default function Play() {
  return (
    <MainLayout>
      <TypeScriptPlayground />
    </MainLayout>
  );
}
```

### `src/lib/typescript-practice.ts`

```ts:src/lib/typescript-practice.ts
export type PracticeLevel = "basic" | "standard" | "challenge";

export type PracticeItem = {
  id: number;
  title: string;
  level: PracticeLevel;
  isDone: boolean;
  note?: string;
};

export const practiceItems: PracticeItem[] = [
  {
    id: 1,
    title: "let / const と型注釈を読む",
    level: "basic",
    isDone: true,
    note: "まずは値と型を見比べる",
  },
  {
    id: 2,
    title: "typeでオブジェクトの形を作る",
    level: "standard",
    isDone: false,
  },
  {
    id: 3,
    title: "mapで配列から画面を作る",
    level: "standard",
    isDone: false,
  },
  {
    id: 4,
    title: "union型で選択肢を制限する",
    level: "challenge",
    isDone: false,
  },
];

export const levelLabels: Record<PracticeLevel, string> = {
  basic: "基礎",
  standard: "標準",
  challenge: "挑戦",
};

export const formatProfile = (name: string, favoriteTech: string) => {
  return `${name}さんは${favoriteTech}を練習中です。`;
};

export function formatLevelLabel(level: PracticeLevel): string {
  return levelLabels[level];
}

export const filterPracticeItemsByLevel = (
  items: PracticeItem[],
  level: PracticeLevel,
) => {
  return items.filter((item) => item.level === level);
};

export const countDoneItems = (items: PracticeItem[]) => {
  return items.filter((item) => item.isDone).length;
};

export const createPracticeSummary = (items: PracticeItem[]) => {
  const doneCount = countDoneItems(items);

  return `全${items.length}件中${doneCount}件が完了しています。`;
};

export const getPracticeTitles = (items: PracticeItem[]) => {
  return items.map((item) => item.title);
};

export const findPracticeItemById = (
  items: PracticeItem[],
  id: number,
) => {
  return items.find((item) => item.id === id);
};

export const getPracticeNote = (item: PracticeItem) => {
  return item.note ?? "メモはまだありません。";
};

export const debugPracticeItems = (items: PracticeItem[]) => {
  console.log("TypeScript practice items:", items);
};
```

### `src/components/typescript-playground/typescript-playground.tsx`

```tsx:src/components/typescript-playground/typescript-playground.tsx
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
```

## 動作確認

開発サーバーを起動します。

```bash
pnpm dev
```

以下を開きます。

```txt
http://localhost:3000/play
```

確認することは以下です。

- JavaScriptとTypeScriptの違いが表示される
- 名前を変えると文章も変わる
- 好きな技術を変えると文章も変わる
- レベルボタンを押すとカードが切り替わる
- `map` で複数カードが表示される
- `Consoleに出す` ボタンを押すと、ブラウザのConsoleに配列が表示される

## ここで一旦コミット

`/play` にTypeScript練習ページを追加できたので、ここでコミットしておきます。

コミットメッセージ例:

```txt
feature:PlayページにTypeScript練習機能を追加
```

## 今回のまとめ

今回やったことは以下です。

- JavaScriptとTypeScriptの違いを見比べた
- `string`、`number`、`boolean` を使った
- arrow関数を作った
- function宣言を使った
- `type` でオブジェクトの形を作った
- union型で選択肢を制限した
- optional propertyを使った
- `Record` でラベル一覧を作った
- `filter` で配列を絞り込んだ
- `find` で1件を探した
- `map` で配列から画面を作った
- `??` で代わりの値を返した
- `console.log` がどこに出るか確認した
- `.ts` に裏側のロジックを分けた

TypeScriptは最初は書く量が増えたように見えます。
でも、データの形や選択肢を先に決めておくことで、間違いに早く気づけるようになります。
