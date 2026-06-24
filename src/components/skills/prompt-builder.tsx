"use client";

import { useMemo } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BilingualPreview } from "@/components/skills/bilingual-preview";
import { formatBilingual, getEn } from "@/lib/bilingual";
import { randomPick, randomPickMany } from "@/lib/utils";
import { useToolboxDraft } from "@/hooks/use-toolbox-draft";
import type { BilingualOption, PromptBuilderSkill } from "@/types";

interface PromptBuilderProps {
  skill: PromptBuilderSkill;
}

const DEFAULT_PRESETS = {
  subjects: [
    { en: "a cinematic portrait of a woman", zh: "电影感的女性人像" },
    { en: "an epic wide shot of a lone warrior", zh: "孤独战士的史诗大远景" },
    { en: "a mysterious figure in a trench coat", zh: "穿风衣的神秘人物" },
    { en: "a futuristic cityscape at dusk", zh: "黄昏时分的未来都市" },
  ],
  environments: [
    { en: "in a neon-lit Hong Kong alley at night", zh: "夜晚霓虹闪烁的香港小巷" },
    { en: "on a misty mountain peak", zh: "云雾缭绕的山巅" },
    { en: "inside an abandoned art deco theater", zh: "废弃的装饰艺术风格剧院内" },
    { en: "in a rain-soaked cyberpunk street", zh: "雨水浸润的赛博朋克街道" },
  ],
};

const DEFAULT_SHOT_SCALES: BilingualOption[] = [
  { en: "medium shot", zh: "中景 MS" },
  { en: "close-up", zh: "特写 CU" },
  { en: "wide shot", zh: "全景 WS" },
];

const DEFAULT_CAMERA_ANGLES: BilingualOption[] = [
  { en: "eye level", zh: "平视" },
  { en: "low angle", zh: "仰拍" },
];

const DEFAULT_COLOR_GRADES: BilingualOption[] = [
  { en: "teal and orange color grading", zh: "青橙调色" },
  { en: "naturalistic color", zh: "自然主义色彩" },
];

const DEFAULT_FILM_STOCKS: BilingualOption[] = [
  { en: "digital cinema camera, ARRI Alexa look", zh: "ARRI Alexa 数字电影感" },
];

const LOOK_PRESETS = [
  { label: "霓虹 noir", styles: ["Neon Noir"], lighting: "Neon lights", grade: "high contrast noir" },
  { label: "王家卫", styles: ["Wong Kar-wai aesthetic"], lighting: "Neon lights", grade: "desaturated muted tones" },
  { label: "史诗宽银幕", styles: ["Blade Runner 2049"], lighting: "Golden hour", grade: "teal and orange color grading" },
  { label: "纪录片写实", styles: ["Documentary realism"], lighting: "Soft diffused", grade: "naturalistic color" },
] as const;

interface PromptDraft {
  subject: string;
  subjectZh: string;
  environment: string;
  environmentZh: string;
  shotScale: string;
  cameraAngle: string;
  colorGrade: string;
  filmStock: string;
  selectedStyles: string[];
  lighting: string;
  lens: string;
  aspectRatio: string;
  selectedArtists: string[];
  mjStylize: string;
  mjQuality: string;
  mjVersion: string;
  styleRaw: boolean;
  excludeTags: string;
}

/** 电影级 MJ V6 提示词拼接器 */
export function PromptBuilder({ skill }: PromptBuilderProps) {
  const { options } = skill;
  const artists = options.artists ?? [];
  const shotScales = options.shotScales ?? DEFAULT_SHOT_SCALES;
  const cameraAngles = options.cameraAngles ?? DEFAULT_CAMERA_ANGLES;
  const colorGrades = options.colorGrades ?? DEFAULT_COLOR_GRADES;
  const filmStocks = options.filmStocks ?? DEFAULT_FILM_STOCKS;
  const presets = skill.presets ?? DEFAULT_PRESETS;

  const defaultDraft = useMemo<PromptDraft>(
    () => ({
      subject: presets.subjects[0].en,
      subjectZh: presets.subjects[0].zh,
      environment: presets.environments[0].en,
      environmentZh: presets.environments[0].zh,
      shotScale: shotScales[1]?.en ?? shotScales[0].en,
      cameraAngle: cameraAngles[0].en,
      colorGrade: colorGrades[0].en,
      filmStock: filmStocks[0].en,
      selectedStyles: [options.styles[0].en],
      lighting: options.lighting[0].en,
      lens: options.lens[0].en,
      aspectRatio: options.aspectRatios[0].en,
      selectedArtists: [],
      mjStylize: "250",
      mjQuality: "1",
      mjVersion: "6.1",
      styleRaw: true,
      excludeTags: "text, watermark, logo, blurry",
    }),
    [options, presets, shotScales, cameraAngles, colorGrades, filmStocks]
  );

  const { data, setData } = useToolboxDraft<PromptDraft>(skill.id, defaultDraft);
  const {
    subject,
    subjectZh,
    environment,
    environmentZh,
    shotScale,
    cameraAngle,
    colorGrade,
    filmStock,
    selectedStyles,
    lighting,
    lens,
    aspectRatio,
    selectedArtists,
    mjStylize,
    mjQuality,
    mjVersion,
    styleRaw,
    excludeTags,
  } = data;

  const patch = (partial: Partial<PromptDraft>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const findZh = (list: BilingualOption[], en: string) =>
    list.find((i) => i.en === en)?.zh ?? en;

  const toggleStyle = (en: string) => {
    setData((prev) => ({
      ...prev,
      selectedStyles: prev.selectedStyles.includes(en)
        ? prev.selectedStyles.filter((s) => s !== en)
        : [...prev.selectedStyles, en],
    }));
  };

  const toggleArtist = (en: string) => {
    setData((prev) => ({
      ...prev,
      selectedArtists: prev.selectedArtists.includes(en)
        ? prev.selectedArtists.filter((a) => a !== en)
        : [...prev.selectedArtists, en],
    }));
  };

  const buildPromptBody = () => {
    const parts: string[] = [];
    if (shotScale) parts.push(shotScale);
    if (cameraAngle && cameraAngle !== "eye level") parts.push(cameraAngle);
    if (subject.trim()) parts.push(subject.trim());
    if (environment.trim()) parts.push(environment.trim());
    if (selectedStyles.length) parts.push(selectedStyles.join(", "));
    if (lighting) parts.push(`${lighting} lighting`);
    if (lens) parts.push(`shot on ${lens}`);
    if (colorGrade) parts.push(colorGrade);
    if (filmStock) parts.push(filmStock);
    if (selectedArtists.length) parts.push(`in the style of ${selectedArtists.join(", ")}`);
    return parts.join(", ");
  };

  const buildMjSuffix = () => {
    const ar = aspectRatio ?? defaultDraft.aspectRatio;
    const s = mjStylize ?? defaultDraft.mjStylize;
    const q = mjQuality ?? defaultDraft.mjQuality;
    const v = mjVersion ?? defaultDraft.mjVersion;
    const noTags = (excludeTags ?? defaultDraft.excludeTags).trim();
    const flags = [`--ar ${ar}`, `--s ${s}`, `--q ${q}`, `--v ${v}`];
    if (styleRaw ?? defaultDraft.styleRaw) flags.push("--style raw");
    if (noTags) flags.push(`--no ${noTags}`);
    return flags.join(" ");
  };

  const buildEnglish = () => `${buildPromptBody()}, ${buildMjSuffix()}`;

  const buildChinese = () => {
    const parts: string[] = [];
    if (shotScale) parts.push(findZh(shotScales, shotScale));
    if (cameraAngle) parts.push(findZh(cameraAngles, cameraAngle));
    if (subjectZh.trim()) parts.push(subjectZh.trim());
    if (environmentZh.trim()) parts.push(environmentZh.trim());
    if (selectedStyles.length) {
      parts.push(selectedStyles.map((s) => findZh(options.styles, s)).join("、"));
    }
    if (lighting) parts.push(`${findZh(options.lighting, lighting)}光线`);
    if (lens) parts.push(`${findZh(options.lens, lens)}镜头`);
    if (colorGrade) parts.push(findZh(colorGrades, colorGrade));
    if (filmStock) parts.push(findZh(filmStocks, filmStock));
    if (selectedArtists.length) {
      parts.push(`参考${selectedArtists.map((a) => findZh(artists, a)).join("、")}风格`);
    }
    const suffix = `画幅 ${aspectRatio}，风格化 ${mjStylize}，质量 ${mjQuality}，V${mjVersion}${styleRaw ? "，原始模式" : ""}`;
    return `${parts.join("，")}。${suffix}`;
  };

  const applyLookPreset = (preset: (typeof LOOK_PRESETS)[number]) => {
    const styleEn = options.styles.find((s) => s.en === preset.styles[0])?.en ?? options.styles[0].en;
    const lightEn = options.lighting.find((l) => l.en === preset.lighting)?.en ?? options.lighting[0].en;
    const gradeEn = colorGrades.find((g) => g.en === preset.grade)?.en ?? colorGrades[0].en;
    patch({
      selectedStyles: [styleEn],
      lighting: lightEn,
      colorGrade: gradeEn,
    });
  };

  const handleRandom = () => {
    const sub = randomPick(presets.subjects);
    const env = randomPick(presets.environments);
    patch({
      subject: sub.en,
      subjectZh: sub.zh,
      environment: env.en,
      environmentZh: env.zh,
      shotScale: randomPick(shotScales).en,
      cameraAngle: randomPick(cameraAngles).en,
      colorGrade: randomPick(colorGrades).en,
      filmStock: randomPick(filmStocks).en,
      selectedStyles: randomPickMany(options.styles, randomPick([1, 2])).map(getEn),
      lighting: randomPick(options.lighting).en,
      lens: randomPick(options.lens).en,
      aspectRatio: randomPick(options.aspectRatios).en,
      selectedArtists: artists.length
        ? randomPickMany(artists, randomPick([0, 1, 2])).map(getEn)
        : [],
      mjStylize: randomPick(["100", "150", "250", "400", "600"]),
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-slate-400">一键影调预设</Label>
          <div className="flex flex-wrap gap-2">
            {LOOK_PRESETS.map((preset) => (
              <Button
                key={preset.label}
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => applyLookPreset(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>景别</Label>
            <Select value={shotScale} onValueChange={(v) => patch({ shotScale: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {shotScales.map((s) => (
                  <SelectItem key={s.en} value={s.en}>
                    {formatBilingual(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>机位</Label>
            <Select value={cameraAngle} onValueChange={(v) => patch({ cameraAngle: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cameraAngles.map((a) => (
                  <SelectItem key={a.en} value={a.en}>
                    {formatBilingual(a)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">主体描述</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => {
              const v = e.target.value;
              const match = presets.subjects.find((p) => p.en === v);
              patch({ subject: v, ...(match ? { subjectZh: match.zh } : {}) });
            }}
            placeholder="英文：a cinematic portrait of a woman"
          />
          <Input
            value={subjectZh}
            onChange={(e) => patch({ subjectZh: e.target.value })}
            placeholder="中文对照：电影感的女性人像"
            className="text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="environment">环境 / 场景</Label>
          <Textarea
            id="environment"
            value={environment}
            onChange={(e) => {
              const v = e.target.value;
              const match = presets.environments.find((p) => p.en === v);
              patch({ environment: v, ...(match ? { environmentZh: match.zh } : {}) });
            }}
            placeholder="英文：in a neon-lit alley at night"
            rows={2}
          />
          <Textarea
            value={environmentZh}
            onChange={(e) => patch({ environmentZh: e.target.value })}
            placeholder="中文对照：夜晚霓虹闪烁的小巷"
            rows={2}
            className="text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label>视觉风格（多选）</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.styles.map((style) => (
              <label
                key={style.en}
                className="flex items-start gap-2 rounded-md border border-border p-2 cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  className="mt-0.5"
                  checked={selectedStyles.includes(style.en)}
                  onCheckedChange={() => toggleStyle(style.en)}
                />
                <span className="text-sm leading-snug">{formatBilingual(style)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>光线</Label>
            <Select value={lighting} onValueChange={(v) => patch({ lighting: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.lighting.map((l) => (
                  <SelectItem key={l.en} value={l.en}>
                    {formatBilingual(l)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>镜头焦段</Label>
            <Select value={lens} onValueChange={(v) => patch({ lens: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.lens.map((l) => (
                  <SelectItem key={l.en} value={l.en}>
                    {formatBilingual(l)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>调色风格</Label>
            <Select value={colorGrade} onValueChange={(v) => patch({ colorGrade: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorGrades.map((g) => (
                  <SelectItem key={g.en} value={g.en}>
                    {formatBilingual(g)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>胶片 / 摄影机</Label>
            <Select value={filmStock} onValueChange={(v) => patch({ filmStock: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filmStocks.map((f) => (
                  <SelectItem key={f.en} value={f.en}>
                    {formatBilingual(f)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>画幅比</Label>
          <Select value={aspectRatio} onValueChange={(v) => patch({ aspectRatio: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.aspectRatios.map((ar) => (
                <SelectItem key={ar.en} value={ar.en}>
                  {formatBilingual(ar)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {artists.length > 0 && (
          <div className="space-y-2">
            <Label>摄影师参考（多选）</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {artists.map((artist) => (
                <label
                  key={artist.en}
                  className="flex items-start gap-2 rounded-md border border-border p-2 cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    className="mt-0.5"
                    checked={selectedArtists.includes(artist.en)}
                    onCheckedChange={() => toggleArtist(artist.en)}
                  />
                  <span className="text-sm leading-snug">{formatBilingual(artist)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
          <Label className="text-slate-300">MJ V6 参数</Label>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-500">--s 风格化</span>
              <Select value={mjStylize} onValueChange={(v) => patch({ mjStylize: v })}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["50", "100", "150", "250", "400", "600", "750"].map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-500">--q 质量</span>
              <Select value={mjQuality} onValueChange={(v) => patch({ mjQuality: v })}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["0.5", "1", "2"].map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-500">--v 版本</span>
              <Select value={mjVersion} onValueChange={(v) => patch({ mjVersion: v })}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["6.1", "6", "5.2", "niji 6"].map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={styleRaw ?? true}
              onCheckedChange={(c) => patch({ styleRaw: c === true })}
            />
            <span>--style raw（减少 MJ 默认美化，更写实可控）</span>
          </label>
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-500">--no 排除项</span>
            <Input
              value={excludeTags ?? ""}
              onChange={(e) => patch({ excludeTags: e.target.value })}
              placeholder="text, watermark, logo, blurry"
              className="font-mono text-xs"
            />
          </div>
        </div>

        <Button variant="outline" onClick={handleRandom} className="w-full sm:w-auto">
          <Shuffle className="h-4 w-4" />
          随机灵感
        </Button>
      </div>

      <BilingualPreview
        english={buildEnglish()}
        chinese={buildChinese()}
        hint="下方英文含完整 MJ 参数，可直接粘贴到 Discord / 官网"
      />
    </div>
  );
}
