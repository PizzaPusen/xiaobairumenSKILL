import type { SkillType } from "@/types";

type SkillLike = {
  id: string;
  type?: SkillType;
  options?: unknown;
  calculator?: unknown;
  sections?: unknown;
  template?: unknown;
};

/** 从 JSON 数据推断工具类型（兼容缺失 type 字段的旧数据） */
export function resolveSkillType(skill: SkillLike): SkillType | null {
  if (skill.type) return skill.type;
  if (skill.options) return "prompt-builder";
  if (skill.calculator) return "calculator";
  if (skill.sections) return "info-card";
  if (skill.id === "ai-glossary") return "glossary";
  if (skill.template) return "template-fill";
  return null;
}
