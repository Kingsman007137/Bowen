/**
 * 笔记本状态管理
 * 管理笔记和文件夹的CRUD操作
 */

import { create } from 'zustand';
import type { Notebook, Folder, CreateNotebookInput, CreateFolderInput } from '@/types';
import { getRandomGradientKey } from '@/lib/constants';
import { deleteNotebookCanvas } from '@/lib/storage';

interface NotebookStore {
  notebooks: Notebook[];
  folders: Folder[];
  
  // 笔记操作
  addNotebook: (input: CreateNotebookInput) => Notebook;
  updateNotebook: (id: string, updates: Partial<Notebook>) => void;
  deleteNotebook: (id: string) => void;
  getNotebook: (id: string) => Notebook | undefined;
  
  // 文件夹操作
  addFolder: (input: CreateFolderInput) => Folder;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  getFolder: (id: string) => Folder | undefined;
  
  // 批量操作
  setNotebooks: (notebooks: Notebook[]) => void;
  setFolders: (folders: Folder[]) => void;
  
  // 初始化
  init: () => Promise<void>;
}

export const useNotebookStore = create<NotebookStore>((set, get) => ({
  notebooks: [],
  folders: [],
  
  addNotebook: (input) => {
    const notebook: Notebook = {
      id: generateId(),
      name: input.name,
      folderId: input.folderId,
      cardCount: 0,
      gradient: input.gradient || getRandomGradientKey(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    set((state) => ({
      notebooks: [...state.notebooks, notebook],
    }));
    
    // 如果属于某个文件夹，更新文件夹的笔记数量
    if (notebook.folderId) {
      const folder = get().getFolder(notebook.folderId);
      if (folder) {
        get().updateFolder(folder.id, {
          notebookCount: folder.notebookCount + 1,
        });
      }
    }
    
    return notebook;
  },
  
  updateNotebook: (id, updates) => {
    set((state) => ({
      notebooks: state.notebooks.map((notebook) =>
        notebook.id === id
          ? { ...notebook, ...updates, updatedAt: Date.now() }
          : notebook
      ),
    }));
  },
  
  deleteNotebook: (id) => {
    const notebook = get().getNotebook(id);
    
    set((state) => ({
      notebooks: state.notebooks.filter((n) => n.id !== id),
    }));
    
    // 如果属于某个文件夹，更新文件夹的笔记数量
    if (notebook?.folderId) {
      const folder = get().getFolder(notebook.folderId);
      if (folder && folder.notebookCount > 0) {
        get().updateFolder(folder.id, {
          notebookCount: folder.notebookCount - 1,
        });
      }
    }
    
    // 删除笔记本的画布数据
    if (typeof window !== 'undefined') {
      deleteNotebookCanvas(id).catch((err) => {
        console.error('Failed to delete notebook canvas:', err);
      });
    }
  },
  
  getNotebook: (id) => {
    return get().notebooks.find((n) => n.id === id);
  },
  
  addFolder: (input) => {
    const folder: Folder = {
      id: generateId(),
      name: input.name,
      notebookCount: 0,
      createdAt: Date.now(),
    };
    
    set((state) => ({
      folders: [...state.folders, folder],
    }));
    
    return folder;
  },
  
  updateFolder: (id, updates) => {
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === id ? { ...folder, ...updates } : folder
      ),
    }));
  },
  
  deleteFolder: (id) => {
    // 删除文件夹前，先将该文件夹下的笔记移动到根目录
    set((state) => ({
      notebooks: state.notebooks.map((notebook) =>
        notebook.folderId === id
          ? { ...notebook, folderId: undefined }
          : notebook
      ),
      folders: state.folders.filter((f) => f.id !== id),
    }));
  },
  
  getFolder: (id) => {
    return get().folders.find((f) => f.id === id);
  },
  
  setNotebooks: (notebooks) => {
    set({ notebooks });
  },
  
  setFolders: (folders) => {
    set({ folders });
  },
  
  init: async () => {
    // 从localStorage加载数据（后续会改用storage.ts）
    if (typeof window !== 'undefined') {
      try {
        const savedNotebooks = localStorage.getItem('notebooks');
        const savedFolders = localStorage.getItem('folders');
        
        if (savedNotebooks) {
          const notebooks = JSON.parse(savedNotebooks);
          set({ notebooks });
        }
        
        if (savedFolders) {
          const folders = JSON.parse(savedFolders);
          set({ folders });
        }
      } catch (e) {
        console.error('Failed to load notebooks/folders:', e);
      }
    }
  },
}));

/**
 * 生成唯一ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * 保存到localStorage（订阅store变化）
 */
if (typeof window !== 'undefined') {
  useNotebookStore.subscribe((state) => {
    localStorage.setItem('notebooks', JSON.stringify(state.notebooks));
    localStorage.setItem('folders', JSON.stringify(state.folders));
  });
}

