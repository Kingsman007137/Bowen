/**
 * 文件夹数据类型定义
 */

/**
 * 文件夹
 */
export interface Folder {
  id: string;
  name: string;
  notebookCount: number;    // 包含笔记数量
  createdAt: number;
}

/**
 * 创建文件夹的输入参数
 */
export interface CreateFolderInput {
  name: string;
}

/**
 * 更新文件夹的输入参数
 */
export interface UpdateFolderInput {
  name?: string;
}




