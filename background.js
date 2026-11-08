/* GitHub 装修助手 — 后台 Service Worker（MV3） */
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

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["enabled"], (r) => {
    if (r.enabled === undefined) {
      chrome.storage.sync.set(DEFAULTS);
    }
  });
});
