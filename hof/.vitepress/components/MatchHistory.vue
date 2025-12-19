<script setup lang="ts">
import { ref, computed } from 'vue'
import { tournaments, Stage, Match } from '../data/MatchHistory'

// 1. 倒序排列赛事
const sortedTournaments = computed(() => {
  return [...tournaments].reverse();
});

const expandedState = ref<Record<string, boolean>>({});

// 默认展开最新赛事
if (sortedTournaments.value.length > 0) {
  expandedState.value[sortedTournaments.value[0].name] = true;
}

const toggleExpand = (name: string) => {
  expandedState.value[name] = !expandedState.value[name];
};

// 2. 阶段倒序
const getReversedStages = (stages: Stage[]) => {
  return [...stages].reverse();
};

// 3. 核心分组逻辑 (Group Matches)
const groupMatches = (matches: Match[]) => {
  const groups: Match[][] = [];
  let currentGroup: Match[] = [];

  for (const match of matches) {
    if (currentGroup.length === 0) {
      currentGroup.push(match);
      continue;
    }

    const prev = currentGroup[currentGroup.length - 1];
    
    // 判定是否同属一个系列赛：
    // 1. 队伍完全相同
    // 2. Map 序号递增 (如 1->2->3) 或者当前比赛的 map > 1
    const isSameSeries = 
      match.team1.name === prev.team1.name &&
      match.team2.name === prev.team2.name &&
      ( (match.map && match.map > 1) || (prev.map && prev.map < (match.map || 99)) );

    if (isSameSeries) {
      currentGroup.push(match);
    } else {
      groups.push(currentGroup);
      currentGroup = [match];
    }
  }
  if (currentGroup.length > 0) groups.push(currentGroup);
  
  return groups;
};

// 计算系列赛大比分 (仅用于 BO2/BO3/BO5)
const getSeriesScore = (group: Match[]) => {
  let t1Wins = 0;
  let t2Wins = 0;
  group.forEach(m => {
    if (m.winner === 1) t1Wins++;
    if (m.winner === 2) t2Wins++;
  });
  return { t1: t1Wins, t2: t2Wins };
};

// 获取赛制标签
const getBestOfLabel = (group: Match[]) => {
  const count = group.length;
  if (count === 1) return 'BO1';
  
  const { t1, t2 } = getSeriesScore(group);
  const maxWins = Math.max(t1, t2);

  if (maxWins === 2 || count === 3) return 'BO3';
  if (maxWins === 3 || count === 5) return 'BO5';
  
  return `BO${count}`;
};

// 样式辅助
const getWinClass = (winnerCode: number | undefined, currentSide: 1 | 2) => {
  if (winnerCode === currentSide) return 'text-win';
  if (winnerCode === 0) return 'text-draw';
  if (winnerCode !== undefined && winnerCode !== currentSide) return 'text-loss';
  return 'text-normal';
};

const getRankClass = (rankStr: string) => {
  const r = rankStr.toLowerCase();
  if (r.includes('1st') || r.includes('冠军')) return 'rank-1';
  if (r.includes('2nd') || r.includes('亚军')) return 'rank-2';
  if (r.includes('3rd') || r.includes('季军')) return 'rank-3';
  return 'rank-normal';
};
</script>

<template>
  <div class="dashboard-container">
    <div class="header-section">
      <h1 class="main-title">TOURNAMENT ARCHIVES</h1>
      <p class="subtitle">SEASON 2025 • DATA DASHBOARD</p>
    </div>

    <div class="timeline-feed">
      <div 
        v-for="tournament in sortedTournaments" 
        :key="tournament.name" 
        class="dashboard-card"
        :class="{ 'is-collapsed': !expandedState[tournament.name] }"
      >
        
        <!-- Header -->
        <div class="card-header" @click="toggleExpand(tournament.name)">
          <div class="header-left">
            <div class="meta-row">
              <span class="badge-pill type-badge" :class="tournament.type.toLowerCase()">
                {{ tournament.type }}
              </span>
              <span class="badge-pill date-badge">{{ tournament.date }}</span>
            </div>
            <h2 class="tournament-title">{{ tournament.name }}</h2>
          </div>
          
          <div class="header-right">
            <a 
              v-if="tournament.replayLink" 
              :href="tournament.replayLink" 
              target="_blank" 
              class="replay-btn"
              @click.stop
            >
              📺 Bilibili Replay
            </a>
            <button class="toggle-btn">
              {{ expandedState[tournament.name] ? 'COLLAPSE' : 'EXPAND' }}
            </button>
          </div>
        </div>

        <!-- Body with Animation -->
        <div class="collapsible-wrapper" :class="{ 'is-open': expandedState[tournament.name] }">
          <div class="collapsible-content">
            <div class="card-body">
              
              <!-- 1. Final Results -->
              <div class="section final-results-section">
                <h3 class="section-label">PODIUM FINISH</h3>
                <div class="results-ticker">
                  <div 
                    v-for="result in tournament.finalResults" 
                    :key="result.rank" 
                    class="ticker-item"
                    :class="getRankClass(result.rank)"
                  >
                    <div class="rank-badge">{{ result.rank.replace(/[^0-9]/g, '') }}</div>
                    <div class="ticker-content">
                      <div class="ticker-header">
                        <span class="ticker-rank-text">{{ result.rank }}</span>
                        <span v-if="result.score" class="score-pill">{{ result.score }} pts</span>
                      </div>
                      <div class="ticker-name">{{ result.name }}</div>
                      <div v-if="result.players" class="ticker-players">
                        <span v-for="(p, i) in result.players" :key="i" class="player-tag-mini">{{ p }}</span>
                      </div>
                      <div v-if="result.note" class="ticker-note">{{ result.note }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Stages Timeline -->
              <div class="stages-timeline">
                <div v-for="(stage, idx) in getReversedStages(tournament.stages)" :key="idx" class="stage-block">
                  <div class="stage-header">
                    <span class="stage-dot"></span>
                    <span class="stage-name">{{ stage.name }}</span>
                  </div>

                  <div v-if="stage.matches" class="matches-list-container">
                    <div v-for="(group, gIdx) in groupMatches(stage.matches)" :key="gIdx">
                      
                      <!-- UNIFIED MATCH CARD (BO1 & BO3 use same structure) -->
                      <div class="match-card-modern">
                        
                        <!-- Meta: Date | BO Type | Note -->
                        <div class="match-meta-bar">
                          <span class="m-date">{{ group[0].date }}</span>
                          <span class="bo-tag" :class="group.length > 1 ? 'bo-multi' : 'bo-single'">
                            {{ getBestOfLabel(group) }}
                          </span>
                          <span v-if="group[0].note" class="m-note">{{ group[0].note }}</span>
                        </div>

                        <!-- Content Grid: Team1 - Scores - Team2 -->
                        <div class="match-content-grid">
                          
                          <!-- Team 1 (Left) -->
                          <div class="team-col team-left" :class="{ 'opacity-low': getSeriesScore(group).t2 > getSeriesScore(group).t1 && group.length > 1 }">
                            <div class="t-name-wrapper">
                              <span class="t-name-big">{{ group[0].team1.name }}</span>
                              <!-- Series Score (Hidden for BO1) -->
                              <span v-if="group.length > 1" class="series-score" :class="getSeriesScore(group).t1 > getSeriesScore(group).t2 ? 'text-win' : ''">
                                {{ getSeriesScore(group).t1 }}
                              </span>
                            </div>
                            <div class="t-players-list" v-if="group[0].team1.players">
                              {{ group[0].team1.players.join(', ') }}
                            </div>
                          </div>

                          <!-- Central Scores Panel (Vertical Stack for multi-maps) -->
                          <div class="scores-center-panel">
                            <!-- Loop through maps -->
                            <div v-for="(m, mIdx) in group" :key="mIdx" class="score-row-item">
                              <span class="sc-val sc-t1" :class="getWinClass(m.winner, 1)">{{ m.team1.score }}</span>
                              
                              <div class="sc-meta">
                                <!-- Always show MAP number even for BO1 to maintain alignment -->
                                <span class="map-label">MAP {{ m.map || (mIdx + 1) }}</span>
                                <span v-if="m.isOT" class="ot-label">OT {{ m.overtime }}</span>
                              </div>
                              
                              <span class="sc-val sc-t2" :class="getWinClass(m.winner, 2)">{{ m.team2.score }}</span>
                            </div>
                          </div>

                          <!-- Team 2 (Right) -->
                          <div class="team-col team-right" :class="{ 'opacity-low': getSeriesScore(group).t1 > getSeriesScore(group).t2 && group.length > 1 }">
                            <div class="t-name-wrapper">
                              <!-- Series Score (Hidden for BO1) -->
                              <span v-if="group.length > 1" class="series-score" :class="getSeriesScore(group).t2 > getSeriesScore(group).t1 ? 'text-win' : ''">
                                {{ getSeriesScore(group).t2 }}
                              </span>
                              <span class="t-name-big">{{ group[0].team2.name }}</span>
                            </div>
                            <div class="t-players-list" v-if="group[0].team2.players">
                              {{ group[0].team2.players.join(', ') }}
                            </div>
                          </div>

                        </div>
                      </div>
                      <!-- END CARD -->

                    </div>
                  </div>

                  <!-- Standings -->
                  <div v-if="stage.standings" class="standings-panel">
                    <div class="panel-grid">
                      <div v-for="(std, sIdx) in stage.standings" :key="sIdx" class="standing-cell">
                         <div class="std-header">
                           <span class="std-rank">{{ std.rank }}</span>
                           <span class="std-score">{{ std.score }}</span>
                         </div>
                         <div class="std-name">{{ std.name }}</div>
                         <div v-if="std.players" class="std-players">
                           <span v-for="p in std.players" :key="p" class="player-text-tiny">{{ p }}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Footer -->
              <div class="card-footer-info">
                 <div v-if="tournament.comments" class="comments-widget">
                   <h4>ANALYST NOTES</h4>
                   <div class="notes-list">
                      <p v-for="(c, cIdx) in tournament.comments" :key="cIdx" class="note-line">{{ c }}</p>
                   </div>
                 </div>
                 <div v-if="tournament.participants" class="participants-widget">
                   <h4>PARTICIPANTS</h4>
                   <div class="p-tags">
                     <span v-for="p in tournament.participants" :key="p">{{ p }}</span>
                   </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Color Palette */
:root {
  --d-bg: #0f172a;
  --d-card-bg: #1e293b;
  --d-text-primary: #f8fafc;
  --d-text-secondary: #94a3b8;
  --d-border: #334155;
  --d-accent: #3b82f6;
  --d-win-text: #34d399;
  --d-loss-text: #f87171;
  --d-draw-text: #94a3b8;
  --vp-c-bg-soft: #1e293b;
  --vp-c-bg-alt: #0f172a;
  --vp-c-bg-mute: #334155;
  --vp-c-divider: #475569;
  --vp-c-text-1: #f1f5f9;
  --vp-c-text-2: #cbd5e1;
  --vp-c-brand: #60a5fa;
}

.text-win { color: var(--d-win-text); font-weight: bold; }
.text-loss { color: var(--d-loss-text); opacity: 0.8; }
.text-draw { color: var(--d-draw-text); }

/* Main Container */
.dashboard-container {
  font-family: 'Inter', system-ui, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  color: var(--d-text-primary);
}

.header-section { text-align: center; margin-bottom: 4rem; }
.main-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: -1px;
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 100%;
  line-height: 1.2;
}
.subtitle { font-size: 0.9rem; color: var(--d-text-secondary); letter-spacing: 0.3em; font-weight: 600; margin-top: 0.8rem; }

/* Dashboard Card */
.dashboard-card {
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 3rem;
  overflow: hidden;
}

.card-header {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(to bottom, rgba(255,255,255,0.03), transparent);
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-right { display: flex; align-items: center; gap: 1rem; }
.meta-row { display: flex; gap: 0.75rem; margin-bottom: 0.5rem; }
.badge-pill { font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
.type-badge.solo { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
.type-badge.team { background: rgba(236, 72, 153, 0.2); color: #f472b6; }
.date-badge { background: var(--vp-c-bg-mute); color: var(--d-text-secondary); }
.tournament-title { margin: 0; font-size: 1.8rem; font-weight: 800; color: var(--vp-c-text-1); }

/* Buttons */
.replay-btn {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;
  background: #fb7299; color: white !important; border-radius: 10px;
  font-weight: 700; font-size: 0.85rem; text-decoration: none !important;
  transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(251, 114, 153, 0.3);
}
.replay-btn:hover { background: #fc8bab; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(251, 114, 153, 0.4); }
.toggle-btn {
  font-size: 0.75rem; font-weight: 600; color: var(--d-text-secondary);
  border: 1px solid var(--vp-c-divider); padding: 8px 16px; border-radius: 10px;
  background: transparent; cursor: pointer; transition: all 0.2s; height: 36px;
}
.toggle-btn:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }

/* Animation */
.collapsible-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
.collapsible-wrapper.is-open { grid-template-rows: 1fr; }
.collapsible-content { overflow: hidden; opacity: 0; transition: opacity 0.35s ease; min-height: 0; }
.collapsible-wrapper.is-open .collapsible-content { opacity: 1; }
.card-body { padding: 0 2rem 2rem 2rem; border-top: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-alt); }

/* Ticker */
.section-label { font-size: 0.8rem; color: var(--d-text-secondary); letter-spacing: 0.15em; margin: 2rem 0 1.5rem; font-weight: 700; border-left: 3px solid var(--vp-c-brand); padding-left: 0.8rem; }
.results-ticker { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.ticker-item { 
  background: var(--vp-c-bg-soft); 
  border-radius: 18px; 
  padding: 1.25rem; 
  border: 1px solid var(--vp-c-divider); 
  position: relative; 
  overflow: hidden; 
  display: flex; 
  flex-direction: column; 
  min-height: 140px; 
  box-shadow: 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ticker-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08);
}
.ticker-content { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; }
.ticker-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.ticker-rank-text { font-size: 0.9rem; font-weight: 800; color: var(--d-text-secondary); }
.score-pill { background: var(--vp-c-bg-mute); font-size: 0.8rem; padding: 2px 8px; border-radius: 4px; font-weight: 700; color: var(--vp-c-brand); }
.ticker-name { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--vp-c-text-1); }
.ticker-players { font-size: 0.85rem; color: var(--d-text-secondary); line-height: 1.4; flex-grow: 1; display: flex; flex-wrap: wrap; gap: 6px; }
.player-tag-mini { background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; }
.ticker-note { font-size: 0.75rem; color: var(--d-text-secondary); opacity: 0.7; font-style: italic; margin-top: 0.8rem; }
.rank-badge { font-size: 4rem; font-weight: 900; font-style: italic; position: absolute; right: -5px; bottom: -15px; opacity: 0.05; pointer-events: none; z-index: 1; }

/* Rank Glows - Enhanced */
.rank-1 { 
  border: 2px solid #ffd700; 
  background: linear-gradient(145deg, rgba(255, 215, 0, 0.12), var(--vp-c-bg-soft)); 
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.35), 0 0 120px rgba(255, 215, 0, 0.2), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); 
  animation: glow-1st 3s infinite alternate; 
}
.rank-1 .rank-badge, .rank-1 .ticker-rank-text, .rank-1 .score-pill { color: #ffd700; text-shadow: 0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4); }
.rank-2 { 
  border: 2px solid #c0c0c0; 
  background: linear-gradient(145deg, rgba(192, 192, 192, 0.12), var(--vp-c-bg-soft)); 
  box-shadow: 0 0 35px rgba(192, 192, 192, 0.45), 0 0 70px rgba(192, 192, 192, 0.3), 0 0 105px rgba(192, 192, 192, 0.15), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); 
  animation: glow-2nd 3s infinite alternate; 
}
.rank-2 .rank-badge, .rank-2 .ticker-rank-text, .rank-2 .score-pill { color: #c0c0c0; text-shadow: 0 0 12px rgba(192, 192, 192, 0.7), 0 0 24px rgba(192, 192, 192, 0.35); }
.rank-3 { 
  border: 2px solid #cd7f32; 
  background: linear-gradient(145deg, rgba(205, 127, 50, 0.12), var(--vp-c-bg-soft)); 
  box-shadow: 0 0 30px rgba(205, 127, 50, 0.4), 0 0 60px rgba(205, 127, 50, 0.25), 0 0 90px rgba(205, 127, 50, 0.12), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); 
  animation: glow-3rd 3s infinite alternate; 
}
.rank-3 .rank-badge, .rank-3 .ticker-rank-text, .rank-3 .score-pill { color: #cd7f32; text-shadow: 0 0 10px rgba(205, 127, 50, 0.6), 0 0 20px rgba(205, 127, 50, 0.3); }
@keyframes glow-1st { from { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); } to { box-shadow: 0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.35), 0 0 120px rgba(255, 215, 0, 0.2), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); } }
@keyframes glow-2nd { from { box-shadow: 0 0 15px rgba(192, 192, 192, 0.2), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); } to { box-shadow: 0 0 35px rgba(192, 192, 192, 0.45), 0 0 70px rgba(192, 192, 192, 0.3), 0 0 105px rgba(192, 192, 192, 0.15), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); } }
@keyframes glow-3rd { from { box-shadow: 0 0 15px rgba(205, 127, 50, 0.2), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); } to { box-shadow: 0 0 30px rgba(205, 127, 50, 0.4), 0 0 60px rgba(205, 127, 50, 0.25), 0 0 90px rgba(205, 127, 50, 0.12), 0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06); } }

/* Matches List */
.stages-timeline { margin-top: 3rem; padding-left: 0.5rem; border-left: 2px solid var(--vp-c-divider); }
.stage-block { margin-bottom: 3rem; position: relative; padding-left: 2rem; }
.stage-dot { position: absolute; left: -0.4rem; top: 0.4rem; width: 12px; height: 12px; border-radius: 50%; background: var(--vp-c-brand); box-shadow: 0 0 0 4px var(--vp-c-bg-alt); }
.stage-name { font-size: 1.1rem; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 1.5rem; display: block; }
.matches-list-container { display: flex; flex-direction: column; gap: 1.5rem; }

/* ================== UNIFIED MATCH CARD ================== */
.match-card-modern {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.match-card-modern:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.match-meta-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 0.75rem;
  color: var(--d-text-secondary);
  border-bottom: 1px dashed var(--vp-c-divider);
  padding-bottom: 0.75rem;
  margin-bottom: 0.5rem;
}

.bo-tag { background: var(--vp-c-brand); color: white; padding: 2px 6px; border-radius: 6px; font-weight: 700; font-size: 0.7rem; }
.bo-multi { background: #f472b6; }
.bo-single { background: var(--vp-c-brand); }
.m-note { color: var(--vp-c-brand); font-weight: bold; }

/* Grid Layout */
.match-content-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

/* Team Columns */
.team-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.team-left { align-items: flex-end; text-align: right; }
.team-right { align-items: flex-start; text-align: left; }
.opacity-low { opacity: 0.5; transition: opacity 0.3s; }

.t-name-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}
.t-name-big { font-size: 1.1rem; font-weight: 800; color: var(--vp-c-text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.series-score { font-size: 1.8rem; font-weight: 900; line-height: 1; color: var(--d-text-secondary); }
.t-players-list { font-size: 0.75rem; color: var(--d-text-secondary); margin-top: 6px; line-height: 1.4; max-width: 90%; }

/* Central Scores Panel (Vertical Stack) */
.scores-center-panel {
  background: var(--vp-c-bg-mute);
  border-radius: 14px;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid var(--vp-c-divider);
  min-width: 140px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

.score-row-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 800;
  padding: 2px 0;
  width: 100%;
}

.sc-val { width: 30px; text-align: center; }
.sc-t1 { text-align: right; }
.sc-t2 { text-align: left; }

.sc-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
}
.map-label { font-size: 0.6rem; color: var(--d-text-secondary); font-weight: 700; text-transform: uppercase; }
.ot-label { font-size: 0.6rem; color: #f43f5e; font-weight: 700; line-height: 1; margin-top: -2px; }

/* Standings */
.panel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
.standing-cell { background: var(--vp-c-bg-mute); padding: 1rem; border-radius: 14px; box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1); }
.std-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.std-rank { font-weight: 800; font-size: 0.85rem; color: var(--d-text-secondary); background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; }
.std-score { font-weight: 800; color: var(--d-accent); }
.std-name { font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; }
.std-players { font-size: 0.75rem; color: var(--d-text-secondary); line-height: 1.3; display: flex; flex-wrap: wrap; gap: 4px; }
.player-text-tiny { background: rgba(255,255,255,0.05); padding: 1px 4px; border-radius: 3px; }

/* Footer */
.card-footer-info { margin-top: 3rem; padding-top: 2rem; border-top: 1px dashed var(--vp-c-divider); display: grid; grid-template-columns: 1fr; gap: 2rem; }
.comments-widget h4, .participants-widget h4 { font-size: 0.75rem; color: var(--d-text-secondary); margin-bottom: 0.8rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
.note-line { font-size: 0.9rem; line-height: 1.6; color: var(--vp-c-text-2); margin-bottom: 0.5rem; padding-left: 1rem; border-left: 2px solid var(--vp-c-brand); }
.p-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.p-tags span { background: var(--vp-c-bg-mute); padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider); box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.08); }

@media (min-width: 768px) { .card-footer-info { grid-template-columns: 2fr 1fr; } }
@media (max-width: 640px) {
  .card-header { flex-direction: column; gap: 1rem; }
  .header-right { width: 100%; justify-content: space-between; }
  .match-content-grid { grid-template-columns: 1fr; gap: 1rem; text-align: center; }
  .team-left, .team-right { align-items: center; text-align: center; }
  .t-name-wrapper { flex-direction: column; gap: 4px; }
  .series-score { order: -1; }
  .scores-center-panel { width: 100%; }
}
</style>