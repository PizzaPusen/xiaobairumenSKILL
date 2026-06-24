import type { ToolboxScenario } from "@/types";

export const TOOLBOX_TASKS = [
  {
    id: "concept",
    label: "出概念图",
    description: "拼 MJ 提示词",
    href: "/skills/prompt-cinematic",
    scenario: "image" as ToolboxScenario,
  },
  {
    id: "video",
    label: "出视频镜头",
    description: "分镜提示词模板",
    href: "/skills/storyboard-template",
    scenario: "video" as ToolboxScenario,
  },
  {
    id: "brief",
    label: "制片文档",
    description: "Brief 分镜表",
    href: "/skills/brief-to-storyboard",
    scenario: "production" as ToolboxScenario,
  },
  {
    id: "reference",
    label: "查名词参数",
    description: "百科与速查",
    href: "/skills/reference",
    scenario: "reference" as ToolboxScenario,
  },
] as const;

export const SCENARIO_FILTERS: Array<{ id: "all" | ToolboxScenario; label: string }> = [
  { id: "all", label: "全部" },
  { id: "image", label: "图像" },
  { id: "video", label: "视频" },
  { id: "production", label: "制片" },
];

/** 创作类工具横向切换 */
export const CREATION_TOOL_IDS = [
  "prompt-cinematic",
  "storyboard-template",
  "sd-negative-prompts",
  "brief-to-storyboard",
] as const;

export interface NextStepLink {
  label: string;
  href: string;
  description?: string;
}

export const TOOL_NEXT_STEPS: Record<string, NextStepLink[]> = {
  "prompt-cinematic": [
    { label: "对比图像模型", href: "/models", description: "选 MJ / SD / Flux" },
    { label: "打开 Skill 出片", href: "/packs", description: "完整制片流程" },
  ],
  "storyboard-template": [
    { label: "对比视频模型", href: "/models", description: "Runway / 可灵 / Seedance" },
    { label: "国内短剧 Skill", href: "/packs/domestic-drama", description: "分镜组装器" },
  ],
  "sd-negative-prompts": [
    { label: "提示词拼接器", href: "/skills/prompt-cinematic", description: "正向提示配套" },
    { label: "对比图像模型", href: "/models" },
  ],
  "brief-to-storyboard": [
    { label: "视频分镜模板", href: "/skills/storyboard-template", description: "写出 AI 视频提示词" },
    { label: "Skill 制片 SOP", href: "/packs", description: "按题材选用" },
  ],
  "video-duration-calc": [
    { label: "视频分镜模板", href: "/skills/storyboard-template", description: "按秒数规划镜头" },
    { label: "分辨率换算", href: "/skills/resolution-calc" },
  ],
  "resolution-calc": [
    { label: "时长帧率换算", href: "/skills/video-duration-calc" },
    { label: "模型对比", href: "/models" },
  ],
  "daily-practice": [
    { label: "提示词拼接器", href: "/skills/prompt-cinematic", description: "开始今日练习" },
    { label: "使用指南", href: "/about", description: "学习路径" },
  ],
};

/** 名词 → 推荐工具 */
export const TERM_TOOL_LINKS: Record<string, { label: string; href: string }> = {
  提示词: { label: "提示词拼接器", href: "/skills/prompt-cinematic" },
  负向提示词: { label: "SD 负向提示词", href: "/skills/sd-negative-prompts" },
  分镜: { label: "视频分镜模板", href: "/skills/storyboard-template" },
  CFG: { label: "MJ 参数速查", href: "/skills/reference?tab=mj" },
  LoRA: { label: "MJ 参数速查", href: "/skills/reference?tab=mj" },
  画幅比: { label: "分辨率换算", href: "/skills/resolution-calc" },
  景深: { label: "灯光术语", href: "/skills/reference?tab=lighting" },
  三点布光: { label: "灯光术语", href: "/skills/reference?tab=lighting" },
};
