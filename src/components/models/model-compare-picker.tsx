"use client";

import { useState, useMemo, useEffect } from "react";
import { ModelRadarChart } from "@/components/models/model-radar-chart";
import type { Model } from "@/types";
import { cn } from "@/lib/utils";

function getDefaultIds(category: string, eligible: Model[]): string[] {
  const has = (id: string) => eligible.some((m) => m.id === id);
  if (category === "图像") {
    return ["nano-banana-pro", "gpt-image-2", "flux-2-pro"].filter(has);
  }
  if (category === "视频") {
    return ["seedance-2", "happyhorse", "hailuo-2.3"].filter(has);
  }
  // 全部：按画质取前 3
  return [...eligible]
    .sort((a, b) => (b.scores?.quality ?? 0) - (a.scores?.quality ?? 0))
    .slice(0, 3)
    .map((m) => m.id);
}

interface ModelComparePickerProps {
  models: Model[];
  max?: number;
  onChange: (ids: string[]) => void;
  selected: string[];
}

/** 选择最多 N 个模型进行雷达对比 */
export function ModelComparePicker({
  models,
  max = 3,
  onChange,
  selected,
}: ModelComparePickerProps) {
  const withScores = models.filter((m) => m.scores);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < max) {
      onChange([...selected, id]);
    } else {
      onChange([...selected.slice(1), id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {withScores.map((m) => {
        const isSelected = selected.includes(m.id);
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => toggle(m.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
              isSelected
                ? "border-white/15 bg-white/[0.06] text-foreground"
                : "border-border text-muted-foreground hover:border-white/12"
            )}
          >
            {m.name}
          </button>
        );
      })}
    </div>
  );
}

interface CompareRadarSectionProps {
  models: Model[];
  category: string;
}

export function CompareRadarSection({ models, category }: CompareRadarSectionProps) {
  const eligible = useMemo(
    () => models.filter((m) => m.scores),
    [models]
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds(getDefaultIds(category, eligible));
  }, [category, eligible]);

  const compareModels = useMemo(
    () =>
      selectedIds
        .map((id) => eligible.find((m) => m.id === id))
        .filter((m): m is Model => !!m),
    [selectedIds, eligible]
  );

  if (eligible.length < 2) return null;

  const categoryHint =
    category === "全部"
      ? "当前展示全库高分模型，切换到「图像」或「视频」可筛选同类对比"
      : `当前分类：${category}`;

  return (
    <div className="mb-8 space-y-3">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{categoryHint}</p>
        <p className="text-sm text-muted-foreground mb-2">
          选择最多 3 个模型查看六维雷达对比（点击下方标签切换）
        </p>
        <ModelComparePicker
          models={eligible}
          selected={selectedIds}
          onChange={setSelectedIds}
        />
      </div>
      <ModelRadarChart models={compareModels} />
    </div>
  );
}
