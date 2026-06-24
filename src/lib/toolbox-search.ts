import { getGlossary, getToolboxSkills } from "@/lib/data";
import type { Skill } from "@/types";

export interface GlossarySearchHit {
  type: "term";
  id: string;
  term: string;
  termEn?: string;
  snippet: string;
  href: string;
  categoryLabel: string;
}

export interface ToolSearchHit {
  type: "tool";
  skill: Skill;
}

export function searchToolbox(
  query: string
): { tools: ToolSearchHit[]; terms: GlossarySearchHit[] } {
  const q = query.toLowerCase().trim();
  if (!q) return { tools: [], terms: [] };

  const tools = getToolboxSkills()
    .filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    )
    .map((skill) => ({ type: "tool" as const, skill }));

  const glossary = getGlossary();
  const terms: GlossarySearchHit[] = [];

  for (const cat of glossary.categories) {
    for (const t of cat.terms) {
      const hay = [t.term, t.termEn ?? "", t.definition, ...(t.alias ?? [])]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) continue;
      terms.push({
        type: "term",
        id: t.id,
        term: t.term,
        termEn: t.termEn,
        snippet: t.definition.slice(0, 72) + (t.definition.length > 72 ? "…" : ""),
        href: `/skills/reference?tab=glossary&term=${t.id}`,
        categoryLabel: cat.label,
      });
    }
  }

  return { tools: tools.slice(0, 8), terms: terms.slice(0, 8) };
}
