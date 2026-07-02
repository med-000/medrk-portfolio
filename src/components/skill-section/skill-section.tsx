"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SkillCard } from "../skill-card/skill-card";

type SkillCategory = "All" | "Framework" | "Style" | "Tool";

type Skill = {
  title: string;
  description: string;
  category: Exclude<SkillCategory, "All">;
};

const categories: SkillCategory[] = ["All", "Framework", "Style", "Tool"];

const skills: Skill[] = [
  {
    title: "Next.js",
    description:
      "ページ作成、ルーティング、コンポーネント分割を練習しています。",
    category: "Framework",
  },
  {
    title: "Tailwind CSS",
    description: "classNameを使って、余白、色、レイアウトを調整できます。",
    category: "Style",
  },
  {
    title: "GitHub",
    description: "ブランチ、コミット、push、PR作成を練習しています。",
    category: "Tool",
  },
];

export const SkillSection = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>("All");
  const [searchText, setSearchText] = useState("");

  const filteredSkills = useMemo(() => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSearchText =
        normalizedSearchText.length === 0 ||
        skill.title.toLowerCase().includes(normalizedSearchText) ||
        skill.description.toLowerCase().includes(normalizedSearchText);

      return matchesCategory && matchesSearchText;
    });
  }, [searchText, selectedCategory]);

  const handleResetFilter = useCallback(() => {
    setSelectedCategory("All");
    setSearchText("");
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const previousTitle = document.title;

    document.title = `Skills: ${filteredSkills.length}件 | Portfolio`;

    return () => {
      document.title = previousTitle;
    };
  }, [filteredSkills.length]);

  return (
    <section id='skills'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <h2 className='text-2xl font-bold text-neutral-900'>Skills</h2>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                aria-pressed={isSelected}
                className={
                  isSelected
                    ? "rounded-full bg-neutral-950 px-4 py-2 text-sm font-bold text-white"
                    : "rounded-full border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                }
                key={category}
                onClick={() => setSelectedCategory(category)}
                type='button'
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className='mt-6 flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 md:flex-row md:items-center'>
        <input
          className='min-h-10 flex-1 rounded-lg border border-neutral-200 px-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950'
          onChange={(event) => setSearchText(event.target.value)}
          placeholder='スキル名や説明文で検索'
          ref={searchInputRef}
          type='search'
          value={searchText}
        />
        <button
          className='min-h-10 rounded-lg border border-neutral-200 px-4 text-sm font-bold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950'
          onClick={handleResetFilter}
          type='button'
        >
          Reset
        </button>
      </div>

      <div className='mt-6 grid gap-4 md:grid-cols-3'>
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.title}
            title={skill.title}
            description={skill.description}
          />
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <p className='mt-6 rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-600'>
          条件に合うスキルがありません。
        </p>
      )}
    </section>
  );
};
