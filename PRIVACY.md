# 隐私政策 — GitHub 个人主页装修助手

本扩展（GitHub 个人主页装修助手）尊重并保护用户隐私。

## 我们收集什么
**不收集任何个人数据。** 本扩展：
- 不在后台上传、存储或传输任何用户信息；
- 不嵌入任何第三方分析、广告或追踪脚本；
- 不读取 GitHub 以外的网页内容。

## 数据存储
所有配置（模块开关、主题、文案、社交链接等）仅保存在**用户本地浏览器**的 `chrome.storage.sync` 中，用于在当前浏览器内渲染装饰。这些数据不会发送给本扩展开发者或任何服务器。

## 网络请求
本扩展仅在被访问的 GitHub 个人主页上，向以下**公开的第三方徽章服务**发起图片请求，以渲染装饰卡片：
- github-readme-stats.vercel.app（统计卡片 / WakaTime）
- streak-stats.demolab.com（连续打卡）
- readme-typing-svg.demolab.com（打字动画）
- skillicons.dev（技术栈图标）
- komarev.com（访客计数）
- github-readme-activity-graph.vercel.app（活跃度图谱）
- github-profile-trophy.vercel.app（奖杯）
- raw.githubusercontent.com（贡献蛇，由目标用户自己的仓库生成）

这些请求仅用于获取公开的统计/动画图片，不含任何用户隐私数据，也不经由本扩展中转。

## 权限说明
- `storage`：保存用户配置到本地浏览器。
- `host_permissions: https://github.com/*`：仅在 GitHub 页面运行内容脚本以注入装饰，不访问其他网站。

## 联系
如有疑问，请通过 GitHub 仓库 Issue 联系。
