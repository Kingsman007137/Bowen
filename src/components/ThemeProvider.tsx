'use client';

/**
 * 主题提供者组件
 * 确保主题在客户端正确初始化
 */

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/hooks/useTheme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { initTheme } = useThemeStore();

  useEffect(() => {
    // 初始化主题
    initTheme();
    setMounted(true);
  }, [initTheme]);

  // 防止服务端渲染不匹配
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

