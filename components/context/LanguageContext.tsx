'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

export type Language = 'zh' | 'en';

// 定義翻譯字典類型
interface TranslationDictionary {
  [key: string]: {
    zh: string;
    en: string;
  };
}

// 預設翻譯字典 - 可以從外部匯入或擴展
const defaultTranslations: TranslationDictionary = {
  // 導航欄
  'nav.home': {
    zh: '首頁',
    en: 'Home'
  },
  'nav.about': {
    zh: '關於',
    en: 'About'
  },
  'nav.services': {
    zh: '服務',
    en: 'Services'
  },
  'nav.portfolio': {
    zh: '作品集',
    en: 'Portfolio'
  },
  'nav.contact': {
    zh: '聯絡',
    en: 'Contact'
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

  // 按鈕
  'button.more': {
    zh: '了解更多',
    en: 'Learn More'
  },
  'button.view': {
    zh: '查看詳情',
    en: 'View Details'
  },
  'button.contact': {
    zh: '聯絡我們',
    en: 'Contact Us'
  },
  'button.submit': {
    zh: '提交',
    en: 'Submit'
  },
  'button.cancel': {
    zh: '取消',
    en: 'Cancel'
  },

  // 頁面標題
  'title.welcome': {
    zh: '歡迎來到我們的網站',
    en: 'Welcome to Our Website'
  },
  'title.about': {
    zh: '關於我們',
    en: 'About Us'
  },
  'title.services': {
    zh: '我們的服務',
    en: 'Our Services'
  },
  'title.portfolio': {
    zh: '作品展示',
    en: 'Portfolio'
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
  'text.no_data': {
    zh: '暫無數據',
    en: 'No data available'
  },

  // Hero 區域
  'hero.title': {
    zh: '創造卓越的數位體驗',
    en: 'Creating Exceptional Digital Experiences'
  },
  'hero.subtitle': {
    zh: '我們提供專業的網站開發、UI/UX設計和技術解決方案',
    en: 'We provide professional web development, UI/UX design, and technical solutions'
  },

  // 關於區域
  'about.title': {
    zh: '關於我們',
    en: 'About Us'
  },
  'about.description': {
    zh: '我們是一支專業的技術團隊，專注於為客戶提供高品質的數位解決方案。',
    en: 'We are a professional technical team focused on providing high-quality digital solutions for our clients.'
  },

  // 服務區域
  'service.web_dev': {
    zh: '網站開發',
    en: 'Web Development'
  },
  'service.ui_ux': {
    zh: 'UI/UX 設計',
    en: 'UI/UX Design'
  },
  'service.mobile': {
    zh: '行動應用',
    en: 'Mobile Applications'
  },
  'service.seo': {
    zh: 'SEO 優化',
    en: 'SEO Optimization'
  },

  // 頁腳
  'footer.copyright': {
    zh: '版權所有 © {year}',
    en: 'Copyright © {year}'
  },
  'footer.privacy': {
    zh: '隱私政策',
    en: 'Privacy Policy'
  },
  'footer.terms': {
    zh: '使用條款',
    en: 'Terms of Use'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
  translations?: TranslationDictionary;
}

interface LanguageContextType {
  language: Language;
  translations: TranslationDictionary;
  t: (key: string, params?: Record<string, string | number>) => string;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  addTranslations: (newTranslations: TranslationDictionary) => void;
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

// 翻譯函數
const translate = (
  key: string,
  translations: TranslationDictionary,
  language: Language,
  params?: Record<string, string | number>
): string => {
  const translation = translations[key];

  if (!translation) {
    console.warn(`Translation key not found: ${key}`);
    return key; // 返回 key 作為 fallback
  }

  let text = translation[language] || translation['en'] || key;

  // 替換參數
  if (params) {
    Object.keys(params).forEach(paramKey => {
      const paramValue = params[paramKey];
      text = text.replace(`{${paramKey}}`, String(paramValue));
    });
  }

  return text;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'en',
  storageKey = 'language',
  translations: customTranslations
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<TranslationDictionary>(
    customTranslations || defaultTranslations
  );
  const [mounted, setMounted] = useState(false);

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

  // 翻譯函數
  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    return translate(key, translations, language, params);
  }, [translations, language]);

  // 切換語言
  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'zh' ? 'en' : 'zh');
  }, []);

  // 設置語言
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
  }, []);

  // 添加翻譯
  const addTranslations = useCallback((newTranslations: TranslationDictionary) => {
    setTranslations(prev => ({
      ...prev,
      ...newTranslations
    }));
  }, []);

  // 使用 useMemo 優化 context value
  const contextValue = useMemo(() => ({
    language,
    translations,
    t,
    toggleLanguage,
    setLanguage,
    addTranslations
  }), [language, translations, t, toggleLanguage, setLanguage, addTranslations]);

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