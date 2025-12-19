<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { tournaments } from '../data/MatchHistory'
import { getAvatar, avatarMap } from '../data/leaderboards'

const bgUrl = 'https://randpic.baka.website/pic?img=ua'

// 处理幻灯片逻辑
const currentAvatarIndices = ref<Record<string, number>>({})
const logoLoaded = ref<Record<string, boolean>>({})
const bgImages = ref<Record<string, string>>({})
const logoLoadedSmall = ref<Record<string, boolean>>({})
let timer: any = null

// 更强健的 avatar 解析：尝试多种变体匹配 avatarMap 的键
const normalize = (s: string) => (s || '').toString().trim().toLowerCase()

const resolveAvatar = (name: string) => {
  if (!name) return '/avatar/default.jpg'
  try {
    const direct = getAvatar(name)
    if (direct && direct !== '/avatar/default.jpg') return direct

    const target = normalize(name).replace(/[^\p{L}\p{N}]/gu, '')
    // 尝试在 avatarMap 中通过规范化匹配 key
    for (const k of Object.keys(avatarMap)) {
      const kn = normalize(k).replace(/[^\p{L}\p{N}]/gu, '')
      if (kn === target) return `/avatar/${avatarMap[k]}`
    }

    // 变体尝试：去掉撇号或替换为常见形式
    const alt = normalize(name).replace(/[’'`]/g, '')
    for (const k of Object.keys(avatarMap)) {
      if (normalize(k).replace(/[’'`]/g, '') === alt) return `/avatar/${avatarMap[k]}`
    }

    return '/avatar/default.jpg'
  } catch (e) {
    return '/avatar/default.jpg'
  }
}

onMounted(() => {
  // 为每个比赛单独请求一次背景图（fetch -> blob -> objectURL）
  tournaments.forEach(async (t, idx) => {
    try {
      // 加上一个轻微的延迟避免并发过度冲突
      await new Promise(r => setTimeout(r, idx * 120))
      const resp = await fetch(bgUrl)
      if (!resp.ok) throw new Error('bg fetch failed')
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      bgImages.value[t.name] = url
    } catch (err) {
      // 回退到全局 url（可带时间戳以避免缓存）
      bgImages.value[t.name] = `${bgUrl}&t=${encodeURIComponent(t.name)}`
    }
  })

  // 初始化加载状态为 false，让首次 load 触发淡入
  tournaments.forEach(t => {
    logoLoaded.value[t.name] = false
    // 初始化小头像加载状态
    t.finalResults.slice(1,8).forEach(res => {
      const key = `${t.name}::${res.name}`
      logoLoadedSmall.value[key] = false
    })
  })

  // 头像轮播，延长切换时间并在切换前重置加载状态以触发过渡
  timer = setInterval(() => {
    tournaments.forEach(t => {
      if (t.type === 'Team') {
        const champion = t.finalResults.find(r => r.rank === '1st' || r.rank === '冠军')
        if (champion && champion.players && champion.players.length > 1) {
          const key = t.name
          // 先标记未加载，让新图片触发 load -> 渐入
          logoLoaded.value[key] = false
          const currentIndex = currentAvatarIndices.value[key] || 0
          currentAvatarIndices.value[key] = (currentIndex + 1) % champion.players.length
        }
      }
    })
  }, 6000) // 延长到 6000ms
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  // 释放所有创建的 object URLs
  Object.values(bgImages.value).forEach(url => {
    try { URL.revokeObjectURL(url) } catch (e) { /* ignore */ }
  })
})

const getChampionAvatar = (tournament: any) => {
  const champion = tournament.finalResults.find((r: any) => r.rank === '1st' || r.rank === '冠军')
  if (!champion) return '/avatar/default.jpg'
  
  if (tournament.type === 'Solo') {
    return resolveAvatar(champion.name)
  } else {
    const players = champion.players || []
    if (players.length === 0) return resolveAvatar(champion.name)
    const index = currentAvatarIndices.value[tournament.name] || 0
    return resolveAvatar(players[index])
  }
}

const getRankLabel = (rank: string) => {
  const r = rank.toLowerCase()
  if (r.includes('1st') || r.includes('冠军')) return 'CHAMPIONS'
  if (r.includes('2nd') || r.includes('亚军')) return 'Grand Finalist'
  if (r.includes('3rd') || r.includes('季军')) return 'Semifinalist'
  if (r.includes('4th') || r.includes('殿军')) return 'Semifinalist'
  if (r.includes('5') || r.includes('6') || r.includes('7') || r.includes('8')) return 'Quarterfinalist'
  return 'Finalist'
}

const getRankIcon = (rank: string) => {
  const r = rank.toLowerCase()
  if (r.includes('1st') || r.includes('冠军')) return '🏆'
  if (r.includes('2nd') || r.includes('亚军')) return '🥈'
  if (r.includes('3rd') || r.includes('季军')) return '🥉'
  return '•'
}
</script>

<template>
  <div class="showcase-wrapper">
    <div class="showcase-container">
      <div v-for="t in [...tournaments].reverse()" :key="t.name" class="tournament-card">
        <!-- Background with Overlay -->
        <div class="card-bg" :style="{ backgroundImage: `url(${bgImages[t.name] || (bgUrl + '&fallback=1')})` }"></div>
        <div class="card-overlay"></div>

        <!-- Content -->
        <div class="card-content">
          <!-- Top Info -->
          <div class="top-info">
            <div class="tournament-location">{{ t.name }}</div>
            <div class="tournament-year">{{ t.date }}</div>
          </div>

          <!-- Main Logo (Champion Avatar) -->
          <div class="champion-logo-wrapper">
            <div class="logo-container">
                  <img :key="getChampionAvatar(t) + '_' + (currentAvatarIndices[t.name] || 0)"
                    :src="getChampionAvatar(t)"
                    class="champion-logo"
                    :class="{ visible: logoLoaded[t.name] }"
                    @load="() => { logoLoaded[t.name] = true }"
                    :alt="`Champion-${t.name}`" />
              <div class="logo-glow"></div>
            </div>
          </div>

          <!-- Champion Info -->
          <div class="champion-info">
            <div class="champions-label">
              <span class="globe-icon">🏆</span> CHAMPIONS
            </div>
            <h2 class="champion-name">{{ t.finalResults.find(r => r.rank === '1st' || r.rank === '冠军')?.name }}</h2>
          </div>

          <!-- Results List -->
          <div class="results-list">
            <div v-for="res in t.finalResults.slice(1, 8)" :key="res.name" class="result-item">
              <div class="result-left">
                <div class="rank-icon-small">{{ getRankIcon(res.rank) }}</div>
                <div class="result-meta">
                  <span class="result-rank-label">{{ getRankLabel(res.rank) }}</span>
                  <span class="result-player-name">{{ res.name }}</span>
                </div>
              </div>
                  <img :key="resolveAvatar(res.name) + '_' + res.name"
                    :src="resolveAvatar(res.name)"
                    class="mini-avatar"
                    :class="{ visible: logoLoadedSmall[`${t.name}::${res.name}`] }"
                    @load="() => { logoLoadedSmall[`${t.name}::${res.name}`] = true }"
                    :alt="`mini-${res.name}`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.showcase-wrapper {
  width: 100%;
  height: 100vh; /* 容器占满屏幕，文字间距在卡片内处理 */
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
}

.showcase-container {
  display: flex;
  width: 100%;
  height: 100%;
  background: #000;
}

.tournament-card {
  flex: 1;
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.tournament-card:last-child {
  border-right: none;
}

.tournament-card:hover {
  flex: 3;
  z-index: 10;
}

.card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.3) grayscale(0.5);
  transition: all 0.8s ease;
  transform: scale(1.05);
}

.tournament-card:hover .card-bg {
  transform: scale(1);
  filter: brightness(0.5) grayscale(0);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    rgba(0,0,0,0.4) 0%, 
    transparent 30%, 
    transparent 60%, 
    rgba(0,0,0,0.9) 100%);
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* 只为文字及内部内容预留顶部空间，避免被顶栏遮挡 */
  padding: 72px 20px 40px;
  color: white;
  text-align: center;
}

.top-info {
  margin-bottom: 20px;
  transition: transform 0.6s ease;
}

.tournament-card:hover .top-info {
  transform: translateY(-10px);
}

.tournament-location {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 4px;
}

.tournament-year {
  font-size: 12px;
  font-weight: 600;
  color: #888;
  letter-spacing: 1px;
}

.champion-logo-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.logo-container {
  position: relative;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.tournament-card:hover .logo-container {
  transform: scale(1.2) translateZ(50px);
}

.champion-logo {
  width: 240px;
  height: 240px;
  object-fit: cover;
  filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.1));
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  transition: opacity 0.9s ease, transform 0.9s ease, filter 0.6s ease;
  opacity: 0;
}

.tournament-card:hover .champion-logo {
  filter: drop-shadow(0 0 50px rgba(255, 255, 255, 0.3));
}

.champion-logo.visible {
  opacity: 1;
}

.logo-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.tournament-card:hover .logo-glow {
  opacity: 1;
}

.champion-info {
  margin-bottom: 40px;
  transition: transform 0.6s ease;
}

.tournament-card:hover .champion-info {
  transform: translateY(10px);
}

.champions-label {
  font-size: 12px;
  font-weight: 800;
  color: #ccc;
  letter-spacing: 4px;
  margin-bottom: 8px;
}

.champion-name {
  font-size: 42px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -1px;
  margin: 0;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.tournament-card:hover .results-list {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.result-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rank-icon-small {
  font-size: 14px;
  width: 20px;
  text-align: center;
}

.result-meta {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.result-rank-label {
  font-size: 9px;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
}

.result-player-name {
  font-size: 15px;
  font-weight: 700;
  color: #eee;
}

.mini-avatar {
  width: 28px;
  height: 28px;
  border-radius: 2px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.5s ease;
}

.mini-avatar.visible {
  opacity: 0.9;
}

/* Mobile adjustments */
@media (max-width: 1024px) {
  .showcase-container {
    flex-direction: column;
  }
  .tournament-card {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .tournament-card:hover {
    flex: 5;
  }
  .champion-logo {
    width: 160px;
    height: 160px;
  }
  .champion-name {
    font-size: 28px;
  }
}
</style>

