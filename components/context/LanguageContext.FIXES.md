# LanguageContext 安全與質量修復說明

## 已修復的問題

### 1. XSS 安全漏洞修復
**問題**：原來的 `translate` 函數使用 `String(paramValue)` 和直接 `replace`，可能導致 XSS 攻擊。

**修復**：
- 新增 `escapeHtml` 函數，對 HTML 實體進行編碼
- 新增 `safeParamReplace` 函數，安全地處理參數替換
- 使用正則表達式匹配佔位符，確保只有有效的佔位符被替換
- 所有參數值在替換前都會經過 HTML 轉義

**安全示範**：
```typescript
// 即使參數包含惡意代碼，也會被安全轉義
t('footer.copyright', { year: '<script>alert("xss")</script>2026' })
// 輸出: Copyright © &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;2026
```

### 2. 可存取性改進
**問題**：按鈕缺少鍵盤導航和焦點管理。

**修復**：
- **LanguageToggle.tsx**：
  - 添加 `onKeyDown` 事件處理，支援 Enter 和 Space 鍵
  - 添加 `ref` 用於焦點管理
  - 添加 `aria-pressed` 和 `role="switch"` 屬性
  - 添加 `tabIndex={0}` 確保可聚焦
  - 添加焦點環樣式（focus:ring-2 focus:ring-blue-500）

**鍵盤支援**：
- Enter 鍵：切換語言
- Space 鍵：切換語言
- Tab 鍵：正常導航
- 切換後自動保持焦點

### 3. 效能優化
**問題**：所有翻譯都在初始 bundle 中，導致 bundle 過大。

**修復**：
- **核心翻譯分離**：
  - 只保留核心翻譯在初始 bundle（語言切換、主題切換、基本文字）
  - 移除大型翻譯字典到獨立模組
- **動態載入**：
  - 新增 `translationsModules` 屬性支援動態載入
  - 新增 `loadTranslations` 函數動態載入翻譯模組
  - 使用 `import()` 實現代碼分割

**使用示例**：
```typescript
// 配置動態載入模組
const translationsModules = {
  'navigation': () => import('./translations/navigation'),
  'home': () => import('./translations/home'),
  // ...
};

<LanguageProvider translationsModules={translationsModules}>
  {/* ... */}
</LanguageProvider>

// 在組件中動態載入
const { loadTranslations } = useLanguage();
await loadTranslations('home');
```

### 4. 錯誤處理增強
**問題**：只有簡單的 console.warn，缺少完整的錯誤處理機制。

**修復**：
- **新增 TranslationError 類**：專門處理翻譯相關錯誤
- **錯誤回調**：新增 `onError` 屬性，可以自定義錯誤處理
- **安全翻譯函數**：新增 `tSafe` 函數，返回詳細結果和錯誤資訊
- **錯誤狀態**：新增 `error` 狀態，方便組件顯示錯誤

**錯誤處理選項**：
```typescript
// 1. 使用 onError 回調
<LanguageProvider onError={(error) => {
  console.error('Translation error:', error);
  // 可以發送到錯誤監控服務
}}>

// 2. 使用 tSafe 函數
const { tSafe } = useLanguage();
const result = tSafe('some.key', { param: 'value' });
if (result.error) {
  // 處理錯誤
}

// 3. 直接使用錯誤狀態
const { error } = useLanguage();
```

### 5. 類型安全增強
**問題**：類型定義不夠完善。

**修復**：
- **新增類型**：
  - `TranslationParams`：專門的參數類型
  - `TranslationError`：錯誤類型
  - 增強 `LanguageContextType` 包含所有新功能
- **函數簽名**：
  - `t`: `(key: string, params?: TranslationParams) => string`
  - `tSafe`: `(key: string, params?: TranslationParams) => { text: string; error?: TranslationError }`
- **參數驗證**：在 translate 函數中添加參數驗證

### 6. 新增 Hook
- `useTranslationSafe()`: 返回 `tSafe` 函數
- `useLanguageSwitcher()`: 整合語言切換功能
- `detectAndSetBrowserLanguage()`: 自動檢測和設置瀏覽器語言

### 7. 可擴展性改進
**新增屬性**：
- `loadTranslationsOnDemand`: 是否啟用按需載入（預設 false）
- `translationsModules`: 動態載入模組配置
- `onError`: 錯誤處理回調

## 使用示例

### 基本使用
```typescript
import { LanguageProvider, useTranslation } from './LanguageContext';

function MyComponent() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t('home.hero.title')}</h1>
      <p>{t('footer.copyright', { year: 2026 })}</p>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MyComponent />
    </LanguageProvider>
  );
}
```

### 動態載入使用
```typescript
const translationsModules = {
  'home': () => import('./translations/home'),
  'about': () => import('./translations/about'),
};

function DynamicComponent() {
  const { loadTranslations, isLoading } = useLanguage();
  
  useEffect(() => {
    // 組件載入時載入翻譯
    loadTranslations('home');
  }, []);
  
  if (isLoading) return <div>Loading translations...</div>;
  
  return <div>Content with translations</div>;
}
```

### 錯誤處理使用
```typescript
function SafeComponent() {
  const { tSafe, error } = useLanguage();
  const result = tSafe('some.missing.key');
  
  return (
    <div>
      {error && <div className="error">{error.message}</div>}
      {result.error ? (
        <div>Translation error: {result.text}</div>
      ) : (
        <div>{result.text}</div>
      )}
    </div>
  );
}
```

## 遷移指南

### 從舊版本遷移
1. **導入更新**：不需要更改導入語句
2. **翻譯函數**：`t` 函數簽名不變，但內部已安全
3. **類型安全**：參數類型更嚴格，可能需要調整參數傳遞
4. **新功能**：可選使用動態載入和錯誤處理

### 推薦的最佳實踐
1. **安全性**：總是使用修復後的版本，不再需要手動轉義參數
2. **效能**：對大型應用使用動態載入翻譯模組
3. **錯誤處理**：在生產環境中設置 `onError` 回調
4. **可存取性**：使用更新後的 LanguageToggle 組件

## 測試建議

### 安全測試
```typescript
// 測試 XSS 防護
const xssTest = t('footer.copyright', { 
  year: '<script>alert("xss")</script>2026' 
});
// 應該輸出轉義後的文本

// 測試參數注入
const injectionTest = t('footer.copyright', { 
  year: '{year} or {other}' 
});
// 應該只替換 {year}，不處理其他
```

### 可存取性測試
1. 使用鍵盤導航測試 LanguageToggle
2. 確保焦點管理正常
3. 檢查 ARIA 屬性是否正確

### 效能測試
1. 比較 bundle 大小變化
2. 測試動態載入的效能
3. 驗證代碼分割是否生效

## 已知限制

1. **SSR 支援**：動態載入在 SSR 環境中有限制
2. **參數類型**：目前只支援 string 和 number 類型
3. **嵌套參數**：不支援嵌套對象參數
4. **格式化**：不支援數字/日期格式化

## 未來改進建議

1. **i18n 標準**：考慮支援 i18next 或 react-intl
2. **格式化**：添加數字、日期、貨幣格式化
3. **複數形式**：支援語言特定的複數形式
4. **嵌套對象**：支援嵌套參數結構
5. **伺服器端渲染**：更好的 SSR 支援