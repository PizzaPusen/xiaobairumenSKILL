"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSkillById } from "@/lib/data";
import {
  CREATION_TOOL_IDS,
  TOOL_NEXT_STEPS,
} from "@/lib/toolbox-config";
import { SkillGuide } from "@/components/skills/skill-guide";
import type { Skill } from "@/types";

const SIBLING_SHORT: Record<string, string> = {
  "prompt-cinematic": "提示词",
  "storyboard-template": "分镜",
  "sd-negative-prompts": "负向词",
  "brief-to-storyboard": "Brief",
};

interface SkillDetailChromeProps {
  skill: Skill;
  children: React.ReactNode;
}

export function SkillDetailChrome({ skill, children }: SkillDetailChromeProps) {
  const siblings = CREATION_TOOL_IDS.includes(
    skill.id as (typeof CREATION_TOOL_IDS)[number]
  )
    ? CREATION_TOOL_IDS.map((id) => getSkillById(id)).filter(Boolean) as Skill[]
    : [];

  const nextSteps = TOOL_NEXT_STEPS[skill.id] ?? [];

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-24 lg:pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          工具箱
        </Link>
        <Link
          href="/about"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          第一次用？查看使用指南
        </Link>
      </div>

      <h1 className="font-display text-xl md:text-2xl font-medium text-white mb-4">
        {skill.name}
      </h1>

      {siblings.length > 0 && (
        <nav className="flex flex-wrap gap-1.5 mb-5 pb-4 border-b border-white/[0.06]">
          {siblings.map((s) => (
            <Link
              key={s.id}
              href={`/skills/${s.id}`}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs border transition-colors",
                s.id === skill.id
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-white/[0.08] text-slate-500 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {SIBLING_SHORT[s.id] ?? s.name}
            </Link>
          ))}
        </nav>
      )}

      {skill.guide && (
        <SkillGuide guide={skill.guide} skillId={skill.id} showAboutLink />
      )}

      {children}

      {nextSteps.length > 0 && (
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-slate-500 mb-3">下一步</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {nextSteps.map((step) => (
              <Link
                key={step.href}
                href={step.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 hover:border-white/15 hover:bg-white/[0.04] transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-white">{step.label}</p>
                  {step.description && (
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
