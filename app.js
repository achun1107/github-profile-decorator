/* GitHub 个人主页装修助手 — 纯前端，无后端、无数据上报 */
const TOOL_OWNER = "achun1107";
const TOOL_REPO = "github-profile-decorator";

const $ = (id) => document.getElementById(id);

const state = {
  showTyping: true, showVisitor: true, showTitle: true, showStats: true,
  showStreak: true, showTech: true, showSnake: true, showSocial: true, showQuote: true,
};

/* 读取界面配置 */
function readConfig() {
  const u = $("username").value.trim();
  const social = {
    github: $("socialGithub").value.trim() || u,
    email: $("socialEmail").value.trim(),
    website: $("socialWebsite").value.trim(),
    twitter: $("socialTwitter").value.trim(),
  };
  return {
    username: u,
    displayName: $("displayName").value.trim(),
    bio: $("bio").value.trim(),
    typingLines: $("typingLines").value.split("\n").map((s) => s.trim()).filter(Boolean),
    theme: $("theme").value,
    techIcons: $("techIcons").value.trim(),
    social,
    quote: $("quote").value.trim() || "Code is poetry.",
    ...state,
  };
}

/* 构建 README markdown */
function buildReadme(cfg) {
  const u = cfg.username;
  if (!u) return "";
  const name = cfg.displayName || u;
  const blocks = [];

  if (cfg.showTyping && cfg.typingLines.length) {
    const lines = cfg.typingLines.map(encodeURIComponent).join("&lines=");
    blocks.push(
      `<div align="center">\n\n` +
      `![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&duration=3000&pause=800&center=true&vCenter=true&multiline=true&lines=${lines})\n\n</div>`
    );
  }

  if (cfg.showVisitor) {
    blocks.push(
      `<p align="center">\n  <img src="https://komarev.com/ghpvc/?username=${u}&label=Profile%20views&color=0e75b6&style=flat" alt="${u}" />\n</p>`
    );
  }

  if (cfg.showTitle) {
    blocks.push(
      `<div align="center">\n\n### Hi there 👋, I'm ${name}!\n\n${cfg.bio || ""}\n\n</div>`
    );
  }

  if (cfg.showStats) {
    const t = cfg.theme;
    blocks.push(
      `<div align="center">\n\n` +
      `![](https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${t}&hide_border=true&count_private=true)\n` +
      `![](https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=${t}&hide_border=true)\n\n</div>`
    );
  }

  if (cfg.showStreak) {
    const t = cfg.theme;
    blocks.push(
      `<div align="center">\n\n[![GitHub Streak](https://streak-stats.demolab.com?user=${u}&theme=${t}&hide_border=true)](https://git.io/streak-stats)\n\n</div>`
    );
  }

  if (cfg.showTech) {
    const icons = cfg.techIcons || "js,ts,react,node,git,github";
    blocks.push(
      `<div align="center">\n\n### 🛠️ Tech Stack\n\n` +
      `![Tech](https://skillicons.dev/icons?i=${encodeURIComponent(icons)}&perline=10)\n\n</div>`
    );
  }

  if (cfg.showSnake) {
    blocks.push(
      `<div align="center">\n\n### 🐍 Contribution Snake\n\n<picture>\n` +
      `  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${u}/${u}/output/github-contribution-snake-dark.svg">\n` +
      `  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${u}/${u}/output/github-contribution-snake.svg">\n` +
      `  <img alt="snake animation" src="https://raw.githubusercontent.com/${u}/${u}/output/github-contribution-snake.svg">\n</picture>\n\n</div>\n\n` +
      `> 💡 贡献蛇需要把仓库里的 \`.github/workflows/snake.yml\` 复制到你的 **${u}/${u}** 个人主页仓库，提交后每天自动生成。`
    );
  }

  if (cfg.showSocial) {
    const b = [];
    if (cfg.social.github) b.push(`[![GitHub](https://img.shields.io/badge/GitHub-${cfg.social.github}-181717?style=for-the-badge&logo=github)](https://github.com/${cfg.social.github})`);
    if (cfg.social.email) b.push(`[![Email](https://img.shields.io/badge/Email-${encodeURIComponent(cfg.social.email)}-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${cfg.social.email})`);
    if (cfg.social.website) b.push(`[![Website](https://img.shields.io/badge/Website-Visit-0e75b6?style=for-the-badge&logo=google-chrome)](https://${cfg.social.website})`);
    if (cfg.social.twitter) b.push(`[![Twitter](https://img.shields.io/badge/Twitter-@${cfg.social.twitter}-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/${cfg.social.twitter})`);
    if (b.length) blocks.push(`<div align="center">\n\n${b.join("\n")}\n\n</div>`);
  }

  if (cfg.showQuote) {
    blocks.push(`<div align="center">\n\n> “${cfg.quote}”\n\n</div>`);
  }

  blocks.push(
    `---\n\n<div align="center">\n\n**Made with ❤️ using ` +
    `[GitHub Profile Decorator](https://github.com/${TOOL_OWNER}/${TOOL_REPO})**\n\n</div>`
  );

  return blocks.join("\n\n");
}

/* 轻量 markdown → HTML（仅覆盖本工具生成的子集） */
function mdToHtml(md) {
  if (!md) return `<p style="color:#6b7280">在左侧填写 GitHub 用户名即可实时预览 ✨</p>`;
  const lines = md.split("\n");
  let html = "";
  let i = 0;
  const inline = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
     .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" style="max-width:100%">')
     .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  const isImgLine = (l) => /^\s*!\[/.test(l) || /^\s*\[!\[/.test(l);

  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*<\/?div\b/.test(line) || /^\s*<\/?picture\b/.test(line) || /^\s*<source\b/.test(line)) {
      const img = line.match(/<img[^>]*src="([^"]+)"[^>]*>/);
      if (img) html += `<p align="center"><img src="${img[1]}" style="max-width:100%"></p>`;
      i++; continue;
    }
    if (/^\s*$/.test(line)) { i++; continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { html += `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`; i++; continue; }
    if (/^---+\s*$/.test(line)) { html += "<hr>"; i++; continue; }
    if (/^>\s?/.test(line)) {
      let q = "";
      while (i < lines.length && /^>\s?/.test(lines[i])) { q += lines[i].replace(/^>\s?/, "") + " "; i++; }
      html += `<blockquote>${inline(q)}</blockquote>`;
      continue;
    }
    if (isImgLine(line)) {
      let imgs = "";
      while (i < lines.length && isImgLine(lines[i])) { imgs += inline(lines[i]) + "<br>"; i++; }
      html += `<p align="center">${imgs}</p>`;
      continue;
    }
    let para = "";
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6})\s/.test(lines[i]) &&
           !/^>\s?/.test(lines[i]) && !/^---+\s*$/.test(lines[i]) && !isImgLine(lines[i]) &&
           !/^\s*<\/?div\b/.test(lines[i])) {
      para += lines[i] + " "; i++;
    }
    if (para.trim()) html += `<p>${inline(para)}</p>`;
  }
  return html;
}

/* 贡献蛇工作流模板 */
function snakeWorkflow(u) {
  return `name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Platane/snk@v3
        with:
          github_user_name: ${u}
          outputs: |
            dist/github-contribution-snake.svg
            dist/github-contribution-snake-dark.svg?palette=github-dark
      - uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
}

/* 渲染 */
let lastMd = "";
function render() {
  const cfg = readConfig();
  lastMd = buildReadme(cfg);
  $("renderView").innerHTML = mdToHtml(lastMd);
  $("mdView").textContent = lastMd || "# 在左侧填写 GitHub 用户名";
}

/* 事件绑定 */
function bind() {
  document.querySelectorAll("input, textarea, select").forEach((el) => {
    el.addEventListener("input", render);
  });
  document.querySelectorAll("#toggles input").forEach((cb) => {
    cb.addEventListener("change", () => { state[cb.dataset.key] = cb.checked; render(); });
  });
  document.querySelectorAll(".tab").forEach((t) => {
    t.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      const isMd = t.dataset.tab === "md";
      $("mdView").style.display = isMd ? "block" : "none";
      $("renderView").style.display = isMd ? "none" : "block";
    });
  });
  $("copyBtn").addEventListener("click", async () => {
    if (!lastMd) return;
    try { await navigator.clipboard.writeText(lastMd); $("copyBtn").textContent = "已复制 ✓"; }
    catch { $("copyBtn").textContent = "复制失败"; }
    setTimeout(() => ($("copyBtn").textContent = "复制 README"), 1500);
  });
  $("dlMd").addEventListener("click", () => {
    if (!lastMd) return;
    download("README.md", lastMd, "text/markdown");
  });
  $("dlSnake").addEventListener("click", () => {
    const u = $("username").value.trim() || "YOUR_USERNAME";
    download("snake.yml", snakeWorkflow(u), "text/yaml");
  });
}

function download(name, content, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

bind();
render();
