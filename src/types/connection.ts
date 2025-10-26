/**
 * 连线数据类型定义
 */

/**
 * 连线类型
 */
export type ConnectionType = 'default' | 'arrow';

/**
 * 连线
 */
export interface Connection {
  id: string;
  notebookId: string;       // 所属笔记ID
  source: string;           // 起始卡片ID
  target: string;           // 目标卡片ID
  type: ConnectionType;     // 连线类型
}

/**
 * 创建连线的输入参数
 */
export interface CreateConnectionInput {
  notebookId: string;
  source: string;
  target: string;
  type?: ConnectionType;
}




