'use client';

import { useLanguage, useTranslation, LanguageToggle, SimpleLanguageToggle } from '@/components/context';

export default function LanguageTestPage() {
  const { language, t, toggleLanguage, setLanguage } = useLanguage();
  const t2 = useTranslation(); // 簡化版本

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            語言上下文測試頁面
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            測試 LanguageContext 的多語言功能和翻譯系統
          </p>
        </header>

        {/* 語言切換器展示 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            語言切換元件
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                完整版本 LanguageToggle
              </h3>
              <div className="flex justify-center">
                <LanguageToggle />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                包含圖示和完整文字，根據當前主題適配樣式
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                簡單版本 SimpleLanguageToggle
              </h3>
              <div className="flex justify-center">
                <SimpleLanguageToggle />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                只有文字，更簡潔的設計
              </p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              手動語言控制
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setLanguage('zh')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                設為中文
              </button>
              <button
                onClick={() => setLanguage('en')}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Set to English
              </button>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                切換語言 / Switch Language
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              當前語言: <span className="font-semibold">{language === 'zh' ? '中文' : 'English'}</span>
            </p>
          </div>
        </section>

        {/* 翻譯展示 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            翻譯功能展示
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 基本翻譯 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                基本翻譯
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">導航項目:</p>
                  <p className="text-lg">{t('nav.home')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">key: 'nav.home'</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">按鈕文字:</p>
                  <p className="text-lg">{t('button.contact')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">key: 'button.contact'</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">頁面標題:</p>
                  <p className="text-lg">{t('hero.title')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">key: 'hero.title'</p>
                </div>
              </div>
            </div>

            {/* 參數化翻譯 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                參數化翻譯
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">版權聲明:</p>
                  <p className="text-lg">{t('footer.copyright', { year: 2024 })}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    key: 'footer.copyright', params: {'{'} year: 2024 {'}'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">自定義參數:</p>
                  <p className="text-lg">
                    {t('footer.copyright', { year: new Date().getFullYear() })}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    動態年份: {new Date().getFullYear()}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                  使用 useTranslation() Hook
                </h4>
                <p className="text-lg text-blue-900 dark:text-blue-200">
                  {t2('title.welcome')}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
                  useTranslation() 返回簡化的翻譯函數
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 翻譯字典列表 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            預設翻譯字典分類
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* 導航欄 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">導航欄</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>nav.home</li>
                  <li>nav.about</li>
                  <li>nav.services</li>
                  <li>nav.portfolio</li>
                  <li>nav.contact</li>
                </ul>
              </div>

              {/* 主題相關 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">主題相關</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>theme.toggle</li>
                  <li>theme.light</li>
                  <li>theme.dark</li>
                </ul>
              </div>

              {/* 語言相關 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">語言相關</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>language.switch</li>
                  <li>language.zh</li>
                  <li>language.en</li>
                </ul>
              </div>

              {/* 按鈕文字 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">按鈕文字</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>button.more</li>
                  <li>button.view</li>
                  <li>button.contact</li>
                  <li>button.submit</li>
                  <li>button.cancel</li>
                </ul>
              </div>

              {/* 頁面標題 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">頁面標題</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>title.welcome</li>
                  <li>title.about</li>
                  <li>title.services</li>
                  <li>title.portfolio</li>
                </ul>
              </div>

              {/* 通用文字 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">通用文字</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>text.loading</li>
                  <li>text.error</li>
                  <li>text.success</li>
                  <li>text.no_data</li>
                </ul>
              </div>

              {/* Hero 區域 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hero 區域</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>hero.title</li>
                  <li>hero.subtitle</li>
                </ul>
              </div>

              {/* 頁腳 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">頁腳</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>footer.copyright</li>
                  <li>footer.privacy</li>
                  <li>footer.terms</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-300">
                總計: <span className="font-semibold">超過 40 個預設翻譯</span>
              </p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                支援動態添加新的翻譯，可根據需求擴展
              </p>
            </div>
          </div>
        </section>

        {/* 技術資訊 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            技術資訊
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  主要特性
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    SSR 安全，支援伺服器端渲染
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    自動偵測瀏覽器語言
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    支援參數化翻譯 (t('key', {'{'}param: value{'}'}))
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    動態翻譯字典，可擴展
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    自動設置 HTML lang 屬性
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    完整的 TypeScript 類型支援
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  使用方式
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="font-mono text-sm text-gray-800 dark:text-gray-300">
                      {'const { language, t } = useLanguage();'}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="font-mono text-sm text-gray-800 dark:text-gray-300">
                      {'const t = useTranslation(); // 簡化版本'}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="font-mono text-sm text-gray-800 dark:text-gray-300">
                      {"t('key', { year: 2024 })"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
                檔案位置
              </h4>
              <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-400">
                <li>/components/context/LanguageContext.tsx - 主要 Context 實現</li>
                <li>/components/context/LanguageToggle.tsx - 語言切換元件</li>
                <li>/components/context/index.tsx - 匯出入口</li>
                <li>/components/context/README.md - 詳細文件</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                測試頁面用於展示 LanguageContext 功能
              </p>
            </div>
            <div className="flex gap-4">
              <SimpleLanguageToggle />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}