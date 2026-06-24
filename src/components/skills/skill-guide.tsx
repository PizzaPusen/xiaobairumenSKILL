"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SkillGuideProps {
  guide: string;
  skillId: string;
  showAboutLink?: boolean;
}

/** 技能详情页操作引导 - 首次打开显示，可关闭 */
export function SkillGuide({ guide, skillId, showAboutLink }: SkillGuideProps) {
  const storageKey = `skill-guide-dismissed-${skillId}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (!dismissed) setVisible(true);
  }, [storageKey]);

  const dismiss = () => {
    localStorage.setItem(storageKey, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="mb-6 rounded-lg border border-white/10 bg-white/[0.03] p-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <Lightbulb className="h-5 w-5 text-foreground/80 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-foreground/80 mb-1">操作引导</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{guide}</p>
          {showAboutLink && (
            <Link
              href="/about"
              className="inline-block mt-2 text-xs text-cyan-400/90 hover:text-cyan-300"
            >
              查看完整使用指南 →
            </Link>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={dismiss} className="shrink-0 h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
