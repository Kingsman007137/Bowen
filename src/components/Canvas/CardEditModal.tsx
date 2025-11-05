'use client';

/**
 * 卡片编辑弹窗组件
 * 提供全屏卡片编辑，背景虚化效果
 */

import { useState, useEffect } from 'react';
import type { Card } from '@/types/card';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import TiptapEditor from '@/components/Editor/TiptapEditor';
import { X } from 'lucide-react';

interface CardEditModalProps {
  card: Card;
  onClose: () => void;
}

export default function CardEditModal({ card, onClose }: CardEditModalProps) {
  const { updateCard } = useCanvasStore();
  
  const [title, setTitle] = useState(card.title || '');
  const [content, setContent] = useState(card.content || '');

  const handleSave = () => {
    updateCard(card.id, {
      title,
      content,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] animate-fade-in"
      onClick={handleCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col animate-scale-in mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部工具栏 */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            编辑卡片
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="关闭 (ESC)"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* 标题输入 */}
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-0 py-3 text-3xl font-bold border-0 border-b-2 border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-600"
              placeholder="输入卡片标题..."
            />
          </div>

          {/* 富文本编辑器 */}
          <div className="rounded-xl overflow-hidden shadow-sm">
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="开始输入内容，支持插入图片、引用块、列表等..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}



