'use client';

/**
 * 导航栏组件
 * 包含 Logo、标题、新建卡片按钮、主题切换按钮
 */

import { useTheme } from '@/hooks/useTheme';

interface NavbarProps {
  onAddCard?: () => void;
}

export default function Navbar({ onAddCard }: NavbarProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 border-b border-border-color">
      <div className="glass-card h-full rounded-none flex items-center justify-between px-6">
        {/* 左侧：Logo + 标题 */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gradient-blue-start to-gradient-blue-end flex items-center justify-center text-white font-bold text-sm">
            B
          </div>
          <h1 className="text-lg font-semibold text-foreground-title">
            Bowen
          </h1>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="flex items-center gap-3">
          {/* 新建卡片按钮 */}
          <button
            onClick={onAddCard}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end text-white hover:scale-105 active:scale-95 transition-transform shadow-md hover:shadow-lg"
            type="button"
            aria-label="新建卡片"
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>新建卡片</span>
            </span>
          </button>

          {/* 主题切换按钮 */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:scale-110 active:scale-95 transition-all hover:rotate-12"
              type="button"
              aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
              title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
            >
              {theme === 'light' ? (
                // 太阳图标
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                // 月亮图标
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

