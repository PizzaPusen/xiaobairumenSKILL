import { notFound } from "next/navigation";
import { getSkillsForStaticParams, getSkillById } from "@/lib/data";
import { SkillDetailChrome } from "@/components/skills/skill-detail-chrome";
import { SkillDetailRenderer } from "@/components/skills/skill-detail-renderer";
import { InstantRedirect } from "@/components/instant-redirect";
import type { Skill } from "@/types";

interface SkillDetailPageProps {
  params: { id: string };
}

const REFERENCE_REDIRECT: Record<string, string> = {
  "ai-glossary": "glossary",
  "mj-params-cheatsheet": "mj",
  "cinematic-lighting": "lighting",
};

export function generateStaticParams() {
  return getSkillsForStaticParams().map((skill) => ({ id: skill.id }));
}

export function generateMetadata({ params }: SkillDetailPageProps) {
  const skill = getSkillById(params.id);
  if (!skill) return { title: "工具未找到" };
  return {
    title: `${skill.name} - AIGC 片场`,
    description: skill.description,
  };
}

export default function SkillDetailPage({ params }: SkillDetailPageProps) {
  const skill = getSkillById(params.id);
  if (!skill) notFound();

  const refTab = REFERENCE_REDIRECT[params.id];
  if (refTab) {
    return <InstantRedirect href={`/skills/reference/?tab=${refTab}`} />;
  }

  return (
    <SkillDetailChrome skill={skill}>
      <SkillDetailRenderer skill={skill} />
    </SkillDetailChrome>
  );
}
