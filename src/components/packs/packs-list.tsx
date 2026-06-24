"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { getIcon } from "@/lib/icons";
import { getPackGenres } from "@/lib/data";
import type { SeedancePackSkill } from "@/types";

interface PacksListProps {
  packs: SeedancePackSkill[];
}

/** Skill 列表页 */
export function PacksList({ packs }: PacksListProps) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("全部");
  const genres = getPackGenres();

  const filtered = useMemo(() => {
    let list = packs;
    if (genre !== "全部") {
      list = list.filter((p) => p.pack.genre === genre);
    }
    const q = query.toLowerCase().trim();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.pack.genre.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [packs, query, genre]);

  return (
    <div>
      <PageHeader
        title="AIGC Skill"
        description="面向 Seedance 2.0 等视频模型的分场景提示词工作流，按题材收纳，开箱即用"
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 mb-6 text-sm text-muted-foreground leading-relaxed">
        <span className="text-foreground/90 font-medium">与工具箱的区别：</span>
        工具箱提供通用小工具；Skill 是完整创作流程模板（含规则、示例剧本、分镜组装器），专为短剧 / 广告 / MV 等垂直场景设计。
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {genres.map((g) => (
          <Button
            key={g}
            variant={genre === g ? "cinema" : "outline"}
            size="sm"
            onClick={() => setGenre(g)}
          >
            {g}
          </Button>
        ))}
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索 Skill、题材、标签..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>没有找到匹配的 Skill</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pack) => {
            const Icon = getIcon(pack.icon);
            return (
              <Link key={pack.id} href={`/packs/${pack.id}`}>
                <Card className="h-full cursor-pointer hover:border-white/15 border-white/[0.08]">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] shrink-0">
                        <Icon className="h-5 w-5 text-foreground/90" />
                      </div>
                      <Badge variant="outline" className="text-[10px] border-white/10 text-muted-foreground shrink-0">
                        {pack.pack.genre}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2 leading-snug">{pack.name}</CardTitle>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {pack.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-border text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
