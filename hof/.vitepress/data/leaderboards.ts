// 结构化排行榜数据

export interface PlayerHonor {
  event: string;
  rank: string; // '1st', '2nd', '3rd', '4th', etc.
  specials: ('MVP' | 'EVP')[]; // 特殊荣誉
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  honors: PlayerHonor[];
}

export interface TournamentStage {
  name: string; // '小组赛', '瑞士轮', '淘汰赛', '决赛'等
  matches?: {
    date: string;
    team1: { name: string; score: number };
    team2: { name: string; score: number };
    isOT?: boolean; // 是否加时
  }[];
  standings?: {
    rank: string;
    player: string;
    score: number;
    record?: string; // 如 "3-0", "3-1" 等
  }[];
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  type: 'Solo' | 'Team'; // 个人赛或团队赛
  stages: TournamentStage[];
  finalResults: {
    rank: string;
    player: string;
    score: number;
  }[];
}

export interface YearSummary {
  year: number;
  title: string;
  players: LeaderboardPlayer[];
}

// 头像映射
export const avatarMap: Record<string, string> = {
  "淮南皓月": "1160923758 淮南皓月.jpg",
  "ams": "1219205983 ams.jpg",
  "爱梅斯": "1219205983 ams.jpg",
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

export const getAvatar = (name: string) => {
  return avatarMap[name] ? `/avatar/${avatarMap[name]}` : '/avatar/default.jpg';
};

// 2025年度总结TOP20
export const finalTop20: YearSummary = {
  year: 2025,
  title: "Conjecture Character Best Player of 2025",
  players: [
    {
      rank: 1,
      name: "Shaw",
      score: 245,
      avatar: getAvatar("Shaw"),
      honors: [
        { event: "第三届Major", rank: "1st 🥇", specials: ["MVP"] },
        { event: "第一届天虹杯", rank: "1st 🥇", specials: ["MVP"] },
        { event: "第二届Major", rank: "6th", specials: [] },
        { event: "第一届LBC", rank: "5th", specials: [] }
      ]
    },
    {
      rank: 2,
      name: "V.",
      score: 200,
      avatar: getAvatar("V."),
      honors: [
        { event: "第一届MSI", rank: "1st 🥇", specials: [] },
        { event: "第三届Major", rank: "3rd 🥉", specials: ["EVP"] },
        { event: "第一届LBC", rank: "3rd 🥉", specials: [] },
        { event: "第二届Major", rank: "4th", specials: [] }
      ]
    },
    {
      rank: 3,
      name: "鲁迪乌斯",
      score: 170,
      avatar: getAvatar("鲁迪乌斯"),
      honors: [
        { event: "第三届Major", rank: "2nd 🥈", specials: ["EVP"] },
        { event: "第一届LBC", rank: "2nd 🥈", specials: [] }
      ]
    },
    {
      rank: 4,
      name: "Shin'on",
      score: 160,
      avatar: getAvatar("Shin'on"),
      honors: [
        { event: "第二届Major", rank: "1st 🥇", specials: [] },
        { event: "第三届Major", rank: "4th", specials: ["EVP"] },
        { event: "第一届MSI", rank: "2nd 🥈", specials: [] }
      ]
    },
    {
      rank: 5,
      name: "中华小当家",
      score: 135,
      avatar: getAvatar("中华小当家"),
      honors: [
        { event: "第三届Major", rank: "1st 🥇", specials: ["EVP"] },
        { event: "第一届Major", rank: "3rd 🥉", specials: [] },
        { event: "第一届MSI", rank: "4th", specials: [] }
      ]
    },
    {
      rank: 6,
      name: "琪露诺",
      score: 130,
      avatar: getAvatar("琪露诺"),
      honors: [
        { event: "第一届LBC", rank: "1st 🥇", specials: [] },
        { event: "第二届Major", rank: "3rd 🥉", specials: [] }
      ]
    },
    {
      rank: 7,
      name: "lese",
      score: 115,
      avatar: getAvatar("lese"),
      honors: [
        { event: "第一届天虹杯", rank: "2nd 🥈", specials: ["EVP"] },
        { event: "第一届LBC", rank: "4th", specials: [] },
        { event: "第三届Major", rank: "", specials: ["EVP"] }
      ]
    },
    {
      rank: 8,
      name: "hobaka",
      score: 115,
      avatar: getAvatar("hobaka"),
      honors: [
        { event: "第二届Major", rank: "2nd 🥈", specials: [] },
        { event: "第一届天虹杯", rank: "3rd 🥉", specials: ["EVP"] },
        { event: "第一届MSI", rank: "3rd 🥉", specials: [] }
      ]
    },
    {
      rank: 9,
      name: "SevenTen",
      score: 110,
      avatar: getAvatar("SevenTen"),
      honors: [
        { event: "第一届Major", rank: "1st 🥇", specials: [] },
        { event: "第三届Major", rank: "3rd 🥉", specials: [] }
      ]
    },
    {
      rank: 10,
      name: "gura",
      score: 110,
      avatar: getAvatar("gura"),
      honors: [
        { event: "第一届天虹杯", rank: "2nd 🥈", specials: [] },
        { event: "第三届Major", rank: "4th", specials: [] }
      ]
    },
    {
      rank: 11,
      name: "云霄",
      score: 110,
      avatar: getAvatar("云霄"),
      honors: [
        { event: "第三届Major", rank: "1st 🥇", specials: [] }
      ]
    },
    {
      rank: 12,
      name: "切尔茜",
      score: 100,
      avatar: getAvatar("切尔茜"),
      honors: [
        { event: "第三届Major", rank: "2nd 🥈", specials: [] },
        { event: "第一届LBC", rank: "6th", specials: [] }
      ]
    },
    {
      rank: 13,
      name: "Ryo",
      score: 90,
      avatar: getAvatar("Ryo"),
      honors: [
        { event: "第三届Major", rank: "2nd 🥈", specials: [] }
      ]
    },
    {
      rank: 14,
      name: "顶碗人",
      score: 85,
      avatar: getAvatar("顶碗人"),
      honors: [
        { event: "第一届天虹杯", rank: "1st 🥇", specials: ["EVP"] },
        { event: "第一届新人杯", rank: "8th", specials: [] }
      ]
    },
    {
      rank: 15,
      name: "安格",
      score: 75,
      avatar: getAvatar("安格"),
      honors: [
        { event: "第三届Major", rank: "3rd 🥉", specials: [] },
        { event: "第一届LBC", rank: "7th", specials: [] }
      ]
    },
    {
      rank: 16,
      name: "澄梦Crystal",
      score: 75,
      avatar: getAvatar("澄梦Crystal"),
      honors: [
        { event: "第一届天虹杯", rank: "1st 🥇", specials: [] }
      ]
    },
    {
      rank: 17,
      name: "JDG",
      score: 70,
      avatar: getAvatar("JDG"),
      honors: [
        { event: "第一届新人杯", rank: "1st 🥇", specials: [] }
      ]
    },
    {
      rank: 18,
      name: "arisu",
      score: 60,
      avatar: getAvatar("arisu"),
      honors: [
        { event: "第一届天虹杯", rank: "2nd 🥈", specials: [] }
      ]
    },
    {
      rank: 19,
      name: "姜姜大当家",
      score: 55,
      avatar: getAvatar("姜姜大当家"),
      honors: [
        { event: "第一届新人杯", rank: "2nd 🥈", specials: [] }
      ]
    },
    {
      rank: 20,
      name: "ams",
      score: 40,
      avatar: getAvatar("ams"),
      honors: [
        { event: "第一届新人杯", rank: "3rd 🥉", specials: [] }
      ]
    }
  ]
};
