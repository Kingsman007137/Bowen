## 项目目录结构

```
Bowen/
├── docs/                           # 项目文档目录
│   ├── management/                 # 项目管理文档
│   │   ├── task/                   # 任务文档
│   │   └── project_structure.md    # 本文件：项目结构说明
│
├── prototypes/                     # 原型文件（HTML 静态页面）
│
├── public/                         # 静态资源目录
│   ├── assets/                     # 资源文件
│   └── *.svg                       # 图标文件
│
├── src/                            # 源代码目录
│   ├── app/                        # Next.js App Router 页面目录
│   │   ├── (auth)/                 # 认证相关页面组
│   │   │   └── login/              # 登录页面
│   │   │
│   │   ├── (main)/                 # 主应用页面组（包含侧边栏布局）
│   │   │   ├── layout.tsx          # 主布局组件（侧边栏）
│   │   │   ├── shelf/              # 笔记架页面
│   │   │   └── canvas/             # 画布页面
│   │   │       └── [id]/           # 动态路由：笔记本 ID
│   │   │
│   │   ├── layout.tsx              # 根布局组件
│   │   ├── page.tsx                # 首页（重定向到 /shelf）
│   │   ├── globals.css             # 全局样式文件
│   │   └── favicon.ico             # 网站图标
│   │
│   ├── components/                 # 组件目录
│   │   ├── Canvas/                 # 画布相关组件
│   │   │   ├── CanvasContainer.tsx # 画布容器（React Flow 封装）
│   │   │   ├── CardNode.tsx        # 卡片节点组件
│   │   │   ├── CardEditModal.tsx   # 卡片编辑弹窗（待重构）
│   │   │   ├── MiniMapPanel.tsx    # 小地图面板
│   │   │   └── ZoomControls.tsx    # 缩放控制组件
│   │   │
│   │   ├── Editor/                 # 编辑器相关组件
│   │   │   ├── TiptapEditor.tsx    # 富文本编辑器
│   │   │   └── ImageUploader.tsx   # 图片上传组件
│   │   │
│   │   ├── Shelf/                  # 笔记架相关组件
│   │   │   ├── NoteCard.tsx        # 笔记卡片组件
│   │   │   └── FolderCard.tsx      # 文件夹卡片组件
│   │   │
│   │   ├── UI/                     # 通用 UI 组件
│   │   │   ├── Sidebar.tsx         # 侧边栏组件
│   │   │   ├── Toolbar.tsx         # 工具栏组件
│   │   │   ├── Toast.tsx           # 提示消息组件
│   │   │   ├── ConfirmDialog.tsx   # 确认对话框组件
│   │   │   ├── InputDialog.tsx     # 输入对话框组件
│   │   │   └── ColorPicker.tsx     # 颜色选择器组件
│   │   │
│   │   └── ThemeProvider.tsx       # 主题提供者组件
│   │
│   ├── hooks/                      # 自定义 Hooks 目录
│   │   ├── useNotebookStore.ts     # 笔记本状态管理（Zustand）
│   │   ├── useCanvasStore.ts       # 画布状态管理（Zustand）
│   │   └── useTheme.ts             # 主题管理 Hook
│   │
│   ├── lib/                        # 工具函数和配置目录
│   │   ├── constants.ts            # 全局常量配置（渐变色、默认值等）
│   │   ├── storage.ts              # 数据存储模块（IndexedDB 封装）
│   │   └── seedData.ts             # 示例数据初始化
│   │
│   ├── types/                      # TypeScript 类型定义目录
│   │   ├── index.ts                # 类型定义入口文件
│   │
│   └── styles/                     # 样式文件目录
│       └── theme.css               # 主题样式定义
│
├── node_modules/                   # 依赖包目录
├── package.json                    # 项目配置文件
├── package-lock.json               # 依赖锁定文件
├── tsconfig.json                   # TypeScript 配置文件
├── next.config.ts                  # Next.js 配置文件
├── tailwind.config.js              # TailwindCSS 配置文件
├── postcss.config.mjs              # PostCSS 配置文件
├── eslint.config.mjs               # ESLint 配置文件
├── next-env.d.ts                   # Next.js 类型声明文件
└── README.md                       # 项目说明文档
```

**最后更新**: 2025-10-26