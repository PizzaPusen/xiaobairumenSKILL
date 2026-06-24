import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { getPackCategories, getSubCategoriesByCategory } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { PackAccent } from "@/types";

const accentClass: Record<PackAccent, string> = {
  cyan: "glass-glow-cyan",
  violet: "glass-glow-violet",
  teal: "glass-glow-teal",
  amber: "glass-glow-amber",
  rose: "glass-glow-rose",
  emerald: "glass-glow-emerald",
};

/** Skill 大类选择页 — 六种 AIGC 制片类型（3×2） */
export function CategoryHub() {
  const categories = getPackCategories();

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="选择制片类型"
        description="六种完全不同的 AIGC 商业形态，各有独立 SOP、市场报价、对标参考与技能包"
      />

      <div className="relative mb-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="ambient-orb top-0 left-0 w-[400px] h-[400px] bg-cyan-500/15" />
          <div className="ambient-orb top-1/2 right-0 w-[360px] h-[360px] bg-violet-500/15" />
          <div className="ambient-orb bottom-0 left-1/2 w-[500px] h-[280px] bg-emerald-500/10" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = getIcon(cat.icon);
            const subCount = getSubCategoriesByCategory(cat.id).length;
            return (
              <Link key={cat.id} href={`/packs/${cat.id}`} className="group">
                <div
                  className={cn(
                    "glass-glow-card h-full min-h-[200px]",
                    accentClass[cat.accent],
                    (cat.id === "domestic-drama" || cat.id === "overseas-drama") &&
                      "glass-glow-featured"
                  )}
                >
                  <div className="relative z-10 p-6 flex flex-col h-full">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-transform group-hover:scale-105"
                      style={{
                        background: "var(--icon-bg)",
                        border: "1px solid var(--icon-border)",
                        boxShadow: "0 0 28px -4px var(--glow-color)",
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: "var(--icon-color)" }} strokeWidth={1.5} />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                      {cat.subtitle}
                    </p>
                    <h2 className="text-xl font-medium text-white mb-2">{cat.name}</h2>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1">{cat.description}</p>
                    {subCount > 0 && (
                      <p className="text-[10px] text-slate-500 mt-2">
                        含 {subCount} 个子题材 · 各有定制 SOP
                      </p>
                    )}
                    <span
                      className="text-xs inline-flex items-center gap-1 mt-4 font-medium group-hover:gap-1.5 transition-all"
                      style={{ color: "var(--link-color)" }}
                    >
                      进入制片工作流
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center">
        报价数据综合 AIGC SDM、行业平台公开价与国内制作公司 2026 Q2 区间，仅供参考
      </p>
    </div>
  );
}
