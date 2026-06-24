"use client";

import { useState } from "react";
import { Lightbulb, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { copyToClipboard } from "@/lib/utils";
import type { InfoCardSkill } from "@/types";

interface InfoCardProps {
  skill: InfoCardSkill;
}

function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 p-1 rounded text-slate-600 hover:text-slate-300 transition-colors"
      title="复制"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

/** 静态速查卡片 - 支持逐项复制 */
export function InfoCard({ skill }: InfoCardProps) {
  return (
    <div className="space-y-6">
      {skill.sections.map((section, idx) => (
        <Card key={idx} className="overflow-hidden">
          <CardHeader className="bg-secondary/50 py-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.08] text-foreground/90 text-sm font-bold">
                {idx + 1}
              </span>
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <p className="text-muted-foreground leading-relaxed text-sm">{section.content}</p>
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item, i) => {
                  const copyText = item.includes("：")
                    ? item.split("：").slice(1).join("：").split(" / ")[0].trim()
                    : item.startsWith("--")
                      ? item.split("：")[0]
                      : item;
                  return (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed group">
                      <span className="text-foreground/40 font-bold shrink-0">•</span>
                      <span className="flex-1 min-w-0">{item}</span>
                      <CopyLine text={copyText} />
                    </li>
                  );
                })}
              </ul>
            )}
            {(section.promptEn || section.promptZh || section.tip) && (
              <div className="rounded-md bg-white/[0.05] border border-white/10 p-3 mt-2 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Lightbulb className="h-4 w-4 text-foreground/80 shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground/80 text-sm">可用提示词</span>
                  </div>
                  {section.promptEn && <CopyLine text={section.promptEn} />}
                </div>
                {section.promptZh && (
                  <p className="text-sm pl-6">
                    <span className="text-muted-foreground">中文：</span>
                    {section.promptZh}
                  </p>
                )}
                {section.promptEn && (
                  <p className="text-sm pl-6 font-mono">
                    <span className="text-muted-foreground font-sans">英文：</span>
                    {section.promptEn}
                  </p>
                )}
                {section.tip && !section.promptEn && (
                  <p className="text-sm pl-6">{section.tip}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
