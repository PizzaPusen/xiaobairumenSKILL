# AIGC 片场

为从传统影视转型到 AIGC 的新手打造的一站式学习与创作工具箱网页。

**纯前端实现，不调用任何外部 AI 模型 API。** 所有生成类功能通过本地规则、模板和 JSON 数据实现。

## 功能概览

- **首页** — 平台介绍与功能导航
- **技能工具箱** (`/skills`) — 9+ 实用 AIGC 工具，支持搜索过滤
- **技能详情** (`/skills/[id]`) — 四种交互类型：提示词拼接、模板填空、计算器、速查卡片
- **模型对比** (`/models`) — 12 款主流 AIGC 工具横向对比
- **关于** (`/about`) — 平台介绍与使用建议

## 技术栈

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui 组件
- lucide-react 图标
- 本地 JSON 数据（`src/data/`）
- 支持静态导出部署

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)

## 构建与部署

```bash
# 生产构建
npm run build

# 本地预览生产版本
npm start
```

### GitHub Pages（已配置 CI）

推送到 `main` 分支后，GitHub Actions 会自动构建并部署：

**在线地址：** https://pizzapusen.github.io/xiaobairumenSKILL/

本地静态导出（可选）：

```bash
# Windows / 本地预览需设置 GITHUB_PAGES 以匹配子路径
set GITHUB_PAGES=true && npm run build
# 输出在 out/ 目录
```

也可部署到 [Vercel](https://vercel.com)，无需 `basePath` 配置。

## 项目结构

```
src/
├── app/                  # 页面路由
│   ├── page.tsx          # 首页
│   ├── skills/           # 工具箱
│   ├── models/           # 模型对比
│   └── about/            # 关于
├── components/
│   ├── layout/           # 导航、页面标题
│   ├── skills/           # 四种技能交互组件
│   ├── models/           # 模型对比表格
│   └── ui/               # shadcn/ui 基础组件
├── data/
│   ├── skills.json       # 技能数据（可自由增改）
│   └── models.json       # 模型数据
├── lib/                  # 工具函数与数据读取
└── types/                # TypeScript 类型定义
```

## 自定义数据

编辑 `src/data/skills.json` 和 `src/data/models.json` 即可增改内容，组件会自动渲染最新数据。

### 技能类型

| type | 说明 |
|------|------|
| `prompt-builder` | 提示词拼接器 |
| `template-fill` | 模板填空器 |
| `calculator` | 计算器/转换器 |
| `info-card` | 静态速查卡片 |

## License

MIT
