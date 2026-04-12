# Context Providers

此目錄包含 Next.js 應用的 React Context 提供者，支援主題切換和多語言功能。

## 可用 Context

### 1. ThemeContext
管理深淺色主題切換。

**功能特色：**
- ✅ SSR 安全 - 不會在伺服器端渲染時訪問 `localStorage` 或 `window`
- ✅ TypeScript 支援 - 完整的類型定義
- ✅ 系統主題偏好跟隨
- ✅ 安全的 localStorage 操作
- ✅ 錯誤處理
- ✅ 效能優化（使用 `useMemo` 和 `useCallback`）
- ✅ 可自定義的儲存鍵名
- ✅ 支援預設主題設定

### 2. LanguageContext
管理中英文語言切換和翻譯。

**功能特色：**
- ✅ 支援中英文 (`zh`, `en`) 語言切換
- ✅ 完整的翻譯系統，支援參數化翻譯
- ✅ 自動偵測瀏覽器語言
- ✅ SSR 安全
- ✅ 安全的 localStorage 操作
- ✅ 動態翻譯字典，可擴展
- ✅ 自動設置 HTML lang 屬性
- ✅ TypeScript 完整類型支援

## 安裝與使用

### 1. 在應用根層級添加 ThemeProvider

在 `app/layout.tsx` 中：

```tsx
import { ThemeProvider } from '@/components/context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider 
          defaultTheme="light" 
          storageKey="app-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. 使用 useTheme hook 在任何客戶端元件中

```tsx
'use client';

import { useTheme } from '@/components/context';

export function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>當前主題: {theme}</p>
      <button onClick={toggleTheme}>切換主題</button>
      <button onClick={() => setTheme('light')}>設為淺色</button>
      <button onClick={() => setTheme('dark')}>設為深色</button>
    </div>
  );
}
```

### 3. 使用 ThemeToggle 元件

```tsx
import { ThemeToggle } from '@/components/context';

export function Header() {
  return (
    <header>
      <nav>
        {/* ... 其他導航項目 ... */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
```

## LanguageContext 安裝與使用

### 1. 在應用根層級添加 LanguageProvider

在 `app/layout.tsx` 中（與 ThemeProvider 組合使用）：

```tsx
import { ThemeProvider } from '@/components/context';
import { LanguageProvider } from '@/components/context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider 
          defaultTheme="light" 
          storageKey="app-theme"
        >
          <LanguageProvider
            defaultLanguage="en"
            storageKey="app-language"
          >
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. 使用 useLanguage hook 在任何客戶端元件中

```tsx
'use client';

import { useLanguage } from '@/components/context';

export function MyComponent() {
  const { language, t, toggleLanguage, setLanguage, addTranslations } = useLanguage();
  
  // 動態添加翻譯
  useEffect(() => {
    addTranslations({
      'custom.key': {
        zh: '自訂翻譯',
        en: 'Custom translation'
      }
    });
  }, [addTranslations]);
  
  return (
    <div>
      <p>當前語言: {language === 'zh' ? '中文' : 'English'}</p>
      <p>{t('nav.home')}</p>
      <p>{t('footer.copyright', { year: 2024 })}</p>
      <button onClick={toggleLanguage}>切換語言</button>
      <button onClick={() => setLanguage('zh')}>中文</button>
      <button onClick={() => setLanguage('en')}>英文</button>
    </div>
  );
}
```

### 3. 使用 useTranslation hook（簡化版）

```tsx
'use client';

import { useTranslation } from '@/components/context';

export function SimpleComponent() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### 4. 使用 LanguageToggle 元件

```tsx
import { LanguageToggle, SimpleLanguageToggle } from '@/components/context';

export function Header() {
  return (
    <header>
      <nav>
        {/* ... 其他導航項目 ... */}
        {/* 完整版本 */}
        <LanguageToggle />
        
        {/* 或者簡單文字版本 */}
        <SimpleLanguageToggle />
      </nav>
    </header>
  );
}
```

### 5. 組合使用切換器

```tsx
import { ThemeToggle } from '@/components/context/ThemeToggle';
import { LanguageToggle } from '@/components/context/LanguageToggle';

export function SettingsPanel() {
  return (
    <div className="fixed bottom-4 right-4 flex gap-2 z-50">
      <LanguageToggle />
      <ThemeToggle />
    </div>
  );
}
```

## API 參考

### ThemeProvider Props

| 屬性 | 類型 | 預設值 | 描述 |
|------|------|--------|------|
| `children` | `React.ReactNode` | 必填 | 子元件 |
| `defaultTheme` | `'light' \| 'dark'` | `'light'` | 預設主題（當 localStorage 中沒有儲存主題時使用） |
| `storageKey` | `string` | `'theme'` | localStorage 中儲存主題的鍵名 |

### useTheme() 返回值

| 屬性 | 類型 | 描述 |
|------|------|------|
| `theme` | `'light' \| 'dark'` | 當前主題 |
| `toggleTheme` | `() => void` | 切換主題（淺色 ↔ 深色） |
| `setTheme` | `(theme: 'light' \| 'dark') => void` | 設置特定主題 |

## CSS 主題變數

主題系統使用 CSS 變數來管理顏色。在 `globals.css` 中定義了以下變數：

### 淺色主題 (`.light` class)
```css
.light {
  --background: #f8fafc;
  --foreground: #0f172a;
  --card: #ffffff;
  --border: #e2e8f0;
}
```

### 深色主題 (`.dark` class)
```css
.dark {
  --background: #0f172a;
  --foreground: #f1f5f9;
  --card: #1e293b;
  --border: #334155;
}
```

### 在元件中使用
```tsx
<div className="bg-background text-foreground">
  <div className="bg-card border-border">
    {/* 內容 */}
  </div>
</div>
```

## 進階用法

### 自定義儲存鍵名
```tsx
<ThemeProvider storageKey="my-app-theme">
  {/* ... */}
</ThemeProvider>
```

### 強制特定預設主題
```tsx
<ThemeProvider defaultTheme="dark">
  {/* 總是從深色主題開始 */}
</ThemeProvider>
```

### 監聽系統主題變化
元件會自動監聽系統主題變化，但只有在用戶沒有手動設置主題時才會跟隨系統變化。

## 錯誤處理

- 如果 `localStorage` 不可用（例如在無痕模式或儲存已滿），會降級到記憶體儲存
- 如果讀取到無效的主題值，會重置為預設主題
- 所有 `localStorage` 操作都有 try-catch 錯誤處理

## SSR 注意事項

- 元件標記為 `'use client'`，確保只在客戶端執行
- 使用 `suppressHydrationWarning` 屬性避免水合警告
- 伺服器端渲染時使用預設主題，客戶端水合後再應用實際主題

## 效能優化

- 使用 `useMemo` 包裝 context value 避免不必要的重新渲染
- 使用 `useCallback` 包裝回調函數
- 只在必要時監聽系統主題變化

---

## LanguageContext API 參考

### LanguageProvider Props

| 屬性 | 類型 | 預設值 | 描述 |
|------|------|--------|------|
| `children` | `React.ReactNode` | 必填 | 子元件 |
| `defaultLanguage` | `'zh' \| 'en'` | `'en'` | 預設語言（當 localStorage 中沒有儲存語言時使用） |
| `storageKey` | `string` | `'language'` | localStorage 中儲存語言的鍵名 |
| `translations` | `TranslationDictionary` | `defaultTranslations` | 自訂翻譯字典 |

### useLanguage() 返回值

| 屬性 | 類型 | 描述 |
|------|------|------|
| `language` | `'zh' \| 'en'` | 當前語言 |
| `translations` | `TranslationDictionary` | 當前翻譯字典 |
| `t(key, params?)` | `(key: string, params?: Record<string, string\|number>) => string` | 翻譯函數，支援參數化 |
| `toggleLanguage` | `() => void` | 切換語言（中文 ↔ 英文） |
| `setLanguage` | `(lang: 'zh' \| 'en') => void` | 設置特定語言 |
| `addTranslations` | `(newTranslations: TranslationDictionary) => void` | 動態添加翻譯 |

### useTranslation() 返回值
返回翻譯函數 `t`，與 `useLanguage().t` 相同，但更簡潔。

### 預設翻譯字典

LanguageContext 包含預設的翻譯字典，涵蓋以下類別：

- **導航欄** (`nav.*`): `nav.home`, `nav.about`, `nav.services`, `nav.portfolio`, `nav.contact`
- **主題相關** (`theme.*`): `theme.toggle`, `theme.light`, `theme.dark`
- **語言相關** (`language.*`): `language.switch`, `language.zh`, `language.en`
- **按鈕文字** (`button.*`): `button.more`, `button.view`, `button.contact`, `button.submit`, `button.cancel`
- **頁面標題** (`title.*`): `title.welcome`, `title.about`, `title.services`, `title.portfolio`
- **通用文字** (`text.*`): `text.loading`, `text.error`, `text.success`, `text.no_data`
- **頁面區塊** (`hero.*`, `about.*`, `service.*`, `footer.*`): 涵蓋主要頁面區塊內容

### 參數化翻譯

翻譯支援參數替換：

```tsx
// 翻譯字典
{
  'footer.copyright': {
    zh: '版權所有 © {year}',
    en: 'Copyright © {year}'
  }
}

// 使用
t('footer.copyright', { year: 2024 })
// 中文: "版權所有 © 2024"
// 英文: "Copyright © 2024"
```

### 自訂翻譯

可以通過三種方式自訂翻譯：

1. **通過 Provider props**:
```tsx
<LanguageProvider
  translations={{
    'custom.key': {
      zh: '自訂翻譯',
      en: 'Custom translation'
    }
  }}
>
  {children}
</LanguageProvider>
```

2. **動態添加**:
```tsx
const { addTranslations } = useLanguage();

useEffect(() => {
  addTranslations({
    'new.key': {
      zh: '新翻譯',
      en: 'New translation'
    }
  });
}, [addTranslations]);
```

3. **擴展現有翻譯**:
```tsx
import { defaultTranslations } from '@/components/context/LanguageContext';

const myTranslations = {
  ...defaultTranslations,
  'custom.key': {
    zh: '自訂',
    en: 'Custom'
  }
};

<LanguageProvider translations={myTranslations}>
  {children}
</LanguageProvider>
```

### HTML 屬性設置

LanguageContext 會自動設置以下 HTML 屬性：

- `html lang="zh"` 或 `html lang="en"` - 根據當前語言
- `html dir="ltr"` - 目前只支援左到右語言

### 語言偵測邏輯

1. 優先使用 localStorage 中保存的語言偏好
2. 如果沒有保存的偏好，偵測瀏覽器語言
3. 如果瀏覽器語言以 "zh" 開頭，使用中文，否則使用英文
4. 保存偵測結果到 localStorage

### SSR 注意事項

- 元件標記為 `'use client'`，確保只在客戶端執行
- 伺服器端渲染時使用預設語言
- 客戶端水合後再應用實際語言偏好
- 自動設置 HTML lang 屬性只在客戶端執行

### 錯誤處理

- 如果 `localStorage` 不可用，降級到記憶體儲存
- 如果讀取到無效的語言值，重置為預設語言
- 如果翻譯 key 不存在，返回 key 本身作為 fallback
- 所有 `localStorage` 操作都有 try-catch 錯誤處理

### 擴展指南

#### 添加新語言
1. 擴展 `Language` 類型: `export type Language = 'zh' \| 'en' \| 'ja' \| 'ko';`
2. 更新 `isValidLanguage` 函數
3. 更新 `getBrowserLanguage` 函數
4. 為新語言添加對應的翻譯

#### 支援 RTL 語言
1. 在 `Language` 類型中添加 RTL 語言（如 `'ar'`, `'he'`）
2. 更新 `isValidLanguage` 函數
3. 在 `useEffect` 中根據語言設置 `html.dir = 'rtl'`

### 效能優化

- 使用 `useMemo` 包裝 context value
- 使用 `useCallback` 包裝翻譯函數和回調
- 翻譯函數會記憶化，避免不必要的重新計算
- 只在語言變化時更新 HTML 屬性