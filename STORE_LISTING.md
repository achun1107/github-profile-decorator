# Chrome Web Store 上架清单

> **当前状态：准备中，尚未上架。** 现在的分发方式是 `git clone` + 开发者模式「加载已解压的扩展程序」。
> 上架前需自行补充：3 张**真实渲染截图**、宣传图（440×280 / 920×680）、开发者账号（$5 一次性注册费）。图标已具备（16 / 48 / 128 PNG）。
> 注意：`assets/*.svg` 是品牌与排版**示意图**，不能冒充商店截图。

## 名称

GitHub 个人主页装修助手

## 简短描述（≤132 字符）

访问任意 GitHub 个人主页时自动注入统计卡片、贡献蛇、技术栈等装饰，一键把主页装修得更漂亮。

## 详细描述（Detailed description）

GitHub 个人主页装修助手是一款轻量浏览器扩展（Chrome / Edge，Manifest V3）。

安装后，每当你访问任意 GitHub 个人主页，扩展会自动在页面底部注入一个装饰区，包含：

- 欢迎标题（自动读取显示名）
- 打字动画横幅
- 访客计数徽章
- GitHub 统计卡片（含语言分布）
- 连续打卡 Streak
- 技术栈图标
- 🏆 成就奖杯 Trophy
- 📈 贡献活跃度图谱 Activity Graph
- 🐍 贡献蛇动画
- ⏱️ WakaTime 编码时长
- 社交徽章（GitHub / 邮箱 / 网站 / Twitter）
- 自定义页脚语录

所有卡片调用公开的第三方徽章服务；扩展本身**没有后端、不收集数据、不向自有服务器上传任何信息**，配置保存在浏览器 `chrome.storage.sync`（登录 Chrome 账号时由 Chrome 自身同步）。点击工具栏图标即可开关扩展、切换主题与各模块。

English keywords: GitHub profile decorator, chrome-extension, edge-extension, manifest-v3, github-readme-stats, contribution snake, profile widgets.

## 分类

Productivity / 个性化

## 语言

简体中文（界面）

## 隐私政策

见仓库 `PRIVACY.md`，商店「隐私权惯例」按该文填写：无后端、无分析脚本、不收集个人数据；图片请求指向公开第三方徽章服务。

## 权限理由（商店审核用）

| 权限 | 理由 |
| --- | --- |
| `storage` | 保存模块开关、主题与文案，仅在本机浏览器使用 |
| `https://github.com/*` | 仅在 GitHub 个人主页注入装饰区，不访问其他网站 |

## 截图建议（需自行补充）

1. 访问 `github.com/torvalds` 显示底部装饰区的截图
2. 扩展弹窗配置页截图
3. 暗色模式下的效果截图

## 上架前自检

- [ ] 3 张真实截图 + 宣传图
- [ ] 开发者账号已注册
- [ ] `manifest.json` 版本号与 `CHANGELOG.md` 一致
- [ ] `PRIVACY.md` 链接可公开访问
- [ ] 打包 zip 不含 `.git` / `.pem`（见 `.gitignore`）
