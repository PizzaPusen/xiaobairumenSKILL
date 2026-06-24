"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { Model, ModelScores } from "@/types";

/** 雷达图六维指标 */
export const RADAR_DIMENSIONS: Array<{ key: keyof ModelScores; label: string }> = [
  { key: "quality", label: "画质" },
  { key: "controllability", label: "可控性" },
  { key: "easeOfUse", label: "易用性" },
  { key: "value", label: "性价比" },
  { key: "chinese", label: "中文友好" },
  { key: "commercial", label: "商用适配" },
];

const CHART_COLORS = [
  { stroke: "#67e8f9", fill: "rgba(103, 232, 249, 0.18)" },
  { stroke: "#a78bfa", fill: "rgba(167, 139, 250, 0.18)" },
  { stroke: "#2dd4bf", fill: "rgba(45, 212, 191, 0.18)" },
];

interface ModelRadarChartProps {
  models: Model[];
  className?: string;
}

/** 纯 SVG 六边形雷达图，对比多个模型的六维评分 */
export function ModelRadarChart({ models, className }: ModelRadarChartProps) {
  const chartModels = useMemo(
    () => models.filter((m) => m.scores).slice(0, 3),
    [models]
  );

  const size = 280;
  const center = size / 2;
  const maxRadius = size * 0.36;
  const levels = 5;
  const angleStep = (Math.PI * 2) / RADAR_DIMENSIONS.length;

  const getPoint = (dimIndex: number, value: number) => {
    const angle = dimIndex * angleStep - Math.PI / 2;
    const r = (value / 10) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridPolygons = Array.from({ length: levels }, (_, i) => {
    const ratio = (i + 1) / levels;
    const points = RADAR_DIMENSIONS.map((_, dimIndex) => {
      const angle = dimIndex * angleStep - Math.PI / 2;
      const r = ratio * maxRadius;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    });
    return points.join(" ");
  });

  const axisLines = RADAR_DIMENSIONS.map((_, dimIndex) => {
    const angle = dimIndex * angleStep - Math.PI / 2;
    return {
      x2: center + maxRadius * Math.cos(angle),
      y2: center + maxRadius * Math.sin(angle),
      labelX: center + (maxRadius + 22) * Math.cos(angle),
      labelY: center + (maxRadius + 22) * Math.sin(angle),
      label: RADAR_DIMENSIONS[dimIndex].label,
    };
  });

  if (chartModels.length === 0) return null;

  return (
    <div className={cn("rounded-lg border border-border bg-card p-4 md:p-6", className)}>
      <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full max-w-[300px] shrink-0"
          role="img"
          aria-label="模型六维雷达对比图"
        >
          {gridPolygons.map((points, i) => (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
          ))}
          {axisLines.map((axis, i) => (
            <g key={i}>
              <line
                x1={center}
                y1={center}
                x2={axis.x2}
                y2={axis.y2}
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
              <text
                x={axis.labelX}
                y={axis.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {axis.label}
              </text>
            </g>
          ))}
          {chartModels.map((model, modelIndex) => {
            if (!model.scores) return null;
            const color = CHART_COLORS[modelIndex % CHART_COLORS.length];
            const points = RADAR_DIMENSIONS.map((dim, dimIndex) => {
              const p = getPoint(dimIndex, model.scores![dim.key]);
              return `${p.x},${p.y}`;
            }).join(" ");
            return (
              <polygon
                key={model.id}
                points={points}
                fill={color.fill}
                stroke={color.stroke}
                strokeWidth="2"
              />
            );
          })}
        </svg>

        <div className="flex-1 space-y-3 w-full">
          <div>
            <h3 className="font-display text-lg font-semibold">六维能力雷达</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              评分综合 Artificial Analysis、302.AI 基准实验室、Atlas Cloud 等 2026 年第三方测评，
              满分 10 分，仅供选型参考。
            </p>
          </div>
          <div className="space-y-2">
            {chartModels.map((model, i) => {
              const color = CHART_COLORS[i % CHART_COLORS.length];
              return (
                <div key={model.id} className="flex items-center gap-2 text-sm">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color.stroke }}
                  />
                  <span className="font-medium">{model.name}</span>
                  {model.benchmarkSource && (
                    <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                      — {model.benchmarkSource}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {chartModels[0]?.scores && (
            <div className="grid grid-cols-3 gap-2 text-xs">
              {RADAR_DIMENSIONS.map((dim) => (
                <div key={dim.key} className="rounded bg-secondary px-2 py-1.5">
                  <span className="text-muted-foreground">{dim.label}</span>
                  <div className="font-medium mt-0.5 space-x-2">
                    {chartModels.map((m) =>
                      m.scores ? (
                        <span key={m.id}>{m.scores[dim.key]}</span>
                      ) : null
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
