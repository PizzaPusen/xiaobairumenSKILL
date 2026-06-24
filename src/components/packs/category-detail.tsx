"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Users, Film, DollarSign, BookMarked, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubCategoryPanel } from "@/components/packs/subcategory-panel";
import { SubCategorySelector } from "@/components/packs/subcategory-selector";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { isSeedancePack } from "@/types";
import type { AnyPack, PackCategory, PackAccent, PackSubCategory } from "@/types";

const ROLE_TAGS = [
  "分镜 Skill",
  "制片全流程",
  "钩子脚本",
  "投流变现",
  "视觉锁定",
  "英文脚本",
  "风格锁定",
  "量产管线",
  "平台运营",
  "投递发行",
  "后期交付",
  "合规审查",
  "交付规范",
  "ROI优化",
  "素材脚本",
] as const;

function getPackRoleLabel(pack: AnyPack): string {
  if (isSeedancePack(pack)) return "分镜 Skill";
  const role = pack.tags.find((t) => (ROLE_TAGS as readonly string[]).includes(t));
  return role || "制片 SOP";
}

const accentClass: Record<PackAccent, string> = {
  cyan: "glass-glow-cyan",
  violet: "glass-glow-violet",
  teal: "glass-glow-teal",
  amber: "glass-glow-amber",
  rose: "glass-glow-rose",
  emerald: "glass-glow-emerald",
};

interface CategoryDetailProps {
  category: PackCategory;
  packs: AnyPack[];
  subCategories?: PackSubCategory[];
}

const sectionClass = "glass rounded-2xl p-6 md:p-8 mb-6 border-slate-400/10";

export function CategoryDetail({
  category,
  packs,
  subCategories = [],
}: CategoryDetailProps) {
  const searchParams = useSearchParams();
  const Icon = getIcon(category.icon);
  const hasSubs = subCategories.length > 0;
  const subFromUrl = searchParams.get("sub");
  const defaultSubId =
    subFromUrl && subCategories.some((s) => s.id === subFromUrl)
      ? subFromUrl
      : (subCategories[0]?.id ?? "");
  const [activeSubId, setActiveSubId] = useState(defaultSubId);

  const handleSubChange = useCallback(
    (id: string) => {
      setActiveSubId(id);
      const url = new URL(window.location.href);
      url.searchParams.set("sub", id);
      window.history.replaceState(null, "", url.pathname + url.search);
    },
    []
  );

  const activeSub = subCategories.find((s) => s.id === activeSubId);
  const visiblePacks = hasSubs
    ? packs.filter((p) => p.subCategoryId === activeSubId)
    : packs;

  const packCounts = hasSubs
    ? Object.fromEntries(
        subCategories.map((sub) => [
          sub.id,
          packs.filter((p) => p.subCategoryId === sub.id).length,
        ])
      )
    : {};

  return (
    <div className="animate-fade-in">
      <Link
        href="/packs"
        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回类型选择
      </Link>

      <div className={cn("glass-glow-card mb-8 p-8", accentClass[category.accent])}>
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl shrink-0"
              style={{
                background: "var(--icon-bg)",
                border: "1px solid var(--icon-border)",
                boxShadow: "0 0 32px -4px var(--glow-color)",
              }}
            >
              <Icon className="h-7 w-7" style={{ color: "var(--icon-color)" }} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                {category.subtitle}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-medium text-white">
                {category.name}
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl leading-relaxed">{category.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { icon: Clock, label: "典型时长", value: category.overview.typicalDuration },
              { icon: Film, label: "交付周期", value: category.overview.deliveryCycle },
              { icon: Users, label: "团队规模", value: category.overview.teamSize },
              { icon: DollarSign, label: "客户画像", value: category.overview.clientProfile },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3"
              >
                <item.icon className="h-4 w-4 text-slate-500 mb-1.5" />
                <p className="text-[10px] text-slate-500 mb-0.5">{item.label}</p>
                <p className="text-xs text-slate-300 leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {hasSubs && (
        <SubCategorySelector
          subCategories={subCategories}
          activeId={activeSubId}
          onChange={handleSubChange}
          packCounts={packCounts}
          categoryAccent={category.accent}
        />
      )}

      {hasSubs && activeSub && <SubCategoryPanel sub={activeSub} />}

      <p className="text-sm text-slate-400 mb-8 leading-relaxed max-w-3xl">
        {category.overview.positioning}
      </p>

      {/* 通用 SOP */}
      <section className={sectionClass}>
        <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-cyan-400" />
          {hasSubs ? "通用制片 SOP" : "制作 SOP"}
        </h2>
        <div className="space-y-4">
          {category.sop.map((phase) => (
            <div
              key={phase.phase}
              className="relative pl-6 border-l border-cyan-500/20 pb-2 last:pb-0"
            >
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-cyan-500/40 border border-cyan-400/60" />
              <div className="flex flex-wrap items-baseline gap-2 mb-2">
                <h3 className="font-medium text-white">{phase.phase}</h3>
                <Badge className="text-[10px] bg-cyan-500/10 text-cyan-300/80 border-cyan-500/20">
                  {phase.duration}
                </Badge>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">任务</p>
                  <ul className="space-y-1 text-slate-400">
                    {phase.tasks.map((t) => (
                      <li key={t} className="flex gap-1.5 before:content-['·'] before:text-cyan-500">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">交付物</p>
                  <ul className="space-y-1 text-slate-400">
                    {phase.deliverables.map((d) => (
                      <li key={d} className="flex gap-1.5 before:content-['·'] before:text-violet-400">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">工具</p>
                  <div className="flex flex-wrap gap-1">
                    {phase.tools.map((tool) => (
                      <Badge key={tool} className="text-[10px] bg-white/[0.06] text-slate-400 border-0">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 报价 */}
      <section className={sectionClass}>
        <h2 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-amber-400" />
          市面报价（2026 Q2 · {category.id === "overseas-drama" ? "出海" : "国内"}）
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          来源：{category.pricing.source} · 更新：{category.pricing.updatedAt}
        </p>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">{category.pricing.note}</p>
        <div className="grid gap-3 md:grid-cols-2 mb-6">
          {category.pricing.tiers.map((tier) => (
            <div
              key={tier.level}
              className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-4"
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-medium text-amber-200/90 text-sm">{tier.level}</h3>
                <span className="text-amber-300 font-semibold text-sm whitespace-nowrap">
                  {tier.range}
                </span>
              </div>
              {tier.perUnit && (
                <p className="text-[10px] text-slate-500 mb-1">规格：{tier.perUnit}</p>
              )}
              <p className="text-xs text-slate-500 mb-2">周期：{tier.cycle}</p>
              <p className="text-xs text-slate-400 mb-2">{tier.scenario}</p>
            </div>
          ))}
        </div>
        {category.pricing.comparison && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-500 text-left">
                  <th className="pb-2 pr-4 font-medium">类型</th>
                  <th className="pb-2 pr-4 font-medium">AI 制作</th>
                  <th className="pb-2 pr-4 font-medium">传统拍摄</th>
                  <th className="pb-2 font-medium">节省</th>
                </tr>
              </thead>
              <tbody>
                {category.pricing.comparison.map((row) => (
                  <tr key={row.type} className="border-b border-white/[0.04]">
                    <td className="py-2.5 pr-4 text-slate-300">{row.type}</td>
                    <td className="py-2.5 pr-4 text-cyan-300">{row.ai}</td>
                    <td className="py-2.5 pr-4 text-slate-500">{row.traditional}</td>
                    <td className="py-2.5 text-emerald-400/80">{row.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {!hasSubs && (
        <section className={sectionClass}>
          <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <Film className="h-5 w-5 text-violet-400" />
            对标影片 / 案例参考
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {category.references.map((ref) => (
              <div
                key={ref.title}
                className="rounded-xl border border-violet-500/15 bg-violet-500/[0.04] p-4"
              >
                <h3 className="font-medium text-white text-sm">{ref.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{ref.why}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={sectionClass}>
        <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-teal-400" />
          制作工具栈
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {category.toolStack.map((stack) => (
            <div
              key={stack.category}
              className="rounded-xl border border-teal-500/15 bg-teal-500/[0.04] p-4"
            >
              <h3 className="font-medium text-teal-200/90 text-sm mb-1">{stack.category}</h3>
              <p className="text-xs text-slate-500 mb-2">{stack.purpose}</p>
              <div className="flex flex-wrap gap-1">
                {stack.tools.map((t) => (
                  <Badge key={t} className="text-[10px] bg-white/[0.06] text-slate-300 border-0">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 技能包 */}
      <section>
        <h2 className="text-lg font-medium text-white mb-1">
          {hasSubs && activeSub ? `「${activeSub.name}」Skill` : "本类型 Skill"}
          <span className="text-slate-500 font-normal ml-2">（{visiblePacks.length}）</span>
        </h2>
        {hasSubs && (
          <p className="text-xs text-slate-500 mb-4">
            已在上方选择子题材，下方展示该赛道的专属 Skill
          </p>
        )}
        {visiblePacks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-12 text-center">
            <p className="text-sm text-slate-400">「{activeSub?.name ?? category.name}」专属 Skill 即将上线</p>
            <p className="text-xs text-slate-600 mt-2">可先参考上方子题材 SOP 与通用制片流程</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePacks.map((pack) => {
              const PackIcon = getIcon(pack.icon);
              return (
                <Link key={pack.id} href={`/packs/${category.id}/${pack.id}`}>
                  <Card className="h-full cursor-pointer group hover:border-white/20">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06]">
                          <PackIcon className="h-5 w-5 text-foreground/90" />
                        </div>
                        <Badge className="text-[10px] bg-white/[0.06] text-slate-400 border-0 shrink-0">
                          {getPackRoleLabel(pack)}
                        </Badge>
                      </div>
                      <CardTitle className="text-base mt-2 leading-snug group-hover:text-white transition-colors">
                        {pack.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {pack.description}
                      </p>
                      <span className="text-xs text-cyan-400 inline-flex items-center gap-1">
                        打开 <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
