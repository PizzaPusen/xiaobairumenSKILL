/**
 * 为全部 72 子题材生成 Skill（每类 3–5 个不同功能，无重复）
 * 运行: node scripts/generate-all-sub-skills.mjs
 */
import fs from "fs";

const subs = JSON.parse(
  fs.readFileSync("src/data/pack-subcategories.json", "utf8")
).subCategories;

/** 每大类子题材 Skill 组合（功能互不重复） */
const PLANS = {
  "domestic-drama": ["seedance", "sop", "hook", "launch", "visual"],
  "overseas-drama": ["seedance", "sop", "hook", "en-script", "launch"],
  "ai-animation": ["seedance", "sop", "style", "pipeline", "platform"],
  "film-short": ["seedance", "sop", "pitch", "post"],
  tvc: ["seedance", "sop", "compliance", "delivery"],
  "ecommerce-ad": ["script", "sop", "roi", "compliance"],
};

const ARCHETYPE = {
  seedance: {
    type: "seedance",
    label: "分镜 Skill",
    tag: "分镜 Skill",
    name: (s) => `${s.name}·Seedance 分镜`,
    desc: (s) => `${s.tagline}竖屏分镜：基于钩子公式与视觉风格的 Seedance 2.0 提示词组装`,
    guide: (s) => `粘贴剧本后按镜头填写。视觉：${s.visualStyle.slice(0, 60)}…`,
  },
  script: {
    type: "production",
    label: "素材脚本",
    tag: "素材脚本",
    name: (s) => `${s.name}·爆款脚本公式`,
    desc: (s) => `电商${s.name}素材脚本结构、卖点拆解与平台合规用语`,
    guide: (s) => `前 3 秒必须出现产品或痛点。${s.hookFormula.slice(0, 80)}`,
  },
  sop: {
    type: "production",
    label: "制片 SOP",
    tag: "制片全流程",
    name: (s) => `${s.name}·制片全流程`,
    desc: (s) => `${s.name}从立项到交付的完整制片 SOP 与质检清单`,
    guide: (s) => s.description.slice(0, 120),
  },
  hook: {
    type: "production",
    label: "钩子脚本",
    tag: "钩子脚本",
    name: (s) => `${s.name}·钩子与节奏`,
    desc: (s) => `专注${s.name}的 0–3 秒钩子、集内节奏与 cliffhanger 设计`,
    guide: (s) => s.hookFormula,
  },
  launch: {
    type: "production",
    label: "投流变现",
    tag: "投流变现",
    name: (s) => `${s.name}·投流与变现`,
    desc: (s) => `${s.name}平台投放、付费墙/ROI 策略与数据复盘`,
    guide: (s) => (s.platformTips && s.platformTips[0]) || "按平台数据优化钩子与付费点",
  },
  visual: {
    type: "production",
    label: "视觉锁定",
    tag: "视觉锁定",
    name: (s) => `${s.name}·视觉与角色`,
    desc: (s) => `${s.name}影调、角色一致性与服化道跨集锁定规范`,
    guide: (s) => s.visualStyle,
  },
  "en-script": {
    type: "production",
    label: "英文脚本",
    tag: "英文脚本",
    name: (s) => `${s.name}·English Script`,
    desc: (s) => `出海${s.name}英文台词、钩子与付费墙 Ep6–8 脚本规范`,
    guide: (s) => s.dialogueTone || "English short lines; dramatic pause",
  },
  style: {
    type: "production",
    label: "风格板",
    tag: "风格锁定",
    name: (s) => `${s.name}·画风与风格板`,
    desc: (s) => `${s.name}Mood Board、角色三视图与画风量产锁定`,
    guide: (s) => s.visualStyle,
  },
  pipeline: {
    type: "production",
    label: "量产管线",
    tag: "量产管线",
    name: (s) => `${s.name}·AI 量产管线`,
    desc: (s) => `${s.name}分镜→出图→图生视频→剪辑的批量产能与返工控制`,
    guide: (s) => `工具链：${(s.toolFocus || []).slice(0, 3).join("、")}`,
  },
  platform: {
    type: "production",
    label: "平台运营",
    tag: "平台运营",
    name: (s) => `${s.name}·平台与分账`,
    desc: (s) => `${s.name}上架、分账、审核与排期运营策略`,
    guide: (s) => (s.platformTips || []).join("；"),
  },
  pitch: {
    type: "production",
    label: "投递发行",
    tag: "投递发行",
    name: (s) => `${s.name}·影展投递`,
    desc: (s) => `${s.name}短片投递影展、线上发行与物料规格`,
    guide: (s) => `对标：${(s.references && s.references[0]?.title) || s.name}`,
  },
  post: {
    type: "production",
    label: "后期调色",
    tag: "后期交付",
    name: (s) => `${s.name}·后期与调色`,
    desc: (s) => `${s.name}调色、声音设计与多版本导出规范`,
    guide: (s) => s.visualStyle,
  },
  compliance: {
    type: "production",
    label: "合规审查",
    tag: "合规审查",
    name: (s) => `${s.name}·合规与红线`,
    desc: (s) => `${s.name}广告法/平台审核红线、AI 标识与版权清单`,
    guide: (s) => (s.taboos || []).join("；"),
  },
  delivery: {
    type: "production",
    label: "交付规范",
    tag: "交付规范",
    name: (s) => `${s.name}·客户交付`,
    desc: (s) => `${s.name}多尺寸导出、修改轮次与成片交付标准`,
    guide: (s) => s.pricingNote?.slice(0, 100) || "按档位约定交付物",
  },
  roi: {
    type: "production",
    label: "ROI 优化",
    tag: "ROI优化",
    name: (s) => `${s.name}·千川 ROI`,
    desc: (s) => `${s.name}投流出价、素材测试与 ROI 复盘（2026 净成交）`,
    guide: (s) => `保本 ROI = 1÷毛利率。${(s.platformTips || [])[0] || ""}`,
  },
};

function refTitle(sub) {
  const r = sub.references?.[0];
  return r?.title?.replace(/[《》]/g, "") || sub.name;
}

function buildSeedancePack(sub, arch) {
  const ref = refTitle(sub);
  const chars = `主角（${sub.name}）、对手、配角`;
  return {
    id: `skill-${sub.id}-seedance`,
    name: arch.name(sub),
    description: arch.desc(sub),
    icon: sub.icon,
    tags: ["Seedance", arch.tag, sub.name],
    type: "seedance-pack",
    guide: arch.guide(sub),
    categoryId: sub.categoryId,
    subCategoryId: sub.id,
    pack: {
      genre: sub.name,
      visualRefs: (sub.references || []).slice(0, 4).map((r) => r.title),
      defaultVisualRef: sub.references?.[0]?.title || `《${sub.name}》`,
      defaultLighting: sub.visualStyle.split("；")[0].slice(0, 80),
      defaultScene: `${sub.name}典型主场景`,
      defaultSceneRef: "参考图三",
      defaultCharacters: chars,
      exampleScript: `【${sub.tagline}开场】\n冲突建立，角色对峙。\n[出场角色]：${chars}`,
      exampleOutput: `[全局锁定] ${sub.visualStyle.slice(0, 100)}。角色全程一致！\n\n[0-3秒] 钩子镜头——${sub.hookFormula.slice(0, 60)}`,
      defaultShots: [
        {
          timeStart: 0,
          timeEnd: 3,
          content: `钩子镜头——${sub.hookFormula.slice(0, 50)}`,
          dialogue: sub.dialogueTone?.slice(0, 40) || "（对白）",
        },
        {
          timeStart: 3,
          timeEnd: 8,
          content: `情绪递进——${sub.sopHighlights?.[0] || "正反打"}`,
          dialogue: "",
        },
        {
          timeStart: 8,
          timeEnd: 12,
          content: "冲突升级或反转铺垫",
          dialogue: "",
        },
        {
          timeStart: 12,
          timeEnd: 15,
          content: "集尾 cliffhanger 或悬念定格",
          dialogue: "",
        },
      ],
      genreTips: [
        {
          title: `${sub.name}分镜要点`,
          content: sub.sopHighlights?.[0] || "",
          items: (sub.sopHighlights || []).slice(0, 3),
        },
      ],
    },
  };
}

function buildEcomScriptSeedance(sub, arch) {
  const p = buildSeedancePack(sub, arch);
  p.id = `skill-${sub.id}-script`;
  p.name = arch.name(sub);
  p.description = arch.desc(sub);
  p.tags = ["素材脚本", arch.tag, sub.name];
  p.pack.genre = `${sub.name}电商素材`;
  p.pack.defaultScene = "产品使用场景/居家环境";
  p.pack.exampleScript = `0-3s 产品+痛点\n15s 卖点三连\n结尾 CTA`;
  return p;
}

function sopPhase(sub, archetypeKey) {
  const highlights = sub.sopHighlights || [];
  const tips = sub.platformTips || [];
  const taboos = sub.taboos || [];

  const maps = {
    sop: [
      {
        phase: "1. 立项与定位",
        duration: "1–2 天",
        tasks: [sub.description.slice(0, 60), `受众：${sub.audience.slice(0, 50)}`],
        deliverables: ["立项 brief", "风格参考板"],
        tools: (sub.toolFocus || []).slice(0, 2),
      },
      {
        phase: "2. 预制与资产",
        duration: "2–4 天",
        tasks: highlights.slice(0, 3),
        deliverables: ["角色/场景资产", "分镜脚本"],
        tools: (sub.toolFocus || []).slice(1, 3),
      },
      {
        phase: "3. 量产与质检",
        duration: "滚动",
        tasks: highlights.slice(2, 4).length ? highlights.slice(2, 4) : ["按 SOP 质检", "数据驱动改钩子"],
        deliverables: ["成片", "修改记录"],
        tools: ["剪映", "Seedance 2.0"],
      },
    ],
    hook: [
      {
        phase: "0–3 秒钩子",
        duration: "每集必做",
        tasks: [sub.hookFormula],
        deliverables: ["钩子分镜表", "A/B 缩略图"],
        tools: ["爆款拆解", "本网站分镜 Skill"],
      },
      {
        phase: "集内节奏",
        duration: "1–2 分钟",
        tasks: [sub.dialogueTone || "短句高情绪"],
        deliverables: ["节拍表"],
        tools: ["剪映"],
      },
      {
        phase: "集尾 cliffhanger",
        duration: "每集",
        tasks: tips.slice(0, 2),
        deliverables: ["下集预告帧"],
        tools: ["数据复盘"],
      },
    ],
    launch: [
      {
        phase: "平台策略",
        duration: "1 天",
        tasks: tips,
        deliverables: ["投放计划", "付费墙方案"],
        tools: ["巨量/红果/ReelShort"],
      },
      {
        phase: "数据复盘",
        duration: "每周",
        tasks: ["完播率/ROI 分析", "差集改钩子"],
        deliverables: ["周报"],
        tools: ["数据后台"],
      },
    ],
    visual: [
      {
        phase: "风格锚定",
        duration: "2 天",
        tasks: [sub.visualStyle, "角色三视图定稿"],
        deliverables: ["Mood Board", "色板"],
        tools: (sub.toolFocus || []).slice(0, 2),
      },
      {
        phase: "跨集一致",
        duration: "全程",
        tasks: highlights.filter((h) => /一致|锁定|跨集/.test(h)).slice(0, 3) || highlights.slice(0, 2),
        deliverables: ["参考图库", "服化道表"],
        tools: ["MJ --cref", "Seedance 多参考图"],
      },
    ],
    "en-script": [
      {
        phase: "English Script",
        duration: "2 天",
        tasks: ["Lines ≤12 words", "Hook table 0-3-15-60s", "Paywall Ep6-8"],
        deliverables: ["EN script"],
        tools: ["ElevenLabs", "ReelShort charts"],
      },
      {
        phase: "Localization",
        duration: "1 天",
        tasks: ["Burn-in EN subs", "9:16 safe zone"],
        deliverables: ["SRT"],
        tools: ["HeyGen"],
      },
    ],
    style: [
      {
        phase: "画风锁定",
        duration: "2–3 天",
        tasks: [sub.visualStyle, "主角三视图 8 选 1"],
        deliverables: ["风格板 PDF"],
        tools: ["MJ --sref", "LoRA"],
      },
      {
        phase: "量产规范",
        duration: "全程",
        tasks: highlights.slice(0, 3),
        deliverables: ["提示词模板"],
        tools: (sub.toolFocus || []).slice(0, 3),
      },
    ],
    pipeline: [
      {
        phase: "批量分镜",
        duration: "1–2 天/批",
        tasks: ["镜头号标注", "失败镜回炉标准"],
        deliverables: ["镜头表"],
        tools: ["Seedance", "Kling"],
      },
      {
        phase: "剪辑合成",
        duration: "1 天/集",
        tasks: ["音画同步", "字幕硬压"],
        deliverables: ["粗剪 V1"],
        tools: ["剪映", "AE"],
      },
    ],
    platform: [
      {
        phase: "上架排期",
        duration: "1 天",
        tasks: tips,
        deliverables: ["排期表"],
        tools: ["平台后台"],
      },
      {
        phase: "分账与审核",
        duration: "持续",
        tasks: [sub.pricingNote?.slice(0, 80) || ""],
        deliverables: ["审核清单"],
        tools: ["版权中心"],
      },
    ],
    pitch: [
      {
        phase: "投递准备",
        duration: "3–5 天",
        tasks: [`对标 ${refTitle(sub)}`, "导演阐述 500 字", "DCP/1080p ProRes"],
        deliverables: ["投递包"],
        tools: ["FilmFreeway"],
      },
      {
        phase: "线上发行",
        duration: "1 周",
        tasks: tips.slice(0, 2),
        deliverables: ["多平台版本"],
        tools: ["Vimeo", "B站"],
      },
    ],
    post: [
      {
        phase: "调色",
        duration: "2–3 天",
        tasks: [sub.visualStyle],
        deliverables: ["LUT", "调色成片"],
        tools: ["DaVinci"],
      },
      {
        phase: "声音",
        duration: "1–2 天",
        tasks: ["对白清晰", "环境音层次"],
        deliverables: ["混音终版"],
        tools: ["Audition"],
      },
    ],
    compliance: [
      {
        phase: "红线审查",
        duration: "每集",
        tasks: taboos,
        deliverables: ["合规清单"],
        tools: ["敏感词库"],
      },
      {
        phase: "AI 标识",
        duration: "上线前",
        tasks: ["标注 AI 生成", "版权溯源"],
        deliverables: ["授权书"],
        tools: ["法务模板"],
      },
    ],
    delivery: [
      {
        phase: "交付规格",
        duration: "1 天",
        tasks: (sub.pricingTiers || []).map((t) => `${t.level}：${t.range}`),
        deliverables: ["MP4 多尺寸", "修改轮次记录"],
        tools: ["交付 checklist"],
      },
    ],
    roi: [
      {
        phase: "脚本与素材",
        duration: "日更",
        tasks: [sub.hookFormula.slice(0, 80), "日测 3–5 条素材"],
        deliverables: ["脚本×5"],
        tools: ["剪映", "千川"],
      },
      {
        phase: "ROI 优化",
        duration: "每日",
        tasks: tips,
        deliverables: ["ROI 日报"],
        tools: ["巨量千川", "净成交 ROI"],
      },
    ],
    script: [
      {
        phase: "卖点提炼",
        duration: "30 分钟",
        tasks: ["3 卖点各 1 句", sub.hookFormula.slice(0, 60)],
        deliverables: ["脚本"],
        tools: ["蝉妈妈"],
      },
      {
        phase: "拍摄剪辑",
        duration: "4–8h",
        tasks: highlights.slice(0, 2),
        deliverables: ["9:16 成片"],
        tools: (sub.toolFocus || []).slice(0, 2),
      },
    ],
  };
  return maps[archetypeKey] || maps.sop;
}

function buildProductionPack(sub, archetypeKey, arch) {
  const phases = sopPhase(sub, archetypeKey);
  const tiers = sub.pricingTiers || [];
  return {
    id: `skill-${sub.id}-${archetypeKey}`,
    categoryId: sub.categoryId,
    subCategoryId: sub.id,
    name: arch.name(sub),
    description: arch.desc(sub),
    icon: sub.icon,
    tags: [arch.tag, sub.name, sub.tagline.split("·")[0]],
    type: "production-guide",
    guide: arch.guide(sub),
    content: {
      genre: `${sub.name}·${arch.label}`,
      duration: sub.categoryId.includes("drama")
        ? "1–2 分钟/集"
        : sub.categoryId === "ecommerce-ad"
          ? "15–60 秒/条"
          : "按项目",
      difficulty: archetypeKey === "hook" || archetypeKey === "script" ? "入门" : "中等",
      sop: phases,
      pricing: {
        note: sub.pricingNote,
        tiers: tiers.slice(0, 2),
      },
      references: (sub.references || []).slice(0, 2),
      toolStack: [
        {
          category: arch.label,
          tools: (sub.toolFocus || []).slice(0, 3),
          purpose: arch.label,
        },
      ],
      checklist: [
        ...(sub.sopHighlights || []).slice(0, 2),
        ...(sub.platformTips || []).slice(0, 1),
        ...(sub.taboos || []).slice(0, 1).map((t) => `规避：${t}`),
      ],
      pitfalls: (sub.taboos || []).slice(0, 3),
      deliverables: ["成片/脚本", "质检记录"],
      workflowNotes: [sub.hookFormula.slice(0, 100)],
    },
  };
}

const seedancePacks = [];
const productionPacks = [];
const seenIds = new Set();

for (const sub of subs) {
  const plan = PLANS[sub.categoryId];
  if (!plan || plan.length < 3) throw new Error(`plan missing for ${sub.categoryId}`);

  for (const key of plan) {
    const arch = ARCHETYPE[key];
    if (!arch) throw new Error(`unknown archetype ${key}`);

    let pack;
    if (arch.type === "seedance") {
      if (sub.categoryId === "ecommerce-ad" && key === "script") {
        pack = buildEcomScriptSeedance(sub, arch);
      } else {
        pack = buildSeedancePack(sub, arch);
        pack.id = `skill-${sub.id}-${key === "seedance" ? "seedance" : key}`;
      }
    } else {
      pack = buildProductionPack(sub, key, arch);
    }

    if (seenIds.has(pack.id)) throw new Error(`duplicate ${pack.id}`);
    seenIds.add(pack.id);

    if (pack.type === "seedance-pack") seedancePacks.push(pack);
    else productionPacks.push(pack);
  }
}

// 校验每个子题材至少 3 个
const countBySub = {};
for (const p of [...seedancePacks, ...productionPacks]) {
  countBySub[p.subCategoryId] = (countBySub[p.subCategoryId] || 0) + 1;
}
for (const sub of subs) {
  const n = countBySub[sub.id] || 0;
  if (n < 3) throw new Error(`${sub.id} only has ${n} skills`);
}

fs.writeFileSync(
  "src/data/seedance-packs.json",
  JSON.stringify({ packs: seedancePacks }, null, 2)
);
fs.writeFileSync(
  "src/data/production-packs.json",
  JSON.stringify({ packs: productionPacks }, null, 2)
);

console.log("seedance packs:", seedancePacks.length);
console.log("production packs:", productionPacks.length);
console.log("total skills:", seedancePacks.length + productionPacks.length);
console.log("subcategories:", subs.length, "avg per sub:", ((seedancePacks.length + productionPacks.length) / subs.length).toFixed(1));
