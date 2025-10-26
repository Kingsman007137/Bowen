'use client';

/**
 * 可折叠的小地图面板组件
 * 注意：MiniMap 必须在 ReactFlow 内部使用
 */

import { useState } from 'react';
import { MiniMap } from '@xyflow/react';

interface MiniMapPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MiniMapPanel({ isOpen, onToggle }: MiniMapPanelProps) {
  return (
    <>
      {/* 小地图面板 - 显示在右下角上方 */}
      {isOpen && (
        <div className="absolute bottom-20 right-4 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-lg p-2 animate-fade-in">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              全局预览
            </span>
            <button
              onClick={onToggle}
              className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="material-symbols-rounded text-gray-500 dark:text-gray-400 text-sm">
                close
              </span>
            </button>
          </div>
          <MiniMap
            className="!bg-gray-100/80 dark:!bg-gray-900/80 !border-0 !rounded-md overflow-hidden"
            style={{ width: 200, height: 150 }}
            nodeColor={() => '#137fec'}
            maskColor="rgba(0, 0, 0, 0)"
            pannable
            zoomable
            zoomStep={10}
          />
        </div>
      )}
    </>
  );
}

