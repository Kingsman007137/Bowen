'use client';

/**
 * 工具栏组件
 * 提供新建卡片、保存等操作
 */

interface ToolbarProps {
  onAddCard?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
}

export default function Toolbar({
  onAddCard,
  onSave,
  isSaving = false,
}: ToolbarProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="glass-card flex items-center gap-3 px-4 py-2">
        <h1 className="text-lg font-semibold text-foreground-title">
          玻文卡片笔记
        </h1>

        <div className="h-4 w-px bg-border-color" />

        <button
          onClick={onAddCard}
          className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end text-white hover:scale-105 transition-transform"
          type="button"
        >
          + 新建卡片
        </button>

        {onSave && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-3 py-1.5 text-sm rounded-lg glass-card hover:scale-105 transition-transform disabled:opacity-50"
            type="button"
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
        )}
      </div>
    </div>
  );
}


