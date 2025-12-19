// --- MatchHistory.ts ---

export interface MatchTeam {
  name: string;      // 队伍名 (e.g., "老鸨组", "八组") 或 选手名
  players?: string[]; // 队员详情
  score: number | string; // 支持 "W" 或 具体分数
}

export interface Match {
  date?: string;
  map?: number; // 关键字段：用于识别 BO3
  team1: MatchTeam;
  team2: MatchTeam;
  isOT?: boolean;
  overtime?: string; 
  winner?: 1 | 2 | 0; // 1=Team1赢, 2=Team2赢, 0=平局
  note?: string; // 备注 (e.g. "图一", "加时")
}

export interface StandingItem {
  rank: string;
  name: string;
  players?: string[];
  score: number | string;
  record?: string;
}

export interface Stage {
  name: string;
  type: 'Group' | 'Bracket' | 'Swiss'; 
  matches?: Match[];
  standings?: StandingItem[];
}

export interface Tournament {
  name: string;
  date: string;
  type: 'Solo' | 'Team';
  participants?: string[];
  stages: Stage[];
  finalResults: Array<{ 
    rank: string; 
    name: string; 
    players?: string[]; 
    score?: number | string; 
    note?: string 
  }>;
  comments?: string[];
  replayLink?: string; // B站回放链接
}

export const tournaments: Tournament[] = [
  {
    name: "第一届 Major",
    date: "2025.6.20",
    type: "Solo",
    replayLink: "https://www.bilibili.com/", // 待填入具体链接
    participants: [
      "Hobaka", "琪露诺", "正义联盟DCAT", "淮南皓月", "sh1ro", "WTDER", "故障机器人",
      "阿赵", "710", "云霄", "躁狂", "郊眠寺", "澄梦Crystal", "抹茶巴菲", "一个人吃饭",
      "czjun", "youmu", "俾斯麦", "凉", "rany", "lese", "谁去", "TuSHx39", "xwwwx",
      "rikka", "乐乐", "纱雾", "遠野しき", "yanmuzhi"
    ],
    stages: [],
    finalResults: [
      { rank: "1st", name: "SevenTen", score: 42 },
      { rank: "2nd", name: "阿赵", score: 26 },
      { rank: "3rd", name: "xwwwx", score: 17 },
      { rank: "3rd", name: "中华小当家", score: 17 }
    ]
  },
  {
    name: "第二届 Major",
    date: "2025.7.19 - 7.20",
    type: "Solo",
    replayLink: "https://www.bilibili.com/",
    stages: [
      {
        name: "瑞士轮",
        type: "Swiss",
        standings: [
          { rank: "3-0", name: "晋级组", players: ["Shaw", "诗歌剧", "Hobaka", "悠之空穹", "素质人士"], score: "Q" },
          { rank: "3-1", name: "晋级组", players: ["阿赵", "茅庐", "RainbowGirl", "Yuk1", "Shinon", "V."], score: "Q" },
          { rank: "3-2", name: "淘汰组", players: ["Lese", "Rikka", "玩设备", "鲁迪乌斯", "Shiki", "琪露诺", "Qiu"], score: "OUT" }
        ]
      },
      {
        name: "淘汰赛分组",
        type: "Group",
        standings: [
          { rank: "A组", name: "分组A", players: ["Shaw", "素质人士", "悠之空穹", "茅庐", "Yuk1", "V.", "Rikka", "鲁迪乌斯", "琪露诺"], score: "-" },
          { rank: "B组", name: "分组B", players: ["诗歌剧", "Hobaka", "Sh1ro（顶替阿赵）", "RainbowGirl", "Shinon", "Lese", "玩设备", "Shiki", "Qiu"], score: "-" }
        ]
      },
      {
        name: "决赛",
        type: "Bracket",
        matches: [
          { date: "决赛", map: 1, team1: { name: "Shinon", score: 53 }, team2: { name: "Hobaka", score: 40 }, winner: 1 }
        ]
      }
    ],
    finalResults: [
      { rank: "1st", name: "Shinon", score: 53, note: "淘汰赛24分" },
      { rank: "2nd", name: "Hobaka", score: 40, note: "淘汰赛25分" },
      { rank: "3rd", name: "琪露诺", score: 36, note: "淘汰赛27分" },
      { rank: "4th", name: "V.", score: 21 },
      { rank: "5th", name: "Shiki", score: 20 },
      { rank: "6th", name: "Shaw", score: 13 },
      { rank: "6th", name: "Sh1ro", score: 13, note: "顶替阿赵" },
      { rank: "8th", name: "素质人士", score: 10 },
      { rank: "9th", name: "鲁迪乌斯", score: 3 },
      { rank: "9th", name: "Lese", score: 3 }
    ]
  },
  {
    name: "第三届 Major",
    date: "2025.8.11 - 8.19",
    type: "Team",
    replayLink: "https://www.bilibili.com/",
    stages: [
      {
        name: "胜者组第一轮",
        type: "Bracket",
        matches: [
          { date: "8.11", map: 1, team1: { name: "二组 (老鸨组)", players: ["Shaw", "云霄", "中华小当家"], score: 30 }, team2: { name: "七组", players: ["切尔茜", "鲁迪乌斯", "Ryo"], score: 20 }, winner: 1 },
          { date: "8.11", map: 2, team1: { name: "二组 (老鸨组)", players: ["Shaw", "云霄", "中华小当家"], score: 34 }, team2: { name: "七组", players: ["切尔茜", "鲁迪乌斯", "Ryo"], score: 22 }, winner: 1 },
          { date: "8.12", map: 1, team1: { name: "八组", players: ["V.", "安格", "710"], score: 34 }, team2: { name: "四组", players: ["Lese", "水映天虹", "设备"], score: 13 }, winner: 1 },
          { date: "8.12", map: 2, team1: { name: "八组", players: ["V.", "安格", "710"], score: 30 }, team2: { name: "四组", players: ["Lese", "水映天虹", "设备"], score: 31 }, isOT: true, overtime: "4:0", winner: 2 },
          { date: "8.12", map: 1, team1: { name: "六组", players: ["75sp", "Shinon", "新条茜"], score: 35 }, team2: { name: "五组", players: ["茅庐", "吴织亚切", "暦"], score: 11 }, winner: 1 },
          { date: "8.12", map: 2, team1: { name: "六组", players: ["75sp", "Shinon", "新条茜"], score: 33 }, team2: { name: "五组", players: ["茅庐", "吴织亚切", "暦"], score: 10 }, winner: 1 },
          { date: "8.13", map: 1, team1: { name: "一组", players: ["Sakuya", "Sh1ro", "Sugar"], score: 33 }, team2: { name: "三组", players: ["Gura", "淮南皓月", "保科明里"], score: 17 }, winner: 1 },
          { date: "8.13", map: 2, team1: { name: "一组", players: ["Sakuya", "Sh1ro", "Sugar"], score: 25 }, team2: { name: "三组", players: ["Gura", "淮南皓月", "保科明里"], score: 33 }, winner: 2 },
          { date: "8.13", map: 3, team1: { name: "一组", players: ["Sakuya", "Sh1ro", "Sugar"], score: 33 }, team2: { name: "三组", players: ["Gura", "淮南皓月", "保科明里"], score: 27 }, winner: 1 }
        ]
      },
      {
        name: "败者组第一轮",
        type: "Bracket",
        matches: [
          { date: "8.14", map: 1, team1: { name: "三组", players: ["Gura", "淮南皓月", "保科明里"], score: 34 }, team2: { name: "五组", players: ["茅庐", "吴织亚切", "暦"], score: 17 }, winner: 1 },
          { date: "8.14", map: 2, team1: { name: "三组", players: ["Gura", "淮南皓月", "保科明里"], score: 34 }, team2: { name: "五组", players: ["茅庐", "吴织亚切", "暦"], score: 19 }, winner: 1 },
          { date: "8.14", map: 1, team1: { name: "七组", players: ["切尔茜", "鲁迪乌斯", "Ryo"], score: 35 }, team2: { name: "四组", players: ["Lese", "水映天虹", "设备"], score: 28 }, winner: 1 },
          { date: "8.14", map: 2, team1: { name: "七组", players: ["切尔茜", "鲁迪乌斯", "Ryo"], score: 31 }, team2: { name: "四组", players: ["Lese", "水映天虹", "设备"], score: 33 }, isOT: true, overtime: "3:4", winner: 2 },
          { date: "8.14", map: 3, team1: { name: "七组", players: ["切尔茜", "鲁迪乌斯", "Ryo"], score: 33 }, team2: { name: "四组", players: ["Lese", "水映天虹", "设备"], score: 4 }, winner: 1 }
        ]
      },
      {
        name: "胜者组第二轮",
        type: "Bracket",
        matches: [
          { date: "8.15", map: 1, team1: { name: "八组", score: 27 }, team2: { name: "六组", score: 34 }, winner: 2 },
          { date: "8.15", map: 2, team1: { name: "八组", score: 33 }, team2: { name: "六组", score: 19 }, winner: 1 },
          { date: "8.15", map: 3, team1: { name: "八组", score: 30 }, team2: { name: "六组", score: 31 }, isOT: true, overtime: "4:2", winner: 2 },
          { date: "8.16", map: 1, team1: { name: "二组", score: 34 }, team2: { name: "一组", score: 10 }, winner: 1 },
          { date: "8.16", map: 2, team1: { name: "二组", score: 33 }, team2: { name: "一组", score: 18 }, winner: 1 }
        ]
      },
      {
        name: "败者组第二轮",
        type: "Bracket",
        matches: [
          { date: "8.17", map: 1, team1: { name: "六组", score: 35 }, team2: { name: "三组", score: 12 }, winner: 1 },
          { date: "8.17", map: 2, team1: { name: "六组", score: 31 }, team2: { name: "三组", score: 32 }, isOT: true, overtime: "2:4", winner: 2 },
          { date: "8.17", map: 3, team1: { name: "六组", score: 34 }, team2: { name: "三组", score: 28 }, winner: 1 },
          { date: "8.17", map: 1, team1: { name: "七组", score: 34 }, team2: { name: "一组", score: 9 }, winner: 1 },
          { date: "8.17", map: 2, team1: { name: "七组", score: 36 }, team2: { name: "一组", score: 21 }, winner: 1 },
          { date: "8.17", map: 1, team1: { name: "七组", score: 35 }, team2: { name: "六组", score: 16 }, winner: 1 },
          { date: "8.17", map: 2, team1: { name: "七组", score: 34 }, team2: { name: "六组", score: 21 }, winner: 1 }
        ]
      },
      {
        name: "决赛",
        type: "Bracket",
        matches: [
          { date: "8.19", map: 1, team1: { name: "老鸨组", players: ["Shaw", "云霄", "中华小当家"], score: 104 }, team2: { name: "七组", players: ["切尔茜", "鲁迪乌斯", "Ryo"], score: 98 }, winner: 1 }
        ]
      }
    ],
    finalResults: [
      { rank: "1st", name: "老鸨组", players: ["Shaw", "云霄", "中华小当家"], score: 104 },
      { rank: "2nd", name: "七组", players: ["切尔茜总冠军", "鲁迪乌斯", "Ryo"], score: 98 },
      { rank: "3rd", name: "凉组", players: ["V.", "安格", "710"], score: 97 }
    ]
  },
  {
    name: "第一届 MSI",
    date: "2025.8.22 - 8.23",
    type: "Solo",
    replayLink: "https://www.bilibili.com/",
    stages: [
      { name: "胜者组", type: "Bracket", matches: [{ map: 1, team1: { name: "V.", score: 54 }, team2: { name: "Shinon", score: 49 }, winner: 1 }] },
      { name: "败者组R1", type: "Bracket", matches: [{ map: 1, team1: { name: "Hobaka", score: 54 }, team2: { name: "中华小当家", score: 36 }, winner: 1 }] },
      { name: "败者组R2", type: "Bracket", matches: [{ map: 1, team1: { name: "Shinon", score: 34 }, team2: { name: "Hobaka", score: 27 }, winner: 1 }] },
      { name: "决赛", type: "Bracket", matches: [{ map: 1, team1: { name: "V.", score: 35 }, team2: { name: "Shinon", score: 28 }, winner: 1 }] }
    ],
    finalResults: [
      { rank: "1st", name: "V."},
      { rank: "2nd", name: "Shinon"},
      { rank: "3rd", name: "Hobaka"},
      { rank: "4th", name: "中华小当家"}
    ]
  },
  {
    name: "第一届 老鸨杯",
    date: "2025.9.6 - 9.13",
    type: "Team",
    replayLink: "https://www.bilibili.com/",
    stages: [
      {
        name: "胜者组小组赛",
        type: "Group",
        standings: [
          { rank: "A组", name: "A组", players: ["Voyage1969", "Gura", "水映天虹", "V.", "75sp", "Akizawa", "切尔茜", "玩设备", "琪露诺", "中华小当家", "吴织亚切", "孤门一辉"], score: "-" },
          { rank: "B组", name: "B组", players: ["正义联盟DCAT", "Shaw", "WTDER", "鲁迪乌斯", "bernkastel", "Shinon", "Lese", "暦", "Sh1ro", "Hobaka", "SevenTen", "安格"], score: "-" }
        ]
      },
      {
        name: "胜者组决赛",
        type: "Group",
        standings: [
          { rank: "胜1", name: "胜者队1", players: ["V.", "琪露诺", "切尔茜总冠军", "75sp", "中华小当家", "Gura"], score: "Win" },
          { rank: "胜2", name: "胜者队2", players: ["Shaw", "鲁迪乌斯", "Shinon", "Lese", "Sh1ro", "安格"], score: "Loss" }
        ]
      },
      {
        name: "败者组第一轮",
        type: "Group",
        standings: [
          { rank: "败1", name: "败者队1", players: ["Voyage1969", "水映天虹", "Akizawa", "玩设备", "吴织亚切", "孤门一辉"], score: "Win" },
          { rank: "败2", name: "败者队2", players: ["云霄", "WTDER(弃)", "bernkastel", "暦", "Hobaka", "SevenTen"], score: "Loss" }
        ]
      },
      {
        name: "败者组决赛",
        type: "Group",
        standings: [
          { rank: "败决1", name: "败者队1", players: ["sh1ro", "安格", "Shinon", "gura", "中华小当家", "Shaw", "切尔茜总冠军"], score: "Win" },
          { rank: "败决2", name: "败者队2", players: ["水映天虹", "Akizawa", "玩设备", "吴织亚切", "SevenTen"], score: "Loss" }
        ]
      },
    ],
    finalResults: [
      { rank: "1st", name: "琪露诺", score: 65},
      { rank: "2nd", name: "鲁迪乌斯", score: 60},
      { rank: "3rd", name: "V.", score: 57 },
      { rank: "4th", name: "Lese", score: 48 },
      { rank: "5th", name: "Shaw", score: 43 },
      { rank: "6th", name: "切尔茜总冠军", score: 32 },
      { rank: "7th", name: "安格", score: 25 },
      { rank: "8th", name: "75sp", score: 23 },
      { rank: "9th", name: "Shinon", score: 21, note: "病退" },
      { rank: "10th", name: "中华小当家", score: 19, note: "弃赛" }
    ]
  },
  {
    name: "第一届 新人杯",
    date: "2025.9.19 - 9.21",
    type: "Solo",
    replayLink: "https://www.bilibili.com/",
    stages: [
      {
        name: "第一轮",
        type: "Group",
        standings: [
          { rank: "A组", name: "Group A", players: ["十二叶", "Alexander8000", "魔法火蚁", "北京JDG", "凉", "Yuk1", "阿卡林", "WTDER"], score: "-" },
          { rank: "B组", name: "Group B", players: ["玩设备", "Anchianae", "贝卡丝忒", "王", "YzL", "爱梅斯", "珠贝", "Graue"], score: "-" },
          { rank: "C组", name: "Group C", players: ["七七子Megumi", "Asahi", "顶碗人12138", "孤门一辉", "帅哥", "灰心星人", "唐三彩", "知椿"], score: "-" },
          { rank: "D组", name: "Group D", players: ["你去祭典了吧", "龍", "暦", "Akizawa", "吴织亚切", "水映天虹", "姜姜大当家", "arisu"], score: "-" }
        ]
      },
      {
        name: "瑞士轮进阶情况",
        type: "Swiss",
        standings: [
          { rank: "3-0", name: "直通决赛", players: ["你去祭典了吧", "凉", "JDG", "吴织亚切"], score: "Q" },
          { rank: "3-1", name: "晋级淘汰赛", players: ["暦", "AMS", "姜姜大当家", "顶碗人", "bernkastel", "龍"], score: "Q" },
          { rank: "3-2", name: "晋级淘汰赛", players: ["玩设备", "孤门一辉", "Anchianae", "魔法火蚁", "Zont1x", "知椿"], score: "Q" }
        ]
      }
    ],
    finalResults: [
      { rank: "1st", name: "JDG", score: 55 },
      { rank: "2nd", name: "姜姜大当家", score: 51 },
      { rank: "3rd", name: "爱梅斯", score: 38 },
      { rank: "4th", name: "吴织亚切", score: 31 },
      { rank: "5th", name: "你去祭典了吧", score: 27 },
      { rank: "6th", name: "玩设备", score: 24 }
    ]
  },
  {
    name: "第一届 天虹杯",
    date: "2025.11.8 - 11.22",
    type: "Team",
    replayLink: "https://www.bilibili.com/",
    stages: [
      {
        name: "初始分组",
        type: "Group",
        standings: [
          { rank: "#1", name: "一组", players: ["琪露诺", "Ryo", "凉"], score: "-" },
          { rank: "#2", name: "二组", players: ["SevenTen", "云霄", "Akizawa"], score: "-" },
          { rank: "#3", name: "三组", players: ["切尔茜", "玩设备", "风早丶神人"], score: "-" },
          { rank: "#4", name: "四组", players: ["Hobaka", "75sp", "虎纹鲲"], score: "-" },
          { rank: "#5", name: "五组", players: ["安格", "AMS", "一起失眠"], score: "-" },
          { rank: "#6", name: "六组", players: ["鲁迪乌斯", "新条茜", "御宅导师"], score: "-" },
          { rank: "#7", name: "七组", players: ["Lese", "Gura", "Arisu"], score: "-" },
          { rank: "#8", name: "八组", players: ["Shaw", "顶碗人", "澄梦Crystal"], score: "-" }
        ]
      },
      {
        name: "小组赛",
        type: "Bracket",
        matches: [
          { date: "Day1", map: 1, team1: { name: "八组", players: ["Shaw", "顶碗人", "澄梦Crystal"], score: 42 }, team2: { name: "七组", players: ["Lese", "Gura", "Arisu"], score: 20 }, winner: 1, note: "八组vs七组" },
          { date: "Day1", map: 1, team1: { name: "二组", players: ["SevenTen", "云霄", "Akizawa"], score: 17 }, team2: { name: "四组", players: ["Hobaka", "75sp", "虎纹鲲"], score: 40 }, winner: 2, note: "二组vs四组" },
          { date: "Day1", map: 1, team1: { name: "五组", players: ["安格", "AMS", "一起失眠"], score: 32 }, team2: { name: "六组", players: ["鲁迪乌斯", "新条茜", "御宅导师"], score: 44 }, winner: 2, note: "五组vs六组" },
          { date: "Day1", map: 1, team1: { name: "一组", players: ["琪露诺", "Ryo", "凉"], score: 42 }, team2: { name: "三组", players: ["切尔茜", "玩设备", "风早丶神人"], score: 37 }, winner: 1, note: "一组vs三组" },
          { date: "Day2", map: 1, team1: { name: "八组", players: ["Shaw", "顶碗人", "澄梦Crystal"], score: 42 }, team2: { name: "三组", players: ["切尔茜", "玩设备", "风早丶神人"], score: 37 }, winner: 1, note: "八组vs三组" },
          { date: "Day2", map: 1, team1: { name: "六组", players: ["鲁迪乌斯", "新条茜"], score: 15 }, team2: { name: "二组", players: ["SevenTen", "云霄"], score: 15 }, isOT: true, overtime: "1v1平", winner: 0, note: "六组vs二组(1v1)" },
          { date: "Day2", map: 1, team1: { name: "一组", players: ["琪露诺", "Ryo", "凉"], score: 29 }, team2: { name: "七组", players: ["Lese", "Gura", "Arisu"], score: 46 }, winner: 2, note: "一组vs七组" },
          { date: "Day2", map: 1, team1: { name: "四组", players: ["Hobaka", "75sp", "Akizawa"], score: 48 }, team2: { name: "五组", players: ["安格", "AMS", "一起失眠"], score: 33 }, winner: 1, note: "四组vs五组" }
        ]
      },
      {
        name: "半决赛 BO3",
        type: "Bracket",
        matches: [
          // 修复点：添加 map 字段以合并 BO3
          { date: "G1", map: 1, team1: { name: "四组", players: ["Hobaka", "75sp", "Akizawa"], score: 19 }, team2: { name: "七组", players: ["Lese", "Gura", "Arisu"], score: 22 }, winner: 2 },
          { date: "G2", map: 2, team1: { name: "四组", players: ["Hobaka", "75sp", "Akizawa"], score: 21 }, team2: { name: "七组", players: ["Lese", "Gura", "Arisu"], score: 7 }, winner: 1 },
          { date: "G3", map: 3, team1: { name: "四组", players: ["Hobaka", "75sp", "Akizawa"], score: 15 }, team2: { name: "七组", players: ["Lese", "Gura", "Arisu"], score: 20 }, winner: 2 },
          { date: "Auto", map: 1, team1: { name: "八组", players: ["Shaw", "顶碗人", "澄梦Crystal"], score: "W" }, team2: { name: "二组", players: ["SevenTen", "云霄", "Akizawa"], score: "L" }, winner: 1, note: "二组人员不齐" }
        ]
      },
      {
        name: "决赛",
        type: "Bracket",
        matches: [
          // 修复点：添加 map 字段以合并 BO3
          { date: "G1", map: 1, team1: { name: "七组", players: ["Lese", "Gura", "Arisu"], score: 27 }, team2: { name: "八组", players: ["Shaw", "顶碗人", "澄梦Crystal"], score: 31 }, winner: 2 },
          { date: "G2", map: 2, team1: { name: "七组", players: ["Lese", "Gura", "Arisu"], score: 32 }, team2: { name: "八组", players: ["Shaw", "顶碗人", "澄梦Crystal"], score: 31 }, isOT: true, overtime: "2:3", winner: 2 }
        ]
      }
    ],
    finalResults: [
      { rank: "1st", name: "八组", players: ["Shaw", "顶碗人", "澄梦Crystal"], score: 2 },
      { rank: "2nd", name: "七组", players: ["Lese", "Gura", "Arisu"], score: 1 },
      { rank: "3rd", name: "四组", players: ["Hobaka", "75sp", "Akizawa"], score: 0 }
    ],
    comments: [
      "天虹赛评摘要：",
      "八组vs七组 42√：20 周五开始的第一场比赛。一开局Shaw就接连拿下各种老动画题，对作品和标签难以想象地熟悉，锁定目标迅速而精准，一口气拿下近20分的分差。在lese选手网络条件差的情况下，gura和arisu也拿下数题，在得分效率上甚至稍稍占据上风。但是随着赛程推进，越来越接近赛点，八组淮南皓月和澄梦Crystal在后续的游戏等题目中仍脱颖而出，最后胜利。",
      "二组vs四组 17：40√ 二组在一些冲突中以人数劣势的情况开始了比赛，但是两队的Seventen和hobaka在开局的系统题中针锋相对，分数胶着，最后坚持到了队伍集齐。但是在中期的动画和游戏题中，四组整体排标签逼近答案的效率看上去更高，而虎纹鲲选手更首次展现了其惊艳的实力，尤其开局瞬秒十分炸裂。而hobaka更是状态火热，在中后程猜测过程都十分优秀的情况下，也几乎全程包揽动画与游戏等题，但是双方十分不擅长厕纸，在一些新动画题中粘稠了一阵子之后结束了比赛。",
      "五组vs六组32：44√ 开局鲁迪乌斯便连续下分，但是在galgame上被安格断了节奏，之后在系统一众冷门动画题中双方都始终保持得分，而鲁迪总保持有更快的判断。在中期，地区、题材和形式丰富的题目中，得分可以说人人有份，新朋友也展示出十分的见识。比分十分接近。不过之后鲁迪连续得分带领队伍来到赛点，之后便因为场外原因无奈退出，加上御宅导师也退，只剩下新条茜1v3，但是下一题他便终结赛点！",
      "一组vs三组 42√：37 开局一题就都猜出作品展示了双方的实力，几个动画题几乎都在8步以内结束，甚至三组两次次截胡对方已经猜出作品得分，再得galgame分之后双方在中期战平，所有选手全部发挥加入互秒大战，一直在动画题上互有胜负，又同时折戟管人题，在赛马娘题玩设备选手用完全队次数仍不敌后被一组率先拿到赛点，不过之后连续猜中作品但choke使得最后比分十分接近，可惜没有迎来第一个加时，一组结束了比赛。",
      "六组vs二组（1v1） 15：15√ 国产剧情（两边都有人来不了，最后单挑）",
      "一组vs七组29：46√ 琪露诺老掉线，ryo妙手频出，概念神网好lese全刷了",
      "四组vs五组 48√：33 ams回归之战，五组劣势依旧好反应。现在我知道了，我出的题早就被hobaka都玩过了，现在就是难受"
    ]
  }
];