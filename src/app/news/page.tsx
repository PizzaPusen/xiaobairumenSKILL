import { getIndustryNews } from "@/lib/data";
import { NewsFeed } from "@/components/news/news-feed";

export const metadata = {
  title: "AI 资讯 - AIGC 片场",
  description: "近两个月 AI 行业与影视行业事件，国外一手报道中英双语摘要",
};

export default function NewsPage() {
  const { items, watchBlocks, updatedAt, cutoffDate } = getIndustryNews();
  return (
    <NewsFeed
      items={items}
      watchBlocks={watchBlocks}
      updatedAt={updatedAt}
      cutoffDate={cutoffDate}
    />
  );
}
