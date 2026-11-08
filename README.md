# 🎨 GitHub 个人主页装修助手（浏览器扩展）

一个 **Chrome / Edge 浏览器扩展（MV3）**：你访问**任意** GitHub 个人主页时，它会自动在页面底部注入一个装饰区——统计卡片、贡献蛇、技术栈、社交徽章等，实时把主页“装修”得更漂亮。支持 GitHub 的 Turbo SPA 路由（切换主页自动重新注入）。

> 仓库：https://github.com/achun1107/github-profile-decorator

## ✨ 注入的装饰模块

| 模块 | 说明 |
| --- | --- |
| 标题 | 自动读取主页显示名，生成欢迎语 |
| 打字动画 | readme-typing-svg 动态文字 |
| 访客徽章 | 主页访问量计数 |
| 统计卡片 | github-readme-stats（含语言分布） |
| 连续打卡 | streak-stats |
| 技术栈 | skill-icons 一键拼装 |
| 贡献蛇 | Platane/snk（需用户自己仓库配置 Action） |
| 社交徽章 | GitHub / 邮箱 / 网站 / Twitter |
| 页脚语录 | 自定义名言 |

所有卡片调用公开的第三方徽章服务，扩展本身不收集、不上传任何数据（配置仅存在你浏览器本地 `chrome.storage`）。

## 📦 安装（开发者模式加载）

扩展未上架商店，需手动加载解压目录：

1. 下载本仓库：`git clone https://github.com/achun1107/github-profile-decorator.git`
2. 打开浏览器扩展页：
   - Chrome：`chrome://extensions`
   - Edge：`edge://extensions`
3. 右上角打开 **开发者模式（Developer mode）**。
4. 点击 **加载已解压的扩展程序（Load unpacked）**，选择本仓库目录。
5. 固定扩展图标到工具栏。访问任意 GitHub 个人主页（如 `https://github.com/torvalds`）即可看到注入的装饰区。

> 贡献蛇需要目标用户自己的 `<用户名>/<用户名>` 个人主页仓库里放一个 `.github/workflows/snake.yml`（见下方）。未配置时扩展会显示提示而非破图。

## ⚙️ 配置

点击工具栏的扩展图标，弹出配置页：

- 总开关：是否启用注入
- 9 个装修模块独立开关
- 统计卡片主题（radical / tokyonight / dracula …）
- 技术栈图标（skill-icons 名称，逗号分隔）
- 打字动画文案、页脚语录、社交链接（邮箱 / 网站 / Twitter）
- GitHub 徽章自动用**当前访问的用户名**，无需填写

配置实时保存，切回主页立即生效（可手动刷新页面）。

## 🐍 启用贡献蛇（目标用户侧）

在**被装修的那个 GitHub 账号**的个人主页仓库（`<用户名>/<用户名>`）里放：

```yaml
# .github/workflows/snake.yml
name: Generate Snake
on:
  schedule: [{ cron: "0 0 * * *" }]
  workflow_dispatch:
  push: { branches: [main] }
permissions: { contents: write }
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Platane/snk@v3
        with:
          github_user_name: 用户名
          outputs: |
            dist/github-contribution-snake.svg
            dist/github-contribution-snake-dark.svg?palette=github-dark
      - uses: crazy-max/ghaction-github-pages@v4
        with: { target_branch: output, build_dir: dist }
        env: { GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} }
```

提交后 Action 会把动画推到 `output` 分支，扩展自动引用。

## 🔒 权限说明

- `storage`：保存你的配置到浏览器本地。
- `host_permissions: https://github.com/*`：仅在 GitHub 页面运行内容脚本以注入装饰，不访问其他网站。

## 📄 License

[MIT](LICENSE)
