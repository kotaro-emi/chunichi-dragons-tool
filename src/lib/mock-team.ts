// Phase 1 デザインモック用の「チーム全体」ダミーデータ（観客動員数・二軍概況・今日の試合）。
// 実データの取得方法・情報源は開発計画書 3.6節・5章のとおりPhase 2以降で検討する。

export const attendanceOverview = {
  todayAttendance: 28450,
  todayCapacityPct: 0.86,
  seasonTotal: 1520340,
  seasonRank: 3, // セ・リーグ内の順位（ダミー）
};

export const farmOverview = {
  standingRank: 2,
  note: '二軍は接戦のペナントレースを展開中（ダミー）。若手の台頭が目立つ。',
  notablePlayerSlug: 'imai-ren',
};

export const todayGame = {
  opponent: '阪神タイガース',
  venue: 'バンテリンドームナゴヤ',
  result: '中日 5-3 阪神',
  summary:
    '中盤に一挙4得点で試合を決定づけた（ダミーの試合要約。実データはNPB公式サイトのスクレイピングを想定）。',
  mvp: {
    name: '阿部寿樹',
    note: '3安打2打点の活躍（ダミー）',
  },
};

export const inningScores = [
  { inning: 1, chunichi: 0, opponent: 0 },
  { inning: 2, chunichi: 0, opponent: 1 },
  { inning: 3, chunichi: 4, opponent: 0 },
  { inning: 4, chunichi: 0, opponent: 0 },
  { inning: 5, chunichi: 0, opponent: 2 },
  { inning: 6, chunichi: 1, opponent: 0 },
  { inning: 7, chunichi: 0, opponent: 0 },
  { inning: 8, chunichi: 0, opponent: 0 },
  { inning: 9, chunichi: 0, opponent: 0 },
];
