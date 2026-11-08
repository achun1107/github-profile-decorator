# GitHub Copilot 定制指令

## 项目一句话

Chrome / Edge **Manifest V3** 浏览器扩展：在 GitHub 个人主页底部注入统计卡片、贡献蛇、技术栈与社交徽章。原生 JS，**零依赖、零构建、无后端**。

## 代码风格

- 原生 ES2017+ JavaScript，IIFE 包裹 + `"use strict"`，不使用框架、转译器或模块打包。
- 跟随现有文件：字符串用双引号、动态 HTML 用模板字符串、2 空格缩进、标识符英文、注释中文。
- 注入的 CSS 类名统一 `ghd-` 前缀，样式通过 `<style id="ghd-style">` 一次性注入，先判重再插入。
- 新增 DOM 元素优先用 `document.createElement`；需要模板拼接时，用户可控文本必须转义后再进 `innerHTML`。

## 约束（违反会导致 PR 被退回）

- 不要生成 `package.json`、`import`/`require` 外部依赖、构建脚本或 TypeScript 配置。
- 不要修改 `manifest_version`，不要扩大 `host_permissions` / `content_scripts.matches`（仅 `https://github.com/*`）。
- 不要更改 `chrome.storage.sync` 中已有的配置键名，也不要擅自换成 `storage.local`。
- 注入逻辑必须兼容 GitHub Turbo SPA：保留 `turbo:render` / `pjax:end` / `MutationObserver` 与 `injectedPath` 防重复机制。
- 所有远程 URL 用 https；第三方图片要挂 `error` 降级，避免破图。
- 不要把 `assets/*.svg` 示意图当真实截图引用，不要加装饰性徽章。

## 文档同步

改动涉及模块、权限、存储或对外行为时，同步 `README.md`、`docs/index.html`、`PRIVACY.md`、`STORE_LISTING.md`、`CHANGELOG.md`。中文为主，保留英文品类词（`chrome-extension`、`github-profile`、`manifest-v3`）。

## 验证与更多规则

校验命令、真机清单与完整硬性约束见仓库根目录 [AGENTS.md](../AGENTS.md)；CI 定义见 `.github/workflows/validate.yml`。
