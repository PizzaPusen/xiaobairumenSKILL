"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "平台介绍",
    content:
      "AIGC 片场是为从传统影视转型到 AIGC 的新手打造的一站式学习与创作工具箱。我们用影视人熟悉的语言（分镜、灯光、焦段、画幅比）重新包装 AI 工具的使用方式，让你无需学习编程或配置 API，打开网页就能开始创作。",
  },
  {
    title: "适合人群",
    items: [
      "影视导演、摄影师、剪辑师想快速了解 AIGC",
      "广告/宣传片从业者需要 AI 辅助概念图与样片",
      "影视院校学生探索 AI 与传统影视的结合",
      "对 AIGC 好奇但不想折腾技术配置的创作人",
    ],
  },
  {
    title: "使用建议",
    items: [
      "从「电影级提示词拼接器」开始，熟悉 AI 提示词的基本结构",
      "用「模型对比」页面选择适合自己的工具，不必贪多",
      "每天完成一个「每日练习任务」，养成创作习惯",
      "将工具箱作为参考手册，在实际项目中随时查阅",
      "所有工具纯本地运行，可放心在离线环境使用",
    ],
  },
];

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // 占位功能：仅展示 UI，不发送任何请求
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <PageHeader
        title="关于 AIGC 片场"
        description="帮助影视人平滑过渡到 AIGC 创作"
      />

      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {section.content && (
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-muted-foreground leading-relaxed before:content-['•'] before:text-foreground/40 before:font-bold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}

        {/* 邮箱订阅占位 UI */}
        <Card className="border-white/10">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="h-5 w-5 text-foreground/70" />
              订阅更新
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              获取新工具与 AIGC 资讯（功能开发中，暂无实际订阅）
            </p>
            {submitted ? (
              <div className="flex items-center gap-2 text-foreground/70">
                <Check className="h-4 w-4" />
                <span className="text-sm">感谢订阅！我们会尽快上线此功能。</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="cinema">
                  订阅
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
