'use client';

import * as React from 'react';
import { useLanguage } from './index';
import { useTheme } from './index';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme } = useTheme();

  // 根據當前主題和語言設定樣式
  const buttonClasses = `
    px-3 py-2 rounded-lg transition-all duration-300
    ${theme === 'dark'
      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300'
    }
    flex items-center justify-center gap-2 min-w-[100px] border font-medium
  `;

  const iconClasses = `
    transition-transform duration-300
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
  `;

  return (
    <button
      onClick={toggleLanguage}
      className={buttonClasses}
      aria-label={t('language.switch')}
      title={t('language.switch')}
    >
      {/* 中文圖示 */}
      {language === 'zh' ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 ${iconClasses}`}
          >
            <path d="M9 2.25C9 1.83579 9.33579 1.5 9.75 1.5H14.25C14.6642 1.5 15 1.83579 15 2.25V3.75C15 4.16421 14.6642 4.5 14.25 4.5H9.75C9.33579 4.5 9 4.16421 9 3.75V2.25Z" />
            <path fillRule="evenodd" d="M6 4.5H18C18.8284 4.5 19.5 5.17157 19.5 6V12C19.5 12.8284 18.8284 13.5 18 13.5H6C5.17157 13.5 4.5 12.8284 4.5 12V6C4.5 5.17157 5.17157 4.5 6 4.5ZM6.75 6C6.75 5.58579 7.08579 5.25 7.5 5.25C7.91421 5.25 8.25 5.58579 8.25 6V10.5C8.25 10.9142 7.91421 11.25 7.5 11.25C7.08579 11.25 6.75 10.9142 6.75 10.5V6ZM10.5 8.25C10.0858 8.25 9.75 8.58579 9.75 9C9.75 9.41421 10.0858 9.75 10.5 9.75H13.5C13.9142 9.75 14.25 9.41421 14.25 9C14.25 8.58579 13.9142 8.25 13.5 8.25H10.5Z" clipRule="evenodd" />
            <path d="M6 19.5C5.17157 19.5 4.5 18.8284 4.5 18V15H3C2.58579 15 2.25 14.6642 2.25 14.25V13.5C2.25 13.0858 2.58579 12.75 3 12.75H4.5V9.75H3C2.58579 9.75 2.25 9.41421 2.25 9V8.25C2.25 7.83579 2.58579 7.5 3 7.5H4.5V6C4.5 5.17157 5.17157 4.5 6 4.5H6.75V7.5H9.75V4.5H10.5V10.5H13.5V4.5H14.25V7.5H17.25V4.5H18C18.8284 4.5 19.5 5.17157 19.5 6V7.5H21C21.4142 7.5 21.75 7.83579 21.75 8.25V9C21.75 9.41421 21.4142 9.75 21 9.75H19.5V12.75H21C21.4142 12.75 21.75 13.0858 21.75 13.5V14.25C21.75 14.6642 21.4142 15 21 15H19.5V18C19.5 18.8284 18.8284 19.5 18 19.5H14.25V16.5H13.5V19.5H10.5V16.5H9.75V19.5H6Z" />
          </svg>
          <span>{t('language.zh')}</span>
        </>
      ) : (
        <>
          {/* 英文圖示 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 ${iconClasses}`}
          >
            <path d="M3.75 2.25C3.75 1.83579 4.08579 1.5 4.5 1.5H6.75C7.16421 1.5 7.5 1.83579 7.5 2.25V3.75C7.5 4.16421 7.16421 4.5 6.75 4.5H4.5C4.08579 4.5 3.75 4.16421 3.75 3.75V2.25Z" />
            <path fillRule="evenodd" d="M1.5 6C1.5 5.17157 2.17157 4.5 3 4.5H21C21.8284 4.5 22.5 5.17157 22.5 6V18C22.5 18.8284 21.8284 19.5 21 19.5H3C2.17157 19.5 1.5 18.8284 1.5 18V6ZM3 6C3 5.58579 3.33579 5.25 3.75 5.25H20.25C20.6642 5.25 21 5.58579 21 6V18C21 18.4142 20.6642 18.75 20.25 18.75H3.75C3.33579 18.75 3 18.4142 3 18V6Z" clipRule="evenodd" />
            <path d="M11.25 7.5C10.8358 7.5 10.5 7.83579 10.5 8.25V9H9.75C9.33579 9 9 9.33579 9 9.75C9 10.1642 9.33579 10.5 9.75 10.5H10.5V11.25C10.5 11.6642 10.8358 12 11.25 12C11.6642 12 12 11.6642 12 11.25V10.5H12.75C13.1642 10.5 13.5 10.1642 13.5 9.75C13.5 9.33579 13.1642 9 12.75 9H12V8.25C12 7.83579 11.6642 7.5 11.25 7.5Z" />
            <path d="M17.25 12C16.8358 12 16.5 12.3358 16.5 12.75V13.5H15.75C15.3358 13.5 15 13.8358 15 14.25C15 14.6642 15.3358 15 15.75 15H16.5V15.75C16.5 16.1642 16.8358 16.5 17.25 16.5C17.6642 16.5 18 16.1642 18 15.75V15H18.75C19.1642 15 19.5 14.6642 19.5 14.25C19.5 13.8358 19.1642 13.5 18.75 13.5H18V12.75C18 12.3358 17.6642 12 17.25 12Z" />
          </svg>
          <span>{t('language.en')}</span>
        </>
      )}
    </button>
  );
};

// 簡單版本 - 只有文字
export const SimpleLanguageToggle: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-md bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
      aria-label={t('language.switch')}
    >
      {language === 'zh' ? 'EN' : '中文'}
    </button>
  );
};