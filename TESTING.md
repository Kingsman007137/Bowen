# 项目测试指南

## 项目初始化验收测试

本文档提供项目初始化阶段的测试步骤和验收标准。

---

## ✅ 验收标准清单

根据任务文档 `1.project-initialization.md`，以下是所有验收标准:

- [x] 项目可以成功启动（`npm run dev` 无错误）
- [x] 浏览器访问 localhost:3000 能正常显示页面
- [x] 所有核心依赖已安装且版本兼容
- [x] 项目文件结构符合 MVP 计划书规划
- [x] TypeScript 编译无错误
- [x] ESLint 检查通过（无严重错误）
- [x] 基础样式系统配置完成（TailwindCSS 可用）
- [x] README.md 文档完整，说明清晰

---

## 🧪 测试步骤

### 1. 环境检查

确保你的环境满足以下要求:

```bash
# 检查 Node.js 版本（需要 18.x 或更高）
node --version

# 检查 npm 版本
npm --version
```

### 2. 安装依赖

如果是首次克隆项目,需要安装依赖:

```bash
cd Bowen
npm install
```

### 3. 运行开发服务器

```bash
npm run dev
```

**预期结果:**
- 命令执行无错误
- 控制台输出类似:
  ```
  ▲ Next.js 15.5.6
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000
  
  ✓ Ready in XXXms
  ```

### 4. 浏览器访问测试

打开浏览器访问: **http://localhost:3000**

**预期效果:**
- 页面能正常加载
- 看到渐变背景（亮色系: `#F5F7FA` → `#FFFFFF`）+ 微妙的网格点背景
- 顶部固定导航栏（高度 64px，毛玻璃效果）
  - 左侧：蓝色渐变 Logo "B" + "Bowen" 标题
  - 右侧："新建卡片"按钮（蓝色渐变） + 主题切换按钮（太阳图标）
- 画布区域显示 React Flow 的点状背景（Dot Pattern）
- 左下角显示放大的控制按钮（48x48px，带毛玻璃效果）
- 右下角显示 MiniMap（小地图，带毛玻璃效果）

### 5. 主题切换测试

**方式一：点击主题切换按钮**
1. 点击导航栏右侧的主题切换按钮（太阳/月亮图标）
2. 观察主题切换效果

**方式二：使用浏览器开发工具**
1. 按 F12 打开开发者工具
2. 按 Ctrl+Shift+P (或 Cmd+Shift+P)
3. 输入 "Rendering"
4. 找到 "Emulate CSS media feature prefers-color-scheme"
5. 选择 "dark"

**预期效果（亮色模式）:**
- 背景渐变: `#F5F7FA` → `#FFFFFF`
- 网格点颜色: rgba(0,0,0,0.03)
- 文字颜色: `#111111` / `#000000`
- 主题按钮显示太阳图标 ☀️

**预期效果（暗色模式）:**
- 背景渐变变为暗色: `#0F1115` → `#181C24`
- 网格点颜色: rgba(255,255,255,0.05)
- 文字颜色变为浅色: `#E6E6E6` / `#FFFFFF`
- 毛玻璃效果调整为暗色样式
- 主题按钮显示月亮图标 🌙

**持久化测试:**
1. 切换主题后刷新页面
2. 确认主题设置被保存（localStorage）
3. 确认刷新后仍保持用户选择的主题

### 6. 新建卡片功能测试

**方式一：点击按钮创建**
1. 点击导航栏的"新建卡片"按钮
2. 观察在画布中心位置创建新卡片
3. 卡片应该有 scale-in 动画效果

**方式二：双击画布创建**
1. 在画布空白处双击鼠标
2. 观察在双击位置创建新卡片
3. 卡片应该有 scale-in 动画效果

**预期效果:**
- 卡片节点正确创建
- 卡片有毛玻璃效果和蓝色渐变背景
- 卡片可以拖拽移动
- 卡片显示"卡片节点"标题和"待实现内容编辑功能"提示

### 7. 画布交互测试

**拖拽测试:**
1. 在画布空白处按住鼠标左键拖拽
2. 画布应该可以平移

**缩放测试:**
1. 使用鼠标滚轮缩放画布
2. 或点击左下角的 + / - 按钮
3. 缩放范围：0.25 ~ 2.0

**适应视图测试:**
1. 创建多个卡片
2. 点击左下角的"适应视图"按钮
3. 所有卡片应该自动调整到可见范围

### 8. 响应式测试

调整浏览器窗口大小，验证:
- 导航栏保持在顶部，宽度 100%
- 画布始终填满整个视窗（扣除导航栏高度）
- 控制按钮位置固定在左下角
- MiniMap 位置固定在右下角

### 9. TypeScript 编译测试

```bash
# 运行生产构建
npm run build
```

**预期结果:**
- 构建成功完成
- 无 TypeScript 类型错误
- 输出类似:
  ```
  ✓ Compiled successfully
  ✓ Linting and checking validity of types
  ✓ Collecting page data
  ✓ Generating static pages
  ```

### 10. ESLint 检查

```bash
npm run lint
```

**预期结果:**
- 无错误输出
- 退出码为 0

---

## 📋 依赖版本验证

检查 `package.json` 确认以下核心依赖已安装:

### 生产依赖:
- `next`: ^15.x
- `react`: ^19.x
- `react-dom`: ^19.x
- `@xyflow/react`: ^12.x (React Flow)
- `@tiptap/react`: ^3.x
- `@tiptap/starter-kit`: ^3.x
- `@tiptap/extension-image`: ^3.x
- `localforage`: ^1.x
- `zustand`: ^5.x

### 开发依赖:
- `typescript`: ^5.x
- `@tailwindcss/postcss`: ^4.x
- `tailwindcss`: ^4.x
- `eslint`: ^9.x
- `eslint-config-next`: 15.x

**验证命令:**

```bash
npm list --depth=0
```

---

## 📁 文件结构验证

确认以下目录和文件存在:

```
Bowen/
├── src/                     ✓ 源代码目录
│   ├── app/
│   │   ├── layout.tsx      ✓ 全局布局
│   │   ├── page.tsx        ✓ 主页面
│   │   └── globals.css     ✓ 全局样式
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── CanvasContainer.tsx    ✓ 画布容器
│   │   │   └── CardNode.tsx           ✓ 卡片节点
│   │   ├── Editor/
│   │   │   ├── TiptapEditor.tsx       ✓ 富文本编辑器
│   │   │   └── ImageUploader.tsx      ✓ 图片上传
│   │   └── UI/
│   │       ├── ColorPicker.tsx        ✓ 颜色选择器
│   │       ├── Toolbar.tsx            ✓ 工具栏（旧）
│   │       └── Navbar.tsx             ✓ 导航栏（新）
│   ├── hooks/
│   │   ├── useLocalStorage.ts   ✓ 存储 Hook
│   │   ├── useCanvasStore.ts    ✓ 状态管理
│   │   └── useTheme.ts          ✓ 主题切换 Hook
│   ├── lib/
│   │   ├── constants.ts         ✓ 全局常量
│   │   └── storage.ts           ✓ IndexedDB 封装
│   └── styles/
│       └── theme.css            ✓ 主题样式
├── public/
│   └── assets/              ✓ 静态资源目录
├── README.md                ✓ 项目文档
├── TESTING.md               ✓ 测试文档
└── package.json             ✓ 依赖配置
```

---

## 🎨 样式系统验证

### CSS 变量检查

打开浏览器开发者工具 → Elements → Computed，查找以下 CSS 变量:

**亮色系:**
- `--gradient-blue-start: #4E8CEB`
- `--gradient-blue-end: #64C7FF`
- `--gradient-pink-start: #F6D2FF`
- `--gradient-pink-end: #FFE3D8`
- `--gradient-mint-start: #8EEFC4`
- `--gradient-mint-end: #56D9A0`

**暗色系:**
- `--gradient-blue-start: #3B6BEC`
- `--gradient-blue-end: #4AC6FF`
(等等...)

### TailwindCSS 工具类验证

在浏览器控制台执行:

```javascript
// 检查 Tailwind 是否正常工作
document.body.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-500')
```

预期: 背景应该显示蓝紫渐变

---

## 🐛 常见问题排查

### 问题 1: 端口 3000 被占用

**症状:** `Error: listen EADDRINUSE: address already in use :::3000`

**解决方案:**
```bash
# 方案 1: 使用其他端口
npm run dev -- -p 3001

# 方案 2: 杀死占用进程 (Windows)
netstat -ano | findstr :3000
taskkill /PID <进程号> /F

# 方案 2: 杀死占用进程 (Mac/Linux)
lsof -ti:3000 | xargs kill
```

### 问题 2: 模块未找到错误

**症状:** `Module not found: Can't resolve '@/...'`

**解决方案:**
```bash
# 清理缓存重新安装
rm -rf node_modules package-lock.json .next
npm install
```

### 问题 3: TypeScript 类型错误

**症状:** 构建时出现类型错误

**解决方案:**
```bash
# 重新生成类型定义
rm -rf .next
npm run dev
# 等待项目编译完成后再次构建
npm run build
```

### 问题 4: 样式未生效

**症状:** 页面显示但无样式

**解决方案:**
1. 检查 `app/globals.css` 是否正确导入
2. 检查 `app/layout.tsx` 是否导入了 `globals.css`
3. 清理缓存: `rm -rf .next && npm run dev`

---

## ✅ 验收确认

完成所有测试后，确认以下清单:

### 基础功能
- [ ] 开发服务器能成功启动
- [ ] 浏览器能正常访问并显示页面
- [ ] 生产构建能成功完成
- [ ] ESLint 检查通过
- [ ] 所有核心文件和目录都已创建
- [ ] README.md 文档完整

### 界面显示
- [ ] 导航栏正确显示（Logo + 标题 + 按钮）
- [ ] 画布背景有渐变和网格点效果
- [ ] 控制按钮尺寸正确（48x48px）
- [ ] MiniMap 显示正常

### 主题切换
- [ ] 主题切换按钮正常工作
- [ ] 亮色/暗色主题都能正确显示
- [ ] 主题切换有平滑过渡动画（300ms）
- [ ] 主题设置能持久化保存
- [ ] 刷新页面后主题保持

### 卡片功能
- [ ] 点击"新建卡片"按钮能创建卡片
- [ ] 双击画布能创建卡片
- [ ] 卡片创建位置正确
- [ ] 卡片有毛玻璃和渐变效果
- [ ] 卡片可以拖拽移动

### 画布交互
- [ ] 画布可以拖拽平移
- [ ] 画布可以缩放（鼠标滚轮 + 按钮）
- [ ] 适应视图功能正常

全部通过即表示界面优化完成! ✨

---

## 📝 下一步

界面优化完成后，可以进入下一阶段:

**阶段 3: 富文本编辑**
- 集成 Tiptap 编辑器到卡片中
- 实现内容编辑和保存
- 支持图片插入
- 支持 Markdown 快捷键

**阶段 4: 数据持久化**
- 实现画布状态自动保存
- 使用 IndexedDB 存储数据
- 刷新后恢复画布状态

详见: `docs/MVP计划书.md` 查看完整开发流程



