"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Package } from "lucide-react";
import type { ProductionGuidePack } from "@/types";

interface ProductionGuideViewProps {
  pack: ProductionGuidePack;
}

export function ProductionGuideView({ pack }: ProductionGuideViewProps) {
  const { content } = pack;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="border-cyan-500/20 text-cyan-300">
          {content.genre}
        </Badge>
        <Badge variant="outline" className="border-white/10 text-slate-400">
          {content.duration}
        </Badge>
        <Badge variant="outline" className="border-violet-500/20 text-violet-300">
          难度：{content.difficulty}
        </Badge>
      </div>

      {/* SOP */}
      <Card className="border-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-lg">制作 SOP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.sop.map((phase) => (
            <div key={phase.phase} className="border-l-2 border-cyan-500/30 pl-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <h3 className="font-medium text-white">{phase.phase}</h3>
                <span className="text-xs text-slate-500">{phase.duration}</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm text-slate-400">
                <div>
                  <p className="text-[10px] text-slate-600 mb-1">任务</p>
                  <ul className="space-y-0.5">
                    {phase.tasks.map((t) => (
                      <li key={t}>· {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 mb-1">交付物</p>
                  <ul className="space-y-0.5">
                    {phase.deliverables.map((d) => (
                      <li key={d}>· {d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 mb-1">工具</p>
                  <div className="flex flex-wrap gap-1">
                    {phase.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="text-[10px]">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 报价 */}
      <Card className="border-amber-500/10">
        <CardHeader>
          <CardTitle className="text-lg">项目报价参考</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400 mb-4">{content.pricing.note}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.pricing.tiers.map((tier) => (
              <div key={tier.level} className="rounded-lg border border-amber-500/15 bg-amber-500/[0.04] p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-amber-200/90">{tier.level}</span>
                  <span className="text-sm text-amber-300">{tier.range}</span>
                </div>
                <p className="text-xs text-slate-500">{tier.scenario}</p>
                <p className="text-xs text-slate-600 mt-1">周期：{tier.cycle}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 对标 */}
      <Card className="border-violet-500/10">
        <CardHeader>
          <CardTitle className="text-lg">对标参考</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {content.references.map((ref) => (
            <div key={ref.title} className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
              <p className="font-medium text-sm text-white">{ref.title}</p>
              <p className="text-[10px] text-violet-300/80 mb-1">{ref.type}</p>
              <p className="text-xs text-slate-400">{ref.why}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 工具 */}
      <Card className="border-teal-500/10">
        <CardHeader>
          <CardTitle className="text-lg">工具与 Skill</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {content.toolStack.map((stack) => (
            <div key={stack.category} className="rounded-lg bg-teal-500/[0.04] border border-teal-500/10 p-3">
              <p className="text-sm font-medium text-teal-200/90">{stack.category}</p>
              <p className="text-xs text-slate-500 mb-2">{stack.purpose}</p>
              <div className="flex flex-wrap gap-1">
                {stack.tools.map((t) => (
                  <Badge key={t} className="text-[10px] bg-white/[0.06] border-0">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 清单与避坑 */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              交付清单
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm text-slate-400">
              {content.checklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-red-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              常见避坑
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm text-slate-400">
              {content.pitfalls.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-amber-500">!</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-4 w-4 text-slate-400" />
            最终交付物
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {content.deliverables.map((d) => (
              <Badge key={d} variant="outline" className="border-white/10">
                {d}
              </Badge>
            ))}
          </div>
          {content.workflowNotes && (
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <p className="text-[10px] uppercase tracking-wider text-slate-600 mb-2">工作流备注</p>
              <ul className="text-sm text-slate-400 space-y-1">
                {content.workflowNotes.map((n) => (
                  <li key={n}>· {n}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
