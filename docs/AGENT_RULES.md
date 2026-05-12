# AGENT_RULES.md — 老闆 vs 行銷修改規則

> 規則單一真相。CLAUDE.md / HANDOFF.md / GitHub Actions 都引用本檔。
> 最後更新：2026-05-11

## 兩種 Agent 與權限矩陣

| 維度 | 場景 A：老闆修改 | 場景 B：行銷修改 |
|------|----------------|----------------|
| **頻率** | 不定期（一個月 0-2 次大改） | 每月固定 1 次 |
| **改什麼** | 框架、排版、文案、新頁面 | 活動消息（最多 3 則 / 期）+ 圖片 |
| **執行 Agent** | Claude Code（本機） | Claude Desktop + GitHub MCP |
| **可改路徑** | `app/` `components/` `locales/` `config/` `public/` `data/` `scripts/` `docs/` | **僅** `data/promotions/schedule.json` + `public/images/promotions/` |
| **禁改路徑** | `out/`（build 產物） | 場景 A 全部路徑以外都禁止 |
| **驗證** | `npm run lint && npm run build` | `npm run validate:promotions` |
| **觸發部署** | push 到 `main` | push 到 `main`（GitHub Actions 自動偵測路徑） |

---

## 場景 A：老闆修改（框架 / 排版 / 大改）

### 修改優先順序

1. 優先改 **`locales/{zh-TW,en,ja}.json`**（文字單一真相）
2. 再改 **`components/*.tsx`**（複用元件）
3. 再改 **`app/[locale]/*/page.tsx`**（頁面結構 / 路由）
4. 樣式只透過 Tailwind utility classes，**禁止** inline `style={{...}}` 除非動態值

### 鐵律

- **三語系同步**：改一個 locale 必須同步改三個。漏改的 key 在 build 時會 throw。
- **元件複用門檻**：複用度 < 2 則內聯，不要建立沒人用的 component。
- **文字硬編碼禁止**：所有使用者可見字串必須來自 `useTranslations()` 或 `t.raw()`。
- **build 產物禁碰**：`out/`、`.next/` 由 `npm run build` 產生，禁止手動編輯。

### 流程

```
1. 改 locales/zh-TW.json → en.json → ja.json
2. 若有結構性變動，改 components/ 或 app/[locale]/
3. npm run generate:llms        # 重新生成 public/llms.txt
4. npm run lint                 # ESLint
5. npm run build                # 確認 build 成功（產出 out/）
6. git add -p                   # 逐個確認 hunk
7. git commit -m "..."
8. git push origin main         # GitHub Actions 自動部署
```

### 禁止行為

- 直接改 `out/*.html` 或 `.next/`
- 新增未經設計討論的頁面
- 跳過 `npm run build` 直接 push（GitHub Actions 會擋）
- 把 `.env.local` commit 進 git

---

## 場景 B：行銷修改（每月活動消息）

### 工作模式

行銷透過 **Claude Desktop**（搭配 GitHub MCP）執行。本機不需要 npm / git 環境。

**唯一觸碰點：**

| 檔案 | 動作 |
|-----|------|
| `data/promotions/schedule.json` | 編輯（新增 / 修改 / 刪除促銷檔期） |
| `public/images/promotions/{YYYY-MM}/promo-{1,2,3}.jpg` | 上傳新圖片 |

### schedule.json 格式（唯一真相）

```json
[
  {
    "id": "2026-05-promo-1",
    "image": "/images/promotions/2026-05/promo-1.jpg",
    "startAt": "2026-05-01",
    "endAt":   "2026-05-31",
    "zh-TW": { "title": "五月活動", "description": "..." },
    "en":    { "title": "May Promo", "description": "..." },
    "ja":    { "title": "5月キャンペーン", "description": "..." }
  }
]
```

### 業務規則（由 `validate-schedule.mjs` 強制）

1. **每筆必含**：`id` / `image` / `startAt` / `endAt` / 三語系 `title` + `description`
2. **日期格式**：`YYYY-MM-DD`（ISO 8601 date-only）
3. **日期邏輯**：`startAt < endAt`
4. **同期重疊上限**：任一日期不得有超過 3 則同時 active
5. **圖片必須存在**：`image` 指向的檔案必須在 `public/` 下實際存在
6. **id 唯一**：陣列內 id 不可重複
7. **語系完整**：三語系欄位都不能空字串

### 圖片規範

| 項目 | 規範 |
|------|------|
| 尺寸 | 1200x600 px（活動輪播卡片標準比例 2:1） |
| 格式 | `.jpg` 優先（檔案小），`.webp` 可 |
| 命名 | `promo-1.jpg`、`promo-2.jpg`、`promo-3.jpg`（每期至多 3 張） |
| 路徑 | `public/images/promotions/{YYYY-MM}/` |
| 大小 | 單張 < 300 KB（壓縮過） |

### 行銷流程（Claude Desktop 端）

詳見 [`MARKETING_GUIDE.md`](MARKETING_GUIDE.md)。簡要：

```
1. 行銷在本地準備 input.md + 圖片
2. 對 Claude Desktop 說：「處理 2026-05 活動更新」
3. Claude Desktop:
   a. 讀 input.md → 解析三語系內容
   b. 上傳圖片到 GitHub repo（透過 GitHub MCP）
   c. 修改 schedule.json
   d. 呼叫 GitHub Actions trigger validate（dispatch）
   e. 若 validate Pass → commit & push
   f. 若 validate Fail → 停止並提示行銷修正
4. GitHub Actions push 後自動部署
```

### 禁止行為（行銷端）

- 改任何 `data/promotions/` 與 `public/images/promotions/` 以外的檔案
- 直接編輯 `active.json` 或 `archive.json`（由 `build-active.mjs` 自動產出，禁手動）
- 跳過驗證直接 commit
- 上傳超過 300 KB 的單張圖片

---

## 共通鐵律（兩個場景都適用）

1. **commit message 規範**：`feat:` / `fix:` / `docs:` / `chore:` / `refactor:`
2. **單次 commit 單一目的**：不混合「改文案 + 改排版 + 升套件」
3. **禁止 force push 到 main**
4. **PR 流程**（未來啟用後）：大改走 PR，小改可直 push main
5. **失敗時停下並呼叫人類**：不要連續嘗試同樣的修法

---

## active.json / archive.json：自動產出機制

| 檔案 | 誰寫 | 規則 |
|-----|------|------|
| `schedule.json` | 行銷編輯 | 唯一手動維護的促銷資料 |
| `active.json` | `build-active.mjs` 自動產出 | 從 schedule.json 篩出「今日 `startAt ≤ today ≤ endAt`」的促銷 |
| `archive.json` | `build-active.mjs` 自動歸檔 | `endAt < today` 的促銷自動移入，加 `archivedAt` 欄位 |

**任何手動編輯 active.json / archive.json 在下次 `build-active` 執行時會被覆蓋**。

---

## 緊急停損

若行銷端誤改了不該改的檔案：

1. 行銷 push 後，GitHub Actions 會 fail（path filter 攔截）
2. 開發者 `git revert <commit>` 或 `git reset --hard <previous>` 後 force push（**僅此情境允許**）
3. 通知行銷重新走標準流程

若 schedule.json 結構崩壞無法 parse：

1. Validate workflow 會直接 fail（不會部署）
2. 開發者改回上一個可用版本
3. 通知行銷
