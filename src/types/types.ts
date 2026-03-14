export type Role = "admin" | "member";

export interface Jam {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
}

export type BetType = "over_under" | "spread" | "moneyline";

export type Bet = {
  id: string;
  description: string;
  status: "open" | "resolved";
  options: Record<string, { label: string; odds: number }>;
  resultOptionId: string | null;
};

export type UserJam = {
  jamId: string;
  name: string;
  role: string;
};
