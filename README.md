# CS 329Z 中文讲义

基于 Stanford **CS 329Z: Engineering AI Agents** 六份英文幻灯片整理的中文课程网站。每讲包含中文讲解、精选原课图表、完整讲义预览及原始 PDF 下载入口。内容是独立编写的学习笔记，并非逐字翻译或斯坦福官方出版物。

## 本地运行

需要 Node.js 22.12 或更新版本，以及 npm。

```bash
nvm use
npm ci
npm run dev
```

运行和构建前会把 `slides/` 中的原始 PDF 复制到被忽略的 `public/slides/original/`，确保开发模式也能预览讲义。`npm run build` 会生成静态站点并用 Pagefind 建立中文搜索索引。`npm run check` 会运行 Astro 检查和构建结果中的本地链接检查；应先运行 `npm run build`。

```bash
npm run build
npm run check
npm run preview
```

讲义原文在 `slides/lecture01.pdf` 至 `lecture06.pdf`。中文内容位于 `src/content/lectures/`。若需要重新生成精选讲义图片，安装 Poppler 工具后运行 `python3 scripts/render-figures.py`。更新图片页码时，还需同步更新 `src/data/figures.ts`。

## GitHub Pages

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会构建并部署静态站点。首次使用时，在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。站点路径配置为 `https://6eanut.github.io/stanford-cs329z/`；如果迁移仓库，需同步修改 `astro.config.mjs` 的 `site` 和 `base`，以及搜索页的 `baseUrl`。

课程内容基于原始 PDF 重新组织。图表和 PDF 均来自仓库中的课程幻灯片；请遵守原课程资料的使用条件。
