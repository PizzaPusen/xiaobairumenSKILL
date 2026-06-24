"use client";

import { useMemo, useCallback } from "react";
import Link from "next/link";
import { Shuffle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BilingualPreview } from "@/components/skills/bilingual-preview";
import { formatBilingual, lookupZh } from "@/lib/bilingual";
import { randomPick } from "@/lib/utils";
import { useToolboxDraft } from "@/hooks/use-toolbox-draft";
import { saveToolboxDraft } from "@/lib/toolbox-draft";
import type { TemplateFillSkill, DailyPracticeSkill } from "@/types";

interface TemplateFillProps {
  skill: TemplateFillSkill | DailyPracticeSkill;
}

function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}

/** 构建中文对照值：下拉选项取 zh，文本字段取 defaultZh 或原值 */
function buildZhValues(
  skill: TemplateFillSkill | DailyPracticeSkill,
  values: Record<string, string>
): Record<string, string> {
  const zhValues: Record<string, string> = {};
  skill.placeholders.forEach((p) => {
    if (p.type === "select" && p.options) {
      zhValues[p.key] = lookupZh(p.options, values[p.key]);
    } else if (p.defaultZh && values[p.key] === p.default) {
      zhValues[p.key] = p.defaultZh;
    } else {
      zhValues[p.key] = values[p.key];
    }
  });
  return zhValues;
}

/** 类型2：模板填空器 - 中英对照表单 + 双语预览 */
export function TemplateFill({ skill }: TemplateFillProps) {
  const initialValues = useMemo(() => {
    const vals: Record<string, string> = {};
    skill.placeholders.forEach((p) => {
      vals[p.key] = String(p.default ?? "");
    });
    return vals;
  }, [skill.placeholders]);

  const { data: values, setData: setValues } = useToolboxDraft<Record<string, string>>(
    skill.id,
    initialValues
  );

  const english = fillTemplate(skill.template, values);
  const chinese =
    "templateZh" in skill && skill.templateZh
      ? fillTemplate(skill.templateZh, buildZhValues(skill, values))
      : undefined;

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const startPracticeInPromptBuilder = () => {
    const keyword = values.keyword || "雨夜霓虹";
    saveToolboxDraft("prompt-cinematic", {
      subject: `a cinematic scene inspired by ${keyword}`,
      subjectZh: `${keyword}主题的电影感场景`,
      environment: "in dramatic cinematic lighting",
      environmentZh: "戏剧性电影光线下的场景",
      shotScale: "wide shot",
      cameraAngle: "eye level",
      colorGrade: "teal and orange color grading",
      filmStock: "digital cinema camera, ARRI Alexa look",
      selectedStyles: [],
      lighting: "Golden hour",
      lens: "35mm",
      aspectRatio: "16:9",
      selectedArtists: [],
      mjStylize: "250",
      mjQuality: "1",
      mjVersion: "6.1",
      styleRaw: true,
      excludeTags: "text, watermark, logo, blurry",
    });
  };

  const handleRandomPractice = useCallback(() => {
    const practice = "practice" in skill ? skill.practice : null;
    if (!practice) return;

    const newValues: Record<string, string> = { ...values };
    skill.placeholders.forEach((p) => {
      if (p.key === "task_type") {
        newValues[p.key] = randomPick(practice.categories);
      } else if (p.key === "duration") {
        newValues[p.key] = randomPick(practice.durations);
      } else if (p.key === "task_content") {
        newValues[p.key] = randomPick(practice.tasks);
      } else if (p.key === "tool") {
        newValues[p.key] = randomPick(
          p.options?.map((o) => o.en) ?? ["Midjourney"]
        );
      } else if (p.key === "criteria") {
        newValues[p.key] = randomPick([
          "产出 3 张可对比的图并记录参数差异",
          "完成一段 10 秒视频并写分镜说明",
          "整理学习笔记并截图存档",
          "与团队分享并收集反馈",
        ]);
      } else if (p.key === "keyword") {
        newValues[p.key] = randomPick([
          "雨夜霓虹", "沙漠黄昏", "赛博都市", "复古胶片",
          "水墨山水", "太空歌剧", "哥特古堡", "热带雨林",
        ]);
      } else if (p.type === "select" && p.options) {
        newValues[p.key] = randomPick(p.options).en;
      }
    });
    setValues(newValues);
  }, [skill, values]);

  const hasPractice = "practice" in skill && skill.practice;
  const isEnglishTemplate = "templateZh" in skill && !!skill.templateZh;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        {hasPractice && (
          <div className="flex flex-wrap gap-2 mb-2">
            <Button variant="outline" onClick={handleRandomPractice}>
              <Shuffle className="h-4 w-4" />
              随机生成今日任务
            </Button>
            <Link
              href="/skills/prompt-cinematic"
              onClick={startPracticeInPromptBuilder}
              className="inline-flex items-center gap-2"
            >
              <Button variant="outline" type="button">
                用提示词拼接器开始
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {skill.placeholders.map((placeholder) => (
          <div key={placeholder.key} className="space-y-2">
            <Label htmlFor={placeholder.key}>{placeholder.label}</Label>
            {placeholder.type === "select" && placeholder.options ? (
              <Select
                value={values[placeholder.key]}
                onValueChange={(v) => updateValue(placeholder.key, v)}
              >
                <SelectTrigger id={placeholder.key}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {placeholder.options.map((opt) => (
                    <SelectItem key={opt.en} value={opt.en}>
                      {formatBilingual(opt)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <>
                <Input
                  id={placeholder.key}
                  value={values[placeholder.key]}
                  onChange={(e) => updateValue(placeholder.key, e.target.value)}
                  placeholder={
                    placeholder.default
                      ? `英文：${placeholder.default}`
                      : undefined
                  }
                />
                {placeholder.placeholderZh && (
                  <p className="text-xs text-muted-foreground">
                    中文参考：{placeholder.placeholderZh}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <BilingualPreview
        title="模板预览"
        english={english}
        chinese={chinese}
        copyLabel={isEnglishTemplate ? "复制英文提示词" : "一键复制"}
      />
    </div>
  );
}
