'use client';

/**
 * 卡片节点组件
 * 自定义 React Flow 节点，实现毛玻璃效果
 */

import { memo, useState } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { Card } from '@/types/card';
import CardEditModal from './CardEditModal';
import { Pencil, Trash2 } from 'lucide-react';

export interface CardNodeData extends Record<string, unknown> {
  card: Card;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export type CardNodeType = Node<CardNodeData, 'card'>;

function CardNode({ data }: NodeProps<CardNodeType>) {
  const { card, onDelete } = data;
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    onDelete(card.id);
  };

  const displayContent = card.content || '<p class="text-gray-500 dark:text-gray-400 italic">点击编辑按钮编辑内容...</p>';

  return (
    <>
      <div className="group">
        {/* 毛玻璃卡片 - 参考原型图样式 */}
        <div className="glass-card w-[300px] rounded-xl cursor-grab active:cursor-grabbing transition-all duration-300 hover:ring-2 hover:ring-primary/50">
          <div className="p-5 flex flex-col max-h-[500px]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 flex-shrink-0">
              {card.title || '新卡片'}
            </h3>
            {/* 显示HTML格式内容，支持滚动 */}
            <div 
              className="card-content text-sm text-gray-700 dark:text-gray-200 max-w-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500"
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />
          </div>
          
          {/* 操作按钮 - 悬停显示 */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform"
              title="编辑"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition-transform"
              title="删除"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* React Flow 连接点 - 上下左右四个方向，选中卡片时显示 */}
        <Handle
          type="source"
          position={Position.Top}
          id="top"
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 group-hover:!opacity-100 transition-opacity !rounded-full"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 group-hover:!opacity-100 transition-opacity !rounded-full"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 group-hover:!opacity-100 transition-opacity !rounded-full"
        />
        <Handle
          type="source"
          position={Position.Left}
          id="left"
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 group-hover:!opacity-100 transition-opacity !rounded-full"
        />
        
        {/* Target handles - 允许接收连线 */}
        <Handle
          type="target"
          position={Position.Top}
          id="top-target"
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 transition-opacity !rounded-full"
        />
        <Handle
          type="target"
          position={Position.Right}
          id="right-target"
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 transition-opacity !rounded-full"
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="bottom-target"
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 transition-opacity !rounded-full"
        />
        <Handle
          type="target"
          position={Position.Left}
          id="left-target"
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-800 !opacity-0 transition-opacity !rounded-full"
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

