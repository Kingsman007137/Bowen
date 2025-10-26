'use client';

/**
 * 工具栏组件
 * 提供画布操作工具
 */

import { useCanvasStore, type CanvasMode } from '@/hooks/useCanvasStore';
import { useThemeStore } from '@/hooks/useTheme';

interface ToolbarProps {
  onBack: () => void;
  notebookName: string;
  onFitView?: () => void;
}

export default function Toolbar({ onBack, notebookName, onFitView }: ToolbarProps) {
  const { mode, setMode, addCard, currentNotebookId, saveNotebookData } = useCanvasStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleAddCard = () => {
    if (currentNotebookId) {
      addCard({
        notebookId: currentNotebookId,
        title: '新卡片',
        content: '',
      });
    }
  };

  const handleModeChange = (newMode: CanvasMode) => {
    setMode(newMode);
  };

  const handleSave = () => {
    saveNotebookData();
    // 可以添加保存成功提示
  };

  const handleUndo = () => {
    // TODO: 实现撤销功能
    console.log('撤销');
  };

  const handleRedo = () => {
    // TODO: 实现重做功能
    console.log('重做');
  };

  const getModeIcon = (m: CanvasMode) => {
    switch (m) {
      case 'select':
        return 'near_me';
      case 'pan':
        return 'pan_tool';
      case 'connect':
        return 'link';
    }
  };

  const getModeLabel = (m: CanvasMode) => {
    switch (m) {
      case 'select':
        return '选择模式';
      case 'pan':
        return '拖动画布';
      case 'connect':
        return '连线模式';
    }
  };

  return (
    <>
      {/* 左侧浮动工具栏 - 参考原型图 */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-1.5 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          {/* 返回按钮 */}
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            title="返回"
          >
            <span className="material-symbols-rounded text-gray-700 dark:text-gray-300 text-[20px]">
              arrow_back
            </span>
          </button>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-0.5"></div>
          
          {/* 选择模式 */}
          <button
            onClick={() => handleModeChange('select')}
            className={`p-2 rounded-lg transition-colors ${
              mode === 'select'
                ? 'bg-primary/20'
                : 'hover:bg-primary/10'
            }`}
            title="选择模式"
          >
            <span className={`material-symbols-rounded text-[20px] ${
              mode === 'select' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
            }`}>
              near_me
            </span>
          </button>
          
          {/* 拖动画布 */}
          <button
            onClick={() => handleModeChange('pan')}
            className={`p-2 rounded-lg transition-colors ${
              mode === 'pan'
                ? 'bg-primary/20'
                : 'hover:bg-primary/10'
            }`}
            title="拖动画布"
          >
            <span className={`material-symbols-rounded text-[20px] ${
              mode === 'pan' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
            }`}>
              pan_tool
            </span>
          </button>
          
          {/* 新建卡片 */}
          <button
            onClick={handleAddCard}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors group"
            title="新建卡片"
          >
            <span className="material-symbols-rounded text-primary text-[20px]">
              add
            </span>
          </button>
          
          {/* 连线模式 */}
          <button
            onClick={() => handleModeChange('connect')}
            className={`p-2 rounded-lg transition-colors ${
              mode === 'connect'
                ? 'bg-primary/20'
                : 'hover:bg-primary/10'
            }`}
            title="连线模式"
          >
            <span className={`material-symbols-rounded text-[20px] ${
              mode === 'connect' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
            }`}>
              link
            </span>
          </button>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-0.5"></div>
          
          {/* 适应视图 */}
          <button
            onClick={onFitView}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            title="适应视图"
          >
            <span className="material-symbols-rounded text-gray-700 dark:text-gray-300 text-[20px]">
              fit_screen
            </span>
          </button>
          
          {/* 撤销 */}
          <button
            onClick={handleUndo}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            title="撤销"
          >
            <span className="material-symbols-rounded text-gray-700 dark:text-gray-300 text-[20px]">
              undo
            </span>
          </button>
          
          {/* 重做 */}
          <button
            onClick={handleRedo}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            title="重做"
          >
            <span className="material-symbols-rounded text-gray-700 dark:text-gray-300 text-[20px]">
              redo
            </span>
          </button>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-0.5"></div>
          
          {/* 保存 */}
          <button
            onClick={handleSave}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors group"
            title="保存"
          >
            <span className="material-symbols-rounded text-primary text-[20px]">
              save
            </span>
          </button>
        </div>
      </div>

      {/* 顶部笔记本名称栏 - 参考原型图 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-5 py-2.5 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-3">
          <h1 className="text-base font-semibold text-gray-800 dark:text-white">
            {notebookName}
          </h1>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {getModeLabel(mode)}
          </span>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
          <button
            onClick={toggleTheme}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="切换主题"
          >
            <span className="material-symbols-rounded text-gray-600 dark:text-gray-400 text-[18px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}


