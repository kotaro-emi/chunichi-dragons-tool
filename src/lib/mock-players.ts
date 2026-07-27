// Phase 1 デザインモック用のダミーデータ。
// 阿部寿樹の打撃成績のみ既存の中日打者成績.htmlの実データを流用し、
// それ以外（経歴・特徴・投手成績・年度別成績・二軍情報など）は見た目確認用のダミー値。
// 実データは開発計画書 4章の players.json 設計に沿って Phase 2 で反映する。
// 二軍選手「今井蓮」は実在選手ではなく、二軍データ表示の確認用に作った架空の選手。

export type BatterStats = {
  avg: number;
  hr: number;
  rbi: number;
  h: number;
  sb: number;
};

export type FieldingStats = {
  position: string;
  games: number;
  putouts: number;
  assists: number;
  errors: number;
  fieldingPct: number;
};

export type PitchingStats = {
  era: number;
  wins: number;
  losses: number;
  saves: number;
  strikeouts: number;
  inningsPitched: number;
  maxVelocityKmh: number;
  pitchTypes: string[];
};

// 年度別（過去の成績）は打者・投手で見せたい項目が違うため、使う項目だけを埋める
export type SeasonRecord = {
  year: number;
  team: string;
  // 打者用
  avg?: number;
  hr?: number;
  rbi?: number;
  // 投手用
  era?: number;
  wins?: number;
  losses?: number;
};

export type MockPlayer = {
  slug: string;
  name: string;
  role: 'batter' | 'pitcher';
  level: '一軍' | '二軍';
  profile: { born: string; draftYear: number; bio: string };
  features: string;
  cheerSong: { lyricsExcerpt: string[]; callLine: string };
  battingStats?: BatterStats;
  fieldingStats?: FieldingStats;
  pitchingStats?: PitchingStats;
  careerStats: SeasonRecord[];
};

export const mockPlayers: MockPlayer[] = [
  {
    slug: 'abe-juki',
    name: '阿部寿樹',
    role: 'batter',
    level: '一軍',
    profile: {
      born: '新潟県',
      draftYear: 2013,
      bio: '内野の複数ポジションをこなす右打者。勝負強い打撃でチームを支える。',
    },
    features: '勝負強い右の中軸打者。粘り強い打席内容が持ち味。',
    cheerSong: {
      lyricsExcerpt: ['鍛えた技で 魅せろ力の限り', '新たな時代へと 今スタート'],
      callLine: 'かっとばせー！ あべ！',
    },
    battingStats: { avg: 0.278, hr: 3, rbi: 19, h: 25, sb: 0 },
    fieldingStats: {
      position: '内野手',
      games: 52,
      putouts: 68,
      assists: 91,
      errors: 3,
      fieldingPct: 0.982,
    },
    careerStats: [
      { year: 2023, team: '中日', avg: 0.263, hr: 8, rbi: 45 },
      { year: 2024, team: '中日', avg: 0.271, hr: 6, rbi: 38 },
      { year: 2025, team: '中日', avg: 0.278, hr: 3, rbi: 19 },
    ],
  },
  {
    slug: 'ono-yudai',
    name: '大野雄大',
    role: 'pitcher',
    level: '一軍',
    profile: {
      born: '愛知県',
      draftYear: 2011,
      bio: 'チームを支える左腕の先発投手。（成績はダミー値／実データはPhase 2で反映）',
    },
    features: '安定感のある左腕エース。制球力に定評。',
    cheerSong: {
      lyricsExcerpt: ['左腕の系譜 受け継ぎ挑む', 'この仲間とともに 夢の舞台へ'],
      callLine: 'かっとばせー！ おおの！',
    },
    pitchingStats: {
      era: 2.85,
      wins: 8,
      losses: 6,
      saves: 0,
      strikeouts: 120,
      inningsPitched: 145.1,
      maxVelocityKmh: 152,
      pitchTypes: ['ストレート', 'カットボール', 'カーブ', 'フォーク', 'スライダー'],
    },
    careerStats: [
      { year: 2023, team: '中日', era: 3.21, wins: 9, losses: 8 },
      { year: 2024, team: '中日', era: 2.98, wins: 10, losses: 7 },
      { year: 2025, team: '中日', era: 2.85, wins: 8, losses: 6 },
    ],
  },
  {
    slug: 'imai-ren',
    name: '今井蓮（仮・架空選手）',
    role: 'batter',
    level: '二軍',
    profile: {
      born: '架空データ',
      draftYear: 2024,
      bio: '二軍データの表示確認用に作成した架空の選手。実際の二軍選手データはPhase 2で反映する。',
    },
    features: '俊足が武器の若手内野手（ダミー）。',
    cheerSong: {
      lyricsExcerpt: ['（二軍選手は応援歌が無い場合もある想定のダミー）'],
      callLine: 'かっとばせー！ いまい！',
    },
    battingStats: { avg: 0.245, hr: 2, rbi: 10, h: 18, sb: 6 },
    fieldingStats: {
      position: '内野手',
      games: 30,
      putouts: 40,
      assists: 55,
      errors: 4,
      fieldingPct: 0.96,
    },
    careerStats: [{ year: 2025, team: '中日（二軍）', avg: 0.245, hr: 2, rbi: 10 }],
  },
];
