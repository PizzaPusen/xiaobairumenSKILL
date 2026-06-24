"use client";

import Link from "next/link";
import { ExternalLink, TrendingUp, Clapperboard, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FilmWatchBlock } from "@/types";

const REGION_LABEL: Record<FilmWatchBlock["region"], string> = {
  cn: "国内",
  intl: "海外",
  both: "中外",
};

const REGION_STYLE: Record<FilmWatchBlock["region"], string> = {
  cn: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  intl: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  both: "bg-violet-500/10 text-violet-300 border-violet-500/20",
};

const BLOCK_ICON: Record<string, typeof TrendingUp> = {
  "cn-short-drama": TrendingUp,
  "intl-short-drama": TrendingUp,
  "cn-ai-film": Clapperboard,
  "cn-festival": Trophy,
};

const BLOCK_SHORT: Record<string, string> = {
  "cn-short-drama": "国内短剧",
  "intl-short-drama": "海外短剧",
  "cn-ai-film": "AI 电影",
  "cn-festival": "电影节",
};

interface FilmWatchPanelsProps {
  blocks: FilmWatchBlock[];
  activeId: string;
  onSelect: (id: string) => void;
}

function WatchBlockCard({ block }: { block: FilmWatchBlock }) {
  const Icon = BLOCK_ICON[block.id] ?? TrendingUp;

  return (
    <article className="glass rounded-2xl p-5 md:p-6 border border-slate-400/10">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
          <Icon className="h-4 w-4 text-violet-300" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-medium text-white">{block.title}</h3>
            <span
              className={cn(
                "text-[10px] px-2 py-0.5 rounded border",
                REGION_STYLE[block.region]
              )}
            >
              {REGION_LABEL[block.region]}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {block.period} · 数据截至 {block.asOf}
          </p>
        </div>
      </div>

      {block.intro && (
        <p className="text-xs text-slate-400 leading-relaxed mb-4">{block.intro}</p>
      )}

      <ol className="space-y-2.5 mb-4">
        {block.entries.map((entry) => (
          <li
            key={`${block.id}-${entry.rank}`}
            className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.08] text-xs font-medium text-slate-300">
              {entry.rank}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                {entry.href ? (
                  <Link
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                  >
                    {entry.title}
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-50" />
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-white">{entry.title}</span>
                )}
                {entry.platform && (
                  <span className="text-[10px] text-slate-600">{entry.platform}</span>
                )}
              </div>
              <p className="text-xs text-cyan-400/90 mt-0.5">{entry.metric}</p>
              {entry.note && (
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{entry.note}</p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 mb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600 mb-1.5">简要分析</p>
        <p className="text-xs text-slate-300 leading-relaxed">{block.analysis}</p>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {block.sources.map((src) => (
          <Link
            key={src.url}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-slate-500 hover:text-cyan-400 inline-flex items-center gap-1 transition-colors"
          >
            {src.name}
            <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        ))}
      </div>
    </article>
  );
}

/** 影视专题：子 Tab 切换，一次只展示一个榜单 */
export function FilmWatchPanels({ blocks, activeId, onSelect }: FilmWatchPanelsProps) {
  if (!blocks.length) return null;

  const active = blocks.find((b) => b.id === activeId) ?? blocks[0];

  return (
    <section>
      <div className="flex flex-wrap gap-2 mb-5">
        {blocks.map((block) => (
          <button
            key={block.id}
            type="button"
            onClick={() => onSelect(block.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm border transition-colors",
              active.id === block.id
                ? "bg-violet-500/15 border-violet-500/30 text-violet-200"
                : "border-white/[0.08] text-slate-500 hover:text-white hover:bg-white/[0.04]"
            )}
          >
            {BLOCK_SHORT[block.id] ?? block.title}
          </button>
        ))}
      </div>

      <WatchBlockCard block={active} />
    </section>
  );
}
