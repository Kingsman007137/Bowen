'use client';

/**
 * Toast 通知组件
 * 用于显示操作反馈信息
 */

import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning',
  };

  return (
    <div className="fixed top-6 right-6 z-[100] animate-scale-in">
      <div className={`${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <span className="material-symbols-outlined">{icons[type]}</span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
}




