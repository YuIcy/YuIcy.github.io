# Xin Hao / 郝昕 · Personal homepage

英文默认、中英双语的研究与作品主页，使用 Astro + TypeScript + CSS，部署于 https://yuicy.github.io/。

## 本地开发

使用 Node.js 24 LTS（最低 22.12.0）。

```powershell
npm ci
npm run dev
```

打开终端显示的本地网址。英文页面为 `/`，中文页面为 `/zh/`。

```powershell
npm run check
npm run build
npm test
npm run preview
```

`npm test` 验证构建产物，需先运行 `npm run build`。

## 更新个人资料

修改 `src/data/profile.json`，包括姓名、邮箱、个人介绍（`bio`）、近期工作（`research`）、教育经历与工具。双语文字分别填写 `en` 和 `zh`，共用同一套页面模板。

替换 `public/images/xin-hao.jpg` 可更换照片。当前原图尺寸为 780×1080；若更换不同尺寸的照片，同步调整 `src/components/Home.astro` 中图片的 `width` 和 `height`，页面会按比例显示。

## 新增或修改项目

每个项目对应 `src/content/projects/` 中一个 Markdown 文件。文件名即稳定标识，也用于页面锚点，例如 `/#project-family-memory`。复制一个已有文件并修改顶部 YAML 字段即可；首版使用字段内容渲染项目，Markdown 正文不展示。

```yaml
---
title: { en: "Project name", zh: "项目名称" }
summary:
  en: "A short, factual description."
  zh: "简短、准确的项目介绍。"
category: { en: "Visualization", zh: "可视化" }
period: "2026"
order: 9
featured: false
---
```

- `order` 控制升序排列；`featured: true` 放入精选区，其他项目放入精简列表。
- `role` 和 `note` 为可选双语字段，用于个人贡献及有依据的成果记录。
- `code` 仅填写公开 GitHub 仓库的完整 HTTPS 地址；没有公开源码时省略此字段。
- `screenshot` 可选：将真实截图放在 `public/images/projects/`，填写 `src`（如 `/images/projects/example.png`）、原图 `width` / `height`、双语 `alt` / `caption`。有公开演示时填写 `source`，本地项目截图可省略。图片按原比例展示，点击可查看原图；优先横向核心界面，避免截成长页或拉伸图像。
- 双语必填字段由 Astro 内容集合校验。新增项目需同时填写中英文。
- 页面配色和布局在 `src/styles/global.css`。项目采用文字条目，介绍用途、个人贡献与成果状态。

可以在 GitHub 网页直接编辑内容文件并提交，也可以本地修改后提交。无需运行内容管理服务。

## 发布

GitHub Pages 的 Source 设置为 **GitHub Actions**。提交至 `main` 后，工作流自动安装依赖、检查、构建、运行产物测试并发布。PR 只执行检查，不发布。

初次设置命令（仓库管理员）：

```powershell
gh api --method PUT repos/YuIcy/YuIcy.github.io/pages -f build_type=workflow
```

手动重新发布可在 GitHub Actions 中运行 `Build and deploy homepage`。发布失败时旧版本继续提供服务；要回退，撤销对应提交并推送到 `main`。

站点地址固定配置于 `astro.config.mjs`、`public/robots.txt` 和 `public/sitemap.xml`；更换域名时同步更新三处。

## 内容边界

项目介绍与配图优先以现有项目、实际运行界面和仓库材料为依据；缺失的信息再从简历补充。身份、教育及个人贡献保留有材料支持的事实。公开页面使用照片与学校邮箱，不存放原简历或手机号。按用户要求展示 Family Memory、Inscription Evolution 的真实项目截图；截图展示不等于公开私有源码、原始数据或未公开论文。成果状态按材料原文表述。

网站代码和内容更新不影响独立项目仓库提供的 `/EpiHistRead-page/` 站点。

## 项目截图来源

- `family-memory.jpg`：从本地 Family Memory 实际页面截取源氏墓志阅读视图，1600×900。
- `inscription-evolution.jpg`：采用项目 `docs/visual-review/2026-08-01-detail-group-workbench/after.png` 中的实际界面记录，1811×888，按实际 JPEG 编码保存扩展名；属于该版本界面记录，不标作最新版本。

- `epihistread.png`：2026-09-12 截取公开 `EpiHistRead-page` 的 `gh-pages` 分支原样构建产物（本地镜像），展示上官婉儿对读页。
- `conference-schedule.png`：2026-09-12 运行公开 `conference-schedule-viewer` 的 `examples/demo.json`，截取紧凑日程界面。使用虚构示例数据，不代表真实会议记录。
