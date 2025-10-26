'use client';

/**
 * 侧边栏组件
 * 用于主应用布局（笔记架、画布页面）
 */

import { useThemeStore } from '@/hooks/useTheme';

interface SidebarProps {
  onNewNotebook?: () => void;
  onNewFolder?: () => void;
}

export default function Sidebar({ onNewNotebook, onNewFolder }: SidebarProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex flex-col h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* 头部 */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          玻文笔记
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={theme === 'dark' ? '切换到白天模式' : '切换到黑夜模式'}
        >
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>

      {/* 操作按钮 */}
      <div className="p-4 space-y-3">
        <button
          onClick={onNewNotebook}
          className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined mr-2 text-lg">add</span>
          新建笔记
        </button>
        <button
          onClick={onNewFolder}
          className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="material-symbols-outlined mr-2 text-lg">
            create_new_folder
          </span>
          新建文件夹
        </button>
      </div>

      {/* 导航 */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-1">
          <a
            href="/shelf"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary"
          >
            <span className="material-symbols-outlined text-xl">
              description
            </span>
            <span className="text-sm font-medium">所有笔记</span>
          </a>
          <a
            href="/shelf?filter=recent"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">schedule</span>
            <span className="text-sm font-medium">最近使用</span>
          </a>
          <a
            href="/shelf?filter=trash"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">delete</span>
            <span className="text-sm font-medium">回收站</span>
          </a>
        </div>
      </nav>

      {/* 用户信息 */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
              用户名
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              user@email.com
            </p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-xl">
              settings
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

