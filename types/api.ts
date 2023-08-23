export interface MevRevenue {
  date: string;
  revenue: number;
}

export interface MevRevenueResponse {
  revenue: MevRevenue[];
}

export type RevenueChains = Record<ChainPath, number>;

export interface RevenueChainsResponse {
  revenue: RevenueChains;
}

export interface SkipStatsResponse {
  chains_running_skip: number;
  validators_running_skip: number;
  saved: number;
  number_of_wallets: number;
}

export interface MevValidatorInfo {
  Name: string;
  TotalMEVRevenue: number;
  TotalMEVShared: number;
}

export type MevValidatorInfoWithKeep = MevValidatorInfo & {
  TotalMEVKept: number;
  KeepPercentage: string;
};

export interface MevValidatorsResponse {
  validator_infos: MevValidatorInfo[];
}

export type TopMevValidatorInfo = MevValidatorInfo & {
  NumberOfChainsValidating: number;
};

export interface TopMevValidatorsResponse {
  validator_infos: TopMevValidatorInfo[];
}

export type ChainPath = "osmosis" | "juno" | "cosmoshub" | "atom" | "evmos" | (string & {});
