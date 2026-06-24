import fs from "fs";

const newPacks = [
  {
    id: "guide-drama-war-god",
    categoryId: "domestic-drama",
    subCategoryId: "war-god",
    name: "战神兵王·制片 SOP",
    description: "男频战神/赘婿/兵王归来：羞辱反击、身份揭露与快切打斗的竖屏量产规范",
    icon: "Sword",
    tags: ["战神", "兵王", "男频", "逆袭"],
    type: "production-guide",
    guide: "每场必有「羞辱→反击」两拍，间隔不超过 45 秒。打斗 3–5 镜快切，忌 AI 长镜头穿模。",
    content: {
      genre: "战神兵王 / 赘婿逆袭",
      duration: "1–2 分钟/集 × 60–80 集",
      difficulty: "中等",
      sop: [
        {
          phase: "男频钩子设计",
          duration: "1 天",
          tasks: [
            "0–3 秒羞辱场景（被退婚/被辞退/被泼水）",
            "15 秒隐藏身份暗示（电话/徽章/手下）",
            "集尾更大势力或身份再揭露",
          ],
          deliverables: ["钩子表", "身份层级图"],
          tools: ["抖音男频热榜", "红果逆袭榜"],
        },
        {
          phase: "打斗与场面",
          duration: "滚动",
          tasks: [
            "打斗 3–5 镜快切+音效暗示",
            "电话/手下登场作低成本大场面",
            "雨夜/天台专用于情绪高潮",
          ],
          deliverables: ["场次模板库", "音效清单"],
          tools: ["Seedance 2.0", "Kling 动作", "剪映冲击音效"],
        },
        {
          phase: "投流与数据",
          duration: "持续",
          tasks: [
            "素材前 3 秒=正片钩子",
            "晚 8–11 点男性高峰投放",
            "系列命名含「归来」「龙王」「战神」",
          ],
          deliverables: ["投流素材×10", "ROI 周报"],
          tools: ["巨量引擎", "本网站兵王 Skill"],
        },
      ],
      pricing: {
        note: "来源：抖音男频投流 2026 Q2。量产 80–300 元/集；精品 500–1,500 元/集；男频 CPM 低于女频但转化直接。",
        tiers: [
          {
            level: "男频量产",
            range: "80–300 元/集",
            cycle: "24–48h",
            scenario: "投流测款",
            includes: ["模板打斗", "AI 配音"],
          },
          {
            level: "精品兵王",
            range: "500–1,500 元/集",
            cycle: "2–4 天",
            scenario: "付费男频",
            includes: ["动作分镜", "3 轮修改"],
          },
        ],
      },
      references: [
        { title: "《战狼》", type: "军事动作", why: "男性力量感与情绪", year: "2015" },
        { title: "《绝世战神》", type: "短剧", why: "赘婿逆袭模板", platform: "抖音" },
      ],
      toolStack: [
        { category: "动作", tools: ["Seedance 2.0", "Kling"], purpose: "快切打斗" },
        { category: "投流", tools: ["巨量引擎"], purpose: "男频素材测试" },
      ],
      checklist: ["羞辱+反击成对", "打斗快切≤5镜", "避免枪支过度", "前3秒钩子一致", "角色跨集一致"],
      pitfalls: ["打斗长镜头穿模", "标题过于文艺", "真实部队番号", "血腥过度限流"],
      deliverables: ["成片 MP4", "投流切片", "钩子 A/B 数据"],
      workflowNotes: ["压制镜头用冷色调，反击瞬间可切暖光或慢镜头"],
    },
  },
  {
    id: "guide-drama-female-growth",
    categoryId: "domestic-drama",
    subCategoryId: "female-growth",
    name: "大女主成长·制片 SOP",
    description: "女性独立、职场逆袭与治愈成长：2026 红果热力值前三赛道的完整制片流程",
    icon: "Target",
    tags: ["大女主", "女性成长", "职场", "治愈"],
    type: "production-guide",
    guide: "女主成长弧光每 5 集一个小里程碑。感情线服务于成长，忌恋爱脑主导。",
    content: {
      genre: "大女主 / 女性成长",
      duration: "1–2 分钟/集 × 60–100 集",
      difficulty: "中等",
      sop: [
        {
          phase: "成长弧光规划",
          duration: "2 天",
          tasks: [
            "Ep1 困境建立（职场打压/婚姻困境）",
            "每 5 集标注成长里程碑",
            "片尾女性独白金句设计",
          ],
          deliverables: ["全季成长曲线", "金句库"],
          tools: ["澎湃新闻大女主数据", "豆瓣热评"],
        },
        {
          phase: "职场戏写实",
          duration: "滚动",
          tasks: [
            "工位/会议细节真实，忌悬浮",
            "莫兰迪色系+自然光办公室",
            "闺蜜戏份调节节奏",
          ],
          deliverables: ["职场场景资产", "对白剧本"],
          tools: ["Seedance 2.0", "都市场景库"],
        },
        {
          phase: "传播与变现",
          duration: "持续",
          tasks: [
            "标题含「觉醒」「离婚」「不再忍」",
            "小红书/豆瓣金句截图传播",
            "女性品牌定制合作评估",
          ],
          deliverables: ["社交切片", "付费墙数据"],
          tools: ["红果", "抖音", "微信小程序"],
        },
      ],
      pricing: {
        note: "来源：澎湃新闻 2026.3 大女主数据。精品 600–2,000 元/集；平台分账剧女性向 ROI 持续走高。",
        tiers: [
          {
            level: "成长量产",
            range: "120–400 元/集",
            cycle: "2–3 天",
            scenario: "IAA 测试",
            includes: ["都市模板", "AI 配音"],
          },
          {
            level: "精品大女主",
            range: "600–2,000 元/集",
            cycle: "3–5 天",
            scenario: "付费女频",
            includes: ["剧本打磨", "3 轮修改"],
          },
        ],
      },
      references: [
        { title: "《我的前半生》", type: "女性成长", why: "离婚重生与职场线", platform: "腾讯" },
        { title: "《玫瑰的故事》", type: "女性情感", why: "多阶段成长叙事", platform: "腾讯", year: "2024" },
        { title: "《妈妈，别回头》", type: "短剧", why: "2026.3 播放增量超 6 亿", platform: "河马" },
      ],
      toolStack: [
        { category: "叙事", tools: ["Notion 制片表"], purpose: "成长弧光追踪" },
        { category: "制作", tools: ["Seedance 2.0", "剪映"], purpose: "都市质感" },
      ],
      checklist: ["成长里程碑分集标注", "职场细节真实", "金句可截图", "付费墙 Ep8-12", "性别议题合规"],
      pitfalls: ["恋爱脑主导剧情", "贬低全职主妇", "悬浮职场", "虚假独立人设"],
      deliverables: ["全季 MP4", "金句海报", "投流素材"],
      workflowNotes: ["参考《三十而已》都市质感；独白金句宜 15 字以内"],
    },
  },
  {
    id: "guide-drama-family-ethics",
    categoryId: "domestic-drama",
    subCategoryId: "family-ethics",
    name: "家庭伦理·制片 SOP",
    description: "婆媳、亲子与亲情和解：IAA 免费模式友好的全年龄段伦理剧量产规范",
    icon: "BookOpen",
    tags: ["家庭伦理", "婆媳", "亲情", "IAA"],
    type: "production-guide",
    guide: "冲突双方需有合理动机，忌脸谱化恶人。每 3 集宜有一次和解尝试，防压抑流失。",
    content: {
      genre: "家庭伦理 / 亲情和解",
      duration: "1–2 分钟/集，单集可至 2 分钟",
      difficulty: "入门–中等",
      sop: [
        {
          phase: "家庭冲突设计",
          duration: "1 天",
          tasks: [
            "建立家庭道具情感锚点（全家福/药方）",
            "婆媳/亲子冲突动机合理化",
            "和解戏克制催泪，忌过度煽情",
          ],
          deliverables: ["人物关系图", "道具表"],
          tools: ["36氪家庭伦理数据", "红果亲情榜"],
        },
        {
          phase: "居家场景实拍/AI",
          duration: "滚动",
          tasks: [
            "厨房/客厅/医院自然光",
            "长辈面容慈祥/威严，避免 AI 失真",
            "温暖色调但不过度滤镜",
          ],
          deliverables: ["居家场景库", "成片"],
          tools: ["Seedance 2.0", "家庭场景模板"],
        },
        {
          phase: "IAA 变现优化",
          duration: "持续",
          tasks: [
            "中老年用户上午 10–12 点投放",
            "标题含「婆婆」「儿媳」「孝顺」",
            "长观看时长变现，控制节奏",
          ],
          deliverables: ["日更成片", "广告位数据"],
          tools: ["红果 IAA", "抖音"],
        },
      ],
      pricing: {
        note: "来源：36氪 2025 家庭伦理播放量 TOP3。量产 80–300 元/集；精品 500–1,500 元/集。",
        tiers: [
          {
            level: "伦理量产",
            range: "80–300 元/集",
            cycle: "24–48h",
            scenario: "IAA 免费",
            includes: ["家庭模板", "AI 配音"],
          },
          {
            level: "精品亲情",
            range: "500–1,500 元/集",
            cycle: "2–4 天",
            scenario: "付费家庭",
            includes: ["剧本打磨", "3 轮修改"],
          },
        ],
      },
      references: [
        { title: "《都挺好》", type: "家庭", why: "原生家庭矛盾写实", platform: "爱奇艺" },
        { title: "《小欢喜》", type: "亲子", why: "高考家庭群像", platform: "爱奇艺" },
      ],
      toolStack: [
        { category: "场景", tools: ["居家场景库"], purpose: "真实生活感" },
        { category: "配音", tools: ["剪映", "AI 配音"], purpose: "生活化口语" },
      ],
      checklist: ["动机合理", "和解节奏", "道具一致", "敏感词审核", "IAA 时长优化"],
      pitfalls: ["挑动家庭对立极端化", "虐待老人/儿童", "虚假医疗植入"],
      deliverables: ["成片 MP4", "封面标题库"],
      workflowNotes: ["红果 2026.5 亲情元素热度上升，可捆绑乡村叙事"],
    },
  },
  {
    id: "guide-overseas-secret-baby",
    categoryId: "overseas-drama",
    subCategoryId: "secret-baby",
    name: "Secret Baby·制片 SOP",
    description: "秘密婴儿/多年后重逢：ReelShort 高频 trope 的英文制作与付费转化规范",
    icon: "Heart",
    tags: ["Secret Baby", "出海", "情感", "ReelShort"],
    type: "production-guide",
    guide: "Ep1 结尾 reveal 孩子存在。父亲软化弧光每 5 集 1 次；儿童镜头须合规。",
    content: {
      genre: "Secret Baby / Hidden Child",
      duration: "1–2 min/ep × 60–80 eps",
      difficulty: "中等",
      sop: [
        {
          phase: "情感钩子",
          duration: "2 天",
          tasks: [
            "0–3s: 验孕棒/孩子敲门",
            "15s: 'He's your son'",
            "Cliffhanger: 父亲几乎发现",
          ],
          deliverables: ["英文钩子表", "分集大纲"],
          tools: ["ReelShort 榜单", "ElevenLabs"],
        },
        {
          phase: "儿童镜头合规",
          duration: "滚动",
          tasks: [
            "儿童年龄跨集一致",
            "DNA 检测/出生证明作道具",
            "COPPA：无真实未成年人 AI  likeness",
          ],
          deliverables: ["合规清单", "道具设计"],
          tools: ["HeyGen", "Seedance 2.0"],
        },
        {
          phase: "付费与投流",
          duration: "持续",
          tasks: [
            "缩略图：孩子牵父亲手 CTR 最高",
            "Paywall 在 DNA 结果集之前",
            "Motherhood Facebook 群组 UA",
          ],
          deliverables: ["Meta 素材", "coin 转化数据"],
          tools: ["Meta Ads", "ReelShort"],
        },
      ],
      pricing: {
        note: "来源：ReelShort trope 2026。国内制作 400–1,400 元/集；平台买断 $140K–$240K。",
        tiers: [
          {
            level: "Emotion test",
            range: "400–850 元/集",
            cycle: "48h",
            scenario: "Hook ads",
            includes: ["Child template", "EN voice"],
          },
          {
            level: "Premium family",
            range: "850–1,400 元/集",
            cycle: "3–4 days",
            scenario: "Platform pitch",
            includes: ["Legal clearance", "3 revisions"],
          },
        ],
      },
      references: [
        { title: "Jane the Virgin", type: "TV", why: "Secret pregnancy structure", platform: "CW" },
        { title: "Billionaire's Secret Baby", type: "Short drama", why: "Title SEO pattern", platform: "ReelShort" },
      ],
      toolStack: [
        { category: "配音", tools: ["ElevenLabs", "HeyGen"], purpose: "英文情感" },
        { category: "合规", tools: ["Legal template"], purpose: "儿童镜头" },
      ],
      checklist: ["Ep1 baby reveal", "Child age consistent", "EN subtitles", "Paywall timing", "Meta ad policy"],
      pitfalls: ["Child endangerment in ads", "Real minor likeness", "Adoption fraud glorification"],
      deliverables: ["MP4 9:16", "EN SRT", "Thumbnail pack"],
    },
  },
  {
    id: "guide-overseas-revenge-ex",
    categoryId: "overseas-drama",
    subCategoryId: "revenge-ex",
    name: "Revenge Ex·制片 SOP",
    description: "被前任背叛后华丽归来复仇：ReelShort revenge 品类与 gala 名场面制作规范",
    icon: "Sparkles",
    tags: ["Revenge", "Ex", "出海", " makeover"],
    type: "production-guide",
    guide: "Ep3–5 必须有 makeover reveal。Ex 跪求 Ep12+；新欢 Ep4 入场维持三角。",
    content: {
      genre: "Revenge / Betrayal Ex",
      duration: "1–2 min/ep × 60–90 eps",
      difficulty: "中等",
      sop: [
        {
          phase: "复仇结构",
          duration: "2 天",
          tasks: [
            "0–3s: Cheating caught on camera",
            "Before 去饱和 / After 饱和奢华蒙太奇",
            "Ep12+ ex grovel scene",
          ],
          deliverables: ["英文分集大纲", "montage 镜头表"],
          tools: ["ReelShort revenge 榜", "After Effects"],
        },
        {
          phase: "名场面制作",
          duration: "滚动",
          tasks: [
            "Gala entrance 慢镜头标配",
            "Social media humiliation 竖屏原生",
            "新欢 Ep4 入场",
          ],
          deliverables: ["Gala 场景资产", "成片"],
          tools: ["Seedance 2.0", "Kling slow-mo"],
        },
        {
          phase: "投流素材",
          duration: "持续",
          tasks: [
            "Cheating scene blurred + text overlay 过 Meta 审",
            "Ep1 背叛必须无可辩驳",
            "Coin unlock 在 gala reveal 集",
          ],
          deliverables: ["Meta UGC ads×10"],
          tools: ["Meta Ads", "DramaBox"],
        },
      ],
      pricing: {
        note: "来源：ReelShort revenge IAP 2026 Q1。380–1,500 元/集；变身蒙太奇为成本高点。",
        tiers: [
          {
            level: "Revenge hook",
            range: "380–800 元/集",
            cycle: "48h",
            scenario: "Cheating reveal ads",
            includes: ["Gala template", "EN voice"],
          },
          {
            level: "Premium revenge",
            range: "800–1,500 元/集",
            cycle: "3–4 days",
            scenario: "Platform sub",
            includes: ["Makeover montage", "4 revisions"],
          },
        ],
      },
      references: [
        { title: "Revenge (TV)", type: "TV", why: "Transformation structure", platform: "ABC" },
        { title: "After Divorce, I Became a Billionaire", type: "Short drama", why: "2025–2026 title SEO", platform: "ReelShort" },
      ],
      toolStack: [
        { category: "蒙太奇", tools: ["Seedance 2.0", "剪映"], purpose: "变身 reveal" },
        { category: "投流", tools: ["Meta Ads"], purpose: "Cheating hook 素材" },
      ],
      checklist: ["Makeover ep3-5", "Ex grovel ep12+", "Meta blur compliance", "EN subtitles", "9:16 safe zone"],
      pitfalls: ["Real ex likeness", "Domestic violence glorification", "Suicide revenge"],
      deliverables: ["MP4", "EN SRT", "Gala 素材库"],
    },
  },
  {
    id: "guide-ecom-grass-planting",
    categoryId: "ecommerce-ad",
    subCategoryId: "grass-planting",
    name: "种草短视频·量产 SOP",
    description: "小红书/抖音种草：真实测评感、闺蜜口语与商单标注的批量生产流程",
    icon: "Heart",
    tags: ["种草", "小红书", "测评", "UGC"],
    type: "production-guide",
    guide: "优缺点并述增可信。必须标注 #广告 若商单。热点梗 48 小时内上线。",
    content: {
      genre: "种草 / 测评安利",
      duration: "30–60 秒/条，周产 8–15 条",
      difficulty: "入门",
      sop: [
        {
          phase: "脚本结构",
          duration: "1 小时/条",
          tasks: [
            "0–3s: 「姐妹们这个真的绝了」式钩子",
            "中段：真实使用体验+小缺点",
            "结尾：购买引导+话题标签",
          ],
          deliverables: ["脚本", "封面标题"],
          tools: ["小红书爆款笔记", "蝉妈妈"],
        },
        {
          phase: "UGC 质感拍摄",
          duration: "2–4 小时/条",
          tasks: [
            "手持自然光居家场景",
            "略粗糙感增信任，忌棚拍腔",
            "小红书 3:4 + 抖音 9:16 双版本",
          ],
          deliverables: ["成片×2 尺寸"],
          tools: ["手机拍摄", "剪映 UGC 滤镜", "Seedance 补镜"],
        },
        {
          phase: "发布与合规",
          duration: "持续",
          tasks: [
            "商单标注 #广告",
            "评论区维护种草氛围",
            "A/B 封面标题测试",
          ],
          deliverables: ["发布截图", "CTR 数据"],
          tools: ["小红书", "抖音"],
        },
      ],
      pricing: {
        note: "来源：种草视频 2026。KOC 风 AI 300–600 元/条；精品 600–1,500 元/条。",
        tiers: [
          {
            level: "KOC 风 AI",
            range: "300–600 元/条",
            cycle: "4–8h",
            scenario: "矩阵号",
            includes: ["UGC 模板", "1 轮修改"],
          },
          {
            level: "精品种草",
            range: "600–1,500 元/条",
            cycle: "1–2 天",
            scenario: "品牌投放",
            includes: ["脚本+场景", "2 轮修改"],
          },
        ],
      },
      references: [
        { title: "小红书种草规范", type: "平台", why: "商单标注与信任感", platform: "小红书" },
        { title: "抖音好物分享", type: "标签", why: "流量池规则", platform: "抖音" },
      ],
      toolStack: [
        { category: "剪辑", tools: ["剪映 UGC 滤镜"], purpose: "真实感" },
        { category: "封面", tools: ["小红书封面模板"], purpose: "CTR" },
      ],
      checklist: ["商单标注", "优缺点并述", "双尺寸导出", "封面 A/B", "无绝对化用语"],
      pitfalls: ["虚假宣传功效", "未标注商单", "抄袭他人种草", "歧视性笑话"],
      deliverables: ["MP4 9:16", "MP4 3:4", "封面 JPG"],
    },
  },
  {
    id: "guide-ecom-ugc-style",
    categoryId: "ecommerce-ad",
    subCategoryId: "ugc-style",
    name: "UGC 风格投流·批量 SOP",
    description: "模拟真实用户分享的千川素材：原生感优于棚拍，信任敏感品类 ROI 更高",
    icon: "Film",
    tags: ["UGC", "千川", "原生感", "投流"],
    type: "production-guide",
    guide: "过度精致反而 CTR 降。1 个爆款反复跑 + 3–5 个测试快速试。须标注广告若商单。",
    content: {
      genre: "UGC 风格信息流",
      duration: "25–45 秒/条，日测 3–5 条",
      difficulty: "入门–中等",
      sop: [
        {
          phase: "原生素材公式",
          duration: "2 小时",
          tasks: [
            "0–3s: 「我自己买的」开场",
            "手持晃动+自然光居家",
            "诚恳推荐，忌播音腔",
          ],
          deliverables: ["脚本×5", "演员 brief"],
          tools: ["千川素材库", "TikTok 原生广告参考"],
        },
        {
          phase: "批量裂变",
          duration: "4–8h/批",
          tasks: [
            "爆款只改开头 3 秒+BGM",
            "多演员矩阵 A/B",
            "全程硬字幕 ≥28px",
          ],
          deliverables: ["素材×10", "数据表"],
          tools: ["剪映", "CapCut", "AI 高光识别"],
        },
        {
          phase: "千川投放",
          duration: "持续",
          tasks: [
            "CTR 及格线 3%，低于 1.5% 换素材",
            "净成交 ROI 出价",
            "低效计划 ROI<1 直接关停",
          ],
          deliverables: ["ROI 日报", "爆款库"],
          tools: ["巨量千川", "ROI 计算器"],
        },
      ],
      pricing: {
        note: "来源：千川原生素材 2026。AI UGC 300–600 元/条；真人 UGC 600–1,200 元/条。",
        tiers: [
          {
            level: "AI UGC",
            range: "300–600 元/条",
            cycle: "4–8h",
            scenario: "测款",
            includes: ["UGC 模板", "1 轮修改"],
          },
          {
            level: "真人 UGC",
            range: "600–1,200 元/条",
            cycle: "1 天",
            scenario: "跑量",
            includes: ["真实演员", "2 轮修改"],
          },
        ],
      },
      references: [
        { title: "千川图文 vs 视频", type: "报告", why: "原生感 ROI 数据", year: "2026" },
        { title: "TikTok 原生广告", type: "平台", why: "UGC 广告范式", platform: "TikTok" },
      ],
      toolStack: [
        { category: "原生", tools: ["剪映 UGC 抖动", "手机拍摄"], purpose: "信任感" },
        { category: "投流", tools: ["巨量千川"], purpose: "ROI 优化" },
      ],
      checklist: ["前3秒产品/痛点", "硬字幕", "商单标注", "CTR≥3%监控", "9:16 1080p"],
      pitfalls: ["虚假 UGC 未标注", "演员伪装素人", "纯 Logo 开场", "ROI 差不换 hook"],
      deliverables: ["投流 MP4×10", "数据周报"],
      workflowNotes: ["成熟期店铺视频计划占比可达 70%（电商干货社区 2026）"],
    },
  },
];

const path = "src/data/production-packs.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));
const existingIds = new Set(data.packs.map((p) => p.id));

let added = 0;
for (const pack of newPacks) {
  if (existingIds.has(pack.id)) {
    console.log("skip existing", pack.id);
    continue;
  }
  data.packs.push(pack);
  existingIds.add(pack.id);
  added++;
}

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log(`added ${added} packs, total ${data.packs.length}`);
