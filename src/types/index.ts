export interface CharacterStock {
    id: string;
    name: string;
    tokenPrice: number;
    dailyChange: number;
    marketCap: number;
    volume: number;
  }

export interface UserProfile {
    username: string;
    netWorth: number;
    cash: number;
    profitLoss: number;
    profilePictureUrl: string;
  }
  
