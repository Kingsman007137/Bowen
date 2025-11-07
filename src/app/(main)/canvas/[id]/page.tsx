'use client';

/**
 * 画布页面
 * 显示和编辑笔记本的卡片和连线
 */

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import { useNotebookStore } from '@/hooks/useNotebookStore';
import type { Notebook } from '@/types/notebook';
import CanvasContainer from '@/components/Canvas/CanvasContainer';
import Toolbar from '@/components/UI/Toolbar';
import Toast, { type ToastType } from '@/components/UI/Toast';

export default function CanvasPage() {
  const params = useParams();
  const router = useRouter();
  const notebookId = params.id as string;

  const { notebooks } = useNotebookStore();
  const { loadNotebookData, currentNotebookId, saveNotebookData } = useCanvasStore();

  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const fitViewRef = useRef<(() => void) | null>(null);

  // 加载笔记本数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      // 查找笔记本
      const foundNotebook = notebooks.find((nb) => nb.id === notebookId);
      if (!foundNotebook) {
        showToast('笔记本不存在', 'error');
        setTimeout(() => router.push('/shelf'), 1500);
        return;
      }

      setNotebook(foundNotebook);

      // 加载画布数据
      await loadNotebookData(notebookId);
      setIsLoading(false);
    };

    loadData();
  }, [notebookId, notebooks, loadNotebookData, router]);

  // 自动保存
  useEffect(() => {
    if (!isLoading && currentNotebookId === notebookId) {
      const saveTimer = setTimeout(() => {
        saveNotebookData();
      }, 1000);

      return () => clearTimeout(saveTimer);
    }
  }, [isLoading, currentNotebookId, notebookId, saveNotebookData]);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const handleBack = () => {
    saveNotebookData();
    router.push('/shelf');
  };

  const handleFitView = () => {
    if (fitViewRef.current) {
      fitViewRef.current();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-[#0a0e14] transition-colors duration-300">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!notebook) {
    return null;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-50 dark:bg-[#0a0e14] transition-colors duration-300">
      {/* 背景图片层 - 参考原型图 */}
      <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-60 dark:opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-white/40 dark:from-[#0a0e14]/98 dark:via-[#0f1419]/96 dark:to-[#0a0e14]/98 transition-colors duration-300"></div>
      </div>

      {/* 工具栏 */}
      <Toolbar onBack={handleBack} notebookName={notebook.name} onFitView={handleFitView} />

      {/* 画布容器 */}
      <div className="relative z-10 h-full w-full">
        <CanvasContainer notebookId={notebookId} onShowToast={showToast} onRegisterFitView={(fn: () => void) => { fitViewRef.current = fn; }} />
      </div>

      {/* Toast 通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}



