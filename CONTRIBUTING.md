# 贡献指南

欢迎提 Issue 和 PR。这是个**零依赖、零构建**的浏览器扩展，改代码不需要装任何东西。

## 前置条件

- Chrome 或 Edge 浏览器
- Git
- Node.js（可选，仅用于 `node --check` 语法校验）
- Python 3（可选，仅用于校验 `manifest.json`）

> **不需要 `npm install`。** 仓库没有 `package.json`，也没有打包步骤，扩展直接以源码目录加载。

## 本地跑起来

1. `git clone https://github.com/achun1107/github-profile-decorator.git`
2. 打开 `chrome://extensions`（Edge 为 `edge://extensions`），开启右上角**开发者模式**。
3. 点**加载已解压的扩展程序**，选择仓库根目录。
4. 访问 `https://github.com/torvalds`，页面底部应出现装饰区。
5. 改完代码，回扩展页点该扩展的**重新加载**，再刷新 GitHub 页面。

## 提交前自检

```bash
python3 -c "import json;m=json.load(open('manifest.json'));assert m['manifest_version']==3;print('manifest ok')"
for f in content.js popup.js background.js; do node --check "$f"; done
```

CI（`.github/workflows/validate.yml`）跑的是同样的检查。此外请手动确认：

- [ ] 装饰区能出现，切到另一个账号主页会重新注入且不叠加
- [ ] 弹窗改主题 / 关模块后立即生效
- [ ] 未配置贡献蛇时显示提示文案，而不是破图
- [ ] 深色模式下卡片与文字可读
- [ ] 没有新增 `manifest.json` 之外的权限或域名

## 提交规范

沿用仓库现有风格：**gitmoji 前缀 + 中文描述**，一条提交只做一件事。

| 前缀 | 用途 |
| --- | --- |
| ✨ | 新模块 / 新能力 |
| 🐛 | 修复 |
| ♻️ | 重构 |
| 📝 | 文档 |
| 🎨 | 样式 / 视觉 |
| ✅ | 校验 / CI |

例：`✨ 新增 Trophy 模块开关`。不强制 conventional commits。

## 改动要同步的文档

| 你改了什么 | 必须同步 |
| --- | --- |
| 注入模块、默认配置 | `content.js` 的 `DEFAULTS.modules`、`popup.html` 开关、README 模块表、`STORE_LISTING.md` |
| 权限 / 匹配域名 | `manifest.json`、`PRIVACY.md`、`STORE_LISTING.md`、README 权限说明 |
| 存储方式 | `content.js`、`popup.js`、`PRIVACY.md`、README 隐私段落 |
| 对外可见的行为变化 | `CHANGELOG.md`、`docs/index.html` |

完整约束见 [AGENTS.md](AGENTS.md)。

## Issue 与 PR

- 提 Bug 请用模板，附上浏览器版本、扩展版本、复现主页 URL、控制台报错。
- 商店打包产物（`.zip` / `.crx` / `.pem`）不要提交，已在 `.gitignore` 里。
- 截图必须是真实渲染结果；`assets/*.svg` 是示意图，不能冒充商店截图。

## 行为准则

就事论事，对代码不对人。安全漏洞请不要公开贴细节，走 [SECURITY.md](SECURITY.md) 的渠道。
