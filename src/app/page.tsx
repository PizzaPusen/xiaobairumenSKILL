import Link from "next/link";
import { ArrowRight, Wrench, Package, GitCompareArrows, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "violet" | "teal" | "rose";

const features: Array<{
  title: string;
  description: string;
  href: string;
  icon: typeof Wrench;
  accent: Accent;
  featured?: boolean;
}> = [
  {
    title: "工具箱",
    description: "创作工作台、查阅中心与制片小工具：提示词、分镜、名词百科，本地即开即用",
    href: "/skills",
    icon: Wrench,
    accent: "cyan",
  },
  {
    title: "Skill",
    description: "六大制片类型、72 个子题材，每类 4–5 个不同功能 Skill，含分镜与制片 SOP",
    href: "/packs",
    icon: Package,
    accent: "violet",
    featured: true,
  },
  {
    title: "模型对比",
    description: "Nano Banana Pro、GPT Image 2、Seedance 2.0、海螺等 20+ 款工具横向对比，含六维雷达图",
    href: "/models",
    icon: GitCompareArrows,
    accent: "teal",
  },
  {
    title: "AI 资讯",
    description: "近两个月国内外一手报道，英文原文摘要 + 中文本土总结，按时间倒序更新",
    href: "/news",
    icon: Newspaper,
    accent: "rose",
  },
];

const accentClass: Record<Accent, string> = {
  cyan: "glass-glow-cyan",
  violet: "glass-glow-violet",
  teal: "glass-glow-teal",
  rose: "glass-glow-rose",
};

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <section className="relative py-12 md:py-16 mb-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="ambient-orb top-0 left-[15%] w-[500px] h-[500px] bg-cyan-500/25" />
          <div className="ambient-orb top-[20%] -right-[5%] w-[420px] h-[420px] bg-violet-500/22" />
          <div className="ambient-orb -bottom-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-amber-500/15" />
        </div>

        <div className="glass-hero text-center max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-300/70 mb-6">
            Film to AIGC · Local First
          </p>
          <h1 className="font-hero text-4xl md:text-[3.5rem] font-light tracking-[0.06em] md:tracking-[0.1em] mb-6 leading-[1.4] md:leading-[1.35]">
            <span className="text-white/92">从影视到 AIGC</span>
            <br />
            <span className="text-gradient-hero">一站上手</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
            无需折腾 API，所有工具本地即开即用
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button variant="cta" size="xl" asChild>
              <Link href="/packs">
                打开 Skill
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link href="/skills">工具箱</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="ambient-orb top-1/2 left-0 w-[300px] h-[300px] bg-cyan-500/12 -translate-y-1/2" />
          <div className="ambient-orb top-1/2 right-0 w-[300px] h-[300px] bg-violet-500/12 -translate-y-1/2" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} href={feature.href} className="group">
                <div
                  className={cn(
                    "glass-glow-card h-full",
                    accentClass[feature.accent],
                    feature.featured && "glass-glow-featured"
                  )}
                >
                  <div className="relative z-10 flex flex-col p-6 h-full">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl mb-4 transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: "var(--icon-bg)",
                        border: "1px solid var(--icon-border)",
                        boxShadow: "0 0 24px -4px var(--glow-color)",
                      }}
                    >
                      <Icon
                        className="h-5 w-5 transition-colors duration-300"
                        style={{ color: "var(--icon-color)" }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1">
                      {feature.description}
                    </p>
                    <span
                      className="text-xs inline-flex items-center gap-1 mt-4 font-medium transition-all duration-300 group-hover:gap-1.5"
                      style={{ color: "var(--link-color)" }}
                    >
                      进入
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
