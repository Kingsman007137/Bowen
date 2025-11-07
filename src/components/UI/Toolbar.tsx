'use client';

/**
 * 工具栏组件
 * 提供画布操作工具
 */

import { useCanvasStore, type CanvasMode } from '@/hooks/useCanvasStore';
import { useThemeStore } from '@/hooks/useTheme';
import { ArrowLeft, Plus, Scan, Undo2, Redo2, Save, Sun, Moon } from 'lucide-react';

interface ToolbarProps {
  onBack: () => void;
  notebookName: string;
  onFitView?: () => void;
}

export default function Toolbar({ onBack, notebookName, onFitView }: ToolbarProps) {
  const { addCard, currentNotebookId, saveNotebookData } = useCanvasStore();
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
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-0.5"></div>
          
          {/* 新建卡片 */}
          <button
            onClick={handleAddCard}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors group"
            title="新建卡片"
          >
            <Plus className="w-5 h-5 text-primary" />
          </button>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-0.5"></div>
          
          {/* 适应视图 */}
          <button
            onClick={onFitView}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            title="适应视图"
          >
            <Scan className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          {/* 撤销 */}
          <button
            onClick={handleUndo}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            title="撤销"
          >
            <Undo2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          {/* 重做 */}
          <button
            onClick={handleRedo}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            title="重做"
          >
            <Redo2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-0.5"></div>
          
          {/* 保存 */}
          <button
            onClick={handleSave}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors group"
            title="保存"
          >
            <Save className="w-5 h-5 text-primary" />
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
          <button
            onClick={toggleTheme}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="切换主题"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}


