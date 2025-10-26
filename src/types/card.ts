/**
 * 卡片数据类型定义
 */

/**
 * 卡片位置
 */
export interface CardPosition {
  x: number;
  y: number;
}

/**
 * 卡片尺寸
 */
export interface CardSize {
  width: number;
  height: number;
}

/**
 * 卡片
 */
export interface Card {
  id: string;
  notebookId: string;       // 所属笔记ID
  position: CardPosition;
  size: CardSize;
  title: string;
  content: string;          // Tiptap JSON 或 HTML
  color?: string;           // 卡片渐变色 key
  createdAt: number;
  updatedAt: number;
}

/**
 * 创建卡片的输入参数
 */
export interface CreateCardInput {
  notebookId: string;
  position?: CardPosition;
  size?: CardSize;
  title?: string;
  content?: string;
  color?: string;
}

/**
 * 更新卡片的输入参数
 */
export interface UpdateCardInput {
  position?: CardPosition;
  size?: CardSize;
  title?: string;
  content?: string;
  color?: string;
}


