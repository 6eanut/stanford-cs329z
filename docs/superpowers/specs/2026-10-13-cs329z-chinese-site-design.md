# CS 329Z 中文课程网站 — 设计文档

**日期:** 2026-10-13
**状态:** 已确认
**作者:** 与用户协作完成

---

## 1. 项目目标

为斯坦福课程 **CS 329Z: Engineering AI Agents**（授课教师：Diyi Yang, Michael Ryan, John Yang）构建一个中文课程网站，
托管在 GitHub Pages 上，域名为 `6eanut/stanford-cs329z` 仓库对应的 Pages 地址。

网站的核心价值：**面向中文自学者的课程讲解**。原始材料是 6 个英文 PDF 幻灯片
（共 596 页），本站将其转化为结构化的中文要点笔记，并配以从原幻灯片中精选的图表，
同时保留原始英文幻灯片的下载入口。

## 2. 原始材料现状

| 讲次 | 文件 | 主题 | 页数 |
|------|------|------|------|
| 1 | `slides/lecture01.pdf` | Intro to Agentic Systems（智能体系统导论） | 71 |
| 2 | `slides/lecture02.pdf` | LLMs for Builders（面向构建者的大模型） | 176 |
| 3 | `slides/lecture03.pdf` | RAG + Agents（检索增强生成与智能体） | 63 |
| 4 | `slides/lecture04.pdf` | Tool Use（工具使用） | 68 |
| 5 | `slides/lecture05.pdf` | Frameworks & Orchestration（框架与编排） | 132 |
| 6 | `slides/lecture06.pdf` | Agent Design Patterns and Scaffolds（智能体设计模式与脚手架） | 86 |

仓库当前状态：空仓库，无任何 commit，`slides/` 目录未纳入版本控制。

## 3. 内容形态（用户已确认的决策）

- **中文讲解为主干 + 嵌入原图**：每讲一篇中文要点笔记，配从 PDF 渲染的精选图表。
- **深度**：中等，要点笔记风格。每讲约 1500–3000 中文字，忠实覆盖原课知识点，
  不过度展开背景知识。
- **忠实度说明**：这是**基于原始材料的中文讲解**，不是逐字翻译。覆盖原课所有知识点、
  概念、例子，但行文为中文读者重写——因为 PPT 文字是碎片化的演讲提示词，直译不成文章。
- **原始幻灯片**：每讲页面提供原始英文 PDF 下载链接，以及可展开的逐页图片预览。

## 4. 技术方案

- **框架**：Astro（静态站点生成，Markdown 内容，构建快，适合图文长文）。
- **内容格式**：每讲一个 Markdown 文件，存放于 `src/content/lectures/`，用 Astro
  Content Collections + Zod schema 校验 frontmatter。
- **图表**：从 PDF 预渲染为 PNG（非运行时处理），作为静态资产存于 `public/slides/figures/`。
- **部署**：GitHub Actions 自动构建并发布到 GitHub Pages。
- **推进策略**：先做第 1 讲完整样板（含框架 + 图表 + 笔记 + 部署），用户验收后再批量做 2–6 讲。

## 5. 目录结构

```
stanford-cs329z/
├── slides/                      # 原始 PDF（事实来源，纳入版本控制）
├── scripts/
│   ├── extract_slides.py        # PDF → 文字骨架 + 图表 PNG
│   └── check_links.py           # 构建后站内链接检查
├── public/
│   └── slides/
│       ├── original/            # lectureNN.pdf 的副本（供用户下载）
│       └── figures/
│           └── lecture01/       # 第1讲精选图表 PNG
├── src/
│   ├── content/
│   │   ├── config.ts            # Content Collection schema 定义
│   │   └── lectures/
│   │       └── 01-intro.md      # 每讲一个 Markdown（中文笔记）
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/              # TOC 侧边栏、搜索、主题切换、幻灯片查看器
│   ├── pages/
│   │   ├── index.astro          # 首页课程总览
│   │   └── lectures/[slug].astro
│   └── styles/
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml # GitHub Pages 自动部署
```

**原则**：`slides/` 里的 PDF 是唯一事实来源，所有内容由脚本派生，可重复生成。
每讲一个 Markdown 文件——文件小、职责单一。

## 6. 内容生成流水线

全部由 `scripts/extract_slides.py` 驱动，三步：

1. **提取文字骨架**：`pdftotext -layout` 逐页提取，存为 `slides/_extracted/lectureNN.txt`
   （中间产物，不提交）。用途：写作者逐页核对原课内容，避免凭空发挥。

2. **渲染图表**：用 `pdftoppm -png -r 150` 将**选定页码整页渲染**为 PNG。
   - 关键决策：**按整页渲染，而非抽取内嵌图像**。因为 PDF 内嵌的图像对象大多是
     logo、透明蒙版、装饰图标（第 1 讲有 143 个图像对象，绝大多数是噪声）。
   - 选页规则：脚本内置一张每讲的"图表页清单"，由写作者读完整节后人工挑选。
   - 失败处理：某页渲染失败必须**显式报错并列出页码**，绝不静默跳过。

3. **写中文笔记**：读文字骨架 + 看图表，产出 `src/content/lectures/NN-topic.md`。

### Markdown 结构约定

```markdown
---
title: "第 1 讲 · 智能体系统导论"
lecture: 1
topic: Intro to Agentic Systems
slides: 71
duration: "~75 分钟"
---

## 本节概览
（3-4 句，这节要解决什么问题）

## 1. 什么是 AI Agent
（要点讲解……）

![智能体架构图](/slides/figures/lecture01/agent-arch.png)
*图：Agent 架构的三个层次（原 slide 15）*

## 关键概念回顾
（表格或列表，便于复习）

> 📎 [下载原始英文幻灯片 (PDF)](/slides/original/lecture01.pdf)
```

## 7. 网站功能

| 功能 | 实现方式 |
|------|----------|
| **导航 + 页内目录** | 首页课程总览；每讲页面**左侧常驻侧边栏**目录（滚动高亮当前节，移动端收起）。TOC 从 Markdown 标题由 remark 插件构建时自动生成。 |
| **深色模式** | CSS 变量 + `localStorage` 记忆 + 尊重 `prefers-color-scheme` 初始值。零依赖。 |
| **全文搜索** | Pagefind。构建后扫描 HTML 生成静态索引，浏览器端 JS 搜索。对 CJK 中文分词有原生支持，无需后端。 |
| **内嵌原幻灯片** | 每讲顶部可折叠区域，展开显示整页 PNG 缩略图墙，点击放大。与图表共用同一批图片资产，不使用 PDF.js。 |

### 数据流

```
slides/*.pdf
  →(extract_slides.py)→ 文字骨架 + 图表 PNG
  →(写作者)→ Markdown（中文笔记）
  →(Astro + Pagefind)→ 静态 HTML + 搜索索引
  →(GitHub Actions)→ 线上站点
```

## 8. 质量保障

- **提取脚本测试**：断言每个 PDF 都能产出非空文字骨架、能渲染出指定页图片。
  这是内容正确性的根——脚本静默产出空文件会导致后续全错。
- **构建门禁**：`npm run build` 必须零错误通过。Content Collection 的 Zod schema
  在构建时校验每篇 Markdown 的 frontmatter。
- **链接检查**：构建后运行 `scripts/check_links.py`，校验站内图片与 PDF 下载路径，
  防止路径写错导致图裂。
- **人工验收**：`npm run preview` 本地起服务，截图确认效果后再部署。

## 9. 明确不做（YAGNI）

- ❌ 评论区
- ❌ 用户登录
- ❌ 后端 API / 数据库
- ❌ 多语言切换框架（站点本身即中文）
- ❌ PDF.js 在线浏览器（改用预渲染 PNG）

## 10. 交付里程碑

1. **里程碑 A（第 1 讲样板）**：完整网站框架 + 第 1 讲中文笔记 + 精选图表 +
   部署配置，本地预览通过，用户验收。
2. **里程碑 B（批量）**：用同一流水线完成第 2–6 讲，站点上线。

## 11. 待用户手动完成的步骤

- 在 GitHub 仓库 Settings → Pages 中将 Source 设置为 "GitHub Actions"。

## 12. 未决问题

- 站点视觉风格（配色、字体、排版）在实现阶段确定；倾向简洁、适合长文阅读的技术文档风格。
