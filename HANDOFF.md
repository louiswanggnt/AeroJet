# AeroJet 專案交接文件

> 最後更新：2026-05-11（自動化投放完成 + 文件結構整改）

## 1. 專案概覽

**AeroJet** 是京華堂 (GNT) 的品牌官網，展示其第六代無創藥物導入裝置 AeroJet T6。網站支援繁體中文、英文、日文三語系。

| 項目 | 內容 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS 4 |
| 動畫 | Framer Motion (`motion` 套件) |
| 多語系 | next-intl (URL 路由式) |
| 部署模式 | 靜態匯出 (`next export` → `out/` → **FTP**) |
| 生產目標 | 公司舊伺服器 `auvita.tw`（FTP host: `ftp.gntbmd.com:21`） |
| 預覽 | Netlify (`jovial-manatee-a02a63`) |

**架構決定**：Next.js 為唯一真相（ADR-001）。詳見 [`docs/ARCHITECTURE_DECISION.md`](docs/ARCHITECTURE_DECISION.md)。

## 2. 目錄結構

```
AeroJet/
├── CLAUDE.md                          ← Claude Code 自動載入入口
├── HANDOFF.md                         ← 本檔
├── README.md                          ← AI Studio 啟動指南（簡）
├── .claude/settings.json              ← Agent 權限 + hooks
├── .github/workflows/
│   ├── deploy-on-push.yml             ← push 到 main 自動部署
│   ├── deploy-daily.yml               ← 每日 00:05 台灣自動切換促銷
│   └── validate-pr.yml                ← PR 驗證
├── app/
│   ├── layout.tsx                     # 根 layout (passthrough)
│   ├── globals.css                    # 全域樣式
│   └── [locale]/                      # next-intl 動態路由
│       ├── layout.tsx                 # SEO metadata（含 NEXT_PUBLIC_SITE_URL）
│       ├── page.tsx                   # 首頁
│       ├── about/page.tsx             # 關於京華堂
│       ├── treatment/page.tsx         # 臨床實例
│       ├── technology/page.tsx        # 技術原理
│       ├── evolution/page.tsx         # 世代演進
│       ├── gas-equipment/page.tsx     # 氣體設備
│       └── contact/page.tsx           # 聯絡資訊
├── components/                        # 12 個共用元件
├── data/promotions/
│   ├── schedule.json                  ← 行銷唯一觸碰點（總排程）
│   ├── schedule.schema.json           ← JSON Schema 驗證規範
│   ├── active.json                    ← build-active.mjs 自動產出
│   └── archive.json                   ← build-active.mjs 自動歸檔
├── types/promotion.ts                 # 活動消息型別
├── config/assets.ts                   # 靜態資源路徑集中
├── i18n/                              # next-intl 設定
├── locales/{zh-TW,en,ja}.json         # 文字單一真相
├── middleware.ts                      # next-intl middleware
├── next.config.ts
├── scripts/
│   ├── generate-llms.ts               # 產出 public/llms.txt
│   ├── validate-schedule.mjs          ← schema + 業務規則驗證
│   └── build-active.mjs               ← 按今日切分 active/archive
├── public/
│   ├── llms.txt                       # AI/LLM 摘要
│   └── images/                        # 靜態圖片
│       └── promotions/{YYYY-MM}/      # 行銷上傳區
└── docs/
    ├── AGENT_RULES.md                 ← 老闆 vs 行銷修改規則
    ├── ARCHITECTURE_DECISION.md       ← ADR 紀錄
    ├── DEPLOYMENT.md                  ← GitHub Secrets / SFTP 設定
    ├── MARKETING_GUIDE.md             ← 行銷使用手冊
    └── IMAGE_MANAGEMENT_SOP.md        ← 圖片管理 SOP
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

**更新時機**：每次修改 `locales/zh-TW.json` 內容後，都應執行此指令重新生成。GitHub Actions 在每次 deploy 前自動執行。

## 7. 同步更新清單

修改內容時需確保以下檔案同步：

| 觸發動作 | 需同步更新 |
|----------|-----------|
| 修改文字內容 | 三語系 JSON 同步修改 → 執行 `npm run generate:llms` |
| 新增頁面 | app/[locale]/ 下新增 → 元件文字從 locale 讀取 → 更新本文件 |
| 新增元件 | 文字從 locale 讀取 → 更新本文件 |
| 調整氣體設備 / 聯絡資訊 | 更新 `gasEquipment` / `contact` namespace → 執行 `npm run generate:llms` |
| 修改圖片 | 更新 config/assets.ts → 放入 public/images/ |
| 更新活動消息 | **改 schedule.json** → 跑 `npm run validate:promotions` → 跑 `npm run build:active`（或讓 CI 跑） |
| 新增語系 | locales/ 新增 JSON → i18n/routing.ts 加語系 |

## 8. 活動消息輪播（Promotions）— 自動化投放架構

### 8.1 資料流

```
schedule.json   ← 行銷唯一觸碰點（含過去/當期/未來所有促銷）
    │
    ├── validate-schedule.mjs   ← schema + 業務規則
    │   ├── 三語系完整性
    │   ├── 日期格式 YYYY-MM-DD
    │   ├── startAt < endAt
    │   ├── id 唯一
    │   ├── 同期 overlap <= 3
    │   └── 圖片實際存在於 public/
    │
    └── build-active.mjs        ← 按今日（Asia/Taipei）切分
            ├── active.json     ← startAt <= today <= endAt（最多 3 則）
            └── archive.json    ← endAt < today（自動加 archivedAt）
```

**重要**：`active.json` 與 `archive.json` 由 build-active.mjs 自動產出，**手動編輯會被覆蓋**。

### 8.2 資料結構

`data/promotions/schedule.json` 每筆格式：

```json
{
  "id": "2026-05-promo-1",
  "image": "/images/promotions/2026-05/promo-1.jpg",
  "startAt": "2026-05-01",
  "endAt":   "2026-05-31",
  "zh-TW": { "title": "標題", "description": "描述" },
  "en":    { "title": "Title", "description": "Desc" },
  "ja":    { "title": "タイトル", "description": "説明" }
}
```

- `image`：相對 `public/` 路徑（`/images/promotions/{YYYY-MM}/promo-{1-3}.jpg`）或外部 URL
- 三語系欄位各含 `title` (≤50 字) 和 `description` (≤200 字)
- TypeScript 型別定義位於 `types/promotion.ts`

### 8.3 自動化部署觸發

| 觸發 | Workflow | 動作 |
|-----|---------|------|
| push 到 main（影響 schedule.json / images 等） | `deploy-on-push.yml` | validate → build:active → build → **FTP push** (ftp.gntbmd.com:21) |
| 每日台灣 00:05 | `deploy-daily.yml` | build:active（自動跨日切換）→ 若有變動則 build & deploy |
| PR / 非 main 分支 push | `validate-pr.yml` | validate + build dry-run |

### 8.4 行銷工作流（給 Claude Desktop 用）

詳見 [`docs/MARKETING_GUIDE.md`](docs/MARKETING_GUIDE.md)。簡要：

```
1. 行銷準備 ~/promotions-inbox/{YYYY-MM}/input.md + promo-1.jpg ~ promo-3.jpg
2. 對 Claude Desktop 說「處理 YYYY-MM 活動更新」
3. Claude Desktop 透過 GitHub MCP:
   - 上傳圖片 → public/images/promotions/{YYYY-MM}/
   - 修改 schedule.json（append 新筆）
   - 觸發 GitHub Actions validate
4. validate 通過 → 自動 commit & push → 5~10 分鐘後上線
```

### 8.5 Agent 規則

兩種修改場景嚴格分離。詳見 [`docs/AGENT_RULES.md`](docs/AGENT_RULES.md)。

## 9. npm scripts

| 指令 | 說明 |
|------|------|
| `npm run dev` | 本地開發伺服器 |
| `npm run build` | 生產環境建置（產出 `out/`） |
| `npm run start` | 啟動生產伺服器 |
| `npm run lint` | ESLint 檢查 |
| `npm run clean` | 清除 .next 快取 |
| `npm run generate:llms` | 從 zh-TW.json 重新生成 llms.txt |
| `npm run validate:promotions` | 驗證 schedule.json schema + 業務規則 |
| `npm run build:active` | 從 schedule.json 產出 active.json / archive.json |
| `npm run build:full` | validate + build:active + generate:llms + build（CI 等價） |

## 10. 環境變數

詳見 [`.env.example`](.env.example) 與 [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)。

| 變數 | 用途 | 必要 |
|-----|------|------|
| `NEXT_PUBLIC_SITE_URL` | SEO canonical / metadataBase（預設 `https://www.auvita.tw`） | ✅ |
| `GEMINI_API_KEY` | AI Studio 開發用 | 開發用 |

## 11. 部署設定

詳見 [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)。

**首次上線需在 GitHub Repo 設定的 Secrets：**

- `FTP_HOST` (`ftp.gntbmd.com`) / `FTP_PORT` (`21`) / `FTP_USER` (`auvita@auvita.tw`) / `FTP_PASSWORD` / `FTP_REMOTE_PATH` (`/`)
- `NEXT_PUBLIC_SITE_URL` (`https://www.auvita.tw`)

⚠️ FTP 為明文協定。詳見 `docs/DEPLOYMENT.md` §「協定安全提醒」— 中長期建議升級 FTPS / SFTP。

## 12. 已完成事項（2026-05-11 整改）

- ✅ ADR-001：Next.js 為唯一真相（HTML 版本維護策略決定）
- ✅ ADR-002：行銷自動化採 schedule.json 集中模式
- ✅ ADR-003：SEO canonical URL 環境變數化（`NEXT_PUBLIC_SITE_URL`）
- ✅ Claude Code 入口（`CLAUDE.md` + `.claude/settings.json`）
- ✅ 完整文檔（AGENT_RULES / DEPLOYMENT / ARCHITECTURE_DECISION / MARKETING_GUIDE）
- ✅ 自動化腳本（`validate-schedule.mjs` + `build-active.mjs`，零依賴）
- ✅ GitHub Actions（push / daily / PR 三個 workflows）
- ✅ 邊界測試 8/8 PASS（缺欄位、id 重複、日期反向、overlap > 3 等）

## 13. 待處理 TODO

- [ ] **GitHub Secrets 設定**（部署前必要）：見 `docs/DEPLOYMENT.md`
  - `FTP_HOST` = `ftp.gntbmd.com`
  - `FTP_PORT` = `21`
  - `FTP_USER` = `auvita@auvita.tw`
  - `FTP_PASSWORD`（向系統管理員索取）
  - `FTP_REMOTE_PATH` = `/`
  - `NEXT_PUBLIC_SITE_URL` = `https://www.auvita.tw`
- [ ] **第一次部署驗證**：可暫時在 workflow 加 `dangerous-clean-slate: true`，驗證後移除
- [ ] **協定安全升級評估**：向 IT 部門洽詢能否升 FTPS 或 SFTP（見 ADR-001 後補）
- [ ] **GitHub repo 歸屬遷移**：`louiswanggnt/AeroJet` → 公司組織帳號
- [ ] 等老闆完成 `locales/zh-TW.json` 文字最終定稿
- [ ] **picsum 佔位圖替換**：tech / about / promotion 真實圖片
- [ ] **臨床案例 before/after 日期寫死在 locale JSON 中**：考慮抽到資料層
- [ ] Footer 的「隱私權政策」「服務條款」為 `#` 佔位連結
- [ ] 確認 auvita.tw 網域到期日與 DNS 服務商
- [ ] 老闆首次行銷自動化 PoC：完整跑一次 schedule.json 更新流程
