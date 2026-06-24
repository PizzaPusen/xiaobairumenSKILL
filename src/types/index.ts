/** Skill 大类：六种 AIGC 制片类型 */
export type PackCategoryId =
  | "ai-animation"
  | "film-short"
  | "domestic-drama"
  | "overseas-drama"
  | "tvc"
  | "ecommerce-ad";

export type PackAccent = "cyan" | "violet" | "teal" | "amber" | "rose" | "emerald";

/** SOP 阶段 */
export interface SOPPhase {
  phase: string;
  duration: string;
  tasks: string[];
  deliverables: string[];
  tools: string[];
}

/** 报价档位 */
export interface PricingTier {
  level: string;
  range: string;
  perUnit?: string;
  cycle: string;
  scenario: string;
  includes: string[];
}

/** 对标参考 */
export interface ReferenceWork {
  title: string;
  type: string;
  why: string;
  platform?: string;
  year?: string;
}

/** 工具栈条目 */
export interface ToolStackItem {
  category: string;
  tools: string[];
  purpose: string;
}

/** Skill 大类配置 */
export interface PackCategory {
  id: PackCategoryId;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  accent: PackAccent;
  overview: {
    positioning: string;
    typicalDuration: string;
    deliveryCycle: string;
    teamSize: string;
    clientProfile: string;
  };
  sop: SOPPhase[];
  pricing: {
    source: string;
    updatedAt: string;
    note: string;
    tiers: PricingTier[];
    comparison?: Array<{ type: string; ai: string; traditional: string; saving?: string }>;
  };
  references: ReferenceWork[];
  toolStack: ToolStackItem[];
  /** 短剧类启用：进入后展示题材子类导航 */
  hasSubCategories?: boolean;
}

/** 短剧题材子类 — 每类独立差异化内容 */
export interface PackSubCategory {
  id: string;
  categoryId: PackCategoryId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  /** 子题材卡片发光色 */
  accent?: PackAccent;
  audience: string;
  hookFormula: string;
  visualStyle: string;
  dialogueTone: string;
  sopHighlights: string[];
  pricingNote: string;
  pricingTiers: PricingTier[];
  references: ReferenceWork[];
  platformTips: string[];
  taboos: string[];
  toolFocus: string[];
}

/** 制片指南 Skill（非 Seedance 交互型） */
export interface ProductionGuideContent {
  genre: string;
  duration: string;
  difficulty: string;
  sop: SOPPhase[];
  pricing: {
    note: string;
    tiers: PricingTier[];
  };
  references: ReferenceWork[];
  toolStack: ToolStackItem[];
  checklist: string[];
  pitfalls: string[];
  deliverables: string[];
  workflowNotes?: string[];
}

export interface ProductionGuidePack extends BaseSkill {
  type: "production-guide";
  categoryId: PackCategoryId;
  subCategoryId?: string;
  content: ProductionGuideContent;
}

/** 统一 Skill 包类型（Seedance 交互 + 制片指南） */
export type AnyPack = SeedancePackSkill | ProductionGuidePack;

export function isSeedancePack(pack: AnyPack): pack is SeedancePackSkill {
  return pack.type === "seedance-pack";
}

export function isProductionGuide(pack: AnyPack): pack is ProductionGuidePack {
  return pack.type === "production-guide";
}

/** 技能类型枚举 */
export type SkillType =
  | "prompt-builder"
  | "template-fill"
  | "calculator"
  | "info-card"
  | "glossary"
  | "seedance-pack"
  | "production-guide";

/** 中英对照选项 */
export interface BilingualOption {
  en: string;
  zh: string;
}

/** 中英对照预设（主体/环境等） */
export interface BilingualPreset {
  en: string;
  zh: string;
}

/** 提示词拼接器选项 */
export interface PromptBuilderOptions {
  styles: BilingualOption[];
  lighting: BilingualOption[];
  lens: BilingualOption[];
  aspectRatios: BilingualOption[];
  artists?: BilingualOption[];
  shotScales?: BilingualOption[];
  cameraAngles?: BilingualOption[];
  colorGrades?: BilingualOption[];
  filmStocks?: BilingualOption[];
}

/** 模板填空占位符 */
export interface TemplatePlaceholder {
  key: string;
  label: string;
  type: "text" | "select";
  options?: BilingualOption[];
  default?: string;
  defaultZh?: string;
  placeholderZh?: string;
}

/** 计算器字段 */
export interface CalculatorField {
  key: string;
  label: string;
  type: "number" | "select" | "text";
  unit?: string;
  options?: string[];
  default?: string | number;
}

/** 计算器配置 */
export interface CalculatorConfig {
  formula: "duration-frames" | "resolution-aspect" | "mj-params" | "custom";
  fields: CalculatorField[];
  description?: string;
  /** MJ 参数解释用 */
  params?: Array<{ param: string; meaning: string; example: string }>;
}

/** 信息卡片区块 */
export interface InfoSection {
  title: string;
  content: string;
  items?: string[];
  tip?: string;
  /** 英文提示词（与 tip 分开展示中英对照） */
  promptEn?: string;
  promptZh?: string;
}

/** 每日练习任务配置 */
export interface DailyPracticeConfig {
  tasks: string[];
  categories: string[];
  durations: string[];
}

/** 工具箱分区：创作 / 查阅 / 小工具 / 练习 */
export type ToolboxCategory = "creation" | "reference" | "utility" | "practice";

/** 用户场景筛选：图像 / 视频 / 制片 */
export type ToolboxScenario = "image" | "video" | "production" | "reference";

export interface BaseSkill {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  type: SkillType;
  /** 工具箱列表分区；reference 类归入查阅中心 */
  toolboxCategory?: ToolboxCategory;
  /** 场景筛选标签 */
  scenario?: ToolboxScenario;
  guide?: string;
}

export interface PromptBuilderSkill extends BaseSkill {
  type: "prompt-builder";
  options: PromptBuilderOptions;
  /** 主体/环境随机预设 */
  presets?: {
    subjects: BilingualPreset[];
    environments: BilingualPreset[];
  };
}

export interface TemplateFillSkill extends BaseSkill {
  type: "template-fill";
  template: string;
  /** 中文对照模板，占位符与 template 相同 */
  templateZh?: string;
  placeholders: TemplatePlaceholder[];
}

export interface CalculatorSkill extends BaseSkill {
  type: "calculator";
  calculator: CalculatorConfig;
}

export interface InfoCardSkill extends BaseSkill {
  type: "info-card";
  sections: InfoSection[];
}

export interface GlossarySkill extends BaseSkill {
  type: "glossary";
}

/** 名词百科词条 */
export interface GlossaryTerm {
  id: string;
  term: string;
  termEn?: string;
  alias?: string[];
  definition: string;
  example?: string;
  related?: string[];
}

export type GlossaryCategoryId = "aigc" | "film" | "agent";

export interface GlossaryCategory {
  id: GlossaryCategoryId;
  label: string;
  description: string;
  terms: GlossaryTerm[];
}

export interface GlossaryData {
  categories: GlossaryCategory[];
}

/** 带每日练习的特殊模板技能 */
export interface DailyPracticeSkill extends BaseSkill {
  type: "template-fill";
  template: string;
  placeholders: TemplatePlaceholder[];
  practice?: DailyPracticeConfig;
}

/** Seedance 2.0 短剧 Skill 配置 */
export interface SeedancePackConfig {
  genre: string;
  visualRefs: string[];
  defaultVisualRef: string;
  defaultLighting: string;
  defaultScene: string;
  defaultSceneRef: string;
  defaultCharacters: string;
  exampleScript: string;
  exampleOutput: string;
  genreTips: InfoSection[];
  defaultShots?: Array<{
    timeStart: number;
    timeEnd: number;
    content: string;
    dialogue: string;
  }>;
}

export interface SeedancePackSkill extends BaseSkill {
  type: "seedance-pack";
  categoryId: PackCategoryId;
  subCategoryId?: string;
  pack: SeedancePackConfig;
}

export type Skill =
  | PromptBuilderSkill
  | TemplateFillSkill
  | CalculatorSkill
  | InfoCardSkill
  | GlossarySkill
  | DailyPracticeSkill
  | SeedancePackSkill;

export type ModelType =
  | "图像"
  | "视频"
  | "音乐"
  | "多模态"
  | "图像生成"
  | "视频生成"
  | "音乐生成";

export interface ModelScores {
  /** 画质（1-10） */
  quality: number;
  /** 可控性（1-10） */
  controllability: number;
  /** 易用性（1-10，越高越易上手） */
  easeOfUse: number;
  /** 性价比（1-10） */
  value: number;
  /** 中文友好（1-10） */
  chinese: number;
  /** 商用成熟度（1-10） */
  commercial: number;
}

export interface Model {
  id: string;
  name: string;
  type: ModelType;
  free: string;
  ease: number;
  bestFor: string;
  pros: string[];
  cons: string[];
  url: string;
  detail: string;
  /** 六维雷达评分，数据综合自第三方测评（见 benchmarkSource） */
  scores?: ModelScores;
  benchmarkSource?: string;
}

export interface SkillsData {
  skills: Skill[];
}

export interface ModelsData {
  models: Model[];
}

/** AI / 影视行业资讯 */
export type NewsCategory = "ai" | "film" | "policy";

export interface IndustryNewsItem {
  id: string;
  date: string;
  category: NewsCategory;
  /** 中文标题（本土翻译） */
  title: string;
  /** 英文原标题 */
  titleEn?: string;
  /** 中文摘要与本土总结 */
  summary: string;
  /** 英文原文摘要 */
  summaryEn?: string;
  source: string;
  sourceUrl?: string;
  tags?: string[];
  /** intl=国外一手 | cn=国内 | both=中外双线 */
  region?: "intl" | "cn" | "both";
}

export interface IndustryNewsData {
  updatedAt: string;
  items: IndustryNewsItem[];
  watchBlocks?: FilmWatchBlock[];
}

/** 影视专题榜（短剧热榜、AI 电影、电影节成绩等） */
export interface FilmWatchEntry {
  rank: number;
  title: string;
  metric: string;
  platform?: string;
  href?: string;
  note?: string;
}

export interface FilmWatchSource {
  name: string;
  url: string;
}

export interface FilmWatchBlock {
  id: string;
  title: string;
  period: string;
  asOf: string;
  region: "cn" | "intl" | "both";
  intro?: string;
  analysis: string;
  entries: FilmWatchEntry[];
  sources: FilmWatchSource[];
}
