interface SteamAchievement {
  achievements: {
    name: string;
    displayName: string;
    description: string;
    icon: string;
    icongray: string;
  }[];
}

export type { SteamAchievement };
