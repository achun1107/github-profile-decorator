# 隐私政策 — GitHub 个人主页装修助手

> 最后更新：2026-11-08 · 适用版本：v1.0.0
> 本文同时用于 Chrome Web Store 上架审核；权限声明见 `manifest.json`。

本扩展（GitHub 个人主页装修助手）尊重并保护用户隐私。**本扩展没有后端服务，不收集任何个人数据。**

## 我们收集什么

- 扩展自身不向任何自有服务器上传、存储或传输用户信息；
- 不嵌入任何第三方分析、广告或追踪脚本；
- 不读取 GitHub 以外的网页内容。

## 数据存储

所有配置（模块开关、主题、文案、社交链接等）保存在浏览器的 `chrome.storage.sync` 中，仅用于在当前浏览器内渲染装饰。扩展开发者不接触、也无法读取这些配置。

> 关于 `storage.sync`：这是 Chrome 提供的同步存储。**如果你登录了 Chrome 账号并开启了同步，这些配置会由 Chrome 自身在你的设备间同步**（经由 Google 的同步服务），这属于浏览器自身行为，不是本扩展上传数据。若不希望发生同步，可在 Chrome 同步设置中关闭扩展数据同步。

## 网络请求

本扩展仅在被访问的 GitHub 个人主页上，向以下**公开的第三方徽章服务**发起图片请求，以渲染装饰卡片：

- `github-readme-stats.vercel.app`（统计卡片 / 语言分布 / WakaTime）
- `streak-stats.demolab.com`（连续打卡）
- `readme-typing-svg.demolab.com`（打字动画）
- `skillicons.dev`（技术栈图标）
- `komarev.com`（访客计数）
- `github-readme-activity-graph.vercel.app`（活跃度图谱）
- `github-profile-trophy.vercel.app`（奖杯）
- `raw.githubusercontent.com`（贡献蛇，由目标用户自己的仓库生成）
- `img.shields.io`（社交徽章）

这些请求仅用于获取公开的统计 / 动画图片，请求 URL 中可能包含**本来就是公开主页地址一部分**的 GitHub 用户名；不含你的配置、Cookie 或凭据，也不经由本扩展中转。各服务有自己的隐私政策，本扩展不控制它们。你可在配置弹窗里关闭任意模块以避免对应请求。

## 权限说明

- `storage`：保存你的配置到浏览器本地。
- `host_permissions: https://github.com/*`：仅在 GitHub 页面运行内容脚本以注入装饰，不访问其他网站。

扩展不会请求 `tabs`、`<all_urls>`、Cookie 或任何网络拦截权限。

## 联系

如有隐私相关疑问，请通过 [GitHub 仓库 Issue](https://github.com/achun1107/github-profile-decorator/issues) 联系。**安全漏洞请勿公开发布**，走 [SECURITY.md](SECURITY.md) 的私有报告渠道。
