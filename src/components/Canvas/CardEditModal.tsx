'use client';

/**
 * 卡片编辑弹窗组件
 * 卡片居中放大到画布80%，保持原有样式（毛玻璃效果、颜色等）
 */

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Card } from '@/types/card';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import TiptapEditor from '@/components/Editor/TiptapEditor';
import { Check, X } from 'lucide-react';

interface CardEditModalProps {
  card: Card;
  onClose: () => void;
}

export default function CardEditModal({ card, onClose }: CardEditModalProps) {
  const { updateCard } = useCanvasStore();
  
  const [title, setTitle] = useState(card.title || '');
  const [content, setContent] = useState(card.content || '');
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  // 打开动画
  useEffect(() => {
    // 延迟触发动画，确保从 scale-0 开始
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    updateCard(card.id, {
      title,
      content,
    });
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsClosing(true);
    // 等待缩小动画完成后关闭
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <>
      {/* 背景遮罩 - 虚化背景，保持原画布颜色 */}
      <div
        className={`fixed inset-0 backdrop-blur-md z-[9998] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // 轻微变暗，不影响卡片颜色
        }}
      />

      {/* 放大的卡片 - 居中显示，90%大小 */}
      <div
        className={`glass-card rounded-xl shadow-2xl flex flex-col fixed z-[9999] w-[90vw] h-[90vh] transition-all duration-300 origin-center ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{
          left: '5vw',
          top: '5vh',
        }}
      >
        {/* 操作按钮 - 右上角 */}
        <div className="absolute -top-3 -right-3 flex gap-2 z-10">
          <button
            onClick={handleSave}
            className="p-2.5 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform"
            title="保存"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={handleClose}
            className="p-2.5 rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition-transform"
            title="关闭 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 flex flex-col p-8 overflow-hidden">
          {/* 标题输入 */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-0 py-3 mb-4 text-2xl font-bold border-0 border-b-2 border-gray-300/50 dark:border-gray-600/50 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary/70 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            placeholder="输入卡片标题..."
            autoFocus
          />

          {/* 富文本编辑器 - 适配毛玻璃背景 */}
          <div className="flex-1 overflow-hidden">
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="开始输入内容..."
            />
          </div>
        </div>
      </div>
    </>
  );

  // 使用 Portal 渲染到 body，确保覆盖整个屏幕
  return createPortal(modalContent, document.body);
}



