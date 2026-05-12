# CLAUDE.md — AeroJet 官網（Claude Code 自動載入）

> Next.js 15 + TypeScript + Tailwind CSS 4，京華堂 GNT AuJet T6 官網。
> **規則的單一真相**：[`docs/AGENT_RULES.md`](docs/AGENT_RULES.md)

## 🔥 鐵律（4 條）

1. **Next.js 是唯一真相**：所有改動先改 Next.js 原始碼，再 `npm run build` 產出 `out/`。**禁止直接編輯 `out/` 內的 HTML**。決定原因見 [`docs/ARCHITECTURE_DECISION.md`](docs/ARCHITECTURE_DECISION.md)。
2. **使用者可見文字一律來自 `locales/{zh-TW,en,ja}.json`**。元件內**禁止硬編碼**面向用戶的字串。
3. **行銷修改僅限**：`data/promotions/schedule.json` 與 `public/images/promotions/`。其他任何路徑**禁止行銷觸碰**。
4. **任何活動 / 促銷改動完成後，必須跑 `npm run validate:promotions`**。驗證失敗禁止 commit。

## 🎯 兩種修改場景

| 場景 | Agent | 改動範圍 | 驗證 |
|------|-------|---------|------|
| **老闆修改**（排版 / 文案 / 大改） | Claude Code（本檔） | `app/` `components/` `locales/` 全域 | `npm run lint && npm run build` |
| **行銷修改**（每月活動） | Claude Desktop + GitHub MCP | **僅** `data/promotions/schedule.json` + `public/images/promotions/` | `npm run validate:promotions` |

詳細規則見 [`docs/AGENT_RULES.md`](docs/AGENT_RULES.md)。

## 接手 agent 的閱讀順序

1. 本檔（你現在所在位置）
2. [`docs/AGENT_RULES.md`](docs/AGENT_RULES.md) — 老闆 vs 行銷修改規則 **必讀**
3. [`docs/ARCHITECTURE_DECISION.md`](docs/ARCHITECTURE_DECISION.md) — 為何選 Next.js 為唯一真相
4. [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — GitHub Actions / SFTP / Secrets 設定
5. [`docs/MARKETING_GUIDE.md`](docs/MARKETING_GUIDE.md) — 行銷端工作流（給 Claude Desktop 用）
6. [`HANDOFF.md`](HANDOFF.md) — 完整架構交接
7. [`README.md`](README.md) — AI Studio 啟動指南（簡）

## 目錄速覽

```
AeroJet/
├── CLAUDE.md                  ← 你在這
├── HANDOFF.md                 ← 架構交接
├── README.md                  ← AI Studio 簡介
├── .claude/settings.json      ← Agent 規則 + hooks
├── app/[locale]/              ← 7 個頁面（zh-TW/en/ja 路由）
├── components/                ← 12 個共用元件
├── locales/{zh-TW,en,ja}.json ← 文字單一真相
├── data/promotions/
│   ├── schedule.json          ← 行銷唯一觸碰點（總排程）
│   ├── schedule.schema.json   ← JSON Schema
│   ├── active.json            ← build-active.mjs 自動產出（當期 3 則）
│   └── archive.json           ← build-active.mjs 自動歸檔
├── scripts/
│   ├── generate-llms.ts       ← 產出 public/llms.txt
│   ├── validate-schedule.mjs  ← schema + 業務規則驗證
│   └── build-active.mjs       ← 按今日日期切換 active/archive
├── docs/
│   ├── AGENT_RULES.md         ← 規則單一真相
│   ├── ARCHITECTURE_DECISION.md
│   ├── DEPLOYMENT.md
│   ├── MARKETING_GUIDE.md
│   └── IMAGE_MANAGEMENT_SOP.md
└── .github/workflows/
    ├── deploy-on-push.yml     ← push 到 main 時觸發
    └── deploy-daily.yml       ← 每日台灣 00:00 cron
```

## npm scripts

| 指令 | 說明 |
|------|------|
| `npm run dev` | 本地開發 |
| `npm run build` | 生產 build（輸出 `out/`） |
| `npm run lint` | ESLint |
| `npm run generate:llms` | 重新生成 `public/llms.txt` |
| `npm run validate:promotions` | 驗證 `data/promotions/schedule.json` |
| `npm run build:active` | 從 schedule.json 產出 active.json + archive.json |

## Current Status

| 欄位 | 內容 |
|------|------|
| 階段 | 內容定稿中 + 自動化投放實施完成 |
| 上次大改 | 2026-05-11（路徑清潔 + 自動化投放） |
| 阻礙 | 等老闆完成 `locales/zh-TW.json` 文字最終定稿 |
| 下一步 | GitHub Secrets 設定（SFTP_*）→ 端對端測試 deploy-on-push |
