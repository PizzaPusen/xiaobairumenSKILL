"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Calendar, Newspaper, Globe2, LayoutList, Clapperboard } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { IndustryNewsItem, NewsCategory, FilmWatchBlock } from "@/types";
import { FilmWatchPanels } from "@/components/news/film-watch-panels";

const CATEGORY_LABEL: Record<NewsCategory, string> = {
  ai: "AI 行业",
  film: "影视行业",
  policy: "政策合规",
};

const CATEGORY_STYLE: Record<NewsCategory, string> = {
  ai: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  film: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  policy: "bg-amber-500/15 text-amber-300 border-amber-500/25",
};

const REGION_LABEL: Record<NonNullable<IndustryNewsItem["region"]>, string> = {
  intl: "国际一线",
  cn: "国内",
  both: "中外双线",
};

const REGION_STYLE: Record<NonNullable<IndustryNewsItem["region"]>, string> = {
  intl: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  cn: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  both: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
};

const NEWS_FILTERS: Array<{ id: "all" | NewsCategory; label: string }> = [
  { id: "all", label: "全部" },
  { id: "ai", label: "AI 行业" },
  { id: "film", label: "影视行业" },
  { id: "policy", label: "政策合规" },
];

type ViewMode = "news" | "topics";

interface NewsFeedProps {
  items: IndustryNewsItem[];
  watchBlocks?: FilmWatchBlock[];
  updatedAt: string;
  cutoffDate: string;
}

export function NewsFeed({ items, watchBlocks = [], updatedAt, cutoffDate }: NewsFeedProps) {
  const hasTopics = watchBlocks.length > 0;
  const [view, setView] = useState<ViewMode>("news");
  const [filter, setFilter] = useState<"all" | NewsCategory>("all");
  const [topicId, setTopicId] = useState(watchBlocks[0]?.id ?? "");

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [items, filter]
  );

  const intlCount = items.filter((i) => i.region === "intl" || i.region === "both").length;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <PageHeader
        title="AI 资讯"
        description={
          view === "topics"
            ? "影视专题：短剧热榜、AI 电影与电影节成绩，附可核验来源"
            : "近两个月 AI 与影视行业快讯，国外一手报道附中英双语摘要"
        }
      />

      {/* 一级：资讯 vs 专题 */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/[0.06]">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setView("news")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border transition-colors",
              view === "news"
                ? "bg-white/10 border-white/20 text-white"
                : "border-white/[0.08] text-slate-500 hover:text-white hover:bg-white/[0.04]"
            )}
          >
            <LayoutList className="h-4 w-4" />
            资讯快报
          </button>
          {hasTopics && (
            <button
              type="button"
              onClick={() => setView("topics")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border transition-colors",
                view === "topics"
                  ? "bg-violet-500/15 border-violet-500/30 text-violet-200"
                  : "border-white/[0.08] text-slate-500 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <Clapperboard className="h-4 w-4" />
              影视专题
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-400">
                {watchBlocks.length}
              </span>
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {view === "news" && (
            <span className="flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5" />
              国际来源 {intlCount} 条
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {cutoffDate} 起 · 更新 {updatedAt}
          </span>
        </div>
      </div>

      {view === "topics" && hasTopics ? (
        <FilmWatchPanels blocks={watchBlocks} activeId={topicId} onSelect={setTopicId} />
      ) : (
        <>
          {/* 二级：资讯分类（仅资讯快报） */}
          <div className="flex flex-wrap gap-2 mb-5">
            {NEWS_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs border transition-colors",
                  filter === f.id
                    ? "bg-white/10 border-white/20 text-white"
                    : "border-white/[0.08] text-slate-500 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {f.label}
              </button>
            ))}
            <span className="text-xs text-slate-600 self-center ml-1">
              共 {filtered.length} 条
            </span>
          </div>

          <div className="space-y-3">
            {filtered.map((item, index) => (
              <article
                key={item.id}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 md:p-5 hover:border-white/15 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <time className="text-xs text-slate-500 font-mono">{item.date}</time>
                  <Badge className={cn("text-[10px] border", CATEGORY_STYLE[item.category])}>
                    {CATEGORY_LABEL[item.category]}
                  </Badge>
                  {item.region && (
                    <Badge className={cn("text-[10px] border", REGION_STYLE[item.region])}>
                      {REGION_LABEL[item.region]}
                    </Badge>
                  )}
                  {index === 0 && filter === "all" && (
                    <Badge className="text-[10px] bg-rose-500/15 text-rose-300 border-rose-500/25">
                      最新
                    </Badge>
                  )}
                </div>

                <h2 className="text-base font-medium text-white mb-1 leading-snug">{item.title}</h2>
                {item.titleEn && (
                  <p className="text-xs text-slate-500 leading-relaxed mb-2 line-clamp-2">
                    {item.titleEn}
                  </p>
                )}

                <p className="text-sm text-slate-300 leading-relaxed mb-3 line-clamp-4">
                  {item.summary}
                </p>

                {item.summaryEn && (
                  <details className="rounded-lg border border-white/[0.06] bg-white/[0.02] mb-3 group">
                    <summary className="px-3 py-2 text-[11px] text-slate-500 cursor-pointer hover:text-slate-400 select-none">
                      展开英文摘要
                    </summary>
                    <p className="px-3 pb-3 text-xs text-slate-400 leading-relaxed border-t border-white/[0.04] pt-2">
                      {item.summaryEn}
                    </p>
                  </details>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.04]">
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="hidden sm:inline">{item.source}</span>
                    {item.sourceUrl && (
                      <Link
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 shrink-0"
                      >
                        阅读原文
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <Newspaper className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>该分类暂无近两个月资讯</p>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-slate-600 text-center mt-10">
        {view === "topics"
          ? "专题数据来自 DataEye、云合、Sensor Tower、官方发布等公开来源，仅供参考"
          : `仅展示近两个月资讯（${cutoffDate} 至今）。中英文摘要仅供参考，不构成投资或法律建议`}
      </p>
    </div>
  );
}
