import playersData from '../../data/players.json';

export type FieldingLine = {
  position: string;
  g: number;
  po: number;
  a: number;
  e: number;
  dp: number;
  fpct: string;
  passedBalls?: number;
  caughtStealingPct?: string;
};

export type BattingStats = {
  g: number;
  pa: number;
  ab: number;
  r: number;
  h: number;
  double: number;
  triple: number;
  hr: number;
  tb: number;
  rbi: number;
  sb: number;
  bb: number;
  hbp: number;
  so: number;
  gdp: number;
  avg: number;
  slg: number;
  obp: number;
};

export type PitchingStats = {
  g: number;
  w: number;
  l: number;
  sv: number;
  hld: number;
  hp: number;
  cg: number;
  sho: number;
  nobb: number;
  winPct: string;
  tbf: number;
  ip: string;
  h: number;
  hr: number;
  bb: number;
  ibb: number;
  hbp: number;
  so: number;
  wp: number;
  bk: number;
  r: number;
  er: number;
  era: string;
};

export type CheerSongVariant = { label: string | null; lines: string[] };

export type CheerSong = {
  position: string;
  displayName: string | null;
  foreign: boolean;
  variants: CheerSongVariant[];
  callLine: string;
};

export type Player = {
  slug: string;
  name: string;
  role: 'batter' | 'pitcher';
  level: '一軍' | '二軍';
  throws?: '左' | '右';
  battingStats?: BattingStats;
  pitchingStats?: PitchingStats;
  fieldingStats: FieldingLine[];
  cheerSong: CheerSong | null;
};

export type PlayersData = {
  updatedAt: string;
  source: string[];
  note: string;
  players: Player[];
};

const data = playersData as PlayersData;

export const players: Player[] = data.players;
export const playersUpdatedAt: string = data.updatedAt;

export function fmt3(x: number): string {
  return x.toFixed(3).replace(/^0\./, '.').replace(/^-0\./, '-.');
}

export function getBatters(): Player[] {
  return players
    .filter((p) => p.role === 'batter')
    .slice()
    .sort((a, b) => (b.battingStats?.pa ?? 0) - (a.battingStats?.pa ?? 0));
}

export function getPitchers(): Player[] {
  return players
    .filter((p) => p.role === 'pitcher')
    .slice()
    .sort((a, b) => (b.pitchingStats?.tbf ?? 0) - (a.pitchingStats?.tbf ?? 0));
}

export function ops(stats: BattingStats): number {
  return stats.slg + stats.obp;
}

export function findPlayer(slug: string): Player | undefined {
  return players.find((p) => p.slug === slug);
}
