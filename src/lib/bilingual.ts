import type { BilingualOption } from "@/types";

/** 取英文值（用于复制到 AI 工具） */
export function getEn(item: string | BilingualOption): string {
  return typeof item === "string" ? item : item.en;
}

/** 取中文说明 */
export function getZh(item: string | BilingualOption): string {
  return typeof item === "string" ? item : item.zh;
}

/** UI 展示：中文 / English */
export function formatBilingual(item: string | BilingualOption): string {
  if (typeof item === "string") return item;
  return `${item.zh} / ${item.en}`;
}

/** 从选项列表按英文值查找中文 */
export function lookupZh(
  options: BilingualOption[] | undefined,
  enValue: string
): string {
  const found = options?.find((o) => o.en === enValue);
  return found?.zh ?? enValue;
}
