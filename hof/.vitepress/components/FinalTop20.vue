<script setup lang="ts">
import { computed } from 'vue'
import { getAvatar } from '../data/leaderboards'

const currentYearTitle = "Conjecture Character Best Player of 2025"

// 定义荣誉类型
interface Honor {
  event: string;
  rank?: string;
  specials?: string[];
}

// 2025 Top 20 列表 (包含恢复的荣誉数据)
const top20Data = [
  { 
    rank: 1, name: "鲁迪乌斯", 
    honors: [
      { event: "第一届老鸨杯", rank: "2nd 🥈" },
      { event: "第三届Major", rank: "2nd 🥈", specials: ["EVP"] },
      { event: "第二届Major", rank: "9th" }
    ]
  },
  { 
    rank: 2, name: "V.", 
    honors: [
      { event: "第一届MSI", rank: "1st 🥇" },
      { event: "第三届Major", rank: "3rd 🥉", specials: ["EVP"] },
      { event: "第一届老鸨杯", rank: "3rd 🥉" },
      { event: "第二届Major", rank: "4th" }
    ]
  },
  { 
    rank: 3, name: "Shinon", avatarKey: "Shin'on",
    honors: [
      { event: "第二届Major", rank: "1st 🥇" },
      { event: "第一届MSI", rank: "2nd 🥈" },
      { event: "第三届Major", rank: "", specials: ["EVP"] } // 团队赛表现优异
    ]
  },
  { 
    rank: 4, name: "Shaw", 
    honors: [
      { event: "第三届Major", rank: "1st 🥇", specials: ["MVP"] },
      { event: "第一届天虹杯", rank: "1st 🥇", specials: ["MVP"] },
      { event: "第一届老鸨杯", rank: "5th" },
      { event: "第二届Major", rank: "6th" }
    ]
  },
  { 
    rank: 5, name: "lese", 
    honors: [
      { event: "第一届天虹杯", rank: "2nd 🥈", specials: ["EVP"] },
      { event: "第一届老鸨杯", rank: "4th" },
      { event: "第三届Major", rank: "", specials: ["EVP"] }
    ]
  },
  { 
    rank: 6, name: "琪露诺", 
    honors: [
      { event: "第一届老鸨杯", rank: "1st 🥇" },
      { event: "第二届Major", rank: "3rd 🥉" }
    ]
  },
  { 
    rank: 7, name: "hobaka", 
    honors: [
      { event: "第二届Major", rank: "2nd 🥈" },
      { event: "第一届MSI", rank: "3rd 🥉" },
      { event: "第一届天虹杯", rank: "3rd 🥉", specials: ["EVP"] }
    ]
  },
  { 
    rank: 8, name: "中华小当家", 
    honors: [
      { event: "第三届Major", rank: "1st 🥇", specials: ["EVP"] },
      { event: "第一届Major", rank: "3rd 🥉" },
      { event: "第一届MSI", rank: "4th" }
    ]
  },
  { 
    rank: 9, name: "顶碗人", 
    honors: [
      { event: "第一届天虹杯", rank: "1st 🥇", specials: ["EVP"] },
      { event: "第一届新人杯", rank: "8th" }
    ]
  },
  { 
    rank: 10, name: "SevenTen", 
    honors: [
      { event: "第一届Major", rank: "1st 🥇" },
      { event: "第三届Major", rank: "3rd 🥉" }
    ]
  },
  { 
    rank: 11, name: "JDG", 
    honors: [
      { event: "第一届新人杯", rank: "1st 🥇" }
    ]
  },
  { 
    rank: 12, name: "Ryo", 
    honors: [
      { event: "第三届Major", rank: "2nd 🥈" }
    ]
  },
  { 
    rank: 13, name: "ams", 
    honors: [
      { event: "第一届新人杯", rank: "3rd 🥉" }
    ]
  },
  { 
    rank: 14, name: "gura", 
    honors: [
      { event: "第一届天虹杯", rank: "2nd 🥈" }
    ]
  },
  { 
    rank: 15, name: "阿赵", 
    honors: [
      { event: "第一届Major", rank: "2nd 🥈" }
    ]
  },
  { 
    rank: 16, name: "切尔茜", 
    honors: [
      { event: "第三届Major", rank: "3rd 🥉" },
      { event: "第一届老鸨杯", rank: "6th" }
    ] // 暂无前八记录
  },
  { 
    rank: 17, name: "姜姜大当家", 
    honors: [
      { event: "第一届新人杯", rank: "2nd 🥈" }
    ]
  },
  { 
    rank: 18, name: "素质人士", 
    honors: [
      { event: "第二届Major", rank: "8th" }
    ]
  },
  { 
    rank: 19, name: "吴织亚切", 
    honors: [
      { event: "第一届新人杯", rank: "4th" }
    ]
  },
  { 
    rank: 20, name: "玩设备", 
    honors: [
      { event: "第一届新人杯", rank: "6th" }
    ]
  }
];

const players = computed(() => {
  return top20Data.map(p => ({
    ...p,
    avatar: getAvatar(p.avatarKey || p.name)
  }))
})

// 年度奖项
const annualAwards = [
  { title: "年度最佳解说", winner: "Ciallo~(·w<)∩" },
  { title: "年度最佳赛事", winner: "第三届Major" },
  { title: "年度最佳赞助商", winner: "保科明里" },
  { title: "年度最佳主办方", winner: "凉" }
]

const getRankClass = (rank: number) => {
  if (rank === 1) return 'rank-1'
  if (rank === 2) return 'rank-2'
  if (rank === 3) return 'rank-3'
  return 'rank-other'
}

const formatRank = (rank?: string) => {
  if (!rank) return '';
  // 简化显示
  if (rank.includes('1st') || rank.includes('冠军')) return '1st';
  if (rank.includes('2nd') || rank.includes('亚军')) return '2nd';
  if (rank.includes('3rd') || rank.includes('季军')) return '3rd';
  return rank;
}

const getMedalClass = (rank?: string) => {
  if (!rank) return '';
  if (rank.includes('1st') || rank.includes('冠军')) return 'medal-1st';
  if (rank.includes('2nd') || rank.includes('亚军')) return 'medal-2nd';
  if (rank.includes('3rd') || rank.includes('季军')) return 'medal-3rd';
  return '';
}
</script>

<template>
  <div class="leaderboard-container">
    <!-- Header -->
    <div class="header-section">
      <h1 class="main-title">{{ currentYearTitle }}</h1>
      <p class="subtitle">？强强？</p>
    </div>

    <!-- Top 20 Grid -->
    <div class="leaderboard-grid">
      <div v-for="player in players" :key="player.name" :class="['player-card', getRankClass(player.rank)]">
        <div class="card-header">
          <div class="rank-badge">{{ player.rank }}</div>
          <img :src="player.avatar" :alt="player.name" class="player-avatar" />
          <div class="player-main-info">
            <h3 class="player-name">{{ player.name }}</h3>
            <!-- 分数已隐藏 -->
          </div>
        </div>
        
        <!-- 荣誉展示区 -->
        <div v-if="player.honors && player.honors.length > 0" class="honors-container">
          <div v-for="(honor, idx) in player.honors" :key="idx" class="honor-row">
            <div class="honor-left">
              <!-- 特殊称号 (MVP/EVP) -->
              <div v-if="honor.specials && honor.specials.length > 0" class="honor-specials">
                <span v-for="s in honor.specials" :key="s" :class="['special-tag', s === 'MVP' ? 'mvp-tag' : 'evp-tag']">
                  {{ s }}
                </span>
              </div>
              <span class="honor-event">{{ honor.event }}</span>
            </div>
            <!-- 排名 -->
            <span v-if="honor.rank" :class="['honor-rank', getMedalClass(honor.rank)]">
              {{ formatRank(honor.rank) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Annual Awards Section -->
    <div class="header-section" style="margin-top: 5rem; margin-bottom: 2rem;">
      <h2 class="main-title" style="font-size: 2.5rem;">ANNUAL AWARDS</h2>
      <p class="subtitle">年度特别奖项</p>
    </div>

    <div class="leaderboard-grid">
      <div v-for="(award, idx) in annualAwards" :key="idx" class="player-card rank-other award-card">
        <div class="card-header">
          <div class="rank-badge award-icon">🏆</div>
          <div class="player-main-info">
            <h3 class="player-name award-title">{{ award.title }}</h3>
            <div class="award-winner">{{ award.winner }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.leaderboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.main-title {
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  padding: 0.1em 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  letter-spacing: 4px;
  text-transform: uppercase;
}

.leaderboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.player-card {
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
}

.player-card:hover {
  transform: translateY(-6px);
  border-color: var(--vp-c-brand);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Rank Specific Styles with Extravagant Glow - Enhanced */
.rank-1 {
  border: 2px solid #ffd700;
  background: linear-gradient(145deg, rgba(255, 215, 0, 0.12), var(--vp-c-bg-soft));
  box-shadow: 
    0 0 40px rgba(255, 215, 0, 0.5),
    0 0 80px rgba(255, 215, 0, 0.35),
    0 0 120px rgba(255, 215, 0, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06),
    inset 0 0 25px rgba(255, 215, 0, 0.08);
  animation: glow-1st 2.5s ease-in-out infinite;
  position: relative;
}
.rank-1::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg, #ffd700, #ffed4e, #ffd700);
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  animation: border-glow-1st 3s ease-in-out infinite;
}
.rank-1 .rank-badge { 
  color: #ffd700; 
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4);
}

.rank-2 {
  border: 2px solid #c0c0c0;
  background: linear-gradient(145deg, rgba(192, 192, 192, 0.12), var(--vp-c-bg-soft));
  box-shadow: 
    0 0 35px rgba(192, 192, 192, 0.45),
    0 0 70px rgba(192, 192, 192, 0.3),
    0 0 105px rgba(192, 192, 192, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06),
    inset 0 0 20px rgba(192, 192, 192, 0.06);
  animation: glow-2nd 2.5s ease-in-out infinite;
}
.rank-2::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg, #c0c0c0, #e8e8e8, #c0c0c0);
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  animation: border-glow-2nd 3s ease-in-out infinite;
}
.rank-2 .rank-badge { 
  color: #c0c0c0; 
  text-shadow: 0 0 12px rgba(192, 192, 192, 0.7), 0 0 24px rgba(192, 192, 192, 0.35);
}

.rank-3 {
  border: 2px solid #cd7f32;
  background: linear-gradient(145deg, rgba(205, 127, 50, 0.12), var(--vp-c-bg-soft));
  box-shadow: 
    0 0 30px rgba(205, 127, 50, 0.4),
    0 0 60px rgba(205, 127, 50, 0.25),
    0 0 90px rgba(205, 127, 50, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06),
    inset 0 0 15px rgba(205, 127, 50, 0.05);
  animation: glow-3rd 2.5s ease-in-out infinite;
}
.rank-3::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg, #cd7f32, #e6a861, #cd7f32);
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  animation: border-glow-3rd 3s ease-in-out infinite;
}
.rank-3 .rank-badge { 
  color: #cd7f32; 
  text-shadow: 0 0 10px rgba(205, 127, 50, 0.6), 0 0 20px rgba(205, 127, 50, 0.3);
}

@keyframes glow-1st {
  0%, 100% {
    box-shadow: 
      0 0 30px rgba(255, 215, 0, 0.4),
      0 0 60px rgba(255, 215, 0, 0.25),
      0 0 90px rgba(255, 215, 0, 0.15),
      inset 0 0 20px rgba(255, 215, 0, 0.1);
  }
  50% {
    box-shadow: 
      0 0 40px rgba(255, 215, 0, 0.5),
      0 0 80px rgba(255, 215, 0, 0.35),
      0 0 120px rgba(255, 215, 0, 0.2),
      inset 0 0 25px rgba(255, 215, 0, 0.15);
  }
}

@keyframes glow-2nd {
  0%, 100% {
    box-shadow: 
      0 0 25px rgba(192, 192, 192, 0.35),
      0 0 50px rgba(192, 192, 192, 0.2),
      0 0 75px rgba(192, 192, 192, 0.1),
      inset 0 0 15px rgba(192, 192, 192, 0.08);
  }
  50% {
    box-shadow: 
      0 0 35px rgba(192, 192, 192, 0.45),
      0 0 65px rgba(192, 192, 192, 0.28),
      0 0 95px rgba(192, 192, 192, 0.15),
      inset 0 0 20px rgba(192, 192, 192, 0.12);
  }
}

@keyframes glow-3rd {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(205, 127, 50, 0.3),
      0 0 40px rgba(205, 127, 50, 0.15),
      0 0 60px rgba(205, 127, 50, 0.08),
      inset 0 0 12px rgba(205, 127, 50, 0.06);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(205, 127, 50, 0.4),
      0 0 55px rgba(205, 127, 50, 0.22),
      0 0 80px rgba(205, 127, 50, 0.12),
      inset 0 0 18px rgba(205, 127, 50, 0.1);
  }
}

@keyframes border-glow-1st {
  0%, 100% { opacity: 0.2; filter: blur(2px); }
  50% { opacity: 0.4; filter: blur(4px); }
}

@keyframes border-glow-2nd {
  0%, 100% { opacity: 0.15; filter: blur(2px); }
  50% { opacity: 0.3; filter: blur(3px); }
}

@keyframes border-glow-3rd {
  0%, 100% { opacity: 0.1; filter: blur(1px); }
  50% { opacity: 0.2; filter: blur(2px); }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.rank-badge {
  font-size: 2.5rem;
  font-weight: 900;
  font-style: italic;
  opacity: 0.3;
  position: absolute;
  right: -5px;
  top: -10px;
}

.player-avatar {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  object-fit: cover;
  border: 2px solid var(--vp-c-divider);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.player-card:hover .player-avatar {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.player-main-info {
  flex: 1;
}

.player-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  color: var(--vp-c-text-1);
}

/* Honors */
.honors-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--vp-c-bg-mute);
  padding: 0.85rem;
  border-radius: 14px;
  font-size: 0.85rem;
  margin-top: auto;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

.honor-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.honor-left {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  overflow: hidden;
}

.honor-event {
  color: var(--vp-c-text-2);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.honor-rank {
  font-weight: 700;
  min-width: 40px;
  text-align: right;
  flex-shrink: 0;
}

.medal-1st { color: #ffd700; }
.medal-2nd { color: #c0c0c0; }
.medal-3rd { color: #cd7f32; }

.honor-specials {
  display: flex;
  gap: 0.25rem;
}

.special-tag {
  font-size: 0.7rem;
  padding: 1px 4px;
  border-radius: 5px;
  font-weight: 800;
  color: white;
}

.mvp-tag { background: #ff4d4f; }
.evp-tag { background: #ffa940; }

/* Award Card Specifics */
.award-card {
  min-height: 120px;
  justify-content: center;
}
.award-icon {
  font-style: normal;
  opacity: 0.15;
  font-size: 3rem;
  top: -5px;
}
.award-title {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.award-winner {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--vp-c-brand);
  margin-top: 0.25rem;
}
</style>