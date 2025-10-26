'use client';

/**
 * 缩放控制组件
 * 注意：这个组件必须在 ReactFlow 内部使用
 */

import { Panel, useReactFlow } from '@xyflow/react';

interface ZoomControlsProps {
  showMiniMap: boolean;
  onToggleMiniMap: () => void;
}

export default function ZoomControls({ showMiniMap, onToggleMiniMap }: ZoomControlsProps) {
  const { zoomIn, zoomOut } = useReactFlow();

  const handleZoomIn = () => {
    zoomIn({ duration: 200 });
  };

  const handleZoomOut = () => {
    zoomOut({ duration: 200 });
  };

  return (
    <Panel position="bottom-right" className="!m-4">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-1 rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-0.5">
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="缩小"
        >
          <span className="material-symbols-rounded text-gray-700 dark:text-gray-300 text-[18px]">
            zoom_out
          </span>
        </button>
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="放大"
        >
          <span className="material-symbols-rounded text-gray-700 dark:text-gray-300 text-[18px]">
            zoom_in
          </span>
        </button>
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-0.5"></div>
        <button
          onClick={onToggleMiniMap}
          className={`p-1.5 rounded-md transition-colors ${
            showMiniMap 
              ? 'bg-primary/20 hover:bg-primary/30' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={showMiniMap ? '关闭预览' : '全局预览'}
        >
          <span className={`material-symbols-rounded text-[18px] ${
            showMiniMap ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
          }`}>
            grid_view
          </span>
        </button>
      </div>
    </Panel>
  );
}

