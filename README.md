# Google Sheet 網頁應用

這是一個基於 Nuxt.js 開發的網頁應用，使用 Google Sheet 作為後端數據庫。透過 JSONP 技術實現對 Google Sheet 的數據讀取和寫入，無需額外的後端服務器。

這個專案也是 JK 的 30 天 Vibe Coding 挑戰之第三天

詳細紀錄 https://jk-web-vibe.netlify.app/

## Demo

線上 Demo: https://jk-vibe003.netlify.app/

## 功能特點

- 使用 Nuxt 3 框架的 Vue 3 + TypeScript 技術棧
- 透過 Google Apps Script 實現與 Google Sheet 的數據交互
- 基本的 CRUD 操作示範（創建、讀取、更新）
- 使用 Tailwind CSS 4 進行 UI 設計
- 響應式布局，支持各種設備尺寸

## 專案結構

- `pages/` - 頁面路由
  - `index.vue` - 首頁
  - `demo/` - 示範功能頁面
- `composables/` - 可重用的組合式函數
  - `useDemo.ts` - 處理資料與表單邏輯
- `utils/` - 工具函數
  - `demoService.ts` - Google Sheet API 服務層

## 設置與運行

### 安裝依賴

```bash
npm install
```

### 開發伺服器

啟動開發伺服器，訪問 `http://localhost:3000`：

```bash
npm run dev
```

### 生產環境建置

```bash
npm run build
```

本地預覽生產環境建置：

```bash
npm run preview
```

## Google Sheet 配置

要使用此應用程序，您需要：

1. 創建一個 Google Sheet
2. 使用 Google Apps Script 部署一個 API 端點
3. 更新 `utils/demoService.ts` 中的 `API_URL` 為您的部署網址

