/**
 * 画布状态管理
 * 管理画布模式、卡片、连线等
 */

import { create } from 'zustand';
import type { Card, Connection, CreateCardInput, CreateConnectionInput } from '@/types';
import { CARD_DEFAULTS } from '@/lib/constants';
import { saveCanvasState, loadCanvasState } from '@/lib/storage';

export type CanvasMode = 'select' | 'pan' | 'connect';

interface CanvasStore {
  // 当前笔记ID
  currentNotebookId: string | null;
  
  // 画布模式
  mode: CanvasMode;
  
  // 卡片和连线
  cards: Card[];
  connections: Connection[];
  
  // 连线模式下的临时状态
  connectingFromCard: string | null;
  
  // 缩放和平移
  zoom: number;
  pan: { x: number; y: number };
  
  // 模式切换
  setMode: (mode: CanvasMode) => void;
  
  // 笔记本切换
  setCurrentNotebook: (notebookId: string) => void;
  
  // 卡片操作
  addCard: (input: CreateCardInput) => Card;
  updateCard: (id: string, updates: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  getCard: (id: string) => Card | undefined;
  
  // 连线操作
  addConnection: (input: CreateConnectionInput) => Connection;
  deleteConnection: (id: string) => void;
  getConnection: (id: string) => Connection | undefined;
  
  // 连线模式状态
  startConnecting: (cardId: string) => void;
  finishConnecting: (targetCardId: string) => void;
  cancelConnecting: () => void;
  
  // 视图控制
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  resetView: () => void;
  
  // 批量操作
  setCards: (cards: Card[]) => void;
  setConnections: (connections: Connection[]) => void;
  
  // 数据加载
  loadNotebookData: (notebookId: string) => Promise<void>;
  saveNotebookData: () => Promise<void>;
  
  // 清空画布
  clear: () => void;
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  currentNotebookId: null,
  mode: 'select',
  cards: [],
  connections: [],
  connectingFromCard: null,
  zoom: 1,
  pan: { x: 0, y: 0 },
  
  setMode: (mode) => {
    set({ mode, connectingFromCard: null });
  },
  
  setCurrentNotebook: (notebookId) => {
    set({ currentNotebookId: notebookId });
  },
  
  addCard: (input) => {
    const card: Card = {
      id: generateId(),
      notebookId: input.notebookId,
      position: input.position || {
        x: Math.random() * 400,
        y: Math.random() * 300,
      },
      size: input.size || {
        width: 300,
        height: 180,
      },
      title: input.title || '新卡片',
      content: input.content || '',
      color: input.color,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    set((state) => ({
      cards: [...state.cards, card],
    }));
    
    return card;
  },
  
  updateCard: (id, updates) => {
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id
          ? { ...card, ...updates, updatedAt: Date.now() }
          : card
      ),
    }));
  },
  
  deleteCard: (id) => {
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
      // 删除相关连线
      connections: state.connections.filter(
        (conn) => conn.source !== id && conn.target !== id
      ),
    }));
  },
  
  getCard: (id) => {
    return get().cards.find((card) => card.id === id);
  },
  
  addConnection: (input) => {
    const connection: Connection = {
      id: generateId(),
      notebookId: input.notebookId,
      source: input.source,
      target: input.target,
      type: input.type || 'default',
    };
    
    set((state) => ({
      connections: [...state.connections, connection],
    }));
    
    return connection;
  },
  
  deleteConnection: (id) => {
    set((state) => ({
      connections: state.connections.filter((conn) => conn.id !== id),
    }));
  },
  
  getConnection: (id) => {
    return get().connections.find((conn) => conn.id === id);
  },
  
  startConnecting: (cardId) => {
    set({ connectingFromCard: cardId });
  },
  
  finishConnecting: (targetCardId) => {
    const { connectingFromCard, currentNotebookId } = get();
    
    if (connectingFromCard && currentNotebookId && connectingFromCard !== targetCardId) {
      // 检查是否已存在相同的连线
      const existingConnection = get().connections.find(
        (conn) =>
          conn.source === connectingFromCard && conn.target === targetCardId
      );
      
      if (!existingConnection) {
        get().addConnection({
          notebookId: currentNotebookId,
          source: connectingFromCard,
          target: targetCardId,
        });
      }
    }
    
    set({ connectingFromCard: null });
  },
  
  cancelConnecting: () => {
    set({ connectingFromCard: null });
  },
  
  setZoom: (zoom) => {
    set({ zoom: Math.max(0.25, Math.min(2, zoom)) });
  },
  
  setPan: (pan) => {
    set({ pan });
  },
  
  resetView: () => {
    set({ zoom: 1, pan: { x: 0, y: 0 } });
  },
  
  setCards: (cards) => {
    set({ cards });
  },
  
  setConnections: (connections) => {
    set({ connections });
  },
  
  loadNotebookData: async (notebookId) => {
    if (typeof window !== 'undefined') {
      try {
        const canvasState = await loadCanvasState(notebookId);
        
        if (canvasState) {
          set({
            cards: canvasState.cards || [],
            connections: canvasState.connections || [],
            currentNotebookId: notebookId,
          });
        } else {
          set({
            cards: [],
            connections: [],
            currentNotebookId: notebookId,
          });
        }
      } catch (e) {
        console.error('Failed to load canvas data:', e);
        set({ cards: [], connections: [], currentNotebookId: notebookId });
      }
    }
  },
  
  saveNotebookData: async () => {
    const { currentNotebookId, cards, connections } = get();
    
    if (typeof window !== 'undefined' && currentNotebookId) {
      try {
        await saveCanvasState(currentNotebookId, cards, connections);
      } catch (e) {
        console.error('Failed to save canvas data:', e);
      }
    }
  },
  
  clear: () => {
    set({
      cards: [],
      connections: [],
      connectingFromCard: null,
      zoom: 1,
      pan: { x: 0, y: 0 },
    });
  },
}));

/**
 * 生成唯一ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * 自动保存（订阅store变化）
 */
if (typeof window !== 'undefined') {
  let saveTimer: NodeJS.Timeout;
  
  useCanvasStore.subscribe((state) => {
    // 防抖保存
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      state.saveNotebookData();
    }, 1000);
  });
}
