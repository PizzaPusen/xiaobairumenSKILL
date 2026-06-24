import skillsJson from "@/data/skills.json";
import modelsJson from "@/data/models.json";
import seedancePacksJson from "@/data/seedance-packs.json";
import productionPacksJson from "@/data/production-packs.json";
import packCategoriesJson from "@/data/pack-categories.json";
import packSubcategoriesJson from "@/data/pack-subcategories.json";
import industryNewsJson from "@/data/industry-news.json";
import glossaryJson from "@/data/glossary.json";
import type {
  Skill,
  Model,
  SkillsData,
  ModelsData,
  SeedancePackSkill,
  ProductionGuidePack,
  AnyPack,
  PackCategory,
  PackCategoryId,
  PackSubCategory,
  IndustryNewsData,
  IndustryNewsItem,
  FilmWatchBlock,
  GlossaryData,
  ToolboxCategory,
} from "@/types";

const skillsData = skillsJson as SkillsData;
const modelsData = modelsJson as ModelsData;
const seedancePacks = (seedancePacksJson as { packs: SeedancePackSkill[] }).packs;
const productionPacks = (productionPacksJson as { packs: ProductionGuidePack[] }).packs;
const packCategories = (packCategoriesJson as { categories: PackCategory[] }).categories;
const packSubCategories = (packSubcategoriesJson as { subCategories: PackSubCategory[] })
  .subCategories;

const CATEGORY_IDS: PackCategoryId[] = [
  "ai-animation",
  "film-short",
  "domestic-drama",
  "overseas-drama",
  "tvc",
  "ecommerce-ad",
];

export function isPackCategoryId(id: string): id is PackCategoryId {
  return CATEGORY_IDS.includes(id as PackCategoryId);
}

export function getToolboxSkills(): Skill[] {
  return skillsData.skills.filter((s) => s.toolboxCategory !== "reference");
}

export function getSkillsForStaticParams(): Skill[] {
  return skillsData.skills;
}

export function getToolboxSkillsByCategory(category: ToolboxCategory): Skill[] {
  const order: Record<ToolboxCategory, string[]> = {
    creation: [
      "prompt-cinematic",
      "storyboard-template",
      "sd-negative-prompts",
      "brief-to-storyboard",
    ],
    reference: ["ai-glossary", "mj-params-cheatsheet", "cinematic-lighting"],
    utility: ["video-duration-calc", "resolution-calc"],
    practice: ["daily-practice"],
  };
  const ids = order[category];
  return ids
    .map((id) => skillsData.skills.find((s) => s.id === id))
    .filter((s): s is Skill => !!s);
}

export function getSkillById(id: string): Skill | undefined {
  return skillsData.skills.find((s) => s.id === id);
}

export function getPackCategories(): PackCategory[] {
  return packCategories;
}

export function getPackCategoryById(id: string): PackCategory | undefined {
  return packCategories.find((c) => c.id === id);
}

export function getSubCategoriesByCategory(categoryId: PackCategoryId): PackSubCategory[] {
  return packSubCategories.filter((s) => s.categoryId === categoryId);
}

export function getSubCategoryById(id: string): PackSubCategory | undefined {
  return packSubCategories.find((s) => s.id === id);
}

export function getAllPacks(): AnyPack[] {
  return [...seedancePacks, ...productionPacks];
}

export function getPacksByCategory(categoryId: PackCategoryId): AnyPack[] {
  return getAllPacks().filter((p) => p.categoryId === categoryId);
}

export function getPacksBySubCategory(
  categoryId: PackCategoryId,
  subCategoryId: string
): AnyPack[] {
  return getPacksByCategory(categoryId).filter((p) => p.subCategoryId === subCategoryId);
}

export function getPackById(id: string): AnyPack | undefined {
  return getAllPacks().find((p) => p.id === id);
}

export function getSeedancePacks(): SeedancePackSkill[] {
  return seedancePacks;
}

export function getPackGenres(): string[] {
  const genres = new Set(seedancePacks.map((p) => p.pack.genre));
  return ["全部", ...Array.from(genres)];
}

export function getAllModels(): Model[] {
  return modelsData.models;
}

export function getModelCategories(): string[] {
  return ["全部", "图像", "视频", "音乐", "多模态"];
}

const industryNewsData = industryNewsJson as IndustryNewsData;

const NEWS_WINDOW_MONTHS = 2;

function getNewsCutoffDate(reference = new Date()): string {
  const cutoff = new Date(reference);
  cutoff.setMonth(cutoff.getMonth() - NEWS_WINDOW_MONTHS);
  return cutoff.toISOString().slice(0, 10);
}

export function getIndustryNews(): {
  items: IndustryNewsItem[];
  watchBlocks: FilmWatchBlock[];
  updatedAt: string;
  cutoffDate: string;
} {
  const cutoffDate = getNewsCutoffDate();
  const items = industryNewsData.items
    .filter((item) => item.date >= cutoffDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return {
    items,
    watchBlocks: industryNewsData.watchBlocks ?? [],
    updatedAt: industryNewsData.updatedAt,
    cutoffDate,
  };
}

export function getLatestNews(count = 3): IndustryNewsItem[] {
  return getIndustryNews().items.slice(0, count);
}

const glossaryData = glossaryJson as GlossaryData;

export function getGlossary(): GlossaryData {
  return glossaryData;
}

export function filterModelsByCategory(category: string): Model[] {
  if (category === "全部") return getAllModels();
  const typeMap: Record<string, string[]> = {
    图像: ["图像", "图像生成"],
    视频: ["视频", "视频生成"],
    音乐: ["音乐", "音乐生成"],
    多模态: ["多模态"],
  };
  const types = typeMap[category] ?? [category];
  return getAllModels().filter((m) => types.some((t) => m.type.includes(t)));
}
