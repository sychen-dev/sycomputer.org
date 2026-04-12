---
name: sycomputer-website-redesign
description: 將傳統靜態網站重構為現代化 Next.js + React + TypeScript + Tailwind CSS + Framer Motion 架構
type: project
---

# 聖大二手電腦網站重構設計文檔

## 專案概述

將現有的傳統靜態網站（HTML/CSS/JS + Bootstrap 4）重構為現代化的前端架構，提升性能、開發體驗和用戶體驗。

## 設計決策

### 技術棧選擇
- **框架**: Next.js 16.2.3 (App Router)
- **UI 庫**: React 19.2.4
- **樣式**: Tailwind CSS 4.0
- **動畫**: Framer Motion 12.38.0
- **圖標**: Lucide React 1.8.0
- **語言**: TypeScript

### 視覺設計方向
- **風格**: 極簡主義 (Minimalist)
- **色彩**: 黑白灰主色調配合藍色強調色
- **字體**: 系統字體堆疊 (Inter/SF Pro/系統無襯線體)
- **圓角**: 統一 0.75rem
- **效果**: 毛玻璃效果 (Glassmorphism)

### 主題系統
- **模式**: 跟隨系統偏好 (`prefers-color-scheme`)
- **實現**: CSS 變數 + 自動切換
- **無需手動切換按鈕**

## 架構設計

### 遷移策略
1. **圖片資源遷移**：
   - 現有靜態圖片從 `_old_static/assets/` 遷移到 `public/images/`
   - 圖片優化：使用 `next/image` 組件替換原生 `<img>` 標籤
   - 圖片分類：`hero/`, `portfolio/`, `icons/` 子目錄

2. **內容遷移**：
   - 文字內容從 HTML 提取到組件中
   - 結構化數據保持原樣，樣式完全重寫
   - 中英文內容分別遷移到對應的頁面

3. **功能遷移**：
   - 移除 jQuery 和 Bootstrap 依賴
   - 使用 React 狀態和 Framer Motion 實現原有交互
   - 平滑滾動使用原生 CSS/JS 實現

### 檔案結構
```
app/
├── layout.tsx              # 根佈局，主題設定
├── page.tsx               # 主頁面 (中文)
├── en/
│   └── page.tsx           # 英文版頁面
├── components/            # 共用組件
│   ├── Navigation.tsx     # 導航列
│   ├── HeroSection.tsx    # 主視覺區域
│   ├── AboutSection.tsx   # 關於公司
│   ├── ServicesGrid.tsx   # 服務項目網格
│   ├── PortfolioGallery.tsx # 作品集畫廊
│   ├── ContactSection.tsx # 聯絡區塊
│   └── Footer.tsx         # 頁尾
├── styles/
│   └── globals.css        # 全局樣式
└── api/                   # API 路由 (未來擴展)
public/
├── images/                # 圖片資源
│   ├── hero/
│   ├── portfolio/
│   └── icons/
└── favicon.ico
```

### 組件設計

#### 1. Navigation 組件
- 響應式導航列，玻璃擬態背景
- 滾動時透明度變化
- 移動端漢堡菜單
- 錨點連結平滑滾動
- 中英文語言切換

#### 2. HeroSection 組件
- 大字標題與簡潔描述
- 行動呼籲按鈕 (CTA)
- 背景漸變/抽象圖形
- 進場動畫效果

#### 3. AboutSection 組件
- 公司介紹文字
- 核心價值主張
- 關鍵數據展示卡片
- 分段動畫效果

#### 4. ServicesGrid 組件
- 三欄網格佈局
- 服務卡片 (圖標 + 標題 + 描述)
- 懸停抬升效果
- 交錯進場動畫

#### 5. PortfolioGallery 組件
- 3×2 圖片網格
- 圖片懸停顯示專案資訊
- Lightbox 圖片查看功能
- 視差滾動效果

#### 6. ContactSection 組件
- 聯絡資訊卡片
- 電話/郵件/社交媒體連結
- 簡單聯絡表單 (未來擴展)
- 地圖嵌入 (未來擴展)

#### 7. Footer 組件
- 版權資訊
- 底部導航連結
- 社交媒體圖標

## 視覺規範

### 色彩系統
```css
:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  --primary: #3b82f6;
  --primary-dark: #1d4ed8;
  --secondary: #8b5cf6;
  --accent: #06b6d4;
  --muted: #64748b;
  --card: #ffffff;
  --card-dark: #1e293b;
  --border: #e2e8f0;
  --border-dark: #334155;
}
```

### 毛玻璃效果
```css
.glass {
  backdrop-filter: blur(12px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.125);
}

.dark .glass {
  background-color: rgba(30, 41, 59, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 動畫實現
#### Framer Motion 配置
```typescript
// 進場動畫變體
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// 視差滾動效果
const useParallax = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  return y;
};

// 交錯動畫
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

#### 動畫類型
- **進場動畫**: 淡入、滑入、縮放，使用 `whileInView` 觸發
- **懸停效果**: 卡片抬升、圖標縮放，使用 `whileHover` 和 `whileTap`
- **滾動動畫**: 視差效果、漸進顯示，使用 `useScroll` 和 `useTransform`
- **頁面過渡**: 平滑切換，使用 `AnimatePresence`

## 性能優化

### 圖片優化
- 使用 `next/image` 組件
- 自動 WebP 格式轉換
- 延遲載入 (lazy loading)
- 響應式圖片尺寸
- 圖片壓縮和優化

### 代碼優化
- 自動代碼分割 (App Router)
- 關鍵 CSS 內聯
- 字體子集化
- 第三方庫優化導入

### SEO 優化
- 完善的 `metadata` 配置
- 結構化數據 (Schema.org)
- Open Graph 和 Twitter Card
- 語義化 HTML 標籤
- 響應式設計

## 無障礙訪問

### WCAG 2.1 合規
- 顏色對比度 ≥ 4.5:1
- 鍵盤導航支持
- 螢幕閱讀器友好
- ARIA 標籤和角色
- 焦點管理

### 響應式設計
- 移動端優先
- 斷點: sm (640px), md (768px), lg (1024px), xl (1280px)
- 觸摸設備優化
- 高 DPI 屏幕支持

## 國際化

### 語言版本
- 中文版: `/` (主頁)
- 英文版: `/en` (英文頁面)

### 實現方式
- Next.js 動態路由
- 語言切換連結
- SEO 友好的 URL 結構
- 元數據本地化

## 錯誤處理

### 錯誤邊界
- 全局錯誤處理
- 組件級錯誤邊界
- 友好的錯誤頁面

### 圖片載入
- 載入失敗回退
- 佔位符圖片
- 漸進式載入

## 測試策略

### 單元測試
- 組件渲染測試
- 交互測試
- 樣式快照測試

### 集成測試
- 導航功能測試
- 表單提交測試
- 響應式測試

### E2E 測試 (未來)
- 用戶流程測試
- 跨瀏覽器測試
- 性能測試

## 部署與維護

### 構建優化
- 靜態網站生成 (SSG)
- 圖片優化管道
- 代碼壓縮和混淆

### 監控與分析
- 性能監控
- 錯誤追蹤
- 用戶行為分析

### 維護計劃
- 定期依賴更新
- 安全漏洞掃描
- 性能審計

## 成功標準

### 功能完整性
- [ ] 所有現有內容完整遷移
- [ ] 響應式設計正常
- [ ] 深淺色模式正常
- [ ] 所有動畫效果正常
- [ ] 國際化功能正常

### 性能指標
- [ ] Lighthouse 分數 ≥ 90
- [ ] 首次內容繪製 (FCP) < 1.5s
- [ ] 最大內容繪製 (LCP) < 2.5s
- [ ] 累計佈局偏移 (CLS) < 0.1

### 開發體驗
- [ ] TypeScript 類型安全
- [ ] 組件模組化
- [ ] 代碼可維護性
- [ ] 開發工具整合

---

**Why:** 將傳統靜態網站現代化，提升性能、開發效率和用戶體驗，同時保持現有內容和功能完整性。

**How to apply:** 按照此設計文檔逐步實施重構，優先處理核心組件和視覺效果，確保每個階段都有可運行的版本。