<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AeroJet 官網（GNT AuJet T6）

京華堂品牌官網 — Next.js 15 + TypeScript + Tailwind CSS 4，三語系（zh-TW / en / ja）。

## 接手請依序讀

1. **[`CLAUDE.md`](CLAUDE.md)** — Claude Code 入口指引（鐵律 + 流程）
2. **[`HANDOFF.md`](HANDOFF.md)** — 完整架構交接（必讀）
3. **[`docs/AGENT_RULES.md`](docs/AGENT_RULES.md)** — 老闆 vs 行銷修改規則
4. **[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)** — GitHub Actions / SFTP / Secrets 設定
5. **[`docs/MARKETING_GUIDE.md`](docs/MARKETING_GUIDE.md)** — 行銷端工作流（給 Claude Desktop）

## Run Locally

**Prerequisites**: Node.js 20+

```bash
npm install                          # 安裝依賴
cp .env.example .env.local           # 填入 GEMINI_API_KEY / NEXT_PUBLIC_SITE_URL
npm run dev                          # localhost:3000
```

## 常用指令

```bash
npm run lint                         # ESLint
npm run build                        # 生產 build → out/
npm run validate:promotions          # 驗證 schedule.json
npm run build:active                 # 從 schedule 重新切分 active/archive
npm run generate:llms                # 重新生成 public/llms.txt
npm run build:full                   # CI 等價：validate + build:active + generate:llms + build
```

## AI Studio

View your app in AI Studio: <https://ai.studio/apps/67654e0a-78a2-4e7f-8735-b1856fcf59a2>
