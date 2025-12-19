<script setup lang="ts">
import { ref, computed } from 'vue'
import { tournaments, scoringRules, type TournamentEntry } from '../data/tournaments'

interface PlayerHonor {
  eventName: string;
  rank?: string;
  specials?: string[];
}

interface Player {
  rank: number;
  name: string;
  score: number;
  honors: PlayerHonor[];
  avatar: string;
}

const avatarMap: Record<string, string> = {
  "淮南皓月": "1160923758 淮南皓月.jpg",
  "ams": "1219205983 ams.jpg",
  "arisu": "1297672328 arisu.jpg",
  "lese": "1485571529 lese.jpg",
  "顶碗人": "1519059946 顶碗人.jpg",
  "JDG": "1655315025 JDG.jpg",
  "中华小当家": "195466581 中华小当家.jpg",
  "Ryo": "2164289505 Ryo.jpg",
  "切尔茜": "2208701764 切尔茜.jpg",
  "SevenTen": "2313345240 SevenTen.jpg",
  "你去祭典了吧": "2372687943 你去祭典了吧.jpg",
  "Shaw": "2399389896 Shaw.jpg",
  "琪露诺": "2406188515 琪露诺.jpg",
  "澄梦Crystal": "2575891553 澄梦.jpg",
  "安格": "2663476479 安格.jpg",
  "Shin'on": "2701104872 shinon.jpg",
  "新条茜": "2701560254 新条茜.jpg",
  "Akizawa": "2855168005 Akizawa.jpg",
  "hobaka": "2860322894 hobaka.jpg",
  "云霄": "3065811267 云霄.jpg",
  "姜姜大当家": "3078333175 姜姜大当家.jpg",
  "鲁迪乌斯": "3134631190 鲁迪乌斯.jpg",
  "75sp": "3439699732 75sp.jpg",
  "素质人士": "3445039196 素质人士.jpg",
  "V.": "3836872723 V.jpg",
  "shiki": "3932747534 shiki.jpg",
  "gura": "466602345 gura.jpg",
  "玩设备": "569742932 玩设备.jpg",
  "阿赵": "605327070 阿赵.jpg",
  "吴织亚切": "783798725 吴织亚切.jpg",
  "sh1ro": "815783727 sh1ro.jpg"
};

const getAvatar = (name: string) => {
  const file = avatarMap[name];
  return file ? `/avatar/${file}` : '/avatar/default.jpg';
};

// Aggregate data from tournaments
const leaderboardData = computed(() => {
  const playerMap = new Map<string, Player>();

  tournaments.forEach(tournament => {
    tournament.entries.forEach(entry => {
      if (!playerMap.has(entry.player)) {
        playerMap.set(entry.player, {
          rank: 0,
          name: entry.player,
          score: 0,
          honors: [],
          avatar: getAvatar(entry.player)
        });
      }
      const player = playerMap.get(entry.player)!;
      player.score += entry.score;
      player.honors.push({
        eventName: tournament.name,
        rank: entry.rank,
        specials: entry.specials
      });
    });
  });

  const sortedPlayers = Array.from(playerMap.values()).sort((a, b) => b.score - a.score);
  
  // Assign ranks
  sortedPlayers.forEach((p, index) => {
    p.rank = index + 1;
  });

  return sortedPlayers;
});

const formatRank = (rank?: string) => {
  if (!rank) return '';
  if (rank === '冠军') return '1st';
  if (rank === '亚军') return '2nd';
  if (rank === '季军') return '3rd';
  if (rank === '殿军') return '4th';
  if (rank === '第五') return '5th';
  if (rank === '第六') return '6th';
  if (rank === '第七') return '7th';
  if (rank === '第八') return '8th';
  return rank;
};

const getRankClass = (rank: number) => {
  if (rank === 1) return 'rank-1'
  if (rank === 2) return 'rank-2'
  if (rank === 3) return 'rank-3'
  return 'rank-other'
}
</script>

<template>
  <div class="leaderboard-container">
    <div class="header-section">
      <h1 class="main-title">CCB 积分排行榜 2025</h1>
      <p class="subtitle">Hall of the Chosen One</p>
    </div>

    <div class="leaderboard-grid">
      <div v-for="player in leaderboardData" :key="player.name" :class="['player-card', getRankClass(player.rank)]">
        <div class="card-header">
          <div class="rank-badge">{{ player.rank }}</div>
          <img :src="player.avatar" :alt="player.name" class="player-avatar" />
          <div class="player-main-info">
            <h3 class="player-name">{{ player.name }}</h3>
            <div class="player-score">{{ player.score }} <span class="score-label">pts</span></div>
          </div>
        </div>
        
        <div class="honors-container">
          <div v-for="(honor, idx) in player.honors" :key="idx" class="honor-row">
            <div class="honor-left">
              <div v-if="honor.specials" class="honor-specials">
                <span v-for="s in honor.specials" :key="s" :class="['special-tag', s.toLowerCase() === 'mvp' ? 'mvp-tag' : 'evp-tag']">
                  {{ s }}
                </span>
              </div>
              <span class="honor-event">{{ honor.eventName }}</span>
            </div>
            <span v-if="honor.rank" :class="['honor-rank', { 'medal-1st': honor.rank === '冠军', 'medal-2nd': honor.rank === '亚军', 'medal-3rd': honor.rank === '季军' }]">
              {{ formatRank(honor.rank) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scoring Rules -->
    <div class="rules-section">
      <h3>积分细则</h3>
      <div class="rules-grid">
        <div v-for="(rule, index) in scoringRules" :key="index" class="rule-card">
          <h4>{{ rule.event }}</h4>
          <p>{{ rule.rules }}</p>
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

.player-score {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--vp-c-brand);
}

.score-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: normal;
}

.honors-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--vp-c-bg-mute);
  padding: 0.85rem;
  border-radius: 14px;
  font-size: 0.85rem;
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
  min-width: 60px;
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

/* Rules Section */
.rules-section {
  background: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.rule-card {
  background: var(--vp-c-bg-mute);
  padding: 1.25rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rule-card:hover {
  transform: translateY(-3px);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.08);
}

.rule-card h4 {
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.rule-card p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .leaderboard-grid {
    grid-template-columns: 1fr;
  }
  .main-title {
    font-size: 2rem;
  }
}
</style>
