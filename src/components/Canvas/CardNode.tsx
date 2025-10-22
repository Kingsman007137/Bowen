'use client';

/**
 * 卡片节点组件
 * 自定义 React Flow 节点,实现毛玻璃渐变样式
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import type { GradientColorKey } from '@/lib/constants';

export interface CardNodeData {
  content: string;
  colorKey: GradientColorKey;
  createdAt: number;
  updatedAt: number;
}

function CardNode({ data }: NodeProps) {
  // TODO: 在后续任务中实现完整的卡片功能
  // - 富文本编辑
  // - 颜色切换
  // - 拖拽手柄
  // - 删除按钮
  // - 内容展示

  // 使用类型断言获取节点数据
  const nodeData = data as unknown as CardNodeData;
  const gradientClass = `gradient-${nodeData.colorKey || 'blue'}`;

  return (
    <div
      className={`glass-card ${gradientClass} p-4 min-w-[300px] max-w-[400px] min-h-[150px]`}
    >
      <div className="text-sm text-foreground">
        <p className="font-semibold mb-2">卡片节点</p>
        <p className="text-xs opacity-70">待实现内容编辑功能</p>
      </div>
    </div>
  );
}

export default memo(CardNode);

