'use client';

import { useTheme, ThemeToggle } from '@/components/context';

export default function ThemeTestPage() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Theme Context 測試頁面</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border-border border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">當前狀態</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg">當前主題：</span>
                <span className={`px-3 py-1 rounded-full font-medium ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-yellow-100 text-yellow-800'}`}>
                  {theme === 'dark' ? '🌙 深色模式' : '☀️ 淺色模式'}
                </span>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-2">CSS 變數值：</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <div className="font-mono">--background</div>
                    <div className="text-muted">背景顏色</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <div className="font-mono">--foreground</div>
                    <div className="text-muted">文字顏色</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <div className="font-mono">--card</div>
                    <div className="text-muted">卡片背景</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <div className="font-mono">--border</div>
                    <div className="text-muted">邊框顏色</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border-border border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">主題控制</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  切換主題
                </button>
                <div className="flex-shrink-0">
                  <ThemeToggle />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>☀️</span>
                  <span>設為淺色</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>🌙</span>
                  <span>設為深色</span>
                </button>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-2">測試元素</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-border rounded-lg">
                    這是一個帶邊框的測試卡片
                  </div>
                  <div className="p-4 glass rounded-lg">
                    這是一個玻璃態效果卡片
                  </div>
                  <button className="hover-lift p-4 w-full bg-card border border-border rounded-lg hover:shadow-lg">
                    懸浮效果按鈕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border-border border rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">功能說明</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium text-lg mb-2">✅ SSR 安全</h3>
                <p className="text-muted">不會在伺服器端訪問 localStorage 或 window 物件</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium text-lg mb-2">✅ 系統主題跟隨</h3>
                <p className="text-muted">自動跟隨作業系統深色/淺色模式設定</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium text-lg mb-2">✅ 錯誤處理</h3>
                <p className="text-muted">完整的 localStorage 操作錯誤處理</p>
              </div>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-lg mb-2">使用方式</h3>
              <pre className="font-mono text-sm bg-black text-white p-4 rounded overflow-x-auto">
{`// 在任何客戶端元件中使用
'use client';

import { useTheme } from '@/components/context';

export function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>當前主題: {theme}</p>
      <button onClick={toggleTheme}>切換主題</button>
    </div>
  );
}`}</pre>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-muted">
          <p>刷新頁面或重新開啟瀏覽器來測試主題的持久化功能</p>
          <p className="text-sm mt-2">主題設定會儲存在 localStorage 中</p>
        </div>
      </div>
    </div>
  );
}