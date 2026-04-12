# 聖大資訊 Landing Page 重構設計文件

**日期**: 2026-04-11  
**專案**: 傳統靜態網站重構為現代 Next.js 應用  
**狀態**: 已確認 ✅

## 專案概覽

將傳統的靜態 HTML/CSS/JS 網站重構為現代化的 Next.js (App Router) 應用程式，具備深淺色模式、多語言支援、流暢動畫與響應式設計。

## 現狀分析

### 已完成部分
1. **Next.js 專案初始化** - package.json 與所需套件已安裝
2. **核心組件建立** - Navbar、HeroSection、AboutSection、ServicesSection、PortfolioSection
3. **樣式系統設定** - Tailwind CSS + 毛玻璃效果 + 深淺色模式變數
4. **動畫庫整合** - Framer Motion 已安裝與部分使用
5. **圖片資源遷移** - 靜態圖片已移至 `public/assets/`
6. **舊檔案備份** - 原始靜態檔案備份至 `_old_static/`

### 缺失部分
1. **聯絡我們區塊** - 沒有 ContactSection 組件
2. **頁尾組件** - 沒有 Footer 組件
3. **主頁面整合** - app/page.tsx 仍是預設模板
4. **深淺色模式切換** - 沒有主題切換功能
5. **多語言支援** - 沒有語言切換功能
6. **完整整合** - 組件未整合到單一頁面

## 設計決策

### 使用者選擇
1. **專案範圍** ✅ 完成所有核心功能
2. **設計風格** ✅ 現代簡約風格 (Modern Minimalist)
3. **多語言實作** ✅ 簡單狀態管理 (useState + Context)

### 核心設計原則
1. **現代簡約風格** - 大量留白、簡潔排版、一致的視覺層級
2. **流暢動畫體驗** - Framer Motion 的細膩動畫與微互動
3. **響應式優先** - 行動裝置優先的響應式設計
4. **效能最佳化** - 使用 Next.js 最佳實踐與圖片優化

## 技術架構

### 技術棧
- **框架**: Next.js 16.2.3 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS v4
- **動畫**: Framer Motion 12.38.0
- **圖示**: lucide-react 1.8.0
- **狀態管理**: React Context (主題與語言)

### 檔案結構
```
app/
├── layout.tsx (根佈局，包含 Providers)
├── page.tsx (主頁面，整合所有組件)
├── globals.css (全域樣式，已存在)
└── providers.tsx (Context Providers 組合)

components/
├── layout/
│   ├── Navbar.tsx (導航列，已存在需更新)
│   ├── Footer.tsx (頁尾，新增)
│   └── ThemeToggle.tsx (主題切換按鈕，新增)
├── sections/
│   ├── HeroSection.tsx (首頁橫幅，已存在)
│   ├── AboutSection.tsx (關於我們，已存在)
│   ├── ServicesSection.tsx (服務項目，已存在)
│   ├── PortfolioSection.tsx (作品集，已存在)
│   ├── ContactSection.tsx (聯絡我們，新增)
│   └── ScrollToTop.tsx (回到頂部按鈕，新增)
├── ui/
│   ├── Button.tsx (可重用按鈕組件，新增)
│   ├── Card.tsx (可重用卡片組件，新增)
│   ├── Input.tsx (表單輸入組件，新增)
│   └── TextArea.tsx (文字區域組件，新增)
└── context/
    ├── ThemeContext.tsx (主題 Context，新增)
    ├── LanguageContext.tsx (語言 Context，新增)
    └── index.tsx (Context 匯出)
```

### 深淺色模式實作

#### 設計方案
- **顏色系統**: 已定義在 `globals.css` 的 CSS 變數
- **狀態管理**: React Context + localStorage 持久化
- **切換方式**: 按鈕切換 + 系統偏好偵測
- **無閃爍**: 透過腳本在 HTML 渲染前設定初始主題

#### 技術細節
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}
```

### 多語言支援實作

#### 設計方案
- **支援語言**: 中文 (zh)、英文 (en)
- **狀態管理**: React Context
- **切換方式**: 按鈕切換，無 URL 路由
- **文字管理**: 簡單的鍵值對翻譯系統

#### 技術細節
```typescript
interface LanguageContextType {
  language: 'zh' | 'en';
  toggleLanguage: () => void;
  setLanguage: (lang: 'zh' | 'en') => void;
  t: (key: string) => string; // 簡單翻譯函數
}

// 翻譯資料結構
const translations = {
  zh: {
    'nav.about': '關於公司',
    'nav.services': '提供服務',
    // ...
  },
  en: {
    'nav.about': 'About',
    'nav.services': 'Services',
    // ...
  }
};
```

## 組件規格

### 1. ContactSection (聯絡我們區塊)
#### 功能需求
- 聯絡表單：姓名、電子郵件、電話、訊息
- 表單驗證：前端驗證 + 錯誤提示
- 聯絡資訊卡片：電話、電子郵件、地址、營業時間
- 社交媒體連結：LINE、Facebook 等
- Google Maps 嵌入或位置地圖
- 表單提交處理：模擬提交或連接 API

#### 設計規格
- 響應式網格佈局
- 毛玻璃效果卡片
- 表單動畫與微互動
- 成功/錯誤狀態回饋

### 2. Footer (頁尾組件)
#### 功能需求
- 公司資訊：名稱、描述、版權聲明
- 快速連結：導航項目的快速連結
- 聯絡資訊：電話、電子郵件、地址
- 社交媒體圖示連結
- 訂閱電子報功能（可選）

#### 設計規格
- 響應式網格佈局
- 簡潔的視覺設計
- 深淺色模式支援
- 適當的間距與留白

### 3. ThemeToggle (主題切換按鈕)
#### 功能需求
- 切換深淺色模式
- 顯示當前主題圖示
- 無障礙支援 (ARIA 標籤)
- 動畫過渡效果

#### 設計規格
- 簡潔的開關設計
- 太陽/月亮圖示
- 懸停與點擊動畫
- 整合到 Navbar

### 4. Button / Card / Input (UI 組件)
#### 設計系統
- **Button**: 主要、次要、文字、外框等變體
- **Card**: 毛玻璃效果、陰影、懸停效果
- **Input**: 標籤、錯誤狀態、驗證提示
- **一致設計**: 統一的邊框半徑、間距、動畫

## 動畫策略

### 進場動畫
- **HeroSection**: 漸入 + 向上滑入
- **區塊內容**: 視差滾動觸發的漸入
- **卡片元素**: 交錯延遲的漸入

### 互動動畫
- **按鈕懸停**: 縮放 + 陰影變化
- **卡片懸停**: 上浮 + 邊框顏色變化
- **表單互動**: 焦點狀態的邊框動畫

### 頁面動畫
- **滾動錨點**: 平滑滾動到錨點
- **視差效果**: 背景圖片的視差滾動
- **載入動畫**: 頁面載入時的漸入

## 響應式設計

### 斷點策略
- **行動裝置**: < 768px (Tailwind: `sm:`)
- **平板**: 768px - 1023px (Tailwind: `md:`)
- **桌面**: ≥ 1024px (Tailwind: `lg:`、`xl:`)

### 響應式模式
1. **網格系統**: 彈性網格 (1→2→3 欄)
2. **字體大小**: 響應式字體縮放
3. **間距調整**: 不同裝置的 padding/margin
4. **隱藏/顯示**: 行動裝置的漢堡選單

## 效能優化

### 圖片優化
- **next/image**: 所有圖片使用 Next.js 圖片組件
- **尺寸最佳化**: 適當的圖片尺寸與品質
- **格式選擇**: WebP 格式優先
- **懶加載**: 圖片滾動到視窗時載入

### 程式碼優化
- **動態導入**: 非關鍵組件的動態導入
- **Tree Shaking**: 未使用程式碼的自動移除
- **包裝分割**: 適當的程式碼分割策略

### 載入效能
- **字體優化**: `next/font` 自動優化
- **快取策略**: 適當的 HTTP 快取標頭
- **預載入**: 關鍵資源的預載入

## 可存取性 (a11y)

### 核心需求
1. **鍵盤導航**: 所有互動元素可鍵盤存取
2. **螢幕閱讀器**: 適當的 ARIA 標籤與語義
3. **顏色對比**: 符合 WCAG 對比度標準
4. **焦點管理**: 清晰的焦點指示器

### 實作細節
- 適當的 HTML 語義標籤
- 表單元素的標籤關聯
- 互動元素的 ARIA 屬性
- 顏色對比度測試

## 測試策略

### 開發測試
- **視覺測試**: 手動檢查各裝置的顯示
- **功能測試**: 表單驗證、主題切換、語言切換
- **效能測試**: Lighthouse 評分檢查

### 成功標準
1. ✅ Lighthouse 效能評分 > 90
2. ✅ 所有功能在主流瀏覽器正常運作
3. ✅ 響應式設計完整支援
4. ✅ 深淺色模式無閃爍切換
5. ✅ 多語言切換即時生效
6. ✅ 所有圖片使用 `next/image` 優化

## 實作順序

### Phase 1: 基礎架構
1. 建立 Context Providers (Theme, Language)
2. 更新 app/layout.tsx 包含 Providers
3. 建立 UI 基礎組件 (Button, Card, Input)

### Phase 2: 新增組件
1. 建立 ContactSection 組件
2. 建立 Footer 組件
3. 建立 ThemeToggle 組件
4. 建立 ScrollToTop 組件

### Phase 3: 整合與更新
1. 更新 Navbar 整合 ThemeToggle 與語言切換
2. 重寫 app/page.tsx 整合所有組件
3. 更新現有組件支援多語言

### Phase 4: 優化與測試
1. 響應式設計調整
2. 動畫效果優化
3. 效能測試與優化
4. 可存取性檢查

## 風險與緩解

### 技術風險
1. **主題閃爍**: 透過腳本在 HTML 渲染前設定主題緩解
2. **圖片效能**: 使用 next/image 自動優化緩解
3. **包裝大小**: 動態導入與 Tree Shaking 緩解

### 設計風險
1. **設計一致性**: 建立設計系統與 UI 組件緩解
2. **響應式問題**: 行動裝置優先設計與多裝置測試緩解

## 交付物

### 完成標準
- [ ] 所有靜態內容轉換為 React 組件
- [ ] 完整的深淺色模式切換功能
- [ ] 中英文語言切換功能
- [ ] 所有圖片使用 `next/image` 優化
- [ ] 響應式設計完整支援
- [ ] 流暢的動畫與使用者體驗
- [ ] 效能評分 (Lighthouse) > 90
- [ ] 可存取性 (a11y) 符合標準

### 檔案清單
- [ ] app/providers.tsx
- [ ] components/layout/Footer.tsx
- [ ] components/layout/ThemeToggle.tsx
- [ ] components/sections/ContactSection.tsx
- [ ] components/sections/ScrollToTop.tsx
- [ ] components/ui/Button.tsx
- [ ] components/ui/Card.tsx
- [ ] components/ui/Input.tsx
- [ ] components/ui/TextArea.tsx
- [ ] components/context/ThemeContext.tsx
- [ ] components/context/LanguageContext.tsx
- [ ] components/context/index.tsx
- [ ] 更新的 app/page.tsx
- [ ] 更新的 app/layout.tsx
- [ ] 更新的 components/layout/Navbar.tsx
- [ ] 更新的現有組件 (多語言支援)

---

**審核狀態**: 設計已確認，準備進入實作階段  
**下一步**: 使用 writing-plans 技能建立詳細的實作計劃