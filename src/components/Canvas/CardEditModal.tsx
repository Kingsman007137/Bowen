'use client';

/**
 * 卡片编辑弹窗组件
 * 提供卡片标题、内容、颜色编辑功能
 */

import { useState, useEffect } from 'react';
import type { Card } from '@/types/card';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import { CARD_GRADIENT_COLORS } from '@/lib/constants';
import TiptapEditor from '@/components/Editor/TiptapEditor';

interface CardEditModalProps {
  card: Card;
  onClose: () => void;
}

export default function CardEditModal({ card, onClose }: CardEditModalProps) {
  const { updateCard } = useCanvasStore();
  
  const [title, setTitle] = useState(card.title || '');
  const [content, setContent] = useState(card.content || '');
  const [color, setColor] = useState(card.color || 'blue');

  const handleSave = () => {
    updateCard(card.id, {
      title,
      content,
      color,
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-fade-in"
      onClick={handleCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            编辑卡片
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="关闭"
          >
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
              close
            </span>
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* 标题输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="输入卡片标题"
            />
          </div>

          {/* 颜色选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              卡片颜色
            </label>
            <div className="flex flex-wrap gap-3">
              {Object.entries(CARD_GRADIENT_COLORS).map(([key, gradient]) => (
                <button
                  key={key}
                  onClick={() => setColor(key)}
                  className={`w-12 h-12 rounded-lg transition-all ${
                    color === key
                      ? 'ring-4 ring-primary scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${gradient.start}, ${gradient.end})`,
                  }}
                  title={key}
                />
              ))}
            </div>
          </div>

          {/* 富文本编辑器 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              内容
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <TiptapEditor
                content={content}
                onChange={setContent}
                placeholder="输入卡片内容..."
              />
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}



