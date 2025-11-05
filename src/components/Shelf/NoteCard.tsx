'use client';

/**
 * 笔记卡片组件
 * 显示笔记封面、名称、卡片数量等信息
 */

import { getGradientStyle } from '@/lib/constants';
import type { Notebook } from '@/types';
import { Edit2, Trash2 } from 'lucide-react';

interface NoteCardProps {
  notebook: Notebook;
  onClick?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
}

export default function NoteCard({ notebook, onClick, onRename, onDelete }: NoteCardProps) {
  const gradientStyle = getGradientStyle(notebook.gradient);
  
  // 格式化日期
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="item-wrapper" onClick={onClick}>
      <div className="relative">
        {/* 笔记封面 */}
        <div
          className="note-cover p-4 flex flex-col justify-end"
          style={{ background: gradientStyle }}
        >
          <p className="text-white font-semibold text-sm mb-1">
            {notebook.name}
          </p>
          <p className="text-white/80 text-xs">{notebook.cardCount} 张卡片</p>
        </div>

        {/* 操作按钮组 */}
        <div
          className="action-buttons flex gap-1"
          style={{ 
            position: 'absolute',
            top: '6px',
            right: '6px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename?.();
            }}
            className="p-1.5 hover:scale-125 transition-transform bg-white/20 backdrop-blur-sm rounded-md"
            title="重命名"
          >
            <Edit2 className="w-4 h-4 text-white drop-shadow-lg" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="p-1.5 hover:scale-125 transition-transform bg-white/20 backdrop-blur-sm rounded-md"
            title="删除"
          >
            <Trash2 className="w-4 h-4 text-white drop-shadow-lg" />
          </button>
        </div>
      </div>

      {/* 标题和时间信息 */}
      <div style={{ marginTop: '12px', padding: '0 4px' }}>
        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
          {notebook.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {formatDate(notebook.updatedAt)}
        </p>
      </div>

      <style jsx>{`
        .item-wrapper:hover .action-buttons {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}

