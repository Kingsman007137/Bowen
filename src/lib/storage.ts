/**
 * 数据存储模块
 * 基于 localforage 封装，提供类型安全的 IndexedDB 操作
 */

import localforage from 'localforage';
import type { Card } from '@/types/card';
import type { Connection } from '@/types/connection';

/**
 * 画布状态数据（按笔记本存储）
 */
export interface CanvasState {
  notebookId: string;
  cards: Card[];
  connections: Connection[];
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
  lastSaved: number;
}

// 初始化 localforage 实例
const store = localforage.createInstance({
  name: 'bowen-notes',
  storeName: 'canvas_data',
  description: '卡片笔记画布数据存储',
});

/**
 * 生成画布状态的存储键
 */
function getCanvasKey(notebookId: string): string {
  return `canvas_${notebookId}`;
}

/**
 * 保存画布状态
 */
export async function saveCanvasState(notebookId: string, cards: Card[], connections: Connection[]): Promise<void> {
  try {
    const state: CanvasState = {
      notebookId,
      cards,
      connections,
      lastSaved: Date.now(),
    };
    await store.setItem(getCanvasKey(notebookId), state);
  } catch (error) {
    console.error('保存画布状态失败:', error);
    throw error;
  }
}

/**
 * 加载画布状态
 */
export async function loadCanvasState(notebookId: string): Promise<CanvasState | null> {
  try {
    const state = await store.getItem<CanvasState>(getCanvasKey(notebookId));
    return state;
  } catch (error) {
    console.error('加载画布状态失败:', error);
    return null;
  }
}

/**
 * 清空画布状态
 */
export async function clearCanvasState(notebookId: string): Promise<void> {
  try {
    await store.removeItem(getCanvasKey(notebookId));
  } catch (error) {
    console.error('清空画布状态失败:', error);
    throw error;
  }
}

/**
 * 删除笔记本的画布数据
 */
export async function deleteNotebookCanvas(notebookId: string): Promise<void> {
  try {
    await store.removeItem(getCanvasKey(notebookId));
  } catch (error) {
    console.error('删除笔记本画布数据失败:', error);
    throw error;
  }
}

/**
 * 获取存储使用情况（仅在支持的浏览器中）
 */
export async function getStorageInfo(): Promise<{
  usage?: number;
  quota?: number;
} | null> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage,
        quota: estimate.quota,
      };
    } catch (error) {
      console.error('获取存储信息失败:', error);
      return null;
    }
  }
  return null;
}


