/**
 * LocalForage 封装 Hook
 * 提供响应式的 IndexedDB 数据存储
 */

import { useState, useEffect, useCallback } from 'react';
import {
  saveCanvasState,
  loadCanvasState,
  type CanvasState,
} from '@/lib/storage';

/**
 * 使用画布状态持久化的 Hook
 */
export function useCanvasStorage() {
  const [state, setState] = useState<CanvasState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 加载初始状态
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await loadCanvasState();
        if (savedState) {
          setState(savedState);
        }
      } catch (error) {
        console.error('加载画布状态失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadState();
  }, []);

  // 保存状态
  const save = useCallback(async (newState: CanvasState) => {
    setIsSaving(true);
    try {
      await saveCanvasState(newState);
      setState(newState);
    } catch (error) {
      console.error('保存画布状态失败:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    state,
    isLoading,
    isSaving,
    save,
  };
}



