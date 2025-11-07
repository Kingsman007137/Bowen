/**
 * 主题状态管理
 * 管理白天/黑夜模式切换
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // 立即应用主题到 DOM
        applyTheme(newTheme);
        
        // 更新状态
        set({ theme: newTheme });
      },
      
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      
      initTheme: () => {
        // 在客户端初始化主题
        if (typeof window !== 'undefined') {
          const savedTheme = localStorage.getItem('theme-storage');
          if (savedTheme) {
            try {
              const parsed = JSON.parse(savedTheme);
              const theme = parsed.state?.theme || 'light';
              applyTheme(theme);
              set({ theme });
            } catch {
              // 如果解析失败，使用系统偏好
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = prefersDark ? 'dark' : 'light';
              applyTheme(theme);
              set({ theme });
            }
          } else {
            // 使用系统偏好
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = prefersDark ? 'dark' : 'light';
            applyTheme(theme);
            set({ theme });
          }
        }
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

/**
 * 应用主题到文档
 */
function applyTheme(theme: Theme) {
  if (typeof window !== 'undefined') {
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
