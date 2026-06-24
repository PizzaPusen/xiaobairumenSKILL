import fs from "fs";

const seedanceMap = {
  "seedance-nvdi": "palace-intrigue",
  "seedance-urban": "urban-reversal",
  "seedance-romance": "sweet-romance",
  "seedance-xianxia": "xianxia-fantasy",
  "seedance-wuxia": "wuxia-action",
  "seedance-mv": "music-video",
  "seedance-thriller": "thriller-suspense",
  "seedance-scifi": "sci-fi",
  "seedance-horror": "horror",
  "seedance-ad": "product-hero",
};

const productionMap = {
  "guide-anime-2d-series": "anime-jp-2d",
  "guide-anime-motion-comic": "motion-comic",
  "guide-film-festival": "author-film",
  "guide-film-brand-micro": "brand-micro",
  "guide-drama-vertical-ip": "revenge-rebirth",
  "guide-drama-urban-reversal": "urban-reversal",
  "guide-tvc-launch": "brand-story",
  "guide-tvc-digital-spokesperson": "digital-human",
  "guide-ecom-main-video": "main-video",
  "guide-ecom-qianchuan-feed": "qianchuan-feed",
  "guide-overseas-ceo": "ceo-billionaire",
  "guide-overseas-werewolf": "werewolf-vampire",
  "guide-overseas-contract": "contract-marriage",
  "guide-overseas-mafia": "mafia-revenge",
};

const sd = JSON.parse(fs.readFileSync("src/data/seedance-packs.json", "utf8"));
sd.packs.forEach((p) => {
  if (seedanceMap[p.id]) p.subCategoryId = seedanceMap[p.id];
});
fs.writeFileSync("src/data/seedance-packs.json", JSON.stringify(sd, null, 2));

const pr = JSON.parse(fs.readFileSync("src/data/production-packs.json", "utf8"));
pr.packs.forEach((p) => {
  if (productionMap[p.id]) p.subCategoryId = productionMap[p.id];
});
fs.writeFileSync("src/data/production-packs.json", JSON.stringify(pr, null, 2));

const cats = JSON.parse(fs.readFileSync("src/data/pack-categories.json", "utf8"));
cats.categories.forEach((c) => {
  c.hasSubCategories = true;
});
fs.writeFileSync("src/data/pack-categories.json", JSON.stringify(cats, null, 2));

console.log("assigned subcategories");
