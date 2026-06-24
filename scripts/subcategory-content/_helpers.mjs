/** 子题材内容构建辅助 — 合并基础字段与定制内容 */
export function buildSub(id, categoryId, name, tagline, icon, accent, fields) {
  return {
    id,
    categoryId,
    name,
    tagline,
    icon,
    accent,
    ...fields,
  };
}

export function tiers(levels) {
  return levels.map(([level, range, cycle, scenario, includes]) => ({
    level,
    range,
    cycle,
    scenario,
    includes: Array.isArray(includes) ? includes : [includes],
  }));
}
