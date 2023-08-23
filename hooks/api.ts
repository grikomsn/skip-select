import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { ChainPath } from "@/types/api";
import { raise } from "@/utils/assert";

///////////////////////////////////////////////////////////////////////////////

export const useEnabledMevRevenue = () => {
  const queryKey = ["skipEnabledMevRevenue"] as const;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { revenue } = await api.skipEnabledMevRevenue();
      // return revenue.map((r) => {
      //   const [month = "", year = ""] = r.date.split(" ");
      //   return { ...r, month, year };
      // });
      return revenue;
    },
  });
};

///////////////////////////////////////////////////////////////////////////////

export const useEnabledRevenueChains = () => {
  const queryKey = ["skipEnabledRevenueChains"] as const;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { revenue } = await api.skipEnabledRevenueChains();
      // return Object.entries(revenue).map(([id, value], index) => ({
      //   index: index + 1,
      //   id,
      //   label: capitalize(id),
      //   value,
      //   color: t("colors", `gray.${index + 2}00`),
      // }));
      return revenue;
    },
  });
};

///////////////////////////////////////////////////////////////////////////////

export const useSkipStats = () => {
  const queryKey = ["skipStats"] as const;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const stats = await api.skipStats();
      return stats;
    },
  });
};

///////////////////////////////////////////////////////////////////////////////

export const useTopMevValidators = () => {
  const queryKey = ["topMevValidators"] as const;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.topMevValidators();
      return response.validator_infos;
    },
  });
};

///////////////////////////////////////////////////////////////////////////////

export const useChainValidators = (name: Maybe<ChainPath>) => {
  const queryKey = ["chainValidators", name];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.chainValidators(name ?? raise("name is undefined"));
      return response.validator_infos;
    },
    enabled: Boolean(name),
    retry: false,
  });
};
