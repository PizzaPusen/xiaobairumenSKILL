"use client";

import { PromptBuilder } from "@/components/skills/prompt-builder";
import { TemplateFill } from "@/components/skills/template-fill";
import { Calculator } from "@/components/skills/calculator";
import { InfoCard } from "@/components/skills/info-card";
import { Glossary } from "@/components/skills/glossary";
import { resolveSkillType } from "@/lib/resolve-skill-type";
import type {
  Skill,
  PromptBuilderSkill,
  TemplateFillSkill,
  CalculatorSkill,
  InfoCardSkill,
  DailyPracticeSkill,
} from "@/types";

export function SkillDetailRenderer({ skill }: { skill: Skill }) {
  const type = resolveSkillType(skill);

  switch (type) {
    case "prompt-builder":
      return <PromptBuilder skill={skill as PromptBuilderSkill} />;
    case "template-fill":
      return <TemplateFill skill={skill as TemplateFillSkill | DailyPracticeSkill} />;
    case "calculator":
      return <Calculator skill={skill as CalculatorSkill} />;
    case "info-card":
      return <InfoCard skill={skill as InfoCardSkill} />;
    case "glossary":
      return <Glossary />;
    default:
      return (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-6 text-sm text-amber-200/90">
          该工具配置不完整，请联系管理员检查 skills.json 中的 type 字段。
        </div>
      );
  }
}
