import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "猜猜呗孝子之璀璨榜",
  description: "Hall of Fame in Anime-character-guessr",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    // Fonts preconnect and stylesheet for Noto Sans SC / Noto Sans
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;700;900&family=Noto+Sans:wght@300;400;700;900&display=swap' }]
  ],
  themeConfig: {
    logo: '/favicon.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '积分排行榜', link: '/leaderboard' },
      { text: 'TOP20', link: '/hoc2025' },
      { text: '赛事历史', link: '/matchhistory' }
    ],

    sidebar: [
      {
        text: '神人堂',
        items: [
          { text: '积分排行榜', link: '/leaderboard' },
          { text: '2025年度总结', link: '/hoc2025' },
          { text: '赛程历史', link: '/matchhistory' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AdmireLinK/CCB-HOF' }
    ]
  }
})
