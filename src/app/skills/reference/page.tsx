import { Suspense } from "react";
import { ReferenceHub } from "@/components/skills/reference-hub";

export const metadata = {
  title: "查阅中心 - 工具箱 - AIGC 片场",
  description: "AI 名词百科、MJ 参数速查、影视灯光术语，一页集中查阅",
};

export default function ReferencePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto py-12 text-center text-slate-500 text-sm">加载中…</div>
      }
    >
      <ReferenceHub />
    </Suspense>
  );
}
