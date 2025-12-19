export interface TournamentEntry {
  player: string;
  rank?: string; // e.g. "冠军", "亚军", "32强"
  score: number;
  specials?: string[]; // e.g. ["MVP", "EVP"]
}

export interface Tournament {
  name: string;
  entries: TournamentEntry[];
}

export const tournaments: Tournament[] = [
  {
    name: "第三届Major",
    entries: [
      { player: "Shaw", rank: "冠军", specials: ["MVP"], score: 140 },
      { player: "中华小当家", rank: "冠军", specials: ["EVP"], score: 120 },
      { player: "云霄", rank: "冠军", score: 110 },
      { player: "鲁迪乌斯", rank: "亚军", specials: ["EVP"], score: 100 },
      { player: "切尔茜", rank: "亚军", score: 90 },
      { player: "Ryo", rank: "亚军", score: 90 },
      { player: "V.", rank: "季军", specials: ["EVP"], score: 80 },
      { player: "SevenTen", rank: "季军", score: 70 },
      { player: "安格", rank: "季军", score: 70 },
      { player: "Shin'on", rank: "殿军", specials: ["EVP"], score: 60 },
      { player: "gura", rank: "殿军", score: 50 },
      { player: "新条茜", rank: "殿军", score: 50 },
      { player: "lese", specials: ["EVP"], score: 10 }
    ]
  },
  {
    name: "第一届LBC",
    entries: [
      { player: "琪露诺", rank: "冠军", score: 90 },
      { player: "鲁迪乌斯", rank: "亚军", score: 70 },
      { player: "V.", rank: "季军", score: 50 },
      { player: "lese", rank: "殿军", score: 40 },
      { player: "Shaw", rank: "第五", score: 10 },
      { player: "切尔茜", rank: "第六", score: 10 },
      { player: "安格", rank: "第七", score: 5 },
      { player: "75sp", rank: "第八", score: 5 }
    ]
  },
  {
    name: "第二届Major",
    entries: [
      { player: "Shin'on", rank: "冠军", score: 80 },
      { player: "hobaka", rank: "亚军", score: 60 },
      { player: "琪露诺", rank: "季军", score: 40 },
      { player: "V.", rank: "殿军", score: 30 },
      { player: "shiki", rank: "第五", score: 10 },
      { player: "Shaw", rank: "第六", score: 10 },
      { player: "sh1ro", rank: "第六", score: 10 }
    ]
  },
  {
    name: "第一届天虹杯",
    entries: [
      { player: "Shaw", rank: "冠军", specials: ["MVP"], score: 85 },
      { player: "顶碗人", rank: "冠军", specials: ["EVP"], score: 80 },
      { player: "澄梦Crystal", rank: "冠军", score: 75 },
      { player: "lese", rank: "亚军", specials: ["EVP"], score: 65 },
      { player: "gura", rank: "亚军", score: 60 },
      { player: "arisu", rank: "亚军", score: 60 },
      { player: "hobaka", rank: "季军", specials: ["EVP"], score: 45 },
      { player: "75sp", rank: "季军", score: 40 },
      { player: "Akizawa", rank: "季军", score: 40 }
    ]
  },
  {
    name: "第一届新人杯",
    entries: [
      { player: "JDG", rank: "冠军", score: 70 },
      { player: "姜姜大当家", rank: "亚军", score: 55 },
      { player: "ams", rank: "季军", score: 40 },
      { player: "吴织亚切", rank: "殿军", score: 30 },
      { player: "你去祭典了吧", rank: "第五", score: 10 },
      { player: "玩设备", rank: "第六", score: 10 },
      { player: "顶碗人", rank: "第八", score: 5 }
    ]
  },
  {
    name: "第一届MSI",
    entries: [
      { player: "V.", rank: "冠军", score: 40 },
      { player: "Shin'on", rank: "亚军", score: 20 },
      { player: "hobaka", rank: "季军", score: 10 },
      { player: "中华小当家", rank: "殿军", score: 5 }
    ]
  },
  {
    name: "第一届Major",
    entries: [
      { player: "SevenTen", rank: "冠军", score: 40 },
      { player: "阿赵", rank: "亚军", score: 20 },
      { player: "中华小当家", rank: "季军", score: 10 },
      { player: "xWWWX", rank: "季军", score: 10 }
    ]
  }
];

export const scoringRules = [
  {
    event: "第三届Major",
    rules: "冠军110分，亚军90分，季军70分，殿军50分，MVP30分，EVP10分"
  },
  {
    event: "第一届LBC",
    rules: "冠军90分，亚军70分，季军50分，殿军40分，第五10分，第六10分，第七5分，第八5分"
  },
  {
    event: "第二届Major",
    rules: "冠军80分，亚军60分，季军40分，殿军30分，第五10分，第六10分，第七5分，第八5分"
  },
  {
    event: "第一届天虹杯",
    rules: "冠军75分，亚军60分，季军40分，MVP10分，EVP5分"
  },
  {
    event: "第一届新人杯",
    rules: "冠军70分，亚军55分，季军40分，殿军30分，第五10分，第六10分，第七5分，第八5分"
  },
  {
    event: "第一届MSI",
    rules: "冠军40分，亚军20分，季军10分，殿军5分"
  },
  {
    event: "第一届Major",
    rules: "冠军40分，亚军20分，季军10分，殿军5分"
  }
];
