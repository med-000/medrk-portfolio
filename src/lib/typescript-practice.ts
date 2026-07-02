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
