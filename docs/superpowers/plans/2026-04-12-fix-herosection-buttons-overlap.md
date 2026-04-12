# HeroSection 按鈕重疊修復實施計劃

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修復 HeroSection 中「立即諮詢」按鈕和「探索更多」滾動指示器之間的視覺重疊問題

**Architecture:** 通過調整垂直間距來解決重疊問題，增加按鈕容器底部間距並調整滾動指示器位置，保持現有設計的一致性。

**Tech Stack:** Next.js 16.2.3, React 19.2.4, Tailwind CSS 4, Framer Motion 12.38.0

---

## 檔案結構

**修改檔案：**
- `components/sections/HeroSection.tsx` - 主要組件檔案，包含需要修復的按鈕和滾動指示器

**不需要創建新檔案：** 所有修改都在現有檔案中進行。

## 任務分解

### Task 1: 分析當前佈局和問題

**檔案：**
- 檢查: `components/sections/HeroSection.tsx:97-136`

- [ ] **步驟 1: 檢查當前間距值**

查看 HeroSection.tsx 第 101 行和第 120 行的當前 CSS 類名：

```tsx
// 第 101 行 - 按鈕容器
className="flex justify-center mb-16"

// 第 120 行 - 滾動指示器容器
className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
```

- [ ] **步驟 2: 理解問題**

當前設置：
- `mb-16` = 4rem (64px) 底部間距
- `bottom-12` = 3rem (48px) 從底部定位

問題：這兩個元素之間的垂直間距可能不足，導致在特定螢幕尺寸下重疊。

- [ ] **步驟 3: 提交分析結果**

```bash
git add docs/superpowers/plans/2026-04-12-fix-herosection-buttons-overlap.md
git commit -m "docs: add implementation plan for HeroSection buttons overlap fix"
```

### Task 2: 調整「立即諮詢」按鈕的下方間距

**檔案：**
- 修改: `components/sections/HeroSection.tsx:101`

- [ ] **步驟 1: 修改按鈕容器間距**

將 `mb-16` 更改為 `mb-24`（增加 2rem/32px）：

```tsx
// 修改前
className="flex justify-center mb-16"

// 修改後
className="flex justify-center mb-24"
```

- [ ] **步驟 2: 驗證修改**

檢查第 101 行是否正確更新：

```bash
grep -n "flex justify-center mb-" components/sections/HeroSection.tsx
```
預期輸出：`101:            className="flex justify-center mb-24"`

- [ ] **步驟 3: 提交更改**

```bash
git add components/sections/HeroSection.tsx
git commit -m "fix: increase bottom margin for consult button container from mb-16 to mb-24"
```

### Task 3: 調整「探索更多」滾動指示器的位置

**檔案：**
- 修改: `components/sections/HeroSection.tsx:120`

- [ ] **步驟 1: 修改滾動指示器位置**

將 `bottom-12` 更改為 `bottom-8`（上移 1rem/16px）：

```tsx
// 修改前
className="absolute bottom-12 left-1/2 transform -translate-x-1/2"

// 修改後
className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
```

- [ ] **步驟 2: 驗證修改**

檢查第 120 行是否正確更新：

```bash
grep -n "absolute bottom-" components/sections/HeroSection.tsx
```
預期輸出：`120:          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"`

- [ ] **步驟 3: 提交更改**

```bash
git add components/sections/HeroSection.tsx
git commit -m "fix: adjust scroll indicator position from bottom-12 to bottom-8"
```

### Task 4: 測試修改效果

**檔案：**
- 測試: `components/sections/HeroSection.tsx`

- [ ] **步驟 1: 啟動開發伺服器**

```bash
npm run dev
```

- [ ] **步驟 2: 檢查 HeroSection 渲染**

在瀏覽器中訪問 `http://localhost:3000` 並檢查：
1. 「立即諮詢」按鈕和「探索更多」指示器之間是否有足夠間距
2. 兩個元素是否不再重疊
3. 在各種螢幕尺寸下是否正常顯示

- [ ] **步驟 3: 檢查響應式設計**

使用瀏覽器開發者工具測試：
1. 移動端視圖（iPhone SE, 375x667）
2. 平板視圖（iPad, 768x1024）
3. 桌面視圖（1440x900）

- [ ] **步驟 4: 提交測試結果**

```bash
git commit --allow-empty -m "test: verify HeroSection buttons spacing fix on multiple viewports"
```

### Task 5: 可選優化 - 響應式調整

**檔案：**
- 修改: `components/sections/HeroSection.tsx:101,120`

- [ ] **步驟 1: 添加響應式類名（如果需要）**

如果測試顯示在某些螢幕尺寸下仍有問題，添加響應式類名：

```tsx
// 按鈕容器 - 在不同螢幕尺寸下使用不同間距
className="flex justify-center mb-16 md:mb-24 lg:mb-32"

// 滾動指示器 - 在不同螢幕尺寸下使用不同位置
className="absolute bottom-8 md:bottom-10 lg:bottom-12 left-1/2 transform -translate-x-1/2"
```

- [ ] **步驟 2: 測試響應式調整**

重新測試各種螢幕尺寸，確保在所有設備上都有足夠間距。

- [ ] **步驟 3: 提交響應式調整**

```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: add responsive spacing for HeroSection buttons on different screen sizes"
```

### Task 6: 最終驗證和清理

**檔案：**
- 最終檢查: `components/sections/HeroSection.tsx`

- [ ] **步驟 1: 檢查完整檔案**

確保所有修改正確無誤：

```bash
git diff HEAD~5 HEAD -- components/sections/HeroSection.tsx
```

- [ ] **步驟 2: 運行開發伺服器進行最終測試**

```bash
npm run dev
```

訪問 `http://localhost:3000` 並：
1. 確認無視覺重疊
2. 確認所有互動正常（按鈕點擊、滾動指示器）
3. 確認動畫效果正常

- [ ] **步驟 3: 創建最終提交**

```bash
git add components/sections/HeroSection.tsx
git commit -m "fix: resolve HeroSection buttons overlap with improved vertical spacing"
```

## Tailwind CSS 間距參考

- `mb-16` = 4rem = 64px
- `mb-24` = 6rem = 96px
- `mb-32` = 8rem = 128px
- `bottom-8` = 2rem = 32px
- `bottom-10` = 2.5rem = 40px
- `bottom-12` = 3rem = 48px

## 預期結果

修改後：
- 按鈕容器間距：從 `mb-16` (64px) 增加到 `mb-24` (96px) - 增加 32px
- 滾動指示器位置：從 `bottom-12` (48px) 調整到 `bottom-8` (32px) - 上移 16px
- 總間距增加：48px (32px + 16px)

這應該能有效解決視覺重疊問題，同時保持美觀的設計比例。