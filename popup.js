/* GitHub 装修助手 — 弹窗配置（MV3） */
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

const $ = (id) => document.getElementById(id);

function load() {
  chrome.storage.sync.get(null, (s) => {
    const cfg = Object.assign(JSON.parse(JSON.stringify(DEFAULTS)), s || {});
    cfg.modules = Object.assign({}, DEFAULTS.modules, s && s.modules);
    cfg.social = Object.assign({}, DEFAULTS.social, s && s.social);

    $("enabled").checked = cfg.enabled !== false;
    document.querySelectorAll("#modules input").forEach((cb) => {
      cb.checked = cfg.modules[cb.dataset.m] !== false;
    });
    $("theme").value = cfg.theme || "radical";
    $("techIcons").value = cfg.techIcons || "";
    $("typingLines").value = (cfg.typingLines || []).join("\n");
    $("quote").value = cfg.quote || "";
    $("email").value = (cfg.social && cfg.social.email) || "";
    $("website").value = (cfg.social && cfg.social.website) || "";
    $("twitter").value = (cfg.social && cfg.social.twitter) || "";
    $("wakatime").value = (cfg.social && cfg.social.wakatime) || "";
  });
}

function collect() {
  const modules = {};
  document.querySelectorAll("#modules input").forEach((cb) => {
    modules[cb.dataset.m] = cb.checked;
  });
  return {
    enabled: $("enabled").checked,
    modules,
    theme: $("theme").value,
    techIcons: $("techIcons").value.trim(),
    typingLines: $("typingLines").value.split("\n").map((x) => x.trim()).filter(Boolean),
    quote: $("quote").value.trim() || "Code is poetry.",
    social: {
      email: $("email").value.trim(),
      website: $("website").value.trim(),
      twitter: $("twitter").value.trim(),
      wakatime: $("wakatime").value.trim(),
    },
  };
}

function save() {
  const cfg = collect();
  chrome.storage.sync.set(cfg, () => {
    const st = $("status");
    st.textContent = "已保存 ✓";
    setTimeout(() => (st.textContent = ""), 1500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  load();
  document.querySelectorAll("input, textarea, select").forEach((el) => {
    el.addEventListener("input", save);
    el.addEventListener("change", save);
  });
});
