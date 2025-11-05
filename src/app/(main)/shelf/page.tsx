'use client';

/**
 * 笔记架页面
 * 展示所有笔记和文件夹
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText } from 'lucide-react';
import Sidebar from '@/components/UI/Sidebar';
import NoteCard from '@/components/Shelf/NoteCard';
import FolderCard from '@/components/Shelf/FolderCard';
import Toast, { type ToastType } from '@/components/UI/Toast';
import ConfirmDialog from '@/components/UI/ConfirmDialog';
import InputDialog from '@/components/UI/InputDialog';
import { useNotebookStore } from '@/hooks/useNotebookStore';
import { useThemeStore } from '@/hooks/useTheme';

export default function ShelfPage() {
  const router = useRouter();
  const { initTheme } = useThemeStore();
  const { notebooks, folders, addNotebook, addFolder, deleteNotebook, deleteFolder, updateNotebook, updateFolder, init } =
    useNotebookStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNewNotebookModal, setShowNewNotebookModal] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  
  // Toast 状态
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  
  // 确认对话框状态
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  } | null>(null);
  
  // 输入对话框状态
  const [inputDialog, setInputDialog] = useState<{
    title: string;
    label: string;
    defaultValue: string;
    onConfirm: (value: string) => void;
  } | null>(null);

  // 初始化
  useEffect(() => {
    initTheme();
    init();
  }, [initTheme, init]);

  // 显示Toast
  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  // 新建笔记
  const handleCreateNotebook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotebookName.trim()) {
      showToast('请输入笔记名称', 'warning');
      return;
    }

    const notebook = addNotebook({ name: newNotebookName.trim() });
    setNewNotebookName('');
    setShowNewNotebookModal(false);
    showToast('笔记创建成功', 'success');

    // 跳转到画布页面
    setTimeout(() => {
      router.push(`/canvas/${notebook.id}`);
    }, 500);
  };

  // 新建文件夹
  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) {
      showToast('请输入文件夹名称', 'warning');
      return;
    }

    addFolder({ name: newFolderName.trim() });
    setNewFolderName('');
    setShowNewFolderModal(false);
    showToast('文件夹创建成功', 'success');
  };

  // 笔记操作
  const handleNotebookClick = (id: string) => {
    router.push(`/canvas/${id}`);
  };

  const handleNotebookRename = (id: string, currentName: string) => {
    setInputDialog({
      title: '重命名笔记',
      label: '笔记名称',
      defaultValue: currentName,
      onConfirm: (newName) => {
        updateNotebook(id, { name: newName });
        setInputDialog(null);
        showToast('笔记重命名成功', 'success');
      },
    });
  };

  const handleNotebookDelete = (id: string, name: string) => {
    setConfirmDialog({
      title: '删除笔记',
      message: `确定要删除笔记"${name}"吗？\n此操作无法撤销。`,
      type: 'danger',
      onConfirm: () => {
        deleteNotebook(id);
        setConfirmDialog(null);
        showToast('笔记已删除', 'success');
      },
    });
  };

  // 文件夹操作
  const handleFolderClick = (id: string) => {
    showToast('文件夹过滤功能开发中', 'info');
  };

  const handleFolderRename = (id: string, currentName: string) => {
    setInputDialog({
      title: '重命名文件夹',
      label: '文件夹名称',
      defaultValue: currentName,
      onConfirm: (newName) => {
        updateFolder(id, { name: newName });
        setInputDialog(null);
        showToast('文件夹重命名成功', 'success');
      },
    });
  };

  const handleFolderDelete = (id: string, name: string) => {
    setConfirmDialog({
      title: '删除文件夹',
      message: `确定要删除文件夹"${name}"吗？\n该文件夹下的笔记会移至根目录。`,
      type: 'danger',
      onConfirm: () => {
        deleteFolder(id);
        setConfirmDialog(null);
        showToast('文件夹已删除', 'success');
      },
    });
  };

  return (
    <>
      {/* 侧边栏 */}
      <Sidebar
        onNewNotebook={() => setShowNewNotebookModal(true)}
        onNewFolder={() => setShowNewFolderModal(true)}
      />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* 顶部栏 */}
        <div className="h-16 px-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            所有笔记
          </h2>
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索笔记或文件夹..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* 文件夹区域 */}
          {folders.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                文件夹
              </h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6">
                {folders.map((folder) => (
                  <FolderCard
                    key={folder.id}
                    folder={folder}
                    onClick={() => handleFolderClick(folder.id)}
                    onRename={() => handleFolderRename(folder.id, folder.name)}
                    onDelete={() => handleFolderDelete(folder.id, folder.name)}
                  />
                ))}
              </div>
              <div className="shelf-divider"></div>
            </div>
          )}

          {/* 笔记区域 */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              笔记
            </h3>
            {notebooks.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6">
                {notebooks.map((notebook) => (
                  <NoteCard
                    key={notebook.id}
                    notebook={notebook}
                    onClick={() => handleNotebookClick(notebook.id)}
                    onRename={() => handleNotebookRename(notebook.id, notebook.name)}
                    onDelete={() => handleNotebookDelete(notebook.id, notebook.name)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4 mx-auto" />
                <p className="text-gray-500 dark:text-gray-400">
                  还没有笔记，点击左侧"新建笔记"开始吧
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 新建笔记模态框 */}
      {showNewNotebookModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewNotebookModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              新建笔记
            </h2>
            <form onSubmit={handleCreateNotebook}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  笔记名称
                </label>
                <input
                  type="text"
                  value={newNotebookName}
                  onChange={(e) => setNewNotebookName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入笔记名称"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewNotebookModal(false)}
                  className="px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 新建文件夹模态框 */}
      {showNewFolderModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewFolderModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              新建文件夹
            </h2>
            <form onSubmit={handleCreateFolder}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  文件夹名称
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入文件夹名称"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewFolderModal(false)}
                  className="px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast 通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* 确认对话框 */}
      {confirmDialog && (
        <ConfirmDialog
          title={confirmDialog.title}
          message={confirmDialog.message}
          type={confirmDialog.type}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      {/* 输入对话框 */}
      {inputDialog && (
        <InputDialog
          title={inputDialog.title}
          label={inputDialog.label}
          defaultValue={inputDialog.defaultValue}
          onConfirm={inputDialog.onConfirm}
          onCancel={() => setInputDialog(null)}
        />
      )}
    </>
  );
}

