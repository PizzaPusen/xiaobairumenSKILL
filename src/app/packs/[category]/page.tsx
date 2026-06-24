import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getPackCategories,
  getPackCategoryById,
  getPacksByCategory,
  getSubCategoriesByCategory,
  isPackCategoryId,
} from "@/lib/data";
import { CategoryDetail } from "@/components/packs/category-detail";

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return getPackCategories().map((c) => ({ category: c.id }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getPackCategoryById(params.category);
  if (!category) return { title: "类型未找到" };
  return {
    title: `${category.name} - AIGC Skill`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  if (!isPackCategoryId(params.category)) notFound();

  const category = getPackCategoryById(params.category);
  if (!category) notFound();

  const packs = getPacksByCategory(params.category);
  const subCategories = getSubCategoriesByCategory(params.category);

  return (
    <Suspense fallback={<div className="p-8 text-muted-foreground">加载中…</div>}>
      <CategoryDetail
        category={category}
        packs={packs}
        subCategories={subCategories}
      />
    </Suspense>
  );
}
