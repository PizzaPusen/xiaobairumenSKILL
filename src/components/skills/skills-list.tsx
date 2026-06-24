"use client";

import Link from "next/link";
import { Search, ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { getIcon } from "@/lib/icons";
import { getToolboxSkillsByCategory } from "@/lib/data";
import { TOOLBOX_TASKS, SCENARIO_FILTERS } from "@/lib/toolbox-config";
import { searchToolbox } from "@/lib/toolbox-search";
import { useSkillsWithDrafts } from "@/hooks/use-toolbox-draft";
import { cn } from "@/lib/utils";
import type { Skill, ToolboxCategory, ToolboxScenario } from "@/types";

const CATEGORY_META: Record<Exclude<ToolboxCategory, "reference">, string> = {
  creation: "创作工作台",
  utility: "制片小工具",
  practice: "练习",
};

const TYPE_BADGE: Record<Exclude<ToolboxCategory, "reference">, string> = {
  creation: "创作",
  utility: "计算",
  practice: "练习",
};

function SectionHeading({ title }: { title: string }) {
  return <h2 className="text-base font-medium text-white mb-3">{title}</h2>;
}

interface SkillCardProps {
  skill: Skill;
  badge: string;
  hasDraft?: boolean;
}

function SkillCard({ skill, badge, hasDraft }: SkillCardProps) {
  const Icon = getIcon(skill.icon);
  return (
    <Link
      href={`/skills/${skill.id}`}
      className="group flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 hover:border-white/15 hover:bg-white/[0.04] transition-colors"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] mt-0.5">
        <Icon className="h-[18px] w-[18px] text-foreground/85" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-white">{skill.name}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-slate-500">
            {badge}
          </span>
          {hasDraft && (
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-amber-500/30 text-amber-400/90">
              继续编辑
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
          {skill.description}
        </p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 group-hover:text-slate-400 mt-1 transition-colors" />
    </Link>
  );
}

function ReferenceCenterBar({ highlight }: { highlight?: boolean }) {
  return (
    <Link
      href="/skills/reference"
      className={cn(
        "group flex items-start gap-3.5 rounded-xl border px-4 py-3.5 transition-colors",
        "border-cyan-500/20 bg-cyan-500/[0.04] hover:border-cyan-500/35 hover:bg-cyan-500/[0.07]",
        highlight && "ring-1 ring-cyan-500/30"
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 mt-0.5">
        <BookOpen className="h-[18px] w-[18px] text-cyan-300" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">查阅中心</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-cyan-500/25 text-cyan-400">
            查阅
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mt-1">
          名词百科 · MJ 参数 · 灯光术语，一页集中速查
        </p>
      </div>
      <span className="shrink-0 text-xs text-cyan-400 inline-flex items-center gap-0.5 mt-1">
        进入
        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}

function matchesScenario(skill: Skill, scenario: ToolboxScenario): boolean {
  return skill.scenario === scenario;
}

export function SkillsList() {
  const [query, setQuery] = useState("");
  const [scenarioFilter, setScenarioFilter] = useState<"all" | ToolboxScenario>("all");

  const creation = getToolboxSkillsByCategory("creation");
  const utility = getToolboxSkillsByCategory("utility");
  const practice = getToolboxSkillsByCategory("practice");
  const listableIds = useMemo(
    () => [...creation, ...utility, ...practice].map((s) => s.id),
    [
      creation.map((s) => s.id).join("|"),
      utility.map((s) => s.id).join("|"),
      practice.map((s) => s.id).join("|"),
    ]
  );
  const allListable = useMemo(
    () => [...creation, ...utility, ...practice],
    [listableIds.join("|")]
  );
  const draftIds = useSkillsWithDrafts(listableIds);

  const q = query.toLowerCase().trim();
  const searchResults = useMemo(() => (q ? searchToolbox(q) : null), [q]);

  const filterByScenario = (list: Skill[]) => {
    if (scenarioFilter === "all") return list;
    return list.filter((s) => matchesScenario(s, scenarioFilter));
  };

  const filteredCreation = useMemo(
    () => filterByScenario(creation),
    [creation, scenarioFilter]
  );
  const filteredUtility = useMemo(
    () => filterByScenario(utility),
    [utility, scenarioFilter]
  );
  const filteredPractice = useMemo(
    () => filterByScenario(practice),
    [practice, scenarioFilter]
  );

  const showReference =
    scenarioFilter === "all" || scenarioFilter === "reference" || !!searchResults?.terms.length;
  const showSections = !q;

  const hasListResults =
    !q &&
    (filteredCreation.length > 0 ||
      filteredUtility.length > 0 ||
      filteredPractice.length > 0 ||
      showReference);

  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-medium text-white mb-1.5">工具箱</h1>
        <p className="text-sm text-slate-500">创作小工具与速查手册，本地即开即用</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {TOOLBOX_TASKS.map((task) => (
          <Link
            key={task.id}
            href={task.href}
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-3 hover:border-white/15 hover:bg-white/[0.04] transition-colors"
          >
            <p className="text-sm font-medium text-white">{task.label}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{task.description}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {SCENARIO_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setScenarioFilter(f.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs border transition-colors",
              scenarioFilter === f.id
                ? "bg-white/10 border-white/20 text-white"
                : "border-white/[0.08] text-slate-500 hover:text-white hover:bg-white/[0.04]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索工具或名词（如 CFG、分镜）..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-10"
        />
      </div>

      {searchResults && q ? (
        <div className="space-y-6">
          {searchResults.tools.length > 0 && (
            <section>
              <SectionHeading title="工具" />
              <div className="grid gap-2 sm:grid-cols-2">
                {searchResults.tools.map(({ skill }) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    badge={TYPE_BADGE[skill.toolboxCategory as keyof typeof TYPE_BADGE] ?? "工具"}
                    hasDraft={draftIds.has(skill.id)}
                  />
                ))}
              </div>
            </section>
          )}
          {searchResults.terms.length > 0 && (
            <section>
              <SectionHeading title="名词百科" />
              <div className="space-y-2">
                {searchResults.terms.map((hit) => (
                  <Link
                    key={hit.id}
                    href={hit.href}
                    className="block rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{hit.term}</span>
                      {hit.termEn && (
                        <span className="text-xs text-slate-600 font-mono">{hit.termEn}</span>
                      )}
                      <span className="text-[10px] text-slate-600 ml-auto">{hit.categoryLabel}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{hit.snippet}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {searchResults.tools.length === 0 && searchResults.terms.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              <p>没有找到匹配的工具或名词</p>
            </div>
          )}
        </div>
      ) : !hasListResults ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          <p>该场景下暂无工具</p>
        </div>
      ) : (
        <div className="space-y-8">
          {showReference && (
            <section>
              {showSections && <SectionHeading title="查阅中心" />}
              <ReferenceCenterBar />
            </section>
          )}

          {filteredCreation.length > 0 && (
            <section>
              {showSections && <SectionHeading title={CATEGORY_META.creation} />}
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredCreation.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    badge={TYPE_BADGE.creation}
                    hasDraft={draftIds.has(skill.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {(filteredUtility.length > 0 || filteredPractice.length > 0) && (
            <section className="grid gap-8 sm:grid-cols-2">
              {filteredUtility.length > 0 && (
                <div>
                  {showSections && <SectionHeading title={CATEGORY_META.utility} />}
                  <div className="grid gap-3">
                    {filteredUtility.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        badge={TYPE_BADGE.utility}
                        hasDraft={draftIds.has(skill.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {filteredPractice.length > 0 && (
                <div>
                  {showSections && <SectionHeading title={CATEGORY_META.practice} />}
                  <div className="grid gap-3">
                    {filteredPractice.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        badge={TYPE_BADGE.practice}
                        hasDraft={draftIds.has(skill.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {!query && (
        <p className="text-xs text-slate-600 mt-8">
          {allListable.length} 个工具 + 查阅中心（3 类速查）
        </p>
      )}
    </div>
  );
}
