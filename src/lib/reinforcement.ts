import reinforcementData from '../../data/reinforcement.json';

export type ReinforcementPoint = {
  category: string;
  title: string;
  body: string;
};

export type ReinforcementEntry = {
  id: string;
  generatedAt: string;
  basedOn: string;
  summary: string;
  points: ReinforcementPoint[];
};

export type ReinforcementData = {
  updatedAt: string;
  disclaimer: string;
  entries: ReinforcementEntry[];
};

const data = reinforcementData as ReinforcementData;

export const reinforcementDisclaimer: string = data.disclaimer;

export function getReinforcementEntries(): ReinforcementEntry[] {
  return data.entries.slice().sort((a, b) => (a.generatedAt < b.generatedAt ? 1 : -1));
}
