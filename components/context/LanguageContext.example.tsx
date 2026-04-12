'use client';

import React from 'react';
import { LanguageProvider, useLanguage, useTranslation, useTranslationSafe } from './LanguageContext';

// 示例：動態載入的翻譯模組
const translationsModules = {
  'navigation': () => import('./translations/navigation'),
  'home': () => import('./translations/home'),
  'about': () => import('./translations/about'),
};

// 示例：如何使用 LanguageContext
export function ExampleComponent() {
  const { language, setLanguage, loadTranslations, isLoading, error } = useLanguage();
  const t = useTranslation();

  // 動態載入翻譯
  const loadHomeTranslations = async () => {
    try {
      await loadTranslations('home');
      console.log('Home translations loaded successfully');
    } catch (err) {
      console.error('Failed to load home translations:', err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* 語言切換 */}
      <div className="space-x-2">
        <button
          onClick={() => setLanguage('zh')}
          className={`px-3 py-1 rounded ${language === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          中文
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          English
        </button>
      </div>

      {/* 動態載入翻譯 */}
      <button
        onClick={loadHomeTranslations}
        disabled={isLoading}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? t('text.loading') : 'Load Home Translations'}
      </button>

      {/* 錯誤顯示 */}
      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded">
          <strong>Translation Error:</strong> {error.message}
        </div>
      )}

      {/* 使用翻譯 */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">{t('language.switch')}</h2>
        <p>{t('language.zh')} / {t('language.en')}</p>
        <p>{t('theme.toggle')}</p>
        <p>{t('text.loading')}</p>
      </div>

      {/* 使用安全的參數替換 */}
      <div className="p-4 bg-gray-100 rounded">
        <p>安全的參數替換示例：</p>
        <p className="mt-2">
          {t('footer.copyright', { year: 2026 })}
        </p>
        <p className="mt-2">
          注意：即使參數包含 HTML，也會被安全轉義：
        </p>
        <p className="mt-2 text-red-600">
          {t('footer.copyright', { year: '<script>alert("xss")</script>2026' })}
        </p>
      </div>
    </div>
  );
}

// 包裹組件示例
export function ExampleApp() {
  return (
    <LanguageProvider
      translationsModules={translationsModules}
      onError={(error) => {
        // 可以將錯誤發送到錯誤監控服務
        console.error('Translation error:', error);
      }}
    >
      <ExampleComponent />
    </LanguageProvider>
  );
}

// 示例：如何使用 useTranslationSafe hook
export function SafeTranslationExample() {
  const tSafe = useTranslationSafe();

  // tSafe 返回詳細資訊，包含可能發生的錯誤
  const result = tSafe('some.key', { param: 'value' });

  if (result.error) {
    return (
      <div className="p-2 bg-yellow-100 text-yellow-800">
        翻譯錯誤: {result.error.message}
        <span className="ml-2">(顯示: {result.text})</span>
      </div>
    );
  }

  return <div>{result.text}</div>;
}