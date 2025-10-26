'use client';

/**
 * 卡片节点组件
 * 自定义 React Flow 节点，实现毛玻璃效果
 */

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { Card } from '@/types/card';
import CardEditModal from './CardEditModal';
import { useState } from 'react';

export interface CardNodeData {
  card: Card;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function CardNode({ data }: NodeProps<CardNodeData>) {
  const { card, onDelete } = data;
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    onDelete(card.id);
  };

  // 格式化内容（去除HTML标签）
  const getPlainText = (html: string) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const displayContent = card.content ? getPlainText(card.content) : '点击编辑按钮编辑内容...';

  return (
    <>
      <div className="group">
        {/* 毛玻璃卡片 - 参考原型图样式 */}
        <div className="glass-card w-[300px] rounded-xl cursor-grab active:cursor-grabbing transition-all duration-300 hover:ring-2 hover:ring-primary/50">
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              {card.title || '新卡片'}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words">
              {displayContent}
            </p>
          </div>
          
          {/* 操作按钮 - 悬停显示 */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform"
              title="编辑"
            >
              <span className="material-symbols-rounded text-sm">edit</span>
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition-transform"
              title="删除"
            >
              <span className="material-symbols-rounded text-sm">delete</span>
            </button>
          </div>
        </div>

        {/* React Flow 连接点 - 隐藏 */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-2 !h-2 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 group-hover:!opacity-100 transition-opacity"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-2 !h-2 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 group-hover:!opacity-100 transition-opacity"
        />
      </div>

      {/* 编辑弹窗 */}
      {showEditModal && (
        <CardEditModal
          card={card}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}

export default memo(CardNode);

