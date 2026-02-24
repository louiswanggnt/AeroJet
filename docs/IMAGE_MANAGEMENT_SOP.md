# 圖片管理標準作業程序 (SOP)

本文件說明如何在將專案發布到 GitHub 後，管理、上傳與引用網站圖片。

## 1. 準備圖片 (Preparation)

在將圖片放入專案前，請確保圖片符合以下規範：

- **格式**：建議使用 `.webp` (最佳效能)、`.jpg` (照片類)、`.png` (透明背景圖標)。
- **命名**：使用小寫英文與連字號，具備描述性。
  - ✅ `aerojet-hero-banner.jpg`
  - ✅ `tech-atomization-diagram.png`
  - ❌ `IMG_1234.JPG`
  - ❌ `圖片1.png`
- **壓縮**：請使用 [TinyPNG](https://tinypng.com) 或類似工具壓縮圖片，建議單張圖片小於 500KB (Banner 可放寬至 1MB)。

## 2. 上傳圖片至專案 (Upload)

當您將程式碼 Clone 下來或在本地開發時：

1.  **定位資料夾**：找到專案根目錄下的 `public` 資料夾。
2.  **建立分類資料夾** (建議)：在 `public` 下建立 `images` 資料夾，並可依頁面分類。
    - `public/images/hero/`
    - `public/images/tech/`
    - `public/images/products/`
3.  **放入圖片**：將準備好的圖片檔案複製到對應資料夾中。

### 若使用 GitHub 介面直接上傳：
1.  進入 GitHub Repository 頁面。
2.  進入 `public` 資料夾。
3.  點擊 "Add file" -> "Upload files"。
4.  拖拉您的圖片檔案到視窗中。
5.  在 "Commit changes" 填寫訊息 (例如：`Add product images`) 並提交。

## 3. 在程式碼中引用圖片 (Reference)

### 方法 A：使用 `config/assets.ts` 集中管理 (推薦)

我們已建立 `/config/assets.ts` 檔案來集中管理圖片路徑。

1.  **開啟檔案**：編輯 `/config/assets.ts`。
2.  **修改路徑**：將預設的 `https://picsum.photos/...` 替換為您的本地路徑。
    - 路徑**不需要**包含 `public`，直接從 `/` 開始。
    - 例如：若圖片在 `public/images/hero/banner.jpg`，路徑為 `/images/hero/banner.jpg`。

    ```typescript
    // config/assets.ts
    export const ASSETS = {
      hero: {
        // 修改前
        // slide1: 'https://picsum.photos/seed/aerojet1/1920/1080',
        
        // 修改後
        slide1: '/images/hero/banner-1.jpg',
      },
      // ...
    };
    ```

3.  **在組件中使用**：
    組件中通常已經引用了 `ASSETS`，只要 `assets.ts` 更新，頁面就會自動顯示新圖片。

    ```tsx
    import { ASSETS } from '@/config/assets';
    
    // ...
    <Image src={ASSETS.hero.slide1} ... />
    ```

### 方法 B：直接在組件中引用

若您不想使用集中管理，也可以直接在 `.tsx` 檔案中修改 `src`。

```tsx
<Image 
  src="/images/my-new-image.jpg" // 對應 public/images/my-new-image.jpg
  width={800}
  height={600}
  alt="描述文字"
/>
```

## 4. 檢查成果 (Verify)

1.  **本地預覽**：
    - 在終端機執行 `npm run dev`。
    - 開啟瀏覽器 `http://localhost:3000`。
    - 確認圖片是否正常顯示，且無變形或破圖。

2.  **部署後檢查**：
    - 推送程式碼到 GitHub (`git push`)。
    - 等待 Vercel/Netlify 等平台自動部署。
    - 開啟正式網址檢查。

## 常見問題

- **Q: 圖片顯示 404 Not Found?**
  - A: 檢查路徑是否以 `/` 開頭。確認檔案名稱大小寫是否完全一致 (Linux 系統區分大小寫)。
  
- **Q: 修改了圖片但瀏覽器沒變?**
  - A: 瀏覽器可能快取了舊圖片。嘗試按 `Ctrl + F5` (Windows) 或 `Cmd + Shift + R` (Mac) 強制重新整理。
