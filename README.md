# 玻文卡片笔记 (Bowen)

一款基于 Next.js 的卡片式笔记软件,采用毛玻璃质感与柔和渐变色设计,让用户在无限画布上自由创建、拖拽、编辑和连接卡片。

## 🎨 特性

- **无限画布**: 基于 React Flow 的可拖拽、缩放画布
- **毛玻璃效果**: 柔和的渐变色系 + 毛玻璃质感设计
- **富文本编辑**: 集成 Tiptap 编辑器,支持文字、图片等内容
- **本地存储**: 使用 IndexedDB 实现数据持久化
- **响应式设计**: 支持亮色/暗色主题自动切换

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
├── src/                     # 源代码目录
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # 全局布局
│   │   ├── page.tsx        # 主画布页面
│   │   └── globals.css     # 全局样式 + 主题变量
│   │
│   ├── components/         # React 组件
│   │   ├── Canvas/        # 画布相关组件
│   │   │   ├── CanvasContainer.tsx  # 画布容器
│   │   │   └── CardNode.tsx         # 卡片节点
│   │   ├── Editor/        # 编辑器组件
│   │   │   ├── TiptapEditor.tsx     # 富文本编辑器
│   │   │   └── ImageUploader.tsx    # 图片上传
│   │   └── UI/            # UI 组件
│   │       ├── ColorPicker.tsx      # 颜色选择器
│   │       └── Toolbar.tsx          # 工具栏
│   │
│   ├── hooks/             # React Hooks
│   │   ├── useLocalStorage.ts  # 本地存储 Hook
│   │   └── useCanvasStore.ts   # 画布状态管理
│   │
│   ├── lib/               # 工具库
│   │   ├── constants.ts   # 全局常量(渐变色系等)
│   │   └── storage.ts     # IndexedDB 封装
│   │
│   └── styles/            # 样式文件
│       └── theme.css      # 主题样式(毛玻璃、动画等)
│
└── public/                # 静态资源
    └── assets/            # 图片、图标等
```

## 🎯 开发进度

- [x] 项目初始化
- [x] 基础框架搭建
- [x] TailwindCSS 配置
- [x] 核心依赖集成
- [x] 项目结构建立
- [ ] 画布功能实现
- [ ] 卡片节点开发
- [ ] 富文本编辑
- [ ] 连线功能
- [ ] 数据持久化
- [ ] 操作体验优化

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

---

**开发状态**: MVP 阶段 - 项目初始化已完成 ✅
