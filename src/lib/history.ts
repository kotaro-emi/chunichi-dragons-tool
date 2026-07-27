import historyData from '../../data/history.json';

export type TimelineEntry = {
  period: string;
  heading: string;
  body: string;
};

export type TeamNameHistoryEntry = {
  years: string;
  name: string;
};

export type TeamInfo = {
  founded: number;
  anniversaryNote: string;
  homeStadium: string;
  farmStadium: string;
  operator: string;
  teamColor: string;
  mascot: string;
  leaguePennants: number;
  leaguePennantYears: number[];
  japanSeriesTitles: number;
  japanSeriesYears: number[];
};

export type HistoryData = {
  updatedAt: string;
  source: string;
  note: string;
  teamInfo: TeamInfo;
  teamNameHistory: TeamNameHistoryEntry[];
  timeline: TimelineEntry[];
};

export const history = historyData as HistoryData;
