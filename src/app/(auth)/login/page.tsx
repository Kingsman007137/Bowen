'use client';

/**
 * 登录页面
 * 暂时使用伪登录，直接跳转到笔记架
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/hooks/useTheme';
import { initSeedData } from '@/lib/seedData';

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme, initTheme } = useThemeStore();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 初始化主题和示例数据
  useEffect(() => {
    initTheme();
    initSeedData();
  }, [initTheme]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert('请输入用户名');
      return;
    }

    setIsLoading(true);
    
    // 模拟登录延迟
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // 保存登录状态
    localStorage.setItem('user', JSON.stringify({ username: username.trim() }));
    
    // 跳转到笔记架
    router.push('/shelf');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 transition-colors duration-300"></div>
      </div>

      {/* 主题切换按钮 */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-colors shadow-lg"
        title={theme === 'dark' ? '切换到白天模式' : '切换到黑夜模式'}
      >
        <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">
          {theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      {/* 登录表单 */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-800/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              玻文卡片笔记
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              基于卡片式思维的笔记管理软件
            </p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                用户名
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  person
                </span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    progress_activity
                  </span>
                  登录中...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">
                    login
                  </span>
                  登录
                </>
              )}
            </button>
          </form>

          {/* 提示信息 */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              MVP版本暂时使用伪登录，输入任意用户名即可进入
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

