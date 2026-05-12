# DEPLOYMENT.md — 部署清單與環境變數

> 最後更新：2026-05-11

---

## 部署目標

| 目標 | 用途 | 觸發 | 真實上線 |
|------|------|------|---------|
| **公司舊伺服器 `auvita.tw`** | 生產（靜態 HTML） | GitHub Actions FTP push（`ftp.gntbmd.com:21`） | ✅ |
| **Netlify `jovial-manatee-a02a63`** | 預覽（Next.js dynamic） | Netlify Git integration（auto） | 否 |
| **Firebase** | 備援（standalone build） | 手動 `firebase deploy` | 否 |

**生產協定**：FTP（明文，Port 21），帳號 `auvita@auvita.tw`。詳見下方「協定安全提醒」。

**生產目標只有 `auvita.tw`**。Netlify 與 Firebase 僅作預覽 / 備援。

---

## 環境變數

| 變數 | 用途 | 範例 | 必要 |
|-----|------|------|------|
| `NEXT_PUBLIC_SITE_URL` | SEO canonical URL / sitemap 基底 | `https://www.auvita.tw` | ✅ |
| `GEMINI_API_KEY` | AI Studio 開發專用（生產不需要） | `AIzaSy...` | 開發用 |
| `APP_URL` | AI Studio 注入（生產不需要） | （AI Studio 自動） | 開發用 |

**設定位置：**

- 本地：`.env.local`（從 `.env.example` 複製）
- Netlify：Site settings → Environment variables
- GitHub Actions：Repo settings → Secrets and variables → Actions

---

## GitHub Secrets（GitHub Actions 必要）

進入 GitHub repo → Settings → Secrets and variables → Actions → New repository secret，依序設定：

| Secret 名稱 | 值 | 取得方式 |
|------------|-----|---------|
| `FTP_HOST` | `ftp.gntbmd.com` | 系統管理員 |
| `FTP_PORT` | `21`（FTP 預設） | 系統管理員 |
| `FTP_USER` | `auvita@auvita.tw` | 系統管理員 |
| `FTP_PASSWORD` | FTP 密碼 | 系統管理員（嚴禁明文留存於 repo / Drive） |
| `FTP_REMOTE_PATH` | `/`（FileZilla 登入即根目錄） | 系統管理員 |
| `NEXT_PUBLIC_SITE_URL` | `https://www.auvita.tw` | 直接填 |

### ⚠️ 協定安全提醒（FTP 明文）

目前使用的是 **FTP（明文協定，Port 21）**，密碼在傳輸過程中為明文。雖然 GitHub Secrets 本身會加密儲存、不會印到 logs，但網路層仍可能被中間人攔截。

**長期建議（向 IT 部門評估）**：
1. **升級到 FTPS（FTP over TLS）**：同 port 21 但 TLS 加密。Action 改 `protocol: ftps` 即可。
2. **升級到 SFTP（Port 22，走 SSH）**：更安全，但需伺服器支援 SSH 服務並需公司放行 22。
3. 任一升級後，本檔與 `.github/workflows/` 內 `protocol` 值需同步調整。

**短期接受 FTP 的前提**：
- 公司舊伺服器目前僅開 FTP（Port 21）
- 部署頻率不高（每月幾次）
- 密碼建議每 90 天輪換

---

## GitHub Actions 工作流

### `.github/workflows/deploy-on-push.yml`

**觸發**：push 到 `main` 且改動以下任一路徑：

- `data/promotions/**`
- `public/images/promotions/**`
- `locales/**`
- `app/**`
- `components/**`
- `config/**`
- `next.config.ts`

**步驟**：

```
1. checkout
2. setup-node@v4 (Node 20)
3. npm ci
4. npm run validate:promotions   # 若 fail 直接終止
5. npm run build:active          # 產出 active.json / archive.json
6. npm run generate:llms         # 產出 public/llms.txt
7. npm run build                 # 產出 out/
8. FTP upload out/ → ftp.gntbmd.com:21 / FTP_REMOTE_PATH
9. commit active.json / archive.json 回 repo（若有變動）
```

### `.github/workflows/deploy-daily.yml`

**觸發**：每日台灣時間 00:00（UTC+8 → cron `0 16 * * *`）

**用途**：處理跨日期的促銷切換（例如 5/31 23:59 結束的促銷，6/1 00:00 自動移入 archive）

**步驟**：同 deploy-on-push，但 source 是 cron 而非 push。

---

## 部署檢查清單（首次上線）

- [ ] GitHub Secrets 全數設定（見上表）
- [ ] `NEXT_PUBLIC_SITE_URL` 確認為實際網域
- [ ] 本機跑過 `npm run validate:promotions` 通過
- [ ] 本機跑過 `npm run build:active` 確認 active.json 正確
- [ ] 本機跑過 `npm run build` 成功，`out/` 內容正確
- [ ] 用 FileZilla 手動測一次 FTP 上傳（確認 ftp.gntbmd.com / 路徑 `/` / 帳密都對）
- [ ] 第一次 GitHub Actions 部署可在 workflow 內暫時加 `dangerous-clean-slate: true` 確保乾淨對應；確認後移除
- [ ] push 一個小改動觸發 deploy-on-push workflow
- [ ] 等 cron 觸發 deploy-daily（或手動 dispatch）一次驗證
- [ ] auvita.tw 線上確認三語系切換、活動消息輪播都正常
- [ ] `https://www.auvita.tw/llms.txt` 可訪問且內容正確
- [ ] `https://www.auvita.tw/robots.txt` 與 `sitemap.xml` 可訪問

---

## 緊急回滾

線上出錯時：

```bash
# 1. git revert 上一個壞 commit
git revert HEAD
git push origin main           # 自動觸發 deploy

# 或 2. 強制回到某個已知好版本
git reset --hard <good-commit-sha>
git push --force origin main   # 風險高，確認後再執行
```

完整 SOP 見：[`docs/SECURITY_PLAYBOOK.md`](../../../../docs/SECURITY_PLAYBOOK.md)（HANDOFF2 頂層）

---

## 本地開發

```bash
# 第一次
npm install
cp .env.example .env.local     # 編輯填入 GEMINI_API_KEY
npm run dev                    # 開 localhost:3000

# 改完後驗證
npm run validate:promotions    # 若改了 schedule.json 必跑
npm run lint
npm run build
```
