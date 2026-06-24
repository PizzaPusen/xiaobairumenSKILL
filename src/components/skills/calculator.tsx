"use client";

import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToolboxDraft } from "@/hooks/use-toolbox-draft";
import type { CalculatorSkill } from "@/types";

interface CalculatorProps {
  skill: CalculatorSkill;
}

/** 解析画幅比字符串为宽高比数值 */
function parseAspectRatio(aspect: string): { w: number; h: number } {
  const [w, h] = aspect.split(":").map(Number);
  return { w: w || 16, h: h || 9 };
}

/** 类型3：计算器/转换器 - 纯前端数值换算 */
export function Calculator({ skill }: CalculatorProps) {
  const { calculator } = skill;
  const formula = calculator.formula;

  const initialValues = useMemo(() => {
    const vals: Record<string, string> = {};
    calculator.fields.forEach((f) => {
      vals[f.key] = String(f.default ?? "");
    });
    return vals;
  }, [calculator.fields]);

  const { data: values, setData: setValues } = useToolboxDraft<Record<string, string>>(
    skill.id,
    initialValues
  );

  const updateField = (key: string, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      // 根据公式自动计算关联字段
      if (formula === "duration-frames") {
        const duration = parseFloat(next.duration);
        const fps = parseFloat(next.fps);
        const frames = parseFloat(next.frames);
        if (key === "duration" && !isNaN(duration) && fps > 0) {
          next.frames = String(Math.round(duration * fps));
        } else if (key === "fps") {
          if (!isNaN(duration) && fps > 0) {
            next.frames = String(Math.round(duration * fps));
          } else if (!isNaN(frames) && fps > 0) {
            next.duration = String((frames / fps).toFixed(2));
          }
        } else if (key === "frames" && !isNaN(frames) && fps > 0) {
          next.duration = String((frames / fps).toFixed(2));
        }
      }
      return next;
    });
  };

  // 分辨率换算结果
  const resolutionResult = useMemo(() => {
    if (formula !== "resolution-aspect") return null;
    const aspect = values.aspect ?? "16:9";
    const baseEdge = values.baseEdge ?? "width";
    const pixels = parseFloat(values.pixels);
    if (isNaN(pixels) || pixels <= 0) return null;

    const { w, h } = parseAspectRatio(aspect);
    if (baseEdge === "width") {
      const height = Math.round((pixels * h) / w);
      return { width: pixels, height };
    }
    const width = Math.round((pixels * w) / h);
    return { width, height: pixels };
  }, [formula, values]);

  // 时长帧数结果摘要
  const durationSummary = useMemo(() => {
    if (formula !== "duration-frames") return null;
    const duration = parseFloat(values.duration);
    const fps = parseFloat(values.fps);
    const frames = parseFloat(values.frames);
    if (isNaN(duration) || isNaN(fps) || isNaN(frames)) return null;
    return {
      duration,
      fps,
      frames,
      minutes: (duration / 60).toFixed(2),
      perShot: fps > 0 ? Math.round(frames / (duration || 1)) : 0,
    };
  }, [formula, values]);

  return (
    <div className="space-y-6 max-w-2xl">
      {calculator.description && (
        <p className="text-muted-foreground">{calculator.description}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {calculator.fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>
              {field.label}
              {field.unit && (
                <span className="text-muted-foreground ml-1">({field.unit})</span>
              )}
            </Label>
            {field.type === "select" && field.options ? (
              <Select
                value={values[field.key]}
                onValueChange={(v) => updateField(field.key, v)}
              >
                <SelectTrigger id={field.key}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => {
                    const label =
                      field.key === "baseEdge"
                        ? opt === "width"
                          ? "宽度 width"
                          : "高度 height"
                        : opt;
                    return (
                      <SelectItem key={opt} value={opt}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.key}
                type={field.type === "number" ? "number" : "text"}
                value={values[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* 时长/帧率换算结果 */}
      {formula === "duration-frames" && durationSummary && (
        <Card className="border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">换算结果</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <ResultItem label="时长" value={`${durationSummary.duration} 秒`} />
            <ResultItem label="约合" value={`${durationSummary.minutes} 分钟`} />
            <ResultItem label="帧率" value={`${durationSummary.fps} fps`} />
            <ResultItem label="总帧数" value={`${durationSummary.frames} 帧`} />
            <ResultItem
              label="每秒帧数验证"
              value={`${durationSummary.fps} fps × ${durationSummary.duration}s = ${Math.round(durationSummary.fps * durationSummary.duration)} 帧`}
            />
            <ResultItem
              label="AI 片段规划"
              value={[5, 10, 15]
                .map((sec) => {
                  const n = Math.floor(durationSummary.duration / sec);
                  return n > 0 ? `${n}×${sec}s` : null;
                })
                .filter(Boolean)
                .join(" · ") || "—"}
            />
          </CardContent>
        </Card>
      )}

      {/* 分辨率换算结果 */}
      {formula === "resolution-aspect" && resolutionResult && (
        <Card className="border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">像素尺寸</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-display font-medium text-foreground">
              {resolutionResult.width} × {resolutionResult.height}
            </div>
            <p className="text-sm text-muted-foreground">
              画幅比 {values.aspect}，总像素约{" "}
              {(resolutionResult.width * resolutionResult.height / 1_000_000).toFixed(2)} MP
            </p>
            <div className="grid gap-2 sm:grid-cols-2 text-sm">
              <ResultItem label="宽度" value={`${resolutionResult.width} px`} />
              <ResultItem label="高度" value={`${resolutionResult.height} px`} />
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              平台参考：
              {resolutionResult.width >= 1920 && resolutionResult.height >= 1080
                ? " 符合 1080p+ 横屏交付"
                : resolutionResult.height >= 1920 && resolutionResult.width >= 1080
                  ? " 符合 1080p+ 竖屏短视频"
                  : " 适合预览草稿，正式交付建议提高基准像素"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* MJ 参数解释表 */}
      {calculator.params && calculator.params.length > 0 && (
        <div className="space-y-3">
          {calculator.params.map((p) => (
            <Card key={p.param}>
              <CardContent className="pt-4">
                <code className="text-foreground/80 font-mono">{p.param}</code>
                <p className="mt-1 text-sm">{p.meaning}</p>
                <p className="mt-1 text-xs text-muted-foreground">示例：{p.example}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-secondary p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium mt-0.5">{value}</div>
    </div>
  );
}
