"use client";

import { useEffect, useState, useCallback } from "react";
import { hasToolboxDraft, loadToolboxDraft, saveToolboxDraft } from "@/lib/toolbox-draft";

export function useToolboxDraft<T>(skillId: string, initial: T) {
  const [data, setData] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadToolboxDraft<T>(skillId);
    if (saved) {
      setData({ ...initial, ...saved });
    } else {
      setData(initial);
    }
    setHydrated(true);
    // 仅在 skillId 切换时从本地恢复；initial 取当前闭包即可
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillId]);

  useEffect(() => {
    if (!hydrated) return;
    saveToolboxDraft(skillId, data);
  }, [skillId, data, hydrated]);

  const resetDraft = useCallback(() => {
    setData(initial);
  }, [initial]);

  return { data, setData, hydrated, resetDraft };
}

export function useSkillsWithDrafts(skillIds: string[]) {
  const [draftIds, setDraftIds] = useState<Set<string>>(new Set());
  const idsKey = skillIds.join("|");

  useEffect(() => {
    const ids = idsKey ? idsKey.split("|") : [];
    const next = new Set(ids.filter((id) => hasToolboxDraft(id)));
    setDraftIds((prev) => {
      if (prev.size === next.size && [...prev].every((id) => next.has(id))) {
        return prev;
      }
      return next;
    });
  }, [idsKey]);

  return draftIds;
}
