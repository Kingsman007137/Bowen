'use client';

/**
 * 可折叠的小地图面板组件
 * 注意：MiniMap 必须在 ReactFlow 内部使用
 */

import { MiniMap, Panel } from '@xyflow/react';
import { X } from 'lucide-react';

interface MiniMapPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MiniMapPanel({ isOpen, onToggle }: MiniMapPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 关闭按钮 - 嵌在小窗右上角 */}
      <Panel position="bottom-right" className="!bottom-[232px] !right-[25px] !m-0 !z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="p-0.5 rounded bg-white/90 dark:bg-gray-700/90 hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700"
          style={{
            width: '20px',
            height: '20px',
          }}
          title="关闭预览"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400" />
        </button>
      </Panel>

      {/* MiniMap 组件 - 不能被包裹，直接渲染 */}
      <MiniMap
        position="bottom-right"
        className="!bg-gray-50 dark:!bg-[#0a0e14] !border !border-gray-200/50 dark:!border-gray-700/50 !shadow-xl !rounded-lg"
        style={{ 
          width: 240, 
          height: 180,
          bottom: 55,  // 调整位置，避免被按钮挡住
          right: 16,
        }}
        nodeColor={(node) => {
          // 动态获取当前主题
          const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
          
          // 使用更明显的颜色，让卡片在小地图中清晰可见
          // 浅色模式：深灰色卡片在浅色背景上
          // 深色模式：浅色卡片在深色背景上
          if (isDark) {
            return 'rgba(148, 163, 184, 0.9)'; // 深色模式 - 浅灰色卡片，与深色背景形成对比
          }
          return 'rgba(71, 85, 105, 0.8)'; // 浅色模式 - 深灰色卡片，与浅色背景形成对比
        }}
        nodeStrokeColor={(node) => {
          const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
          
          // 边框颜色 - 使卡片更清晰
          if (isDark) {
            return 'rgba(226, 232, 240, 0.6)'; // 深色模式 - 更亮的边框
          }
          return 'rgba(30, 41, 59, 0.6)'; // 浅色模式 - 更深的边框
        }}
        nodeStrokeWidth={2}  // 增加边框宽度，让卡片更明显
        maskColor="rgba(19, 127, 236, 0.2)" // 当前视图区域的遮罩，使用主题蓝色
        pannable={true}  // 允许在小地图上拖动视图
        zoomable={true}  // 允许在小地图上使用鼠标滚轮缩放
        zoomStep={10}  // 缩放步进
        // 连线样式配置
        nodeClassName={() => ''}  // 清除默认类名
        maskStrokeColor="rgba(19, 127, 236, 0.8)"  // 当前视图区域边框颜色
        maskStrokeWidth={2}  // 当前视图区域边框宽度
      />
    </>
  );
}

