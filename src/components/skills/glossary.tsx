"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, Link2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getGlossary } from "@/lib/data";
import { TERM_TOOL_LINKS } from "@/lib/toolbox-config";
import type { GlossaryCategoryId, GlossaryTerm } from "@/types";

const CATEGORY_TAB: Record<GlossaryCategoryId, { label: string; accent: string }> = {
  aigc: { label: "AIGC 生成", accent: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10" },
  film: { label: "影视", accent: "border-violet-500/30 text-violet-300 bg-violet-500/10" },
  agent: { label: "AI Agent", accent: "border-amber-500/30 text-amber-300 bg-amber-500/10" },
};

function getToolLink(term: GlossaryTerm): { label: string; href: string } | null {
  if (TERM_TOOL_LINKS[term.term]) return TERM_TOOL_LINKS[term.term];
  if (term.termEn && TERM_TOOL_LINKS[term.termEn]) return TERM_TOOL_LINKS[term.termEn];
  for (const rel of term.related ?? []) {
    if (TERM_TOOL_LINKS[rel]) return TERM_TOOL_LINKS[rel];
  }
  return null;
}

function TermCard({
  term,
  categoryId,
  termMap,
  defaultOpen,
}: {
  term: GlossaryTerm;
  categoryId: GlossaryCategoryId;
  termMap: Map<string, { term: GlossaryTerm; categoryId: GlossaryCategoryId }>;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const ref = useRef<HTMLDivElement>(null);
  const accent = CATEGORY_TAB[categoryId].accent;
  const toolLink = getToolLink(term);

  useEffect(() => {
    if (defaultOpen) {
      setOpen(true);
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [defaultOpen]);

  return (
    <div
      ref={ref}
      id={`term-${term.id}`}
      className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-3 p-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-medium text-white">{term.term}</span>
            {term.termEn && (
              <span className="text-xs text-slate-500 font-mono">{term.termEn}</span>
            )}
          </div>
          {term.alias && term.alias.length > 0 && (
            <p className="text-[11px] text-slate-600">别名：{term.alias.join("、")}</p>
          )}
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-slate-500 shrink-0 mt-1" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 mt-1" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/[0.06]">
          <p className="text-sm text-slate-300 leading-relaxed pt-3">{term.definition}</p>
          {toolLink && (
            <Link
              href={toolLink.href}
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
            >
              <ExternalLink className="h-3 w-3" />
              去工具：{toolLink.label}
            </Link>
          )}
          {term.example && (
            <div className={cn("rounded-lg border px-3 py-2.5 text-sm", accent)}>
              <p className="text-[10px] uppercase tracking-wider opacity-70 mb-1">示例</p>
              <p className="text-slate-300 leading-relaxed font-mono text-xs">{term.example}</p>
            </div>
          )}
          {term.related && term.related.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <Link2 className="h-3 w-3 text-slate-600" />
              <span className="text-[11px] text-slate-600">相关：</span>
              {term.related.map((name) => {
                const linked = termMap.get(name);
                return (
                  <span
                    key={name}
                    className="text-[10px] px-2 py-0.5 rounded-md border border-white/10 text-slate-400"
                  >
                    {linked ? linked.term.term : name}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface GlossaryProps {
  initialTermId?: string | null;
}

export function Glossary({ initialTermId }: GlossaryProps) {
  const glossary = getGlossary();
  const [category, setCategory] = useState<GlossaryCategoryId>("aigc");
  const [query, setQuery] = useState("");

  const termMap = useMemo(() => {
    const map = new Map<string, { term: GlossaryTerm; categoryId: GlossaryCategoryId }>();
    for (const cat of glossary.categories) {
      for (const t of cat.terms) {
        map.set(t.term, { term: t, categoryId: cat.id });
        map.set(t.id, { term: t, categoryId: cat.id });
        if (t.termEn) map.set(t.termEn, { term: t, categoryId: cat.id });
        t.alias?.forEach((a) => map.set(a, { term: t, categoryId: cat.id }));
      }
    }
    return map;
  }, [glossary]);

  useEffect(() => {
    if (!initialTermId) return;
    const hit = termMap.get(initialTermId);
    if (hit) setCategory(hit.categoryId);
  }, [initialTermId, termMap]);

  const activeCategory = glossary.categories.find((c) => c.id === category)!;

  const filteredTerms = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return activeCategory.terms;
    return activeCategory.terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.termEn?.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.alias?.some((a) => a.toLowerCase().includes(q))
    );
  }, [activeCategory, query]);

  const totalCount = glossary.categories.reduce((n, c) => n + c.terms.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {glossary.categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setCategory(cat.id);
              setQuery("");
            }}
            className={cn(
              "px-4 py-2 rounded-xl text-sm border transition-colors",
              category === cat.id
                ? CATEGORY_TAB[cat.id].accent
                : "border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.04]"
            )}
          >
            {CATEGORY_TAB[cat.id].label}
            <span className="ml-1.5 text-xs opacity-60">({cat.terms.length})</span>
          </button>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`在「${CATEGORY_TAB[category].label}」中搜索名词...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <p className="text-xs text-slate-600">
        共 {totalCount} 个词条 · 当前 {filteredTerms.length} 个
      </p>

      {filteredTerms.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p>没有找到匹配的名词</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTerms.map((term) => (
            <TermCard
              key={term.id}
              term={term}
              categoryId={category}
              termMap={termMap}
              defaultOpen={initialTermId === term.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
