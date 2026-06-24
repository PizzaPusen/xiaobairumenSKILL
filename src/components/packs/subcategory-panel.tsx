"use client";

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Target, Palette, Mic } from "lucide-react";
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

interface SubCategoryPanelProps {
  sub: PackSubCategory;
}

/** 子题材差异化定制内容面板 */
export function SubCategoryPanel({ sub }: SubCategoryPanelProps) {
  const SubIcon = getIcon(sub.icon);
  const accent = sub.accent ?? "teal";

  return (
    <div
      className={cn(
        "glass-glow-card rounded-2xl p-6 md:p-8 mb-8",
        accentClass[accent]
      )}
    >
      <div className="relative z-10 space-y-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
            style={{
              background: "var(--icon-bg)",
              border: "1px solid var(--icon-border)",
              boxShadow: "0 0 28px -4px var(--glow-color)",
            }}
          >
            <SubIcon className="h-6 w-6" style={{ color: "var(--icon-color)" }} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">{sub.tagline}</p>
            <h2 className="text-2xl font-medium text-white mb-2">{sub.name}</h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">{sub.description}</p>
            <p className="text-xs text-slate-500 mt-2">核心受众：{sub.audience}</p>
          </div>
        </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-cyan-500/15 bg-cyan-500/[0.04] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-cyan-200/90">钩子公式</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{sub.hookFormula}</p>
        </div>
        <div className="rounded-xl border border-violet-500/15 bg-violet-500/[0.04] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="h-4 w-4 text-violet-400" />
            <h3 className="text-sm font-medium text-violet-200/90">视觉风格</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{sub.visualStyle}</p>
        </div>
        <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-4 md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-medium text-amber-200/90">台词调性</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{sub.dialogueTone}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-3">题材专属 SOP 要点</h3>
        <ul className="grid sm:grid-cols-2 gap-2">
          {sub.sopHighlights.map((item) => (
            <li
              key={item}
              className="text-sm text-slate-400 flex gap-2 before:content-['→'] before:text-teal-400 before:shrink-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">题材报价（2026 Q2）</h3>
        <p className="text-xs text-slate-500 mb-3">{sub.pricingNote}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {sub.pricingTiers.map((tier) => (
            <div
              key={tier.level}
              className="rounded-lg border border-amber-500/10 bg-amber-500/[0.03] p-3"
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="text-amber-200/80">{tier.level}</span>
                <span className="text-amber-300 font-medium">{tier.range}</span>
              </div>
              <p className="text-[11px] text-slate-500">{tier.scenario}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-white mb-2">对标参考</h3>
          <div className="space-y-2">
            {sub.references.map((ref) => (
              <div key={ref.title} className="text-xs text-slate-400 border-l-2 border-violet-500/30 pl-3">
                <span className="text-slate-300 font-medium">{ref.title}</span>
                <span className="text-slate-600 mx-1">·</span>
                {ref.why}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-white mb-2">平台运营提示</h3>
          <ul className="space-y-1.5">
            {sub.platformTips.map((tip) => (
              <li key={tip} className="text-xs text-slate-400 flex gap-1.5">
                <span className="text-emerald-400">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {sub.toolFocus.map((tool) => (
          <Badge key={tool} className="bg-white/[0.06] text-slate-300 border-0 text-xs">
            {tool}
          </Badge>
        ))}
      </div>

      <div className="rounded-lg border border-red-500/15 bg-red-500/[0.04] p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-red-400/80" />
          <h3 className="text-sm font-medium text-red-200/80">题材红线</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {sub.taboos.map((t) => (
            <span key={t} className="text-xs text-slate-500">
              · {t}
            </span>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}