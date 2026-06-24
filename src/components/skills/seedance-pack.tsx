"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Plus, Trash2, BookOpen, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEEDANCE_SHARED_RULES } from "@/data/seedance-shared-rules";
import {
  buildSeedanceGroup,
  buildCharacterBindings,
  parseCharactersLine,
  buildRefImageHint,
  type SeedanceShotInput,
} from "@/lib/seedance-builder";
import { copyToClipboard } from "@/lib/utils";
import type { SeedancePackSkill } from "@/types";

interface SeedancePackProps {
  skill: SeedancePackSkill;
}

function newShot(start: number, end: number): SeedanceShotInput {
  return {
    id: crypto.randomUUID(),
    timeStart: start,
    timeEnd: end,
    content: "",
    dialogue: "",
  };
}

/** Seedance 2.0 短剧分镜提示词组装器 */
export function SeedancePack({ skill }: SeedancePackProps) {
  const { pack } = skill;

  const initShots = (): SeedanceShotInput[] =>
    pack.defaultShots?.length
      ? pack.defaultShots.map((s) => ({ ...s, id: crypto.randomUUID() }))
      : [newShot(0, 3), newShot(3, 7), newShot(7, 11), newShot(11, 15)];

  const [script, setScript] = useState(pack.exampleScript);
  const [characters, setCharacters] = useState(pack.defaultCharacters);
  const [scene, setScene] = useState(pack.defaultScene);
  const [sceneRef, setSceneRef] = useState(pack.defaultSceneRef);
  const [lighting, setLighting] = useState(pack.defaultLighting);
  const [visualRef, setVisualRef] = useState(pack.defaultVisualRef);
  const [characterBindings, setCharacterBindings] = useState(() =>
    buildCharacterBindings(pack.defaultCharacters)
  );
  const [statePrefix, setStatePrefix] = useState("");
  const [group2Output, setGroup2Output] = useState("");
  const [shots, setShots] = useState<SeedanceShotInput[]>(initShots);
  const [copied, setCopied] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const extractCharacters = useCallback(() => {
    const parsed = parseCharactersLine(script);
    if (parsed) {
      setCharacters(parsed);
      setCharacterBindings(buildCharacterBindings(parsed));
    }
  }, [script]);

  const loadExample = useCallback(() => {
    setScript(pack.exampleScript);
    setCharacters(pack.defaultCharacters);
    setScene(pack.defaultScene);
    setSceneRef(pack.defaultSceneRef);
    setLighting(pack.defaultLighting);
    setVisualRef(pack.defaultVisualRef);
    setCharacterBindings(buildCharacterBindings(pack.defaultCharacters));
    setStatePrefix("");
    setGroup2Output("");
    if (pack.defaultShots?.length) {
      setShots(
        pack.defaultShots.map((s) => ({
          ...s,
          id: crypto.randomUUID(),
        }))
      );
    }
  }, [pack]);

  const bindings =
    characterBindings || buildCharacterBindings(characters);

  const group1 = buildSeedanceGroup({
    scene,
    sceneRef,
    lighting,
    visualRef,
    characterBindings: bindings,
    shots,
    statePrefix,
  });

  const output = group2Output.trim()
    ? `${group1}\n\n***\n\n${group2Output.trim()}`
    : group1;

  const updateShot = (id: string, field: keyof SeedanceShotInput, value: string | number) => {
    setShots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addShot = () => {
    const last = shots[shots.length - 1];
    const start = last ? last.timeEnd : 0;
    setShots((prev) => [...prev, newShot(start, Math.min(start + 4, 15))]);
  };

  const removeShot = (id: string) => {
    if (shots.length <= 1) return;
    setShots((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const charCount = characters.split(/[、,，]/).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={loadExample}>
          <Sparkles className="h-4 w-4" />
          加载本题材示例
        </Button>
        <Button variant="outline" size="sm" onClick={extractCharacters}>
          从剧本提取 [出场角色]
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowRules(!showRules)}>
          <BookOpen className="h-4 w-4" />
          {showRules ? "收起规则" : "展开 Seedance 规则"}
          {showRules ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
      </div>

      {showRules && (
        <Card className="border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Seedance 2.0 转换规则速查</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid gap-2 sm:grid-cols-2">
              {SEEDANCE_SHARED_RULES.map((r) => (
                <div key={r.title} className="rounded-md bg-secondary p-3">
                  <p className="font-medium text-foreground/80 text-xs">{r.title}</p>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{r.content}</p>
                </div>
              ))}
            </div>
            {pack.genreTips.map((tip) => (
              <div key={tip.title} className="rounded-md border border-border p-3">
                <p className="font-medium">{tip.title}</p>
                <p className="text-muted-foreground text-xs mt-1">{tip.content}</p>
                {tip.items && (
                  <ul className="mt-2 space-y-1">
                    {tip.items.map((item, i) => (
                      <li key={i} className="text-xs text-muted-foreground before:content-['•'] before:mr-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>原始剧本片段</Label>
            <Textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={6}
              placeholder="粘贴本场戏剧本，含 [出场角色] 行..."
              className="font-mono text-xs"
            />
          </div>

          <div className="space-y-2">
            <Label>[出场角色]（对应参考图文件名，勿改名称）</Label>
            <Input
              value={characters}
              onChange={(e) => {
                setCharacters(e.target.value);
                setCharacterBindings(buildCharacterBindings(e.target.value));
              }}
              placeholder="女主楚画仙裙、男主楚无极黑袍..."
            />
            <p className="text-xs text-muted-foreground">
              参考图顺序：{buildRefImageHint(charCount, true)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>场景环境</Label>
              <Input value={scene} onChange={(e) => setScene(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>场景参考图编号</Label>
              <Input
                value={sceneRef}
                onChange={(e) => setSceneRef(e.target.value)}
                placeholder="参考图三"
              />
            </div>
            <div className="space-y-2">
              <Label>影调参考剧</Label>
              <Select value={visualRef} onValueChange={setVisualRef}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pack.visualRefs.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>光源设计</Label>
            <Input
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              placeholder="暖黄烛光从画面左方打来，高对比侧逆光..."
            />
          </div>

          <div className="space-y-2">
            <Label>跨组状态前缀（湿透/流血等，可选）</Label>
            <Input
              value={statePrefix}
              onChange={(e) => setStatePrefix(e.target.value)}
              placeholder="衣衫凌乱带有血迹的角色..."
            />
          </div>

          <div className="space-y-2">
            <Label>角色绑定描述（自动生成，可手动覆盖）</Label>
            <Textarea
              value={bindings}
              onChange={(e) => setCharacterBindings(e.target.value)}
              rows={2}
              className="text-xs"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>镜头列表（本组 10-15 秒）</Label>
              <Button variant="ghost" size="sm" onClick={addShot}>
                <Plus className="h-3 w-3" /> 加镜头
              </Button>
            </div>
            {shots.map((shot, idx) => (
              <Card key={shot.id} className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground/80">镜头 {idx + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => removeShot(shot.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    className="w-16"
                    value={shot.timeStart}
                    onChange={(e) => updateShot(shot.id, "timeStart", Number(e.target.value))}
                  />
                  <span className="self-center text-xs">-</span>
                  <Input
                    type="number"
                    className="w-16"
                    value={shot.timeEnd}
                    onChange={(e) => updateShot(shot.id, "timeEnd", Number(e.target.value))}
                  />
                  <span className="self-center text-xs text-muted-foreground">秒</span>
                </div>
                <Textarea
                  value={shot.content}
                  onChange={(e) => updateShot(shot.id, "content", e.target.value)}
                  rows={3}
                  placeholder="平视近景——[角色名]动作描述..."
                  className="text-xs"
                />
                <Input
                  value={shot.dialogue}
                  onChange={(e) => updateShot(shot.id, "dialogue", e.target.value)}
                  placeholder='（角色名，情绪）"台词" 或 [无台词，环境静默]'
                  className="text-xs"
                />
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label>第二组 prompt（可选，切场景时用 *** 拼接）</Label>
            <Textarea
              value={group2Output}
              onChange={(e) => setGroup2Output(e.target.value)}
              rows={4}
              placeholder="新场景的完整 [全局锁定] + 镜头..."
              className="text-xs font-mono"
            />
          </div>
        </div>

        <Card className="lg:sticky lg:top-24 h-fit border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Seedance 2.0 输出</CardTitle>
            <p className="text-xs text-muted-foreground">
              纯文本 prompt_text，可直接粘贴到 Seedance 2.0。多组用 *** 分隔。
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-secondary p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto">
              {output}
            </div>
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                查看完整示例输出
              </summary>
              <pre className="mt-2 rounded bg-muted p-3 whitespace-pre-wrap text-[10px] leading-relaxed max-h-48 overflow-y-auto">
                {pack.exampleOutput}
              </pre>
            </details>
            <Button variant="cinema" onClick={handleCopy} className="w-full">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "已复制" : "复制 prompt_text"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
