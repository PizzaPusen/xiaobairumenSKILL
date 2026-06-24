import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <h1 className="font-display text-6xl font-medium text-foreground/60 mb-4">404</h1>
      <p className="text-muted-foreground mb-6">页面未找到，可能已被移出片场</p>
      <Link href="/" className="text-foreground hover:underline">
        返回首页
      </Link>
    </div>
  );
}
