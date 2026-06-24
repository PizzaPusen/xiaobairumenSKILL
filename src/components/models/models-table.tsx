"use client";

import { Fragment, useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { CompareRadarSection } from "@/components/models/model-compare-picker";
import { cn } from "@/lib/utils";
import { getModelCategories } from "@/lib/data";
import type { Model } from "@/types";

interface ModelsTableProps {
  models: Model[];
}

function filterByCategory(models: Model[], category: string): Model[] {
  if (category === "全部") return models;
  const typeMap: Record<string, string[]> = {
    图像: ["图像", "图像生成"],
    视频: ["视频", "视频生成"],
    音乐: ["音乐", "音乐生成"],
    多模态: ["多模态"],
  };
  const types = typeMap[category] ?? [category];
  return models.filter((m) => types.some((t) => m.type.includes(t)));
}

function EaseStars({ ease }: { ease: number }) {
  return (
    <div className="flex items-center gap-0.5" title={`上手难度 ${ease}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < ease ? "fill-foreground/70 text-foreground/70" : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

export function ModelsTable({ models }: ModelsTableProps) {
  const categories = getModelCategories();
  const [activeCategory, setActiveCategory] = useState("全部");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filterByCategory(models, activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <PageHeader
        title="AIGC 模型对比"
        description="覆盖 2026 年主流图像/视频模型，数据综合第三方测评，支持六维雷达对比"
      />

      <CompareRadarSection models={filtered} category={activeCategory} />

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "cinema" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* 桌面端表格 */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-4 font-medium">名称</th>
              <th className="text-left p-4 font-medium">类型</th>
              <th className="text-left p-4 font-medium">免费额度</th>
              <th className="text-left p-4 font-medium">上手难度</th>
              <th className="text-left p-4 font-medium">适合场景</th>
              <th className="text-left p-4 font-medium">优缺点</th>
              <th className="text-left p-4 font-medium">官网</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((model) => (
              <Fragment key={model.id}>
                <tr
                  className="border-b border-border/50 hover:bg-accent/30 cursor-pointer transition-colors"
                  onClick={() => toggleExpand(model.id)}
                >
                  <td className="p-4 font-medium">{model.name}</td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">
                      {model.type}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{model.free}</td>
                  <td className="p-4">
                    <EaseStars ease={model.ease} />
                  </td>
                  <td className="p-4 text-muted-foreground max-w-[200px]">{model.bestFor}</td>
                  <td className="p-4 max-w-[240px]">
                    <div className="text-xs space-y-1">
                      <div className="text-green-400/80">+ {model.pros.slice(0, 2).join(", ")}</div>
                      <div className="text-red-400/60">- {model.cons.slice(0, 2).join(", ")}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <a
                      href={model.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-foreground/90 hover:underline inline-flex items-center gap-1"
                    >
                      访问 <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
                {expandedId === model.id && (
                  <tr className="bg-secondary/30">
                    <td colSpan={7} className="p-4">
                      <DetailPanel model={model} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* 移动端卡片 */}
      <div className="md:hidden space-y-3">
        {filtered.map((model) => {
          const isExpanded = expandedId === model.id;
          return (
            <Card
              key={model.id}
              className="cursor-pointer"
              onClick={() => toggleExpand(model.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{model.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {model.type}
                      </Badge>
                      <EaseStars ease={model.ease} />
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{model.bestFor}</p>
                <p className="text-xs text-muted-foreground mt-1">免费：{model.free}</p>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border" onClick={(e) => e.stopPropagation()}>
                    <DetailPanel model={model} />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          该分类下暂无模型
        </div>
      )}
    </div>
  );
}

function DetailPanel({ model }: { model: Model }) {
  return (
    <div className="space-y-3 text-sm">
      <p className="text-muted-foreground leading-relaxed">{model.detail}</p>
      {model.benchmarkSource && (
        <p className="text-xs text-muted-foreground/80">
          测评来源：{model.benchmarkSource}
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <span className="font-medium text-green-400/80">优点</span>
          <ul className="mt-1 space-y-0.5">
            {model.pros.map((p) => (
              <li key={p} className="text-muted-foreground">• {p}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-medium text-red-400/60">缺点</span>
          <ul className="mt-1 space-y-0.5">
            {model.cons.map((c) => (
              <li key={c} className="text-muted-foreground">• {c}</li>
            ))}
          </ul>
        </div>
      </div>
      <a
        href={model.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-foreground/90 hover:underline"
      >
        前往官网 <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
