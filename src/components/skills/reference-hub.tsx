"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSkillById } from "@/lib/data";
import { Glossary } from "@/components/skills/glossary";
import { InfoCard } from "@/components/skills/info-card";
import type { InfoCardSkill } from "@/types";

const TABS = [
  { id: "glossary", label: "名词百科" },
  { id: "mj", label: "MJ 参数" },
  { id: "lighting", label: "灯光术语" },
] as const;

export type ReferenceTabId = (typeof TABS)[number]["id"];

function isReferenceTab(id: string | null): id is ReferenceTabId {
  return TABS.some((t) => t.id === id);
}

export function ReferenceHub() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const termParam = searchParams.get("term");
  const activeTab: ReferenceTabId = isReferenceTab(tabParam) ? tabParam : "glossary";

  const mjSkill = useMemo(
    () => getSkillById("mj-params-cheatsheet") as InfoCardSkill | undefined,
    []
  );
  const lightingSkill = useMemo(
    () => getSkillById("cinematic-lighting") as InfoCardSkill | undefined,
    []
  );

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <Link
        href="/skills"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回工具箱
      </Link>

      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-medium text-white mb-2">查阅中心</h1>
        <p className="text-sm text-slate-500">
          名词百科、MJ 参数与灯光术语集中速查。
          <Link href="/about" className="text-cyan-400/90 hover:text-cyan-300 ml-1">
            学习路径见使用指南
          </Link>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/[0.06] pb-4">
        {TABS.map((tab) => (
          <Link
            key={tab.id}
            href={`/skills/reference?tab=${tab.id}`}
            className={cn(
              "px-4 py-2 rounded-lg text-sm border transition-colors",
              activeTab === tab.id
                ? "bg-white/10 border-white/20 text-white"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/[0.04]"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {activeTab === "glossary" && <Glossary initialTermId={termParam} />}
      {activeTab === "mj" && mjSkill && <InfoCard skill={mjSkill} />}
      {activeTab === "lighting" && lightingSkill && <InfoCard skill={lightingSkill} />}
    </div>
  );
}
