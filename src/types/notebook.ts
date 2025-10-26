/**
 * 笔记本数据类型定义
 */

export type GradientKey = 
  | 'blue' 
  | 'purple' 
  | 'pink' 
  | 'orange' 
  | 'green' 
  | 'teal' 
  | 'cyan' 
  | 'indigo' 
  | 'rose' 
  | 'amber';

/**
 * 笔记本
 */
export interface Notebook {
  id: string;
  name: string;
  folderId?: string;        // 所属文件夹ID（可选）
  cardCount: number;        // 卡片数量
  gradient: GradientKey;    // 封面渐变色
  createdAt: number;
  updatedAt: number;
}

/**
 * 创建笔记本的输入参数
 */
export interface CreateNotebookInput {
  name: string;
  folderId?: string;
  gradient?: GradientKey;
}

/**
 * 更新笔记本的输入参数
 */
export interface UpdateNotebookInput {
  name?: string;
  folderId?: string;
  gradient?: GradientKey;
}




