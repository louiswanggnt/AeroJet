# AeroJet 專案交接文件

> 最後更新：2026-03-17

## 1. 專案概覽

**AeroJet** 是京華堂 (GNT) 的品牌官網，展示其第六代無創藥物導入裝置 AeroJet T6。網站支援繁體中文、英文、日文三語系。

| 項目 | 內容 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS 4 |
| 動畫 | Framer Motion (`motion` 套件) |
| 多語系 | next-intl (URL 路由式) |
| 部署 | Firebase (`output: 'standalone'`) |

## 2. 目錄結構

```
AeroJet/
├── app/
│   ├── layout.tsx                  # 根 layout (passthrough)
│   ├── globals.css                 # 全域樣式
│   └── [locale]/                   # next-intl 動態路由
│       ├── layout.tsx              # 載入 NextIntlClientProvider、metadata、jsonLd
│       ├── page.tsx                # 首頁 (Hero + Tech + FAQ + Footer)
│       ├── about/page.tsx          # 關於京華堂
│       ├── treatment/page.tsx      # 臨床實例
│       ├── technology/page.tsx     # 技術原理
│       ├── evolution/page.tsx      # 世代演進
│       ├── gas-equipment/page.tsx  # 氣體設備
│       └── contact/page.tsx        # 聯絡資訊
├── components/
│   ├── Header.tsx                  # 導覽列 + 語言切換
│   ├── Hero.tsx                    # 首頁輪播 + CTA
│   ├── Tech.tsx                    # 技術核心 + 儀器三大功效
│   ├── FAQ.tsx                     # 常見問題手風琴
│   ├── Footer.tsx                  # CTA + 版權資訊
│   ├── About.tsx                   # 關於京華堂 + 產品列表
│   ├── Treatment.tsx               # 臨床案例卡片
│   ├── Technology.tsx              # 技術原理長文 + 比較表 + 試驗 + 期刊
│   ├── EvolutionTimeline.tsx       # 世代演進時間軸 + 規格表 + 專利
│   ├── GasEquipment.tsx            # 氣體設備比較與適用族群
│   └── ContactInfo.tsx             # 聯絡資訊與 LINE QR 區塊
├── config/
│   └── assets.ts                   # 所有靜態資源路徑集中管理
├── i18n/
│   ├── routing.ts                  # 定義支援語系 ['zh-TW','en','ja']
│   ├── request.ts                  # Server 端載入 locale JSON
│   └── navigation.ts              # 匯出 Link/useRouter/usePathname 等
├── locales/
│   ├── zh-TW.json                  # 繁體中文 (主語系，llms.txt 的資料來源)
│   ├── en.json                     # 英文
│   └── ja.json                     # 日文
├── middleware.ts                   # next-intl locale 偵測 middleware
├── next.config.ts                  # Next.js config + next-intl plugin
├── scripts/
│   └── generate-llms.ts            # 從 zh-TW.json 自動生成 public/llms.txt
├── public/
│   ├── llms.txt                    # 供 LLM 閱讀的品牌知識摘要
│   └── images/                     # 所有靜態圖片
├── docs/
│   └── IMAGE_MANAGEMENT_SOP.md     # 圖片管理 SOP
└── HANDOFF.md                      # 本文件
```

## 3. i18n 多語系架構

### 運作方式

```
使用者訪問 / → middleware 偵測語系 → 重導至 /zh-TW (或 /en, /ja)
                                        ↓
                            app/[locale]/layout.tsx
                            載入 locales/{locale}.json
                            包裹 NextIntlClientProvider
                                        ↓
                            元件內 useTranslations('namespace')
```

### 支援語系

| 語系 | locale code | 檔案 |
|------|-------------|------|
| 繁體中文 | zh-TW | locales/zh-TW.json |
| 英文 | en | locales/en.json |
| 日文 | ja | locales/ja.json |

### 新增語系步驟

1. 在 `locales/` 新增 `{code}.json`，結構與 zh-TW.json 相同
2. 在 `i18n/routing.ts` 的 `locales` 陣列新增語系代碼
3. 完成

### 元件使用方式

```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

對於陣列資料（如 FAQ、案例），使用 `t.raw('key')` 取得原始物件/陣列。

## 4. 文字管理規則

**所有使用者可見的文字必須來自 locale JSON，禁止在元件中硬編碼。**

- locale JSON 的 namespace 對應：
  - `metadata` → SEO title/description、JSON-LD
  - `common` → 品牌名、選單、共用按鈕
  - `hero` → 首頁輪播與 CTA
  - `tech` → 技術核心與儀器三大功效
  - `gasEquipment` → 氣體設備頁面內容
  - `contact` → 聯絡資訊頁面內容
  - `technology` → 技術原理頁面全部內容
  - `evolution` → 世代演進頁面全部內容
  - `treatment` → 臨床實例頁面全部內容
  - `about` → 關於京華堂頁面全部內容
  - `faq` → 常見問題
  - `footer` → Footer CTA 與版權

## 5. 靜態資源管理

所有圖片路徑集中於 `config/assets.ts`。新增圖片時：
1. 將檔案放入 `public/images/` 對應目錄
2. 在 `config/assets.ts` 新增路徑
3. 在元件中透過 `ASSETS.xxx` 引用

詳見 `docs/IMAGE_MANAGEMENT_SOP.md`。

## 6. llms.txt 維護

`public/llms.txt` 是供 AI/LLM 閱讀的品牌知識摘要，由腳本自動從 `locales/zh-TW.json` 生成。
目前會包含技術核心、儀器三大功效、氣體設備、聯絡資訊等段落。

```bash
npm run generate:llms
```

**更新時機**：每次修改 `locales/zh-TW.json` 內容後，都應執行此指令重新生成。

## 7. 同步更新清單

修改內容時需確保以下檔案同步：

| 觸發動作 | 需同步更新 |
|----------|-----------|
| 修改文字內容 | 三語系 JSON 同步修改 → 執行 `npm run generate:llms` |
| 新增頁面 | app/[locale]/ 下新增 → 元件文字從 locale 讀取 → 更新本文件 |
| 新增元件 | 文字從 locale 讀取 → 更新本文件 |
| 調整氣體設備 / 聯絡資訊 | 更新 `gasEquipment` / `contact` namespace → 執行 `npm run generate:llms` |
| 修改圖片 | 更新 config/assets.ts → 放入 public/images/ |
| 新增語系 | locales/ 新增 JSON → i18n/routing.ts 加語系 |

## 8. npm scripts

| 指令 | 說明 |
|------|------|
| `npm run dev` | 本地開發伺服器 |
| `npm run build` | 生產環境建置 |
| `npm run start` | 啟動生產伺服器 |
| `npm run lint` | ESLint 檢查 |
| `npm run clean` | 清除 .next 快取 |
| `npm run generate:llms` | 從 zh-TW.json 重新生成 llms.txt |

## 9. 已知事項與 TODO

- Header 與 Footer CTA 已統一導向 `/contact`
- Footer 的「隱私權政策」「服務條款」為 `#` 佔位連結
- `config/assets.ts` 中 tech 圖片仍使用 picsum.photos 佔位圖
- about 背景圖仍使用 picsum.photos 佔位圖
- 臨床案例的 before/after 圖片日期寫死在 locale JSON 中
- SEO: 各語系的 canonical URL 需配合實際域名更新（目前為 domain.com 佔位）
