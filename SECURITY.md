# 安全政策

## 支持的版本

| 版本 | 是否支持 |
| --- | --- |
| `1.0.x` | ✅ 支持 |
| `< 1.0` | ❌ 不支持（本项目无 1.0 之前的公开版本） |

修复随下一个 patch 版本发布，并记录在 [CHANGELOG.md](CHANGELOG.md)。

## 报告漏洞

**请不要在公开 Issue 里贴漏洞细节或可利用的 PoC。**

优先使用 GitHub 私有漏洞报告：仓库页 → **Security** → **Report a vulnerability**（或 `Security` → `Advisories` → `New draft security advisory`）。若该入口不可用，请开一个**不含细节**的 Issue，只说明「发现安全问题，请私下联系」，我们会在评论里留联系方式。

请尽量提供：影响的版本、浏览器与 OS、复现步骤、影响面、是否已公开。

## 响应时限

| 阶段 | 目标 |
| --- | --- |
| 确认收到 | 3 个工作日内 |
| 初步评估与定级 | 7 个工作日内 |
| 修复版本 | 按严重程度，高危优先 |

确认后我们会在修复发布时于 CHANGELOG 致谢（如你愿意署名）。

## 范围

**在范围内**

- 扩展自身代码（`content.js`、`popup.html` / `popup.js`、`background.js`、`manifest.json`）导致的权限越界、数据外发、注入类问题。
- 配置读写逻辑导致的隐私承诺偏离。

**不在范围内**

- 第三方徽章服务（`github-readme-stats`、`streak-stats`、`skillicons`、`komarev`、`github-profile-trophy` 等）自身的漏洞或可用性；请直接向其上游报告。
- GitHub 页面 DOM 改版导致装饰区失效——这属于兼容性问题，请开普通 Issue。
- 用户自己在配置里填写的社交链接、文案、WakaTime 用户名等内容。
- 要求扩大 `host_permissions` 才能实现的「功能请求」。

## 隐私边界

扩展无后端、无分析脚本、不向自有服务器发送数据；配置保存在浏览器的 `chrome.storage.sync`。完整说明见 [PRIVACY.md](PRIVACY.md)。
