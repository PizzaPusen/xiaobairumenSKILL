"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { copyToClipboard } from "@/lib/utils";

interface BilingualPreviewProps {
  title?: string;
  english: string;
  chinese?: string;
  copyLabel?: string;
  /** 下方预览区标题，默认「英文提示词」 */
  outputLabel?: string;
  /** 预览区底部提示 */
  hint?: string;
}

/** 中英对照预览面板：上方中文说明，下方可复制内容；移动端底部固定复制条 */
export function BilingualPreview({
  title = "实时预览",
  english,
  chinese,
  copyLabel = "复制英文提示词",
  outputLabel,
  hint,
}: BilingualPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(english);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyButton = (
    <Button variant="cta" onClick={handleCopy} className="w-full !rounded-xl">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "已复制" : copyLabel}
    </Button>
  );

  return (
    <>
      <Card className="lg:sticky lg:top-24 h-fit border-white/10 hidden lg:block">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {chinese && (
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">中文对照</p>
              <div className="rounded-md bg-muted border border-border/50 p-4 text-sm leading-relaxed whitespace-pre-wrap break-words">
                {chinese}
              </div>
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">
              {outputLabel ?? (chinese ? "英文提示词（复制到 MJ / SD / Runway）" : "生成结果")}
            </p>
            <div className="rounded-md bg-secondary p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words min-h-[80px]">
              {english}
            </div>
          </div>
          {copyButton}
          {hint && <p className="text-[11px] text-slate-500 leading-relaxed">{hint}</p>}
        </CardContent>
      </Card>

      {/* 移动端：简化预览 + 底部固定复制 */}
      <div className="lg:hidden space-y-3 mb-20">
        <p className="text-xs font-medium text-slate-400">{title}</p>
        {chinese && (
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">
            {chinese}
          </div>
        )}
        <div className="rounded-lg bg-secondary/80 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
          {english}
        </div>
      </div>

      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 pt-2 bg-gradient-to-t from-[hsl(230,25%,5%)] via-[hsl(230,25%,5%)] to-transparent safe-area-bottom">
        {copyButton}
      </div>
    </>
  );
}
