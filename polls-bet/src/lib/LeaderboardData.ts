// src/lib/LeaderboardData.ts

export interface LeaderboardUser {
    rank: number;
    address: string;
    name: string;
    avatar: string;
    score: number;
    winRate: number;
    totalWagered: number;
  }
  
  const baseLeaderboard: LeaderboardUser[] = [
    {
      rank: 1,
      address: "0x1234...5678",
      name: "CryptoWhale",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=whale",
      score: 2500,
      winRate: 75.5,
      totalWagered: 45.5
    },
    {
      rank: 2,
      address: "0x8765...4321",
      name: "ETHMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eth",
      score: 2350,
      winRate: 71.2,
      totalWagered: 38.2
    },
    {
      rank: 3,
      address: "0x9876...5432",
      name: "PredictionKing",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=king",
      score: 2200,
      winRate: 68.9,
      totalWagered: 32.7
    },
    {
      rank: 4,
      address: "0x3456...7890",
      name: "CryptoSage",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sage",
      score: 2100,
      winRate: 65.5,
      totalWagered: 28.4
    },
    {
      rank: 5,
      address: "0x2345...6789",
      name: "BlockWizard",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wizard",
      score: 1950,
      winRate: 63.2,
      totalWagered: 25.8
    }
  ];
  
  export const dailyLeaderboard = [...baseLeaderboard];
  
  export const weeklyLeaderboard = baseLeaderboard.map(user => ({
    ...user,
    score: user.score * 5,
    totalWagered: user.totalWagered * 3
  }));
  
  export const monthlyLeaderboard = baseLeaderboard.map(user => ({
    ...user,
    score: user.score * 15,
    totalWagered: user.totalWagered * 8
  }));