# 玻文卡片笔记 (Bowen)

一款基于 Next.js 的卡片式笔记软件，采用毛玻璃质感与柔和渐变色设计，让用户在无限画布上自由创建、拖拽、编辑和连接卡片。

## 🎨 特性

- **📚 笔记架管理**: 美观的网格布局展示笔记和文件夹，支持创建、重命名、删除操作
- **🎨 无限画布**: 基于 React Flow 的可拖拽、缩放画布，支持多种交互模式
- **✨ 毛玻璃卡片**: 柔和的渐变色系 + 毛玻璃质感设计，支持自定义颜色
- **📝 富文本编辑**: 集成 Tiptap 编辑器，支持标题、列表、引用、代码块等
- **🔗 卡片连线**: 可视化卡片之间的关系，支持拖拽连接
- **💾 本地存储**: 使用 IndexedDB 实现数据持久化，自动保存
- **🌓 主题切换**: 支持亮色/暗色主题，平滑过渡动画
- **🎯 多种模式**: 选择模式、拖动画布模式、连线模式，灵活切换

## 🛠️ 技术栈

| 模块 | 技术 | 版本 |
|------|------|------|
| 前端框架 | Next.js (App Router) | 15.x |
| UI 框架 | TailwindCSS | 4.x |
| 画布系统 | React Flow | 12.x |
| 富文本编辑 | Tiptap | 3.x |
| 数据持久化 | localforage | 1.x |
| 状态管理 | Zustand | 5.x |
| 语言 | TypeScript | 5.x |

## 📦 安装

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd Bowen
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
Bowen/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                # 认证相关页面
│   │   │   └── login/             # 登录页
│   │   ├── (main)/                # 主应用页面
│   │   │   ├── layout.tsx         # 主布局（含侧边栏）
│   │   │   ├── shelf/             # 笔记架页面
│   │   │   └── canvas/[id]/       # 画布页面（动态路由）
│   │   ├── layout.tsx             # 根布局
│   │   ├── page.tsx               # 首页（重定向）
│   │   └── globals.css            # 全局样式 + 主题变量
│   │
│   ├── components/
│   │   ├── Canvas/                # 画布相关组件
│   │   │   ├── CanvasContainer.tsx    # 画布容器
│   │   │   ├── CardNode.tsx           # 卡片节点
│   │   │   └── CardEditModal.tsx      # 卡片编辑弹窗
│   │   ├── Editor/                # 编辑器组件
│   │   │   ├── TiptapEditor.tsx       # 富文本编辑器
│   │   │   └── ImageUploader.tsx      # 图片上传
│   │   ├── Shelf/                 # 笔记架组件
│   │   │   ├── NoteCard.tsx           # 笔记卡片
│   │   │   └── FolderCard.tsx         # 文件夹卡片
│   │   └── UI/                    # 通用UI组件
│   │       ├── Sidebar.tsx            # 侧边栏
│   │       ├── Toolbar.tsx            # 工具栏
│   │       ├── Toast.tsx              # 通知提示
│   │       ├── ConfirmDialog.tsx      # 确认对话框
│   │       └── InputDialog.tsx        # 输入对话框
│   │
│   ├── hooks/                     # React Hooks
│   │   ├── useTheme.ts            # 主题管理
│   │   ├── useNotebookStore.ts    # 笔记本状态管理
│   │   └── useCanvasStore.ts      # 画布状态管理
│   │
│   ├── lib/                       # 工具库
│   │   ├── constants.ts           # 全局常量（渐变色系等）
│   │   ├── storage.ts             # IndexedDB 封装
│   │   └── seedData.ts            # 示例数据
│   │
│   ├── types/                     # TypeScript 类型定义
│   │   ├── notebook.ts            # 笔记本类型
│   │   ├── folder.ts              # 文件夹类型
│   │   ├── card.ts                # 卡片类型
│   │   ├── connection.ts          # 连线类型
│   │   └── index.ts               # 类型导出
│   │
│   └── styles/                    # 样式文件
│       └── theme.css              # 主题样式（毛玻璃、动画等）
│
├── docs/                          # 文档
│   ├── 产品需求文档.md
│   ├── 视觉规范文档.md
│   └── management/task/           # 任务管理
│
├── prototypes/                    # 原型图（HTML）
│   ├── login.html
│   ├── notebook-shelf.html
│   └── canvas.html
│
└── public/                        # 静态资源
    └── assets/                    # 图片、图标等
```

## 🎯 开发进度

### ✅ 已完成

- [x] 项目初始化与框架搭建
- [x] TailwindCSS v4 配置
- [x] 核心依赖集成（React Flow, Tiptap, Zustand, localforage）
- [x] 项目结构建立
- [x] 类型系统定义
- [x] 视觉系统（渐变色、毛玻璃效果、主题切换）
- [x] 状态管理（Zustand）
- [x] 本地存储（IndexedDB）
- [x] 登录页面
- [x] 笔记架页面（网格布局、文件夹管理）
- [x] 画布页面（无限画布、多种交互模式）
- [x] 卡片节点（拖拽、编辑、删除）
- [x] 富文本编辑器（Tiptap + 工具栏）
- [x] 卡片连线功能
- [x] 自动保存
- [x] 通用UI组件（Toast、Dialog）

### 🚧 待优化

- [ ] 图片上传功能
- [ ] 文件夹过滤功能
- [ ] 搜索功能
- [ ] 导出/导入功能
- [ ] 快捷键支持
- [ ] 性能优化
- [ ] 移动端适配

## 🚀 可用脚本

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 🎨 视觉规范

### 渐变色系

**亮色系**:
- 海雾蓝: `#4E8CEB` → `#64C7FF`
- 柔粉金: `#F6D2FF` → `#FFE3D8`
- 薄荷绿: `#8EEFC4` → `#56D9A0`

**暗色系**:
- 海雾蓝-暗: `#3B6BEC` → `#4AC6FF`
- 柔粉金-暗: `#E8C0FF` → `#FFD1C4`
- 薄荷绿-暗: `#6DD9AE` → `#40C894`

### 设计规范

- **毛玻璃效果**: `backdrop-filter: blur(16px)`
- **卡片圆角**: `16px`
- **卡片阴影**: 亮色 `0 6px 20px rgba(0,0,0,0.04)` / 暗色 `0 8px 32px rgba(0,0,0,0.20)`
- **卡片透明度**: 亮色 `0.7` / 暗色 `0.1`

## 📝 开发规范

1. **组件命名**: 使用 PascalCase (如 `CardNode.tsx`)
2. **文件组织**: 按功能模块划分目录
3. **类型安全**: 充分利用 TypeScript 类型系统
4. **代码注释**: 关键模块添加 JSDoc 注释
5. **样式管理**: 优先使用 Tailwind 工具类,复杂样式使用 CSS 类

## 🔧 配置说明

### TailwindCSS v4

本项目使用 Tailwind CSS v4,配置方式有所不同:
- 主题变量定义在 `app/globals.css` 中
- 使用 `@theme inline` 配置自定义主题
- 支持 CSS 变量用于动态主题切换

### TypeScript 路径别名

```json
{
  "@/*": ["./*"]  // 映射到项目根目录
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可

MIT License

## 🎮 使用指南

### 笔记架页面

1. **创建笔记**: 点击侧边栏的"新建笔记"按钮
2. **创建文件夹**: 点击侧边栏的"新建文件夹"按钮
3. **重命名**: 鼠标悬停在笔记/文件夹上，点击"编辑"图标
4. **删除**: 鼠标悬停在笔记/文件夹上，点击"删除"图标
5. **打开笔记**: 点击笔记卡片进入画布页面

### 画布页面

1. **创建卡片**: 
   - 点击工具栏的"+"按钮
   - 或双击画布空白处
2. **编辑卡片**: 鼠标悬停在卡片上，点击"编辑"图标
3. **删除卡片**: 鼠标悬停在卡片上，点击"删除"图标
4. **拖动卡片**: 在"选择模式"下拖动卡片
5. **连接卡片**: 
   - 切换到"连线模式"
   - 点击起始卡片
   - 点击目标卡片完成连线
6. **拖动画布**: 切换到"拖动模式"，拖动画布
7. **一键居中**: 点击工具栏的"居中"按钮
8. **返回笔记架**: 点击工具栏顶部的"返回"按钮

### 富文本编辑

- **粗体**: Ctrl/Cmd + B
- **斜体**: Ctrl/Cmd + I
- **标题**: 点击工具栏的 H1/H2/H3 按钮
- **列表**: 点击工具栏的列表按钮
- **引用**: 点击工具栏的引用按钮
- **代码块**: 点击工具栏的代码按钮

---

**开发状态**: MVP 阶段 - 核心功能已完成 ✅
