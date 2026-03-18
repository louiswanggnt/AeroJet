/**
 * Generates public/llms.txt from locales/zh-TW.json.
 *
 * Usage:  npx tsx scripts/generate-llms.ts
 *    or:  npm run generate:llms
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const locale = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'locales', 'zh-TW.json'), 'utf-8'),
);

function nl(text: string): string {
  return text.replace(/\\n/g, '\n').replace(/<\/?strong>/g, '');
}

function buildTable(headers: string[], rows: string[][]): string {
  const lines: string[] = [];
  lines.push('| ' + headers.join(' | ') + ' |');
  lines.push('| ' + headers.map(() => ':---').join(' | ') + ' |');
  for (const row of rows) {
    lines.push('| ' + row.map((c) => c.replace(/\n/g, '、')).join(' | ') + ' |');
  }
  return lines.join('\n');
}

const { common, hero, tech, technology, evolution, treatment, about, faq, footer, gasEquipment, contact } = locale;

const compRowKeys = ['gasSource', 'speed', 'brand', 'mode', 'safety', 'system', 'marketing', 'effect'] as const;
const specRowKeys = ['type', 'weight', 'speed', 'load', 'atomizer', 'design', 'output'] as const;

const compRows = compRowKeys.map((k) => {
  const r = technology.comparison.rows[k];
  return [`**${r.label}**`, r.t6, r.other];
});

const specRows = specRowKeys.map((k) => {
  const r = evolution.specRows[k];
  return [r.label, r.t1, r.t2, r.t3, r.t4, r.t5, r.t6];
});

const gasSourceRows = (gasEquipment.sourceComparisons as Array<{
  sourceName: string;
  requirementText: string;
  usageScenario: string;
  advantages: string[];
  limitations: string[];
}>).map((item) => [
  `**${item.sourceName}**`,
  item.requirementText,
  item.usageScenario,
  item.advantages.join('；'),
  item.limitations.join('；'),
]);

const gasTypeRows = (gasEquipment.cylinderGasTypes as Array<{
  gasName: string;
  characteristics: string[];
  suitableFor: string[];
}>).map((item) => [
  `**${item.gasName}**`,
  item.characteristics.join('；'),
  item.suitableFor.join('；'),
]);

const output = `# ${common.brandName} (GNT) | ${common.productName}

## 品牌核心
**${common.brandName} (GNT)** ${nl(about.desc)}

## 產品介紹：${common.productName}
${hero.desc}
**核心亮點**：${hero.highlight}。

### 技術核心
1. **${tech.features.supersonic.title}**：${tech.features.supersonic.desc}
2. **${tech.features.micron.title}**：${tech.features.micron.desc}
3. **${tech.features.pulse.title}**：${tech.features.pulse.desc}

### 儀器三大功效
1. **${tech.benefits.items.delivery.title}**：${tech.benefits.items.delivery.desc}
2. **${tech.benefits.items.shockwave.title}**：${tech.benefits.items.shockwave.desc}
3. **${tech.benefits.items.gas.title}**：${tech.benefits.items.gas.desc}
   - ${tech.benefits.items.gas.co2.title}：${tech.benefits.items.gas.co2.desc}
   - ${tech.benefits.items.gas.o2.title}：${tech.benefits.items.gas.o2.desc}

### 技術原理
- **${nl(technology.why.title)}**
  ${nl(technology.why.desc1)}
- **${nl(technology.atomization.title)}**
  ${nl(technology.atomization.desc1)} ${nl(technology.atomization.desc2)}

### 競品對照 (AeroJet T6 vs 他牌)
${buildTable(['項目', 'AeroJet T6', '他牌'], compRows)}

## 氣體設備
${gasEquipment.description}

### 氣體來源比較
${buildTable(['來源', '要求', '使用場所', '優點', '注意事項'], gasSourceRows)}

### 高壓鋼瓶氣體
${buildTable(['氣體', '特性', '適用族群'], gasTypeRows)}

## 世代演進 (Evolution)
${nl(evolution.desc)}

### 規格參數對照
${buildTable(['規格', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6'], specRows)}

## 產品線 (About GNT)
${Object.entries(about.products as Record<string, { title: string; desc: string }>)
  .map(([, p], i) => `${i + 1}. **${p.title}**：${p.desc}`)
  .join('\n')}

## 常見問題 (FAQ)
${(faq.questions as Array<{ q: string; a: string }>)
  .map((item, i) => `${i + 1}. **${item.q}**\n   ${item.a}`)
  .join('\n')}

## 聯絡資訊
- **公司**: ${contact.details.company.value.replace(/\n/g, ' / ')}
- **地址**: ${contact.details.address.value.replace(/\n/g, ' / ')}
- **電話**: ${contact.details.phone.value}
- **統一編號**: ${contact.details.taxId.value}
- **傳真**: ${contact.details.fax.value}
- **郵件**: ${contact.details.email.value}
- **營業時間**: ${contact.details.hours.value}
`;

const outPath = path.join(ROOT, 'public', 'llms.txt');
fs.writeFileSync(outPath, output, 'utf-8');
console.log(`✓ Generated ${outPath} (${output.length} chars)`);
