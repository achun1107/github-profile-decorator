/* GitHub 个人主页装修助手 — 内容脚本（MV3）
 * 访问任意 GitHub 个人主页时，自动注入一个装饰区。
 * 兼容 GitHub 的 Turbo SPA 路由。 */
(function () {
  "use strict";

  const DEFAULTS = {
    enabled: true,
    modules: {
      title: true, typing: true, visitor: true, stats: true,
      streak: true, tech: true, snake: true, social: true, quote: true,
      trophy: true, activity: true, wakatime: true,
    },
    theme: "radical",
    techIcons: "js,ts,react,node,git,github,html,css,python",
    typingLines: ["Hi, I am a developer 👋", "Love Open Source 🚀", "Building cool things"],
    quote: "Code is poetry.",
    social: { email: "", website: "", twitter: "", wakatime: "" },
  };

  let cfg = JSON.parse(JSON.stringify(DEFAULTS));
  let injectedPath = null;
  let widgetHidden = false;

  /* ---------- 配置 ---------- */
  function loadConfig(cb) {
    if (!chrome || !chrome.storage) { if (cb) cb(); return; }
    chrome.storage.sync.get(null, (s) => {
      cfg = Object.assign(JSON.parse(JSON.stringify(DEFAULTS)), s || {});
      cfg.modules = Object.assign({}, DEFAULTS.modules, s && s.modules);
      cfg.social = Object.assign({}, DEFAULTS.social, s && s.social);
      if (cb) cb();
    });
  }

  /* ---------- 页面检测 ---------- */
  function getUsername() {
    const m = document.querySelector('meta[name="octolytics-dimension-user_login"]');
    return m ? m.getAttribute("content") : null;
  }
  function getDisplayName() {
    const el = document.querySelector('[itemprop="name"], .vcard-names .p-name');
    return el ? el.textContent.trim() : null;
  }

  /* ---------- 样式注入 ---------- */
  function injectStyle() {
    if (document.getElementById("ghd-style")) return;
    const css = `
.ghd-widget{margin:16px 0;padding:20px;border:1px solid var(--color-border-default,#d0d7de);
  border-radius:12px;background:var(--color-canvas-default,#fff);color:var(--color-fg-default,#1f2328);
  box-shadow:0 1px 3px rgba(16,24,40,.06);font-family:inherit;}
.ghd-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.ghd-head .ghd-brand{font-weight:700;font-size:15px;display:flex;align-items:center;gap:6px;}
.ghd-head .ghd-hide{border:1px solid var(--color-border-default,#d0d7de);background:transparent;
  color:var(--color-fg-muted,#656d76);border-radius:6px;cursor:pointer;font-size:12px;padding:2px 8px;}
.ghd-widget h2{font-size:20px;margin:0 0 6px;text-align:center;}
.ghd-widget p.ghd-bio{text-align:center;color:var(--color-fg-muted,#656d76);margin:0 0 10px;}
.ghd-widget .ghd-center{text-align:center;}
.ghd-widget img{max-width:100%;}
.ghd-widget .ghd-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;}
.ghd-widget .ghd-sec{text-align:center;margin:14px 0 6px;}
.ghd-widget .ghd-sec h3{font-size:15px;margin:0 0 8px;}
.ghd-widget blockquote{margin:14px 0 0;padding:6px 14px;border-left:4px solid #0e75b6;
  color:var(--color-fg-muted,#656d76);background:rgba(14,117,182,.08);border-radius:0 8px 8px 0;}
.ghd-widget .ghd-foot{margin-top:14px;text-align:center;font-size:12px;color:var(--color-fg-muted,#656d76);}
.ghd-widget .ghd-snake-note{font-size:12px;color:var(--color-fg-muted,#656d76);}
`;
    const st = document.createElement("style");
    st.id = "ghd-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  /* ---------- 构建装饰区 ---------- */
  function buildWidget(u) {
    const name = getDisplayName() || u;
    const t = cfg.theme;
    const m = cfg.modules;
    let html = "";

    if (m.typing && cfg.typingLines && cfg.typingLines.length) {
      const lines = cfg.typingLines.map(encodeURIComponent).join("&lines=");
      html += `<div class="ghd-center"><img alt="typing" src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&duration=3000&pause=800&center=true&vCenter=true&multiline=true&lines=${lines}"></div>`;
    }
    if (m.visitor) {
      html += `<div class="ghd-center" style="margin:8px 0;"><img alt="views" src="https://komarev.com/ghpvc/?username=${u}&label=Profile%20views&color=0e75b6&style=flat"></div>`;
    }
    if (m.title) {
      html += `<h2>👋 Hi, I'm ${name}!</h2>`;
    }
    if (m.stats) {
      html += `<div class="ghd-row">
        <img alt="stats" src="https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${t}&hide_border=true&count_private=true">
        <img alt="langs" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=${t}&hide_border=true">
      </div>`;
    }
    if (m.trophy) {
      html += `<div class="ghd-sec"><h3>🏆 Trophy</h3><div class="ghd-center"><img alt="trophy" src="https://github-profile-trophy.vercel.app/?username=${u}&column=3&margin-w=15&margin-h=15&theme=${t}"></div></div>`;
    }
    if (m.activity) {
      html += `<div class="ghd-sec"><h3>📈 Activity Graph</h3><div class="ghd-center"><img alt="activity" src="https://github-readme-activity-graph.vercel.app/graph?username=${u}&theme=${t}&hide_border=true&radius=16"></div></div>`;
    }
    if (m.wakatime) {
      const w = cfg.social.wakatime;
      if (w) html += `<div class="ghd-sec"><h3>⏱️ WakaTime</h3><div class="ghd-center"><img alt="wakatime" src="https://github-readme-stats.vercel.app/api/wakatime?username=${w}&theme=${t}&hide_border=true&layout=compact"></div></div>`;
    }
    if (m.streak) {
      html += `<div class="ghd-sec"><h3>🔥 Streak</h3><div class="ghd-center"><img alt="streak" src="https://streak-stats.demolab.com?user=${u}&theme=${t}&hide_border=true"></div></div>`;
    }
    if (m.tech && cfg.techIcons) {
      html += `<div class="ghd-sec"><h3>🛠️ Tech Stack</h3><div class="ghd-center"><img alt="tech" src="https://skillicons.dev/icons?i=${encodeURIComponent(cfg.techIcons)}&perline=10"></div></div>`;
    }
    if (m.snake) {
      html += `<div class="ghd-sec"><h3>🐍 Contribution Snake</h3>
        <div class="ghd-center ghd-snake">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${u}/${u}/output/github-contribution-snake-dark.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${u}/${u}/output/github-contribution-snake.svg">
            <img alt="snake" src="https://raw.githubusercontent.com/${u}/${u}/output/github-contribution-snake.svg">
          </picture>
        </div></div>`;
    }
    if (m.social) {
      const b = [];
      b.push(`<a href="https://github.com/${u}"><img alt="github" src="https://img.shields.io/badge/GitHub-${u}-181717?style=for-the-badge&logo=github"></a>`);
      if (cfg.social.email) b.push(`<a href="mailto:${cfg.social.email}"><img alt="email" src="https://img.shields.io/badge/Email-${encodeURIComponent(cfg.social.email)}-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>`);
      if (cfg.social.website) b.push(`<a href="https://${cfg.social.website}"><img alt="site" src="https://img.shields.io/badge/Website-Visit-0e75b6?style=for-the-badge&logo=google-chrome"></a>`);
      if (cfg.social.twitter) b.push(`<a href="https://twitter.com/${cfg.social.twitter}"><img alt="tw" src="https://img.shields.io/badge/Twitter-@${cfg.social.twitter}-1DA1F2?style=for-the-badge&logo=twitter"></a>`);
      html += `<div class="ghd-sec"><h3>🔗 Connect</h3><div class="ghd-row">${b.join("")}</div></div>`;
    }
    if (m.quote && cfg.quote) {
      html += `<blockquote>“${cfg.quote}”</blockquote>`;
    }

    const wrap = document.createElement("section");
    wrap.className = "ghd-widget";
    wrap.setAttribute("data-ghd", "1");
    wrap.innerHTML =
      `<div class="ghd-head"><span class="ghd-brand">🎨 GitHub 装修助手</span>` +
      `<button class="ghd-hide" type="button">隐藏 ✕</button></div>` +
      html +
      `<div class="ghd-foot">由浏览器扩展注入 · 配置点击扩展图标</div>`;
    return wrap;
  }

  /* ---------- 注入 / 移除 ---------- */
  function removeWidget() {
    const old = document.querySelector(".ghd-widget");
    if (old) old.remove();
  }

  function attachHandlers(widget) {
    const hide = widget.querySelector(".ghd-hide");
    if (hide) hide.addEventListener("click", () => {
      widgetHidden = true;
      removeWidget();
    });
    // 贡献蛇未配置时（图片 404）显示提示
    const snake = widget.querySelector(".ghd-snake img");
    if (snake) snake.addEventListener("error", () => {
      const box = widget.querySelector(".ghd-snake");
      if (box) box.innerHTML =
        `<p class="ghd-snake-note">该用户未启用贡献蛇。需在 <code>${getUsername()}/${getUsername()}</code> 仓库放 <code>.github/workflows/snake.yml</code> 才会生成。</p>`;
    });
    // 其余图片加载失败时隐藏，避免破图
    widget.querySelectorAll("img").forEach((img) => {
      if (img === snake) return;
      img.addEventListener("error", () => { img.style.display = "none"; });
    });
  }

  function inject() {
    removeWidget();
    const u = getUsername();
    if (!u || !cfg.enabled || widgetHidden) { injectedPath = location.pathname; return; }
    injectStyle();
    const widget = buildWidget(u);
    const main = document.querySelector("main") || document.body;
    main.appendChild(widget);
    attachHandlers(widget);
    injectedPath = location.pathname;
  }

  function maybeInject() {
    const path = location.pathname;
    if (path !== injectedPath) { widgetHidden = false; } // 路由切换后重置隐藏状态
    const u = getUsername();
    if (!u || !cfg.enabled) { removeWidget(); injectedPath = path; return; }
    if (injectedPath === path && document.querySelector(".ghd-widget")) return;
    inject();
  }

  /* ---------- 导航适配（Turbo / pjax） ---------- */
  function startNav() {
    document.addEventListener("turbo:render", () => setTimeout(maybeInject, 350));
    window.addEventListener("pjax:end", () => setTimeout(maybeInject, 350));
    let timer;
    const obs = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(maybeInject, 500);
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  /* ---------- 启动 ---------- */
  loadConfig(() => {
    inject();
    startNav();
  });

  if (chrome && chrome.storage) {
    chrome.storage.onChanged.addListener((_changes, area) => {
      if (area === "sync") loadConfig(() => inject());
    });
  }
})();
