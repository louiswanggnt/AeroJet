# ARCHITECTURE_DECISION.md — AeroJet 架構決定紀錄

> 最後更新：2026-05-11

---

## ADR-001：Next.js 為唯一真相（單一來源原則）

**狀態**：✅ 採用（2026-05-11）

### 背景

AeroJet 同時部署到兩個目標：

1. **Netlify / Firebase** — Next.js dynamic 模式，預覽用
2. **公司舊伺服器 auvita.tw** — 純靜態 HTML（`out/` 匯出後 SFTP 上傳）

過去交接時遺留的疑問：HTML 版本上線後若需小改（例如改文字、改圖片），是直接編輯 `out/*.html`？還是回到 Next.js 改原始碼再重新匯出？

### 決定

**採用方案 A：Next.js 為唯一真相**

- 所有改動只能改 Next.js 原始碼（`app/` `components/` `locales/` `data/`）
- `out/` 由 `npm run build` 自動產出，**禁止手動編輯**
- 每次內容變動都重新跑 build，重新 SFTP 上傳 `out/`

### 替代方案（被否決）

| 方案 | 否決原因 |
|-----|---------|
| **B. HTML 版凍結，新內容不同步** | 客戶看到的 auvita.tw 會永遠停在某個時間點，違反「展示型官網」的活躍需求 |
| **C. 雙線維護（SSG + HTML 同時改）** | 維護成本翻倍，DR（disaster recovery）混亂，違反 single source of truth |
| **D. 拋棄 Next.js 改純 HTML** | 喪失多語系自動路由、locales JSON 集中管理、llms.txt 自動生成等動態能力 |

### 後果

**好處：**

- 永遠單一來源、零分歧
- 多語系切換、llms.txt 等動態能力完整保留
- 行銷自動化（schedule.json → active.json → build → deploy）可直接套用

**代價：**

- 老式伺服器每次內容變動都要重新上傳整個 `out/`（約 19 MB）
- SFTP 上傳需 GitHub Actions 自動化（手動上傳會出錯）
- 老闆每次改一個錯字也要走完整 build + deploy 流程（接受，因頻率不高）

### 強制機制

1. `.claude/settings.json` 設 `Edit(out/**)` 為 deny
2. `.github/workflows/deploy-on-push.yml` 不接受 `out/` 內檔案的 push（用 path filter）
3. CLAUDE.md / AGENT_RULES.md 鐵律寫死

---

## ADR-002：行銷自動化採 schedule.json 集中模式

**狀態**：✅ 採用（2026-05-11）

### 背景

原本 `active.json` / `archive.json` 是行銷每月手動切換：

- 上月 → archive
- 新月 → active

問題：

1. 行銷容易忘記切換時間點
2. 行銷可能改錯欄位（沒有 schema 驗證）
3. 行銷需要懂 Git workflow
4. 沒辦法預排「下個月 5/1 開始 / 5/31 結束」的促銷

### 決定

導入 **`schedule.json` 總排程模型**：

```
schedule.json   ← 行銷唯一觸碰點（含所有未來 / 過往 / 當期促銷）
    │
    ├── validate-schedule.mjs   ← schema + 業務規則驗證
    │
    └── build-active.mjs        ← 按今日日期切分
            ├── active.json     ← startAt ≤ today ≤ endAt
            └── archive.json    ← endAt < today
```

**自動化觸發點：**

| 觸發 | 動作 |
|-----|------|
| 行銷 push schedule.json | validate → build-active → next build → SFTP |
| 每日台灣 00:00 cron | build-active（自動切換跨日期的促銷）→ next build → SFTP |

### 替代方案（被否決）

| 方案 | 否決原因 |
|-----|---------|
| **沿用手動 active/archive 切換** | 行銷易忘、無 schema、無時間自動切換 |
| **改用資料庫（Supabase / Firestore）** | 違反「靜態 HTML 部署到老式伺服器」的核心需求 |
| **改用 CMS（Strapi / Contentful）** | 對行銷學習成本高，本案促銷量極小（3 則/月），CMS 過度設計 |

### 後果

**好處：**

- 行銷可預排未來促銷
- 跨日期自動切換（不需要人記得 5/1 換 active）
- schema 強制欄位完整，錯誤在 commit 前就擋住
- archive.json 自動沉澱歷史，未來可做「過往活動」回顧頁

**代價：**

- 需要實作 validate + build-active 兩支腳本（已完成）
- 需要每日 cron（GitHub Actions 已實作）
- schedule.json 會隨時間累積（每年 ~36 筆，可接受）

---

## ADR-003：環境變數而非寫死 canonical URL

**狀態**：✅ 採用（2026-05-11）

### 背景

`app/[locale]/layout.tsx` 內 SEO `metadata.alternates.canonical` 寫死 `https://domain.com`，未配合實際網域。

### 決定

改用 `process.env.NEXT_PUBLIC_SITE_URL`，預設 `https://www.auvita.tw`。

`.env.example` 必須列出此變數，部署環境（GitHub Actions / Netlify）必須設定。

### 後果

未來換網域時只需改一個環境變數，不需動程式碼。
