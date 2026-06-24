import type { InfoSection } from "@/types";

/** 单个镜头条目 */
export interface SeedanceShotInput {
  id: string;
  timeStart: number;
  timeEnd: number;
  content: string;
  dialogue: string;
}

/** 从剧本文本提取 [出场角色] 行 */
export function parseCharactersLine(script: string): string {
  const match = script.match(/\[出场角色\][：:]\s*(.+)/);
  return match ? match[1].trim() : "";
}

/** 将出场角色行转为 [全局锁定] 中的角色绑定描述 */
export function buildCharacterBindings(
  charactersLine: string,
  customRefs?: string
): string {
  if (customRefs?.trim()) return customRefs.trim();

  const names = charactersLine
    .split(/[、,，]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const refLabels = ["一", "二", "三", "四", "五", "六"];
  const bindings = names.map((entry, i) => {
    // 取角色核心名：去掉女主/男主等前缀和服装后缀，保留中间名字
    const core = entry
      .replace(/^(女主|男主|男反|女反|配角)/, "")
      .replace(/(仙裙|黑袍|甲胄|宫装|西装|校服|战甲).*$/, "")
      .trim();
    const display = core || entry.split(/[A-Za-z]/)[0] || entry;
    return `角色${display}长相穿着[参考图${refLabels[i] || i + 1}]`;
  });

  return bindings.join("、");
}

/** 组装单个 15 秒组的 prompt_text */
export function buildSeedanceGroup(params: {
  scene: string;
  sceneRef: string;
  lighting: string;
  visualRef: string;
  characterBindings: string;
  shots: SeedanceShotInput[];
  statePrefix?: string;
}): string {
  const {
    scene,
    sceneRef,
    lighting,
    visualRef,
    characterBindings,
    shots,
    statePrefix = "",
  } = params;

  const stateNote = statePrefix ? `${statePrefix}，` : "";
  const globalLock = `[全局锁定] 场景和美学锚定：整段视频保持在${scene}${sceneRef ? `[${sceneRef}]` : ""}，${lighting}，幽暗深邃且类似影视剧${visualRef}的古典胶片感。${stateNote}${characterBindings}，服饰发型全程保持绝对一致！`;

  const shotBlocks = shots.map((shot, index) => {
    const timeLabel = `[${shot.timeStart}-${shot.timeEnd}秒/镜头${index + 1}]`;
    const anchor =
      index > 0
        ? `执行硬切，[承接上一镜头体态与场景光]，`
        : "";
    const body = `${timeLabel} ${anchor}${shot.content}`;
    const audio = `【对白/环境音】：${shot.dialogue || "[无台词，环境静默]"}`;
    return `${body}\n${audio}`;
  });

  return [globalLock, ...shotBlocks].join("\n\n");
}

/** 多组输出用 *** 分隔 */
export function buildMultiGroupOutput(groups: string[]): string {
  return groups.filter(Boolean).join("\n\n***\n\n");
}

/** 根据角色数生成参考图说明提示 */
export function buildRefImageHint(characterCount: number, hasScene: boolean): string {
  const refs: string[] = [];
  const labels = ["一", "二", "三", "四", "五", "六"];
  for (let i = 0; i < characterCount; i++) {
    refs.push(`参考图${labels[i]}=角色${i + 1}`);
  }
  if (hasScene) refs.push(`参考图${labels[characterCount] || characterCount + 1}=场景`);
  return refs.join("，");
}
