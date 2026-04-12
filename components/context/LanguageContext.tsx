'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';

export type Language = 'zh' | 'en';

// 定義翻譯字典類型
interface TranslationDictionary {
  [key: string]: {
    zh: string;
    en: string;
  };
}

// 翻譯參數類型
export type TranslationParams = Record<string, string | number>;

// 基本核心翻譯字典 - 最小化 bundle
const coreTranslations: TranslationDictionary = {
  // 語言切換
  'language.switch': {
    zh: '切換語言',
    en: 'Switch Language'
  },
  'language.zh': {
    zh: '中文',
    en: 'Chinese'
  },
  'language.en': {
    zh: '英文',
    en: 'English'
  },

  // 主題切換
  'theme.toggle': {
    zh: '切換主題',
    en: 'Toggle Theme'
  },
  'theme.light': {
    zh: '淺色模式',
    en: 'Light Mode'
  },
  'theme.dark': {
    zh: '深色模式',
    en: 'Dark Mode'
  },

  // 通用文字
  'text.loading': {
    zh: '載入中...',
    en: 'Loading...'
  },
  'text.error': {
    zh: '發生錯誤',
    en: 'An error occurred'
  },
  'text.success': {
    zh: '操作成功',
    en: 'Operation successful'
  },

  // Navigation
  'nav.home': {
    zh: '首頁',
    en: 'Home'
  },
  'nav.about': {
    zh: '關於公司',
    en: 'About'
  },
  'nav.services': {
    zh: '提供服務',
    en: 'Services'
  },
  'nav.portfolio': {
    zh: '建置案例',
    en: 'Portfolio'
  },
  'nav.contact': {
    zh: '聯絡我們',
    en: 'Contact'
  },
  'nav.language': {
    zh: 'EN/中文',
    en: 'EN/中文'
  },
  'nav.languageSwitch': {
    zh: '切換語言 / Switch Language',
    en: 'Switch Language / 切換語言'
  },

  // Buttons
  'button.learnMore': {
    zh: '深入了解',
    en: 'Learn More'
  },
  'button.consultNow': {
    zh: '立即諮詢',
    en: 'Consult Now'
  },
  'button.getQuote': {
    zh: '獲取報價',
    en: 'Get Quote'
  },
  'button.viewDetails': {
    zh: '查看詳細資訊',
    en: 'View Details'
  },
  'button.sendMessage': {
    zh: '傳送訊息',
    en: 'Send Message'
  },
  'button.subscribe': {
    zh: '訂閱',
    en: 'Subscribe'
  },

  // Common
  'common.readMore': {
    zh: '閱讀更多',
    en: 'Read More'
  },
  'common.scrollDown': {
    zh: '向下滾動',
    en: 'Scroll Down'
  },
  'common.exploreMore': {
    zh: '探索更多',
    en: 'Explore More'
  },
  'common.allRightsReserved': {
    zh: '版權所有',
    en: 'All Rights Reserved'
  },
  'common.backToTop': {
    zh: '回到頂部',
    en: 'Back to Top'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
  translations?: TranslationDictionary;
  onError?: (error: TranslationError) => void;
  loadTranslationsOnDemand?: boolean;
  translationsModules?: Record<string, () => Promise<{ default: TranslationDictionary }>>;
}

interface LanguageContextType {
  language: Language;
  translations: TranslationDictionary;
  t: (key: string, params?: TranslationParams) => string;
  tSafe: (key: string, params?: TranslationParams) => { text: string; error?: TranslationError };
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  addTranslations: (newTranslations: TranslationDictionary) => void;
  loadTranslations: (moduleName: string) => Promise<void>;
  isLoading: boolean;
  error: TranslationError | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 安全地驗證 language 值
const isValidLanguage = (value: unknown): value is Language => {
  return value === 'zh' || value === 'en';
};

// 安全地從 localStorage 讀取 language
const getLanguageFromLocalStorage = (storageKey: string): Language | null => {
  try {
    if (typeof window === 'undefined') {
      return null; // SSR 時返回 null
    }

    const storedValue = localStorage.getItem(storageKey);
    if (!storedValue) return null;

    return isValidLanguage(storedValue) ? storedValue : null;
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
    return null;
  }
};

// 安全地設置 language 到 localStorage
const setLanguageToLocalStorage = (storageKey: string, language: Language): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey, language);
  } catch (error) {
    console.warn('Failed to save language to localStorage:', error);
  }
};

// 獲取瀏覽器偏好語言
const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en'; // SSR 時返回預設值
  }

  try {
    const browserLang = navigator.language.toLowerCase();
    // 檢查是否為中文
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    // 預設為英文
    return 'en';
  } catch (error) {
    console.warn('Failed to get browser language:', error);
    return 'en';
  }
};

// HTML 實體編碼函數 - 防止 XSS
const escapeHtml = (unsafe: string | number): string => {
  if (typeof unsafe === 'number') {
    return String(unsafe);
  }

  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// 安全的參數替換
const safeParamReplace = (text: string, params?: TranslationParams): string => {
  if (!params || Object.keys(params).length === 0) {
    return text;
  }

  let result = text;

  // 檢查是否存在有效的佔位符
  const paramPattern = /\{(\w+)\}/g;
  const matches = [...text.matchAll(paramPattern)];

  if (matches.length === 0) {
    return text;
  }

  // 安全地替換每個佔位符
  matches.forEach(match => {
    const [placeholder, paramName] = match;
    if (params[paramName] !== undefined) {
      const escapedValue = escapeHtml(params[paramName]);
      result = result.replace(placeholder, escapedValue);
    }
  });

  return result;
};

// 錯誤類別
export class TranslationError extends Error {
  constructor(
    message: string,
    public key?: string,
    public language?: Language,
    public params?: TranslationParams
  ) {
    super(message);
    this.name = 'TranslationError';
  }
}

// 翻譯函數 - 增強安全性和錯誤處理
const translate = (
  key: string,
  translations: TranslationDictionary,
  language: Language,
  params?: TranslationParams,
  onError?: (error: TranslationError) => void
): string => {
  try {
    // 驗證 key 是否為字符串
    if (typeof key !== 'string' || key.trim() === '') {
      throw new TranslationError('Translation key must be a non-empty string', key, language, params);
    }

    const translation = translations[key];

    if (!translation) {
      const error = new TranslationError(`Translation key not found: "${key}"`, key, language, params);
      if (onError) {
        onError(error);
      } else {
        console.warn(error.message);
      }
      return key; // 返回 key 作為 fallback
    }

    // 獲取目標語言的翻譯
    const targetText = translation[language] || translation['en'] || key;

    // 安全的參數替換
    return safeParamReplace(targetText, params);
  } catch (error) {
    // 捕獲所有可能的錯誤
    const translationError = error instanceof TranslationError
      ? error
      : new TranslationError(
          `Translation error for key "${key}": ${error instanceof Error ? error.message : String(error)}`,
          key,
          language,
          params
        );

    if (onError) {
      onError(translationError);
    } else {
      console.error(translationError.message);
    }
    return key; // 返回 key 作為安全 fallback
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'en',
  storageKey = 'language',
  translations: customTranslations,
  onError,
  loadTranslationsOnDemand = false,
  translationsModules = {}
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<TranslationDictionary>(
    customTranslations || coreTranslations
  );
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TranslationError | null>(null);

  // 追蹤已載入的模組
  const loadedModulesRef = useRef<Set<string>>(new Set());

  // 處理錯誤的函數
  const handleError = useCallback((error: TranslationError) => {
    setError(error);
    if (onError) {
      onError(error);
    } else {
      console.error(error.message);
    }
  }, [onError]);

  // 添加翻譯
  const addTranslations = useCallback((newTranslations: TranslationDictionary) => {
    setTranslations(prev => ({
      ...prev,
      ...newTranslations
    }));
  }, []);

  // 動態載入翻譯模組
  const loadTranslations = useCallback(async (moduleName: string) => {
    if (loadedModulesRef.current.has(moduleName)) {
      return; // 已載入，避免重複載入
    }

    const moduleLoader = translationsModules[moduleName];
    if (!moduleLoader) {
      handleError(new TranslationError(`Translation module "${moduleName}" not found`));
      return;
    }

    try {
      setIsLoading(true);
      const module = await moduleLoader();
      addTranslations(module.default);
      loadedModulesRef.current.add(moduleName);
    } catch (error) {
      handleError(new TranslationError(
        `Failed to load translation module "${moduleName}": ${error instanceof Error ? error.message : String(error)}`
      ));
    } finally {
      setIsLoading(false);
    }
  }, [translationsModules, handleError, addTranslations]);

  // 在客戶端 mounted 後初始化 language
  useEffect(() => {
    setMounted(true);

    // 從 localStorage 讀取 language
    const storedLanguage = getLanguageFromLocalStorage(storageKey);

    if (storedLanguage) {
      setLanguageState(storedLanguage);
    } else {
      // 使用瀏覽器偏好
      const browserLanguage = getBrowserLanguage();
      setLanguageState(browserLanguage);
      // 保存瀏覽器偏好到 localStorage
      setLanguageToLocalStorage(storageKey, browserLanguage);
    }
  }, [storageKey]);

  // 應用 language 到 html 標籤和保存到 localStorage
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const html = document.documentElement;

    // 設置 lang 屬性
    html.lang = language;

    // 設置 dir 屬性為 ltr（左到右）
    // 如果需要支援 RTL 語言，可以在 Language 類型中添加 'ar' 等語言
    html.dir = 'ltr';

    // 保存 language 偏好
    setLanguageToLocalStorage(storageKey, language);
  }, [language, mounted, storageKey]);

  // 主要翻譯函數
  const t = useCallback((key: string, params?: TranslationParams) => {
    return translate(key, translations, language, params, handleError);
  }, [translations, language, handleError]);

  // 安全的翻譯函數，返回詳細資訊
  const tSafe = useCallback((key: string, params?: TranslationParams) => {
    let error: TranslationError | undefined;
    const result = translate(key, translations, language, params, (err) => {
      error = err;
    });
    return { text: result, error };
  }, [translations, language]);

  // 切換語言
  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'zh' ? 'en' : 'zh');
  }, []);

  // 設置語言
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
  }, []);

  // 使用 useMemo 優化 context value
  const contextValue = useMemo(() => ({
    language,
    translations,
    t,
    tSafe,
    toggleLanguage,
    setLanguage,
    addTranslations,
    loadTranslations,
    isLoading,
    error
  }), [
    language,
    translations,
    t,
    tSafe,
    toggleLanguage,
    setLanguage,
    addTranslations,
    loadTranslations,
    isLoading,
    error
  ]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper hook for specific translation needs
export const useTranslation = () => {
  const { t } = useLanguage();
  return t;
};

// Helper hook for safe translation needs
export const useTranslationSafe = () => {
  const { tSafe } = useLanguage();
  return tSafe;
};

// Helper hook for language detection and switching
export const useLanguageSwitcher = () => {
  const { language, toggleLanguage, setLanguage } = useLanguage();

  // 自動檢測瀏覽器語言並設置
  const detectAndSetBrowserLanguage = useCallback(() => {
    const browserLanguage = getBrowserLanguage();
    setLanguage(browserLanguage);
    return browserLanguage;
  }, [setLanguage]);

  return {
    language,
    toggleLanguage,
    setLanguage,
    detectAndSetBrowserLanguage
  };
};