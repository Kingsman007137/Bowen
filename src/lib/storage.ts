/**
 * 数据存储模块
 * 基于 localforage 封装,提供类型安全的 IndexedDB 操作
 */

import localforage from 'localforage';

/**
 * 卡片节点数据结构
 */
export interface CardNode {
  id: string;
  type: 'card';
  position: { x: number; y: number };
  data: {
    content: string; // 富文本内容
    colorKey: 'blue' | 'pink' | 'mint'; // 渐变色系
    createdAt: number;
    updatedAt: number;
  };
}

/**
 * 连线数据结构
 */
export interface CardEdge {
  id: string;
  source: string; // 源节点 ID
  target: string; // 目标节点 ID
  type?: string;
}

/**
 * 画布状态数据
 */
export interface CanvasState {
  nodes: CardNode[];
  edges: CardEdge[];
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
 * 存储键名
 */
const STORAGE_KEYS = {
  CANVAS_STATE: 'canvas_state',
  THEME_MODE: 'theme_mode',
} as const;

/**
 * 保存画布状态
 */
export async function saveCanvasState(state: CanvasState): Promise<void> {
  try {
    await store.setItem(STORAGE_KEYS.CANVAS_STATE, {
      ...state,
      lastSaved: Date.now(),
    });
  } catch (error) {
    console.error('保存画布状态失败:', error);
    throw error;
  }
}

/**
 * 加载画布状态
 */
export async function loadCanvasState(): Promise<CanvasState | null> {
  try {
    const state = await store.getItem<CanvasState>(STORAGE_KEYS.CANVAS_STATE);
    return state;
  } catch (error) {
    console.error('加载画布状态失败:', error);
    return null;
  }
}

/**
 * 清空画布状态
 */
export async function clearCanvasState(): Promise<void> {
  try {
    await store.removeItem(STORAGE_KEYS.CANVAS_STATE);
  } catch (error) {
    console.error('清空画布状态失败:', error);
    throw error;
  }
}

/**
 * 保存主题模式
 */
export async function saveThemeMode(mode: 'light' | 'dark'): Promise<void> {
  try {
    await store.setItem(STORAGE_KEYS.THEME_MODE, mode);
  } catch (error) {
    console.error('保存主题模式失败:', error);
    throw error;
  }
}

/**
 * 加载主题模式
 */
export async function loadThemeMode(): Promise<'light' | 'dark' | null> {
  try {
    const mode = await store.getItem<'light' | 'dark'>(STORAGE_KEYS.THEME_MODE);
    return mode;
  } catch (error) {
    console.error('加载主题模式失败:', error);
    return null;
  }
}

/**
 * 获取存储使用情况(仅在支持的浏览器中)
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


