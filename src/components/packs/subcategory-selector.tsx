"use client";

import { Check, Layers } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { PackAccent, PackSubCategory } from "@/types";

const accentClass: Record<PackAccent, string> = {
  cyan: "glass-glow-cyan",
  violet: "glass-glow-violet",
  teal: "glass-glow-teal",
  amber: "glass-glow-amber",
  rose: "glass-glow-rose",
  emerald: "glass-glow-emerald",
};

interface SubCategorySelectorProps {
  subCategories: PackSubCategory[];
  activeId: string;
  onChange: (id: string) => void;
  packCounts?: Record<string, number>;
  categoryAccent: PackAccent;
}

/** 子题材选择器 — 大卡片网格 + 吸顶，主交互入口 */
export function SubCategorySelector({
  subCategories,
  activeId,
  onChange,
  packCounts = {},
  categoryAccent,
}: SubCategorySelectorProps) {
  const activeSub = subCategories.find((s) => s.id === activeId);

  return (
    <section className="mb-8 -mx-1">
      <div className="sticky top-3 z-30 rounded-2xl border border-white/10 bg-[#0a0e17]/85 backdrop-blur-xl p-4 md:p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                accentClass[categoryAccent]
              )}
              style={{
                background: "var(--icon-bg)",
                border: "1px solid var(--icon-border)",
                boxShadow: "0 0 24px -4px var(--glow-color)",
              }}
            >
              <Layers className="h-5 w-5" style={{ color: "var(--icon-color)" }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Step 1</p>
              <h2 className="text-lg md:text-xl font-medium text-white">选择子题材</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-500/15 border border-violet-400/25 px-3 py-1 text-xs text-violet-200">
              共 {subCategories.length} 个赛道
            </span>
            {activeSub && (
              <span className="hidden sm:inline text-xs text-slate-400">
                当前：<span className="text-white">{activeSub.name}</span>
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5 md:gap-3 max-h-[min(52vh,420px)] overflow-y-auto pr-1 subcategory-scroll">
          {subCategories.map((sub) => {
            const SubIcon = getIcon(sub.icon);
            const isActive = sub.id === activeId;
            const accent = sub.accent ?? categoryAccent;
            const packCount = packCounts[sub.id] ?? 0;

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onChange(sub.id)}
                className={cn(
                  "glass-glow-card relative text-left p-3 md:p-4 min-h-[88px] md:min-h-[96px] transition-all duration-200",
                  accentClass[accent],
                  isActive
                    ? "glass-glow-featured scale-[1.02] z-10 ring-2 ring-white/25"
                    : "opacity-80 hover:opacity-100 hover:scale-[1.01]"
                )}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <div
                      className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg shrink-0"
                      style={{
                        background: "var(--icon-bg)",
                        border: "1px solid var(--icon-border)",
                      }}
                    >
                      <SubIcon className="h-4 w-4 md:h-[18px] md:w-[18px]" style={{ color: "var(--icon-color)" }} />
                    </div>
                    {isActive && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-[15px] font-medium text-white leading-tight">{sub.name}</p>
                  <p className="text-[10px] md:text-[11px] text-slate-400 mt-1 line-clamp-1">{sub.tagline}</p>
                  {packCount > 0 ? (
                    <span className="mt-auto pt-2 text-[10px] font-medium text-emerald-400/90">
                      {packCount} 个 Skill
                    </span>
                  ) : (
                    <span className="mt-auto pt-2 text-[10px] text-slate-600">即将上线</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
