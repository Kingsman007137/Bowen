'use client';

/**
 * 主页面
 * 根据登录状态重定向到登录页或笔记架页面
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 检查登录状态
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        // 已登录，跳转到笔记架
        router.replace('/shelf');
      } else {
        // 未登录，跳转到登录页
        router.replace('/login');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="material-symbols-outlined text-6xl text-primary animate-spin">
          progress_activity
        </span>
        <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
      </div>
    </div>
  );
}
