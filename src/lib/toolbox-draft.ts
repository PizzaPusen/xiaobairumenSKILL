const PREFIX = "toolbox-draft-";

export function getDraftKey(skillId: string): string {
  return `${PREFIX}${skillId}`;
}

export function saveToolboxDraft(skillId: string, data: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      getDraftKey(skillId),
      JSON.stringify({ savedAt: Date.now(), data })
    );
  } catch {
    /* quota */
  }
}

export function loadToolboxDraft<T>(skillId: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getDraftKey(skillId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data?: T };
    return parsed.data ?? null;
  } catch {
    return null;
  }
}

export function hasToolboxDraft(skillId: string): boolean {
  return loadToolboxDraft(skillId) !== null;
}

export function clearToolboxDraft(skillId: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getDraftKey(skillId));
}
