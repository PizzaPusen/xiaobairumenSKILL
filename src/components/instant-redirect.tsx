"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** 静态导出时替代 next/navigation redirect */
export function InstantRedirect({ href }: { href: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(href);
  }, [href, router]);
  return <p className="text-center py-16 text-sm text-slate-500">正在跳转…</p>;
}
