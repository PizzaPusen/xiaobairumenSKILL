import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

/** 页面通用标题区 */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-10 animate-fade-in glass rounded-2xl p-8 border-slate-400/10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
        AIGC Studio
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3 text-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
