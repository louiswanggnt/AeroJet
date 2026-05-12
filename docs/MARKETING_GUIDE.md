# MARKETING_GUIDE.md — 行銷使用手冊

> 給行銷的工作流程指南。使用 **Claude Desktop + GitHub MCP** 執行，不需要懂 Git / npm。
> 最後更新：2026-05-11

---

## 快速摘要（5 行）

1. 在你的 Mac/PC 桌面建立 `promotions-inbox/2026-XX/` 資料夾
2. 放入 `input.md` 與 1~3 張圖片（命名為 `promo-1.jpg`、`promo-2.jpg`、`promo-3.jpg`）
3. 對 Claude Desktop 說：「處理 2026-XX 活動更新」
4. Claude 驗證通過後會自動 commit 與部署
5. 5~10 分鐘後上 `www.auvita.tw` 確認

---

## 你只能改兩個地方

| 可改 | 不能改 |
|-----|-------|
| `data/promotions/schedule.json` | 其他**所有**檔案（包括 active.json / archive.json） |
| `public/images/promotions/{YYYY-MM}/` | 其他**所有**圖片資料夾 |

**若 Claude 嘗試改其他檔案，請立刻拒絕並通知開發者。**

---

## input.md 範本

每月在 `~/promotions-inbox/{YYYY-MM}/input.md` 準備這份文件：

```markdown
---
period: 2026-05
startAt: 2026-05-01
endAt:   2026-05-31
---

# 五月活動三則

## promo-1（檔名對應 promo-1.jpg）

### 繁中
- 標題：五月母親節導入優惠
- 描述：本月預約 AuJet 療程，享母親節限定特惠價，加贈外泌體精華。

### 英文
- title: Mother's Day Special
- description: Book any AuJet treatment this month for a Mother's Day exclusive price plus complimentary exosome essence.

### 日文
- title: 母の日特別キャンペーン
- description: 今月 AuJet トリートメントをご予約のお客様に、母の日特別価格＋エクソソームエッセンスを進呈。

---

## promo-2（檔名對應 promo-2.jpg）

### 繁中
- 標題：...
- 描述：...

### 英文
- title: ...
- description: ...

### 日文
- title: ...
- description: ...

---

## promo-3（最多 3 則，可省略此區若僅 2 則）
```

---

## 圖片規範

| 項目 | 規範 |
|------|------|
| 尺寸 | **1200 × 600 px**（2:1 比例，可用 Canva / Figma） |
| 格式 | `.jpg` 優先（最小） |
| 命名 | **必須**為 `promo-1.jpg`、`promo-2.jpg`、`promo-3.jpg` |
| 檔案大小 | **單張 < 300 KB**（用 TinyJPG 壓縮） |
| 內容 | 不可含未授權商標 / 名人 / 競品圖 |

---

## 對 Claude Desktop 說的話（標準話術）

```
請處理 2026-05 活動更新。
資料夾：~/promotions-inbox/2026-05/
```

Claude Desktop 會：

1. 讀 input.md → 解析三語系內容
2. 確認圖片存在且檔名正確
3. 上傳圖片到 GitHub repo 的 `public/images/promotions/2026-05/`
4. 修改 GitHub repo 的 `data/promotions/schedule.json`，加入這 3 筆
5. 觸發 GitHub Actions 驗證
6. 驗證通過 → commit & push → 5~10 分鐘後上線
7. 驗證失敗 → 停止並告訴你哪裡錯了

---

## 常見錯誤排解

| 錯誤訊息 | 意思 | 怎麼修 |
|---------|------|-------|
| `image not found: /images/promotions/2026-05/promo-1.jpg` | 圖片沒上傳成功 | 確認 input.md 同層級資料夾有 promo-1.jpg |
| `date overlap: 2026-05-promo-1 vs 2026-04-promo-3` | 兩則活動同一天都 active，且總數超過 3 | 縮短其中一則的 endAt，或推遲新檔期 startAt |
| `missing locale: zh-TW.description` | 漏填某語系 description | 補上 input.md 該語系欄位 |
| `invalid date format: 2026/5/1` | 日期用了斜線 | 改成 `2026-05-01`（用減號） |
| `id duplicated: 2026-05-promo-1` | 同 id 已存在 | 改 id 加後綴，如 `2026-05-promo-1b` |
| `image too large: 450 KB` | 圖片超過 300 KB | 用 TinyJPG.com 重壓 |

---

## 禁止行為（會自動被擋）

- ❌ 改 active.json / archive.json（自動產出，手動編輯會被覆蓋）
- ❌ 改 locales/*.json（屬於老闆級修改，需找開發者）
- ❌ 改 components/ 或 app/（屬於框架）
- ❌ 上傳超過 300 KB 的圖片（GitHub Actions 會 fail）
- ❌ 命名為 `promotion1.jpg` / `促銷1.jpg` 等（必須是 `promo-1.jpg`）
- ❌ 一次新增超過 3 則同期活動

---

## 你可以單獨做的事

| 需求 | 怎麼做 |
|------|-------|
| 看目前線上有哪些活動 | 訪問 `https://www.auvita.tw`，捲到「活動消息」區塊 |
| 看完整促銷排程（含未來預排） | 對 Claude 說「看 schedule.json 目前內容」 |
| 刪除某筆預排促銷 | 對 Claude 說「刪除 id 2026-XX-promo-Y」 |
| 修改某筆促銷的日期或文字 | 對 Claude 說「修改 id 2026-XX-promo-Y 的 endAt 為 2026-XX-XX」 |
| 預排下半年所有促銷 | 對 Claude 說「請新增 2026-06 到 2026-12 的活動，內容如下：...」 |

---

## 不能單獨做的事（必須找開發者）

- 改網站其他內容（首頁文案、產品說明、技術說明等）
- 加新頁面
- 改網站的視覺風格 / 字型 / 顏色
- 改三語系內容（zh-TW.json / en.json / ja.json）
- 部署到新的網域
- 緊急下架某筆活動（可立刻找開發者用 `git revert`）

---

## 緊急聯絡

| 情境 | 找誰 |
|-----|------|
| 看不懂 Claude 給的錯誤訊息 | 開發者 |
| 部署失敗 / 線上看不到新活動 | 開發者 |
| 圖片不顯示 | 開發者（先確認 schedule.json 內 image 路徑正確） |
| 線上活動內容錯了要立即下架 | 開發者（5 分鐘內可 revert） |

---

## Claude Desktop Project Instructions（給技術人員設定用）

複製以下內容到 Claude Desktop 的 Project Instructions：

```
You are a marketing automation assistant for the AeroJet website.

Your ONLY job is to update `data/promotions/schedule.json` and upload images to
`public/images/promotions/{YYYY-MM}/` in the GitHub repo `louiswanggnt/AeroJet`.

When the user says "處理 YYYY-MM 活動更新":
1. Read ~/promotions-inbox/{YYYY-MM}/input.md
2. Parse the 3 promotions (zh-TW / en / ja titles & descriptions, startAt, endAt)
3. Verify images promo-1.jpg, promo-2.jpg, promo-3.jpg exist in that folder
4. Use GitHub MCP to:
   a. Upload images to public/images/promotions/{YYYY-MM}/ in the repo
   b. Read current data/promotions/schedule.json
   c. Append the new promotions (do NOT modify existing entries)
   d. Validate locally (call validate-schedule.mjs via dispatch workflow)
   e. If validation passes → commit with message "feat(promotions): add {YYYY-MM} campaign"
   f. If validation fails → stop and report errors to user

NEVER touch any file outside data/promotions/schedule.json and
public/images/promotions/{YYYY-MM}/. If asked, refuse and tell the user to
contact the developer.

NEVER directly edit active.json or archive.json. They are auto-generated.

NEVER force push. NEVER commit to a branch other than main.
```
