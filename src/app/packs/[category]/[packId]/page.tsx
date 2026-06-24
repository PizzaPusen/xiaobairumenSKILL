import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getPackById,
  getPackCategoryById,
  getPacksByCategory,
  getPackCategories,
  getSubCategoryById,
  isPackCategoryId,
} from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { SkillGuide } from "@/components/skills/skill-guide";
import { SeedancePack } from "@/components/skills/seedance-pack";
import { ProductionGuideView } from "@/components/packs/production-guide";
import { PackSubcategoryContext } from "@/components/packs/pack-subcategory-context";
import { isProductionGuide, isSeedancePack } from "@/types";

const ROLE_TAGS = [
  "分镜 Skill",
  "制片全流程",
  "钩子脚本",
  "投流变现",
  "视觉锁定",
  "英文脚本",
  "风格锁定",
  "量产管线",
  "平台运营",
  "投递发行",
  "后期交付",
  "合规审查",
  "交付规范",
  "ROI优化",
  "素材脚本",
] as const;

function getPackRoleLabel(pack: { tags: string[]; type: string }): string {
  if (isSeedancePack(pack as Parameters<typeof isSeedancePack>[0])) return "分镜 Skill";
  const role = pack.tags.find((t) => (ROLE_TAGS as readonly string[]).includes(t));
  return role || "制片 SOP";
}

interface PackDetailPageProps {
  params: { category: string; packId: string };
}

export function generateStaticParams() {
  const params: { category: string; packId: string }[] = [];
  for (const cat of getPackCategories()) {
    for (const pack of getPacksByCategory(cat.id)) {
      params.push({ category: cat.id, packId: pack.id });
    }
  }
  return params;
}

export function generateMetadata({ params }: PackDetailPageProps) {
  const pack = getPackById(params.packId);
  if (!pack) return { title: "Skill 未找到" };
  return {
    title: `${pack.name} - AIGC Skill`,
    description: pack.description,
  };
}

export default function PackDetailPage({ params }: PackDetailPageProps) {
  if (!isPackCategoryId(params.category)) notFound();

  const category = getPackCategoryById(params.category);
  const pack = getPackById(params.packId);

  if (!category || !pack || pack.categoryId !== params.category) notFound();

  const Icon = getIcon(pack.icon);
  const sub = pack.subCategoryId ? getSubCategoryById(pack.subCategoryId) : undefined;
  const backHref = sub
    ? `/packs/${params.category}?sub=${sub.id}`
    : `/packs/${params.category}`;

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回 {sub ? `「${sub.name}」` : category.name}
      </Link>

      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06] shrink-0">
          <Icon className="h-6 w-6 text-foreground/90" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge className="bg-white/[0.08] text-foreground/90 border-0 text-xs">
              {category.name}
            </Badge>
            {sub && (
              <Link href={backHref}>
                <Badge className="bg-violet-500/15 text-violet-200 border-violet-400/25 text-xs hover:bg-violet-500/25 transition-colors cursor-pointer">
                  {sub.name}
                </Badge>
              </Link>
            )}
            <Badge className="text-xs bg-white/[0.06] text-slate-400 border border-white/10">
              {getPackRoleLabel(pack)}
            </Badge>
            {isSeedancePack(pack) && (
              <Badge className="text-xs border-cyan-500/20 text-cyan-300/80 bg-cyan-500/10">
                Seedance 2.0
              </Badge>
            )}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-medium">{pack.name}</h1>
          <p className="text-muted-foreground mt-1">{pack.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {pack.tags.map((tag) => (
              <Badge
                key={tag}
                className="text-xs border-white/10 text-muted-foreground bg-transparent border"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {sub && <PackSubcategoryContext categoryId={params.category} sub={sub} />}

      {pack.guide && <SkillGuide guide={pack.guide} skillId={pack.id} />}

      {isSeedancePack(pack) && <SeedancePack skill={pack} />}
      {isProductionGuide(pack) && <ProductionGuideView pack={pack} />}
    </div>
  );
}
