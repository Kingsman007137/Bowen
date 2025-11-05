'use client';

/**
 * 文件夹卡片组件
 * 显示3D文件夹图标和文件夹信息
 */

import type { Folder } from '@/types';
import { Edit2, Trash2 } from 'lucide-react';

interface FolderCardProps {
  folder: Folder;
  onClick?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
}

export default function FolderCard({ folder, onClick, onRename, onDelete }: FolderCardProps) {
  return (
    <div className="item-wrapper" onClick={onClick}>
      <div className="folder-wrapper relative">
        {/* 3D文件夹图标 */}
        <div className="folder-icon-3d">
          <div className="folder-body">
            <div className="folder-tab"></div>
          </div>
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
            zIndex: 10,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename?.();
            }}
            className="p-1.5 hover:scale-125 transition-transform bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-md"
            title="重命名"
          >
            <Edit2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="p-1.5 hover:scale-125 transition-transform bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-md"
            title="删除"
          >
            <Trash2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* 标题和笔记数量信息 */}
      <div style={{ marginTop: '12px', padding: '0 4px' }}>
        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
          {folder.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {folder.notebookCount} 个笔记
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

