# Changelog

本文件记录本项目的所有重要变更。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [SemVer](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2026-11-08

首个可分发版本。

> 注意：此时扩展**尚未上架 Chrome Web Store**，安装方式为 clone 仓库后在开发者模式加载，见 [README 快速开始](README.md)。商店上架待办见 `STORE_LISTING.md`。

### Added

- MV3 浏览器扩展主体：访问任意 GitHub 个人主页，在页面底部注入装饰区；兼容 GitHub Turbo SPA 路由。
- 12 个可独立开关的装饰模块：欢迎标题、打字动画、访客徽章、统计卡片（含语言分布）、连续打卡、技术栈图标、成就奖杯、贡献活跃度图谱、WakaTime、贡献蛇、社交徽章、页脚语录。
- 配置弹窗：总开关、模块开关、卡片主题、技术栈图标、文案与社交链接；配置实时生效。
- 贡献蛇未配置时的降级提示（显示说明而非破图），其余图片加载失败时自动隐藏。
- `PRIVACY.md` 隐私政策与 `STORE_LISTING.md` 商店上架清单。
- 项目门面与协作文档：README 快速开始 / FAQ、[AGENTS.md](AGENTS.md)、`llms.txt`、Copilot 定制指令、[CONTRIBUTING.md](CONTRIBUTING.md)、[SECURITY.md](SECURITY.md)、issue 模板、本 CHANGELOG、`.gitignore`。
- CI 校验工作流：校验 `manifest.json`、JS 语法与图标资源完整性。
- 官网落地页 `docs/`、官网 `robots.txt` / `llms.txt`，以及品牌 banner 与装饰区排版示意图。

### Changed

- 项目形态由初版的「纯前端 README 导出工具」改为「GitHub 个人主页注入式浏览器扩展」（见 `git log` 的 3 个提交）。仓库 description 同步修正为扩展定位。
- 澄清隐私表述：配置实际保存在 `chrome.storage.sync`，登录 Chrome 账号时由 Chrome 自身在多设备间同步；扩展本身不向任何自有服务器发送数据。此前 README 的「仅存本地、不上传」表述不够准确。

### Fixed

- 消除 GitHub Pages 自动构建失败：为 Pages 提供真实的 `docs/index.html` 入口并停用 Jekyll，避免 Jekyll 在无入口的仓库上反复报错。

### 已知限制

- 装饰卡片依赖公开第三方徽章服务，服务不可用时对应卡片会隐藏。
- 贡献蛇需目标用户在自己的 `<用户名>/<用户名>` 仓库配置生成 Action。
- Chrome Web Store 上架所需 3 张真实截图与开发者账号尚未补齐。
