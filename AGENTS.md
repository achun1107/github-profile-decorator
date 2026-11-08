# AGENTS.md — 仓库级 AI 协作规范

> 供 Claude Code / Cursor / Copilot / Codex 等 AI 助手进入仓库时读取。
> 本项目是**零依赖、零构建的 Chrome/Edge Manifest V3 浏览器扩展**，不是 npm 项目。
> 动手前先读本文件；改完请同步下方第 5 节列出的文档。

## 1. 项目是什么

- **形态**：`manifest.json` + `content.js` + `popup.html` / `popup.js` + `background.js` 组成的 MV3 扩展，直接以源码目录加载。
- **行为**：内容脚本匹配 `https://github.com/*`，在 GitHub **个人主页**底部注入装饰区（统计卡片、贡献蛇、技术栈、社交徽章等）。
- **数据源**：全部为公开第三方徽章服务的图片 URL。无后端、无账号体系、不向自有服务器发送数据。
- **配置**：存于 `chrome.storage.sync`（若登录 Chrome 账号，由 Chrome 自行同步）；键名见 `content.js` 的 `DEFAULTS`。
- **分发**：`git clone` + 开发者模式「加载已解压的扩展程序」。Chrome Web Store 上架准备见 `STORE_LISTING.md`。
- **历史**：2026-11-08 当天由「纯前端 README 导出工具」pivot 为浏览器扩展，见 `git log`。仓库 description 曾停留在初版，任何定位描述以 `README.md` 与 `manifest.json` 为准。

## 2. 文件职责

| 文件 | 职责与改动注意 |
| --- | --- |
| `manifest.json` | MV3 权限与入口声明。改 `host_permissions` / `content_scripts.matches` 会改变商店审核结论，必须同步 `PRIVACY.md`、`STORE_LISTING.md` |
| `content.js` | 注入逻辑、Turbo SPA 路由适配、装饰区 HTML 构造。**唯一直接操作 GitHub 页面 DOM 的文件** |
| `popup.html` / `popup.js` | 配置弹窗，读写 `chrome.storage.sync` |
| `background.js` | service worker |
| `icons/` | 16 / 48 / 128 PNG，扩展与商店图标 |
| `assets/` | 品牌 banner 与装饰区排版**示意图**（SVG），不是真实截图 |
| `docs/` | GitHub Pages 落地页与官网 `robots.txt` / `llms.txt` |
| `README.md` | 面向人的门面：定位、快速开始、模块、配置、FAQ |
| `AGENTS.md` / `llms.txt` / `.github/copilot-instructions.md` | 面向 AI 的规范 |
| `PRIVACY.md` | 隐私政策，商店上架必需 |
| `STORE_LISTING.md` | 商店文案与待补素材清单 |
| `CHANGELOG.md` | 版本变更记录 |
| `.github/workflows/validate.yml` | CI：manifest 校验、JS 语法、资源完整性 |

## 3. 硬性约束

1. **不要引入 `package.json`、npm 依赖、打包器或构建步骤。** 加构建会破坏「clone 即用」这一核心分发路径。
2. **不要改 `manifest_version`，不要扩大 `host_permissions` / `matches` 范围**（当前仅 `https://github.com/*`）。扩大范围会让「不读取 GitHub 以外网页」的隐私承诺失效。
3. **不要把配置存储从 `chrome.storage.sync` 换成别的 API 而不写迁移逻辑**——老用户配置会丢。
4. **注入必须兼容 GitHub 的 Turbo SPA 路由**：页面切换不整页刷新，靠 `turbo:render` / `pjax:end` / `MutationObserver` 重新注入。不要写成「只在 `DOMContentLoaded` 跑一次」。
5. **防重复注入**：先 `removeWidget()` 再注入，保留 `injectedPath` 判断，避免装饰区叠加。
6. **所有外链必须 https**；第三方徽章服务不可用时优雅降级（现有 `error` 监听隐藏破图、贡献蛇显示提示），不要引入破图。
7. **不要提交密钥、`.pem`、`.crx`、打包 zip**，见 `.gitignore`。
8. **不要把示意图当真实截图**：`assets/*.svg` 是品牌 / 排版示意图，商店截图必须真实渲染。
9. **不要加装饰性徽章**（made-with-love 之类）。README 只挂有真实信号的徽章：CI、License、Release。
10. 文档以中文为主，保留英文品类词（`chrome-extension`、`github-profile`、`manifest-v3`、`github-readme-stats`），供 GitHub 搜索命中。

## 4. 改完怎么验证

无构建、无测试框架，至少跑：

```bash
python3 -c "import json;m=json.load(open('manifest.json'));assert m['manifest_version']==3;print('manifest ok')"
for f in content.js popup.js background.js; do node --check "$f"; done
```

CI 在 push / PR 时跑等价检查。真机验证清单：

- `chrome://extensions` → 开发者模式 → 加载已解压 → 访问 `https://github.com/torvalds` 出现装饰区；
- 通过站内链接切到另一个账号主页，装饰区重新注入且不叠加；
- 弹窗改主题 / 关模块后立即生效；
- 未配置贡献蛇时显示提示文案而不是破图；
- 深色模式下卡片与文字可读。

## 5. 提交与文档同步

- 沿用现有风格：**gitmoji 前缀 + 中文描述**（`✨ 新增…` / `♻️ 改为…` / `📝 文档…`），不强制 conventional commits。
- **文档 SSoT**：改动涉及行为、权限、模块或存储时，同步 `README.md`、`docs/index.html`、`PRIVACY.md`、`STORE_LISTING.md`、`CHANGELOG.md` 中相关段落，不要只改代码。
- 新增装饰模块要同时更新 `content.js` 的 `DEFAULTS.modules`、`popup.html` 的开关、README 模块表、`STORE_LISTING.md` 详细描述。

## 6. 明确不要做的事

- 不要把项目改回纯前端 README 导出工具。
- 不要为提升质检分数挂假徽章、编造截图、造空 Release 或刷 star。
- 不要把用户可控字符串未转义地拼进 `innerHTML`（当前 `getDisplayName()`、`cfg.quote`、`cfg.social.*` 会进入 HTML，改动时优先加转义）。
