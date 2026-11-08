# 🎨 GitHub 个人主页装修助手

一个**纯前端、零后端、零数据上报**的静态工具，帮你快速生成装饰版的 GitHub 个人主页 `README.md`。
填用户名 → 勾选装修模块 → 实时预览 → 一键复制 / 下载。

> 在线使用（GitHub Pages）：https://achun1107.github.io/github-profile-decorator/

## ✨ 功能模块

| 模块 | 说明 |
| --- | --- |
| 打字动画横幅 | 基于 readme-typing-svg 的动态文字 |
| 访客计数徽章 | 显示主页访问量 |
| 标题 + 自我介绍 | 居中欢迎语 |
| GitHub 统计卡片 | github-readme-stats（含语言分布） |
| 连续打卡 Streak | streak-stats 贡献热力 |
| 技术栈图标 | skill-icons 一键拼装 |
| 贡献蛇动画 | Platane/snk 自动生成的贡献蛇 |
| 社交徽章 | GitHub / 邮箱 / 网站 / Twitter |
| 页脚语录 | 自定义名言 |

所有卡片均调用公开的第三方徽章服务，工具本身不存储任何信息。

## 🚀 使用方法

1. 打开页面（或本地双击 `index.html`）。
2. 填写你的 **GitHub 用户名**（必填）。
3. 按需勾选装修模块、调整主题与文案。
4. 在「效果预览」确认效果，切到「Markdown 源码」查看原始文本。
5. 点击 **复制 README** 或 **下载 .md**，粘贴到你的 `<用户名>/<用户名>` 个人主页仓库的 `README.md`。

## 🐍 启用贡献蛇

贡献蛇需要你自己的个人主页仓库里有一个 GitHub Action：

1. 在本工具点击 **下载 snake.yml**。
2. 把文件放到你个人主页仓库的 `.github/workflows/snake.yml`，并把 `YOUR_USERNAME` 改成你的用户名。
3. 提交后，Action 会把动画推送到 `output` 分支（每天自动更新）。
4. README 中已自动引用 `raw.githubusercontent.com/<用户名>/<用户名>/output/...`。

（仓库内 `templates/snake.yml` 是同款模板，可直接复制。）

## 📦 本地运行 / 二次开发

```bash
# 直接双击 index.html 即可；或起一个本地静态服务：
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

仅三个文件：`index.html` / `styles.css` / `app.js`，无任何依赖。

## 📄 License

[MIT](LICENSE)
