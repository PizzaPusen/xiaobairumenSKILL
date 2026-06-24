import fs from "fs";
import { domesticDrama } from "./subcategory-content/domestic-drama.mjs";
import { overseasDrama } from "./subcategory-content/overseas-drama.mjs";
import { aiAnimation } from "./subcategory-content/ai-animation.mjs";
import { filmShort } from "./subcategory-content/film-short.mjs";
import { tvc } from "./subcategory-content/tvc.mjs";
import { ecommerceAd } from "./subcategory-content/ecommerce-ad.mjs";

const subs = [
  ...domesticDrama,
  ...overseasDrama,
  ...aiAnimation,
  ...filmShort,
  ...tvc,
  ...ecommerceAd,
];

// 校验唯一 id
const ids = new Set();
for (const s of subs) {
  if (ids.has(s.id)) throw new Error(`duplicate subcategory id: ${s.id}`);
  ids.add(s.id);
}

const required = [
  "description",
  "audience",
  "hookFormula",
  "visualStyle",
  "dialogueTone",
  "sopHighlights",
  "pricingNote",
  "pricingTiers",
  "references",
  "platformTips",
  "taboos",
  "toolFocus",
];

for (const s of subs) {
  for (const key of required) {
    if (!s[key] || (Array.isArray(s[key]) && s[key].length === 0)) {
      throw new Error(`missing ${key} in ${s.id}`);
    }
  }
}

fs.writeFileSync(
  "src/data/pack-subcategories.json",
  JSON.stringify({ subCategories: subs }, null, 2)
);

const byCat = {};
subs.forEach((s) => {
  byCat[s.categoryId] = (byCat[s.categoryId] || 0) + 1;
});
console.log("generated", subs.length, "subcategories with full content");
console.log(byCat);
