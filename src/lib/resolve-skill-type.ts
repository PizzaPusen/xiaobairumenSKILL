import type { Skill, SkillType } from "@/types";

/** 从 JSON 数据推断工具类型（兼容缺失 type 字段的旧数据） */
export function resolveSkillType(skill: Skill): SkillType | null {
  if (skill.type) return skill.type;
  if ("options" in skill && skill.options) return "prompt-builder";
  if ("calculator" in skill && skill.calculator) return "calculator";
  if ("sections" in skill && skill.sections) return "info-card";
  if (skill.id === "ai-glossary") return "glossary";
  if ("template" in skill && skill.template) return "template-fill";
  return null;
}
