/**
 * 初始示例数据
 * 首次启动时填充的示例笔记和文件夹
 */

import type { Notebook, Folder } from '@/types';

export const SEED_FOLDERS: Folder[] = [
  {
    id: 'folder-1',
    name: '工作笔记',
    notebookCount: 2,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7天前
  },
  {
    id: 'folder-2',
    name: '学习资料',
    notebookCount: 3,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5天前
  },
  {
    id: 'folder-3',
    name: '个人项目',
    notebookCount: 2,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3天前
  },
];

export const SEED_NOTEBOOKS: Notebook[] = [
  {
    id: 'notebook-1',
    name: '产品设计思路',
    folderId: 'folder-1',
    cardCount: 15,
    gradient: 'blue',
    createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'notebook-2',
    name: '技术架构规划',
    folderId: 'folder-1',
    cardCount: 8,
    gradient: 'pink',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'notebook-3',
    name: '读书笔记',
    folderId: 'folder-2',
    cardCount: 23,
    gradient: 'cyan',
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'notebook-4',
    name: '灵感收集',
    cardCount: 31,
    gradient: 'green',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
  {
    id: 'notebook-5',
    name: '会议记录',
    folderId: 'folder-2',
    cardCount: 12,
    gradient: 'purple',
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'notebook-6',
    name: '项目规划',
    folderId: 'folder-3',
    cardCount: 19,
    gradient: 'orange',
    createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'notebook-7',
    name: '学习计划',
    folderId: 'folder-2',
    cardCount: 27,
    gradient: 'indigo',
    createdAt: Date.now() - 9 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'notebook-8',
    name: '代码片段',
    folderId: 'folder-3',
    cardCount: 45,
    gradient: 'rose',
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
];

/**
 * 初始化示例数据
 */
export function initSeedData() {
  if (typeof window !== 'undefined') {
    // 检查是否已有数据
    const existingNotebooks = localStorage.getItem('notebooks');
    const existingFolders = localStorage.getItem('folders');
    
    if (!existingNotebooks) {
      localStorage.setItem('notebooks', JSON.stringify(SEED_NOTEBOOKS));
    }
    
    if (!existingFolders) {
      localStorage.setItem('folders', JSON.stringify(SEED_FOLDERS));
    }
  }
}




