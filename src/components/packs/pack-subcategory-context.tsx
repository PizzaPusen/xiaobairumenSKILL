import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import type { PackAccent, PackCategoryId, PackSubCategory } from "@/types";

const accentClass: Record<PackAccent, string> = {
  cyan: "glass-glow-cyan",
  violet: "glass-glow-violet",
  teal: "glass-glow-teal",
  amber: "glass-glow-amber",
  rose: "glass-glow-rose",
  emerald: "glass-glow-emerald",
};

interface PackSubcategoryContextProps {
  categoryId: PackCategoryId;
  sub: PackSubCategory;
}

/** Skill 详情页 — 子题材上下文条 */
export function PackSubcategoryContext({ categoryId, sub }: PackSubcategoryContextProps) {
  const SubIcon = getIcon(sub.icon);
  const accent = sub.accent ?? "teal";
  const backHref = `/packs/${categoryId}?sub=${sub.id}`;

  return (
    <div className={cn("glass-glow-card rounded-2xl p-5 md:p-6 mb-6", accentClass[accent])}>
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
              style={{
                background: "var(--icon-bg)",
                border: "1px solid var(--icon-border)",
              }}
            >
              <SubIcon className="h-5 w-5" style={{ color: "var(--icon-color)" }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                所属子题材 · {sub.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-medium text-white">{sub.name}</h2>
                <Badge className="bg-white/[0.08] text-slate-300 border-0 text-[10px]">
                  子题材 Skill
                </Badge>
              </div>
            </div>
          </div>
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
          >
            查看子题材指南
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-cyan-200/90">钩子公式</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{sub.hookFormula}</p>
        </div>
      </div>
    </div>
  );
}
