import { buildSub, tiers } from "./_helpers.mjs";

/** 海外竖屏短剧 — 12 子题材（资料：Sensor Tower 2026 Q1、Filmustage ReelShort vs DramaBox、SAG-AFTRA Verticals Agreement 2025.10） */
export const overseasDrama = [
  buildSub("ceo-billionaire", "overseas-drama", "霸总豪门", "CEO·Billionaire", "Rocket", "cyan", {
    description:
      "ReelShort 核心品类：隐藏身份的 Billionaire CEO 与灰姑娘式爱情。平台约 75% 女性用户，Q1 2026 IAP 收入约 1.4 亿美元级（Sensor Tower）；买断价 $150K–$250K/部（60–90 集）。",
    audience: "25–45 岁女性，北美/欧洲为主；TikTok/ReelShort 重度用户；偏好权力差浪漫与身份反转",
    hookFormula:
      "0–3s: Humiliation + CEO reveal hint; 15s: Contract signing or elevator encounter; Cliffhanger: Secret identity exposed",
    visualStyle:
      "Penthouse skyline, marble interiors, tailored suits; high-key lighting; reference Colleen Hoover adaptation aesthetics (Paramount promo Oct 2025)",
    dialogueTone: "Short English lines; dramatic pause before power lines; avoid long exposition",
    sopHighlights: [
      "Paywall episodes 6–8 must deliver first major twist",
      "CEO office set reusable across 60+ episodes",
      "Coin unlock price tested: $0.30–$0.50/ep (Spyro-Soft 2026)",
      "Subtitle burn-in mandatory; safe zone for 9:16 mobile",
    ],
    pricingNote:
      "来源：Filmustage 2026、Business Insider Owl & Co. 制作费 $100K–$300K/部；国内承制 300–1,500 元/集。平台买断 $150K–$250K（60–90 ep）。",
    pricingTiers: tiers([
      ["Test batch", "300–800 元/集", "48h", "Meta/TikTok hook test", ["Template penthouse", "AI voice EN"]],
      ["Standard EN", "800–1,500 元/集", "2–3 days", "ReelShort submission", ["Lead lock", "3 revisions"]],
      ["Platform buyout", "$150K–$250K/series", "4–6 weeks", "ReelShort/DramaBox", ["Original EN script", "SAG optional"]],
    ]),
    references: [
      { title: "The Double Life of My Billionaire Husband", type: "ReelShort hit", why: "~500M views benchmark", platform: "ReelShort" },
      { title: "Colleen Hoover IP", type: "Romance", why: "Paramount × ReelShort Oct 2025", platform: "ReelShort" },
      { title: "Pretty Woman", type: "Film", why: "Class-crossing romance template", year: "1990" },
    ],
    platformTips: [
      "ReelShort: VIP $19.99/wk — optimize ep1–5 retention",
      "Paywall at ep6–8; first coin purchase drives LTV",
      "Meta UGC ads: humiliation hook in first 2 seconds",
      "SAG-AFTRA Verticals: $250/day lead if union (Oct 2025 rate sheet)",
    ],
    taboos: ["Unauthorized real CEO/brand", "Visa fraud plotlines", "Stock footage without license", "Non-English markets without localization"],
    toolFocus: ["Seedance 2.0 EN prompts", "HeyGen lip-sync", "ReelShort spec sheet", "本网站 CEO Skill"],
  }),

  buildSub("werewolf-vampire", "overseas-drama", "狼人吸血鬼", "Alpha·Mate", "Ghost", "violet", {
    description:
      "DramaBox 强势品类：狼人 Alpha、Mate bond 与吸血鬼禁忌之恋。Reelytics 2026：DramaBox 在 supernatural + revenge 混合题材表现优于 ReelShort；受众性别更均衡（~43.5% male）。",
    audience: "18–34 岁；DramaBox/NetShort 用户；北美+东南亚；偏好超自然荷尔蒙与命运羁绊",
    hookFormula:
      "0–3s: Full moon transform or bite mark reveal; 15s: Alpha claim 'Mine'; Cliffhanger: Rival pack or hunter appears",
    visualStyle:
      "Moonlit forest, amber eyes VFX, leather jackets; desaturated blues + warm skin tones; reference Shadowed Thrones (DramaBox flagship male-skew)",
    dialogueTone: "Primal short lines; possessive but not abusive; lore terms consistent (Alpha, Mate, Pack)",
    sopHighlights: [
      "Wolf VFX: 2–3 hero shots/ep, rest implied with sound design",
      "Mate bond established by ep3 or audience drops",
      "DramaBox favors longer series — plan 80+ eps for subscription LTV",
      "SE Asia localization: shorter subtitles, faster cuts",
    ],
    pricingNote:
      "来源：Reelytics DramaBox genre report 2026、承制报价。超自然线国内制作 400–1,800 元/集；VFX 占比 25–35%。",
    pricingTiers: tiers([
      ["VFX-lite test", "400–900 元/集", "2 days", "TikTok supernatural hook", ["Moon template", "EN AI voice"]],
      ["Standard supernatural", "900–1,800 元/集", "3–5 days", "DramaBox pitch", ["Pack lore bible", "4 revisions"]],
      ["Flagship series", "$150K–$250K buyout", "5–7 weeks", "Platform original", ["Full VFX pipeline", "Multi-language"]],
    ]),
    references: [
      { title: "Shadowed Thrones", type: "DramaBox", why: "Male-skew supernatural benchmark", platform: "DramaBox" },
      { title: "Twilight", type: "Film", why: "Forbidden supernatural romance tone", year: "2008" },
      { title: "The Vampire Diaries", type: "TV", why: "Love triangle pacing", platform: "CW" },
    ],
    platformTips: [
      "DramaBox: supernatural + revenge blend tops charts",
      "Subscription model rewards 80+ ep series with high post-paywall retention",
      "Indonesia/Mexico growth fastest — consider cultural neutral settings",
      "Trade Desk programmatic ads Apr 2026 opens CTV long-tail revenue",
    ],
    taboos: ["Graphic gore", "Non-consensual mate bond glorification", "Real indigenous wolf symbolism misuse", "Copyrighted character designs"],
    toolFocus: ["Seedance 2.0 VFX", "Kling creature", "Supernatural SFX pack", "本网站 Werewolf Skill"],
  }),

  buildSub("contract-marriage", "overseas-drama", "契约婚姻", "Contract·Fake Love", "Heart", "teal", {
    description:
      "Contract marriage、fake dating 到真爱转化。ReelShort 女性向 staples；适合 ep1 即建立清晰 goal（inheritance, visa, business deal）。",
    audience: "22–38 岁女性；ReelShort 主力；偏好 enemies-to-lovers 与规则被打破",
    hookFormula:
      "0–3s: Signing contract close-up; 15s: 'We're only pretending'; Cliffhanger: Almost kiss interrupted",
    visualStyle:
      "Registry office, wedding dress contrast, luxury car; bright rom-com lighting; reference Korean contract marriage tropes",
    dialogueTone: "Witty banter; subtext over confession until ep10+; 'This means nothing' irony",
    sopHighlights: [
      "Contract prop visible in ep1–3 establishing shots",
      "Fake couple public PDA vs private cold — visual contrast",
      "Third-party ex must enter before ep8",
      "Wedding episode typically ep15–20 for paywall spike",
    ],
    pricingNote:
      "来源：ReelShort romance pipeline 2026、国内 EN 承制。契约婚姻 350–1,200 元/集量产；精品 1,200–2,000 元/集。",
    pricingTiers: tiers([
      ["Rom-com test", "350–800 元/集", "48h", "Hook A/B on Meta", ["Wedding template", "EN voice"]],
      ["Premium romance", "800–1,500 元/集", "2–4 days", "ReelShort original", ["Couple lock", "3 revisions"]],
      ["Series buyout", "$150K–$220K", "4–5 weeks", "Platform deal", ["Full EN writers room"]],
    ]),
    references: [
      { title: "Marriage Contract (K-drama)", type: "TV", why: "Contract trope pacing", platform: "MBC", year: "2014" },
      { title: "The Proposal", type: "Film", why: "Fake relationship comedy beats", year: "2009" },
      { title: "Fated to My Forbidden Alpha", type: "ReelShort", why: "Contract + supernatural crossover hit", platform: "ReelShort" },
    ],
    platformTips: [
      "ReelShort: contract trope CTR highest with signature close-up thumbnail",
      "Ep5 first 'almost kiss' drives coin unlock",
      "Weekly VIP $19.99 — binge-friendly ep length 60–90s",
      "Stage 32 partnership for US writers (DramaBox/ReelShort)",
    ],
    taboos: ["Immigration fraud glorification", "Forced marriage without agency", "Stereotypical nationality jokes", "Minors in marriage plot"],
    toolFocus: ["Seedance 2.0 couple shots", "HeyGen EN", "Rom-com music stems", "本网站 Contract Skill"],
  }),

  buildSub("mafia-revenge", "overseas-drama", "黑帮复仇", "Mafia·Crime", "Sword", "amber", {
    description:
      "Mafia boss、家族复仇与禁忌之恋。DramaBox 男性向增长品类；与 werewolf 共享 dark romance 用户，但更偏现实主义犯罪美学。",
    audience: "22–40 岁；男性占比高于纯 romance；LATAM、US、IT 市场；偏好权力、暴力暗示与复仇",
    hookFormula:
      "0–3s: Blood oath / gun slide / funeral; 15s: 'You owe my family'; Cliffhanger: Betrayal from inner circle",
    visualStyle:
      "Low-key chiaroscuro, Italian restaurant, rain-soaked streets; reference Peaky Blinders compression for vertical",
    dialogueTone: "Terse threats; subtext heavy; avoid cartoonish accents",
    sopHighlights: [
      "Violence implied: cutaway + sound, not graphic",
      "Mafia hierarchy chart for writers — Consigliere, Capo, Don",
      "Female lead often 'innocent caught in war' — establish by ep2",
      "Revenge beat every 3 episodes minimum",
    ],
    pricingNote:
      "来源：DramaBox male-skew data 2026、承制。黑帮线 450–1,600 元/集；暗调调色与场景成本高于甜宠 20%。",
    pricingTiers: tiers([
      ["Dark test", "450–900 元/集", "2 days", "LATAM Meta ads", ["Noir template", "EN voice"]],
      ["Crime premium", "900–1,600 元/集", "3–5 days", "DramaBox submission", ["Noir grade LUT", "4 revisions"]],
      ["Original series", "$160K–$280K", "5–8 weeks", "Platform buyout", ["LATAM co-writer", "Legal review"]],
    ]),
    references: [
      { title: "Peaky Blinders", type: "TV", why: "Vertical-safe crime atmosphere", platform: "Netflix" },
      { title: "The Godfather", type: "Film", why: "Family loyalty structure", year: "1972" },
      { title: "Mafia's Innocent Bride", type: "Short drama", why: "Vertical mafia romance template", platform: "DramaBox" },
    ],
    platformTips: [
      "DramaBox 43.5% male — mafia outperforms on DramaBox vs ReelShort",
      "LATAM Spanish dub doubles addressable market",
      "Avoid real gang iconography; fictional family names only",
      "Subscription viewers binge 12+ eps/session — plan longer arcs",
    ],
    taboos: ["Real cartel names", "Torture depiction", "Ethnic stereotype villains", "Gun tutorial detail"],
    toolFocus: ["Seedance 2.0 noir", "Kling rain scenes", "Crime SFX", "本网站 Mafia Skill"],
  }),

  buildSub("secret-baby", "overseas-drama", "秘密婴儿", "Secret Baby", "Heart", "rose", {
    description:
      "Secret baby、hidden child 与多年后重逢。ReelShort 高频 trope；情感钩子强，适合 ep1 结尾 reveal 孩子存在。",
    audience: "25–42 岁女性；高付费意愿；偏好亲情+爱情双重泪点",
    hookFormula:
      "0–3s: Positive pregnancy test / child at door; 15s: 'He's your son'; Cliffhanger: Father almost discovers",
    visualStyle:
      "Soft natural light for child scenes; contrast with cold corporate father's world; warm home vs glass office",
    dialogueTone: "Emotional but not melodramatic; child actors or AI child shots — legal clearance required",
    sopHighlights: [
      "Child appearance age-consistent across episodes",
      "DNA test / birth certificate as recurring props",
      "Father's softening arc: 1 visible crack per 5 episodes",
      "COPPA/privacy: no identifiable real minors in AI gen",
    ],
    pricingNote:
      "来源：ReelShort trope performance 2026。秘密婴儿线 400–1,400 元/集；含儿童镜头合规审查成本。",
    pricingTiers: tiers([
      ["Emotion test", "400–850 元/集", "48h", "Motherhood hook ads", ["Child template", "EN voice"]],
      ["Premium family", "850–1,400 元/集", "3–4 days", "Platform pitch", ["Child scene legal", "3 revisions"]],
      ["Series deal", "$140K–$240K", "4–6 weeks", "Buyout", ["Full arc bible", "Legal clearance"]],
    ]),
    references: [
      { title: "Jane the Virgin", type: "TV", why: "Secret pregnancy comedy-drama", platform: "CW" },
      { title: "The Notebook", type: "Film", why: "Reunion emotional payoff", year: "2004" },
      { title: "Billionaire's Secret Baby", type: "Short drama", why: "Trope naming convention CTR", platform: "ReelShort" },
    ],
    platformTips: [
      "Thumbnail: child holding father's hand — highest CTR on ReelShort",
      "Paywall before DNA test result episode",
      "Motherhood Facebook groups effective for UA",
      "Avoid child endangerment imagery in ads — Meta policy strict",
    ],
    taboos: ["Child abuse depiction", "Real minor likeness without consent", "Adoption fraud glorification", "Medical misinformation pregnancy"],
    toolFocus: ["Seedance 2.0 family", "Child-safe AI policy", "Emotional piano stems", "本网站 Secret Baby Skill"],
  }),

  buildSub("revenge-ex", "overseas-drama", "复仇前任", "Ex·Betrayal", "Sparkles", "emerald", {
    description:
      "Betrayed by ex, return transformed for revenge。ReelShort revenge + romance 常年霸榜；DramaBox 将 revenge 与 supernatural 混合效果最佳。",
    audience: "24–40 岁女性；高情绪消费；偏好 makeover、财富曝光与前任跪求",
    hookFormula:
      "0–3s: Cheating caught on camera; 15s: 'You chose wrong'; Cliffhanger: Ex sees heroine's new power",
    visualStyle:
      "Before: desaturated humble; After: saturated luxury montage; gala entrance slow-motion staple",
    dialogueTone: "Cold confidence post-revenge; flashback whispers; 'Remember when you said...' callbacks",
    sopHighlights: [
      "Makeover reveal shot mandatory ep3–5",
      "Ex must grovel ep12+ or audience churns",
      "New love interest enters ep4 — triangle sustains paywall",
      "Social media humiliation beat — vertical-native staging",
    ],
    pricingNote:
      "来源：ReelShort revenge genre IAP 2026 Q1。复仇前任 380–1,500 元/集；变身蒙太奇为成本高点。",
    pricingTiers: tiers([
      ["Revenge hook", "380–800 元/集", "48h", "Cheating reveal ads", ["Gala template", "EN voice"]],
      ["Premium revenge", "800–1,500 元/集", "3–4 days", "Platform sub", ["Makeover montage", "4 revisions"]],
      ["Hit series", "$150K–$260K", "5–6 weeks", "Buyout", ["Writer + data feedback"]],
    ]),
    references: [
      { title: "Revenge (TV)", type: "TV", why: "Transformation revenge structure", platform: "ABC", year: "2011" },
      { title: "The First Wives Club", type: "Film", why: "Female revenge solidarity", year: "1996" },
      { title: "After Divorce, I Became a Billionaire", type: "Short drama", why: "2025–2026 title SEO pattern", platform: "ReelShort" },
    ],
    platformTips: [
      "Ad creative: cheating scene blurred + text overlay passes Meta review",
      "Ep1 cheating must be undeniable — audience patience < 90s",
      "DramaBox revenge + supernatural crossover tested +30% retention",
      "Coin unlock spikes on gala reveal episodes",
    ],
    taboos: ["Real ex likeness", "Domestic violence glorification", "Defamation parallels to real people", "Suicide revenge"],
    toolFocus: ["Seedance 2.0 montage", "Kling slow-mo", "Gala music stems", "本网站 Revenge Ex Skill"],
  }),

  buildSub("medical-romance", "overseas-drama", "医疗言情", "Doctor·Hospital", "Target", "cyan", {
    description:
      "Surgeon romance、hospital hierarchy 与生命抉择。DramaBox 拓展品类；需医疗细节可信但避免真实医疗建议。",
    audience: "22–36 岁女性；Grey's Anatomy 受众迁移；偏好专业魅力+禁忌恋",
    hookFormula:
      "0–3s: ER crash / scalpel close-up; 15s: Forbidden glance across OR; Cliffhanger: Patient secret links leads",
    visualStyle:
      "Clean hospital whites, blue scrubs, shallow depth; monitor beeps as rhythm; reference Grey's vertical compression",
    dialogueTone: "Medical jargon light; professional banter; emotional breach in private moments",
    sopHighlights: [
      "No real procedure tutorials — FDA/FTC sensitive",
      "Hospital set reusable: OR, break room, roof",
      "One medical crisis per 4 eps drives stakes",
      "Scrubs color-code characters consistently",
    ],
    pricingNote:
      "来源：Medical romance vertical 2026 承制。医疗言情 420–1,500 元/集；医院场景资产摊销关键。",
    pricingTiers: tiers([
      ["Med test", "420–900 元/集", "2 days", "Hook test", ["Hospital template", "EN voice"]],
      ["Premium med", "900–1,500 元/集", "3–5 days", "Platform", ["OR set bible", "3 revisions"]],
      ["Series", "$145K–$235K", "5–7 weeks", "Buyout", ["Medical consultant review"]],
    ]),
    references: [
      { title: "Grey's Anatomy", type: "TV", why: "Hospital romance ensemble", platform: "ABC" },
      { title: "The Good Doctor", type: "TV", why: "Medical drama pacing", platform: "ABC" },
      { title: "The Surgeon's Secret Wife", type: "Short drama", why: "Vertical medical trope", platform: "DramaBox" },
    ],
    platformTips: [
      "Disclaimer 'fiction not medical advice' in ep1 description",
      "Scrubs + stethoscope thumbnail CTR high on ReelShort",
      "Avoid COVID/real pandemic exploitation",
      "DramaBox expanding family + medical — less saturated than CEO",
    ],
    taboos: ["Real hospital logos", "False cure claims", "Patient privacy violations", "Graphic surgery"],
    toolFocus: ["Seedance 2.0 hospital", "Medical prop library", "Heartbeat SFX", "本网站 Medical Skill"],
  }),

  buildSub("royal-aristocrat", "overseas-drama", "皇室贵族", "Royal·Duke", "Crown", "violet", {
    description:
      "Modern royal、duke inheritance 与平民女孩。ReelShort 欧洲市场友好；DramaBox 国际受众对非西方皇室也接受。",
    audience: "20–38 岁女性；UK/EU/US；偏好 tiara、ballroom 与 duty vs love",
    hookFormula:
      "0–3s: Crown ceremony / paparazzi flash; 15s: 'You can't marry a commoner'; Cliffhanger: Succession crisis",
    visualStyle:
      "Palace gold, ballroom chandeliers, formal wear; reference Bridgerton color grading for vertical",
    dialogueTone: "Formal address shifting to intimate; 'Your Highness' to first name arc",
    sopHighlights: [
      "Royal title chart — avoid real UK/EU family names",
      "Ballroom episode ep10–15 for costume budget spike",
      "Paparazzi montage as cheap tension builder",
      "Crown/tiara prop consistency across eps",
    ],
    pricingNote:
      "来源：Bridgerton-effect vertical 2026。皇室线 450–1,700 元/集；礼服与场景成本高于均值 30%。",
    pricingTiers: tiers([
      ["Royal test", "450–950 元/集", "2–3 days", "EU Meta test", ["Ballroom template", "EN voice"]],
      ["Premium royal", "950–1,700 元/集", "4–6 days", "Platform", ["Costume bible", "4 revisions"]],
      ["Series", "$155K–$270K", "6–8 weeks", "Buyout", ["Period-modern hybrid"]],
    ]),
    references: [
      { title: "Bridgerton", type: "TV", why: "Modern royal aesthetic", platform: "Netflix" },
      { title: "The Crown", type: "TV", why: "Protocol and duty conflict", platform: "Netflix" },
      { title: "Married to the Prince", type: "Short drama", why: "Vertical royal romance SEO", platform: "ReelShort" },
    ],
    platformTips: [
      "UK audience peaks evening GMT — schedule releases",
      "Tiara thumbnail A/B beats dress thumbnail on ReelShort",
      "Fictional kingdom names avoid legal issues",
      "DramaBox SEA audience enjoys royal + mafia crossover",
    ],
    taboos: ["Real royal family depiction", "Political monarchy debate", "Colonial glorification", "Unauthorized crests"],
    toolFocus: ["Seedance 2.0 ballroom", "Costume LoRA", "Orchestral stems", "本网站 Royal Skill"],
  }),

  buildSub("sports-star", "overseas-drama", "体育明星", "Athlete·Comeback", "Rocket", "teal", {
    description:
      "Injured athlete comeback、coach romance 或 rival team。DramaBox 2026 拓展多元化品类；男性用户参与度高。",
    audience: "18–35 岁；男女均衡偏男；体育粉丝；偏好 underdog、复出与赛场热血",
    hookFormula:
      "0–3s: Injury slow-mo / trophy shatter; 15s: 'You'll never play again'; Cliffhanger: Scout offer or rival provocation",
    visualStyle:
      "Stadium lights, sweat close-ups, locker room; high shutter for action; reference Rocky vertical beats",
    dialogueTone: "Motivational short lines; trash talk; vulnerable moment alone",
    sopHighlights: [
      "No real athlete likeness or team logos",
      "Training montage every 5 eps — low cost high emotion",
      "Championship ep20+ as season finale hook",
      "Injury recovery timeline realistic — avoid magic heal ep2",
    ],
    pricingNote:
      "来源：Sports vertical expansion DramaBox 2026。体育线 400–1,400 元/集；赛场镜头可用素材库降本。",
    pricingTiers: tiers([
      ["Sports test", "400–850 元/集", "2 days", "Male-skew UA", ["Stadium template", "EN voice"]],
      ["Premium sports", "850–1,400 元/集", "3–5 days", "Platform", ["Training montage pack", "3 revisions"]],
      ["Series", "$140K–$230K", "5–6 weeks", "Buyout", ["Sports consultant"]],
    ]),
    references: [
      { title: "Rocky", type: "Film", why: "Underdog training montage", year: "1976" },
      { title: "Ted Lasso", type: "TV", why: "Warm sports leadership", platform: "Apple TV+" },
      { title: "The Quarterback's Secret", type: "Short drama", why: "Sports romance vertical trope", platform: "DramaBox" },
    ],
    platformTips: [
      "Super Bowl / World Cup timing for UA bursts",
      "Male audience on DramaBox — sports + mafia double feature tests well",
      "Avoid NFL/NBA trademarked footage",
      "Inspirational ads perform on YouTube Shorts",
    ],
    taboos: ["Real athlete unauthorized", "Doping glorification", "League logos", "Dangerous stunt replication"],
    toolFocus: ["Seedance 2.0 action", "Stadium stock+", "Crowd SFX", "本网站 Sports Skill"],
  }),

  buildSub("twin-swap", "overseas-drama", "双胞胎互换", "Twin·Identity", "Sparkles", "amber", {
    description:
      "Twin swap、identity switch 与秘密曝光。高概念低门槛，ep1 即可建立 mistaken identity 引擎。",
    audience: "20–35 岁；男女均衡；偏好戏剧性误会与身份喜剧",
    hookFormula:
      "0–3s: Twins switch clothes / mirror reveal; 15s: Wrong twin kissed; Cliffhanger: Switch discovered partially",
    visualStyle:
      "Split screen, mirror shots, matching outfits; slight hairstyle diff for audience clarity",
    dialogueTone: "Comedic misunderstanding; 'I'm not who you think'; dramatic irony",
    sopHighlights: [
      "Twin actors or AI face-lock mandatory — consistency is everything",
      "Accessory diff (earring, watch) helps audience track",
      "Switch reveal to love interest ep8–12",
      "Parental secret ep15+ second paywall spike",
    ],
    pricingNote:
      "来源：Identity trope vertical 2026。双胞胎线 450–1,600 元/集；双角色锁定成本 +25%。",
    pricingTiers: tiers([
      ["Twin test", "450–900 元/集", "2–3 days", "Concept hook", ["Twin face lock", "EN voice"]],
      ["Premium twin", "900–1,600 元/集", "4–5 days", "Platform", ["Dual character bible", "4 revisions"]],
      ["Series", "$150K–$245K", "5–7 weeks", "Buyout", ["Twin casting/AI lock"]],
    ]),
    references: [
      { title: "The Parent Trap", type: "Film", why: "Twin swap classic structure", year: "1998" },
      { title: "Dead Ringers", type: "Film", why: "Dark twin identity", year: "1988" },
      { title: "The CEO's Twin Bride", type: "Short drama", why: "CEO + twin trope mashup", platform: "ReelShort" },
    ],
    platformTips: [
      "Thumbnail: two identical faces side by side — curiosity CTR",
      "Ep3 'wrong twin' kiss drives social clips",
      "Comedy tone allows faster ep turnover",
      "Face consistency failure = instant 1-star reviews",
    ],
    taboos: ["Real twin privacy", "Identity fraud instruction", "Disability mockery via duplicate", "Deepfake real person"],
    toolFocus: ["Seedance 2.0 --cref twin", "Kling face lock", "Split screen AE", "本网站 Twin Skill"],
  }),

  buildSub("amnesia-love", "overseas-drama", "失忆爱恋", "Amnesia·Second Chance", "Heart", "rose", {
    description:
      "Amnesia、forgotten love 与重新坠入爱河。经典 soap 引擎；适合慢烧 + 碎片记忆闪回。",
    audience: "25–45 岁女性；传统 soap 受众；偏好命运与记忆碎片",
    hookFormula:
      "0–3s: Car crash / wake up 'Who are you?'; 15s: Stranger claims to be husband; Cliffhanger: Memory flash of kiss",
    visualStyle:
      "Soft focus for memories; sharp present; polaroid-style flashback inserts; hospital white opening",
    dialogueTone: "Fragile present voice; memory fragments whispered; dramatic 'I remember' climax",
    sopHighlights: [
      "Memory flashbacks ≤2s, desaturated + vignette",
      "Trigger objects: song, scar, restaurant — repeat across eps",
      "Antagonist hides truth — reveal ep18–25",
      "Medical amnesia vague — no real treatment advice",
    ],
    pricingNote:
      "来源：Soap trope vertical 2026。失忆线 380–1,450 元/集；闪回镜头为剪辑成本点。",
    pricingTiers: tiers([
      ["Amnesia test", "380–800 元/集", "48h", "Hook test", ["Hospital template", "EN voice"]],
      ["Premium soap", "800–1,450 元/集", "3–4 days", "Platform", ["Memory LUT pack", "3 revisions"]],
      ["Series", "$140K–$225K", "5–6 weeks", "Buyout", ["Soap bible 80 ep"]],
    ]),
    references: [
      { title: "The Vow", type: "Film", why: "Amnesia romance structure", year: "2012" },
      { title: "50 First Dates", type: "Film", why: "Repeated courtship beats", year: "2004" },
      { title: "My Husband Forgot He Loved Me", type: "Short drama", why: "Title SEO pattern 2026", platform: "ReelShort" },
    ],
    platformTips: [
      "Memory flashback cliffhangers drive ep-to-ep unlock",
      "Older female demo high LTV on ReelShort",
      "Avoid traumatic brain injury mockery",
      "Piano + flashback = proven ad creative format",
    ],
    taboos: ["TBI trivialization", "Medical treatment false claims", "Car crash graphic", "Stock disaster footage unlicensed"],
    toolFocus: ["Seedance 2.0 flashback", "Memory LUT", "Piano emotional stems", "本网站 Amnesia Skill"],
  }),

  buildSub("hidden-identity", "overseas-drama", "隐藏身份", "Secret Identity", "Search", "emerald", {
    description:
      "Hidden billionaire、secret boss 或 undercover。与 CEO 互补但更强调悬念维持；男频女频皆可。",
    audience: "22–40 岁；男女均衡；偏好悬念、打脸与身份层叠揭露",
    hookFormula:
      "0–3s: Humble job + luxury car pull up; 15s: Assistant calls 'Sir'; Cliffhanger: Identity almost exposed",
    visualStyle:
      "Dual wardrobe: work uniform vs hidden wealth; split lighting warm/cool; garage supercar reveal shots",
    dialogueTone: "Understated humble cover; inner confidence; 'Someday they'll know'",
    sopHighlights: [
      "Identity layers: reveal one level every 7–10 eps",
      "Workplace scenes must feel authentic — not just backdrop",
      "Sidekick who knows secret — comedy relief valve",
      "Final identity reveal ep25–35 for max coin spend",
    ],
    pricingNote:
      "来源：Hidden identity trope IAP data 2026。隐藏身份 400–1,550 元/集；身份揭露集为投流素材金矿。",
    pricingTiers: tiers([
      ["Identity test", "400–850 元/集", "48h", "Reveal hook ads", ["Office template", "EN voice"]],
      ["Premium hidden", "850–1,550 元/集", "3–5 days", "Platform", ["Dual wardrobe bible", "4 revisions"]],
      ["Series", "$150K–$255K", "5–7 weeks", "Buyout", ["Layered outline 80 ep"]],
    ]),
    references: [
      { title: "Superman / Clark Kent", type: "Comic", why: "Dual identity archetype" },
      { title: "Working Girl", type: "Film", why: "Class disguise payoff", year: "1988" },
      { title: "The Janitor Is Actually the CEO", type: "Short drama", why: "2026 title SEO champion", platform: "ReelShort" },
    ],
    platformTips: [
      "Ad hook: janitor uniform + Rolls Royce in same frame",
      "Each identity layer = new paywall curiosity spike",
      "Male hidden identity growing on DramaBox 2026",
      "Title format 'The X Is Actually Y' highest CTR",
    ],
    taboos: ["Real company impersonation", "Military undercover detail", "Fraud how-to", "Defamation of professions"],
    toolFocus: ["Seedance 2.0 dual look", "Car reveal shots", "Office + luxury LUT", "本网站 Hidden ID Skill"],
  }),
];
