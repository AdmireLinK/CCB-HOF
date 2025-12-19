---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<script setup>
import TournamentShowcase from './.vitepress/components/TournamentShowcase.vue'
</script>

<TournamentShowcase />

<style>
:root {
  --font-sans: 'Noto Sans SC', 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

/* 1. 基础背景设置：应用到页面根节点 */
#app {
  background: #0a0a0a;
  min-height: 100vh; 
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 隐藏默认的 Hero 部分 */
.VPHero {
  display: none !important;
}

/* 隐藏页脚 */
.VPFooter {
  display: none;
}

/* 调整导航栏：使其透明并悬浮 */
.VPNavBar {
  background-color: transparent !important;
  backdrop-filter: none !important;
  border-bottom: none !important;
  position: absolute !important;
  width: 100%;
}

/* 保持侧边栏页面也显示顶栏 */
.VPNavBar.has-sidebar {
  display: block !important;
}

/* 调整内容区域以适应全屏展示 */
.VPContent {
  padding-top: 0 !important;
}

.VPHome {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.container {
  max-width: 100% !important;
  padding: 0 !important;
}
</style>


