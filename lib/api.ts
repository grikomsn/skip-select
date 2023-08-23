import { API_ENDPOINT } from "@/constants/api";
import type * as t from "@/types/api";

/**
 * Helper functions for fetching typed data from the (mock) API.
 */
export const api = {
  skipEnabledMevRevenue: () => {
    const url = `${API_ENDPOINT}/skip_enabled_mev_revenue.json`;
    return get<t.MevRevenueResponse>(url);
  },
  skipEnabledRevenueChains: () => {
    const url = `${API_ENDPOINT}/skip_enabled_revenue_chains.json`;
    return get<t.RevenueChainsResponse>(url);
  },
  skipStats: () => {
    const url = `${API_ENDPOINT}/skip_stats.json`;
    return get<t.SkipStatsResponse>(url);
  },
  topMevValidators: () => {
    const url = `${API_ENDPOINT}/top_mev_validators.json`;
    return get<t.TopMevValidatorsResponse>(url);
  },
  chainValidators: (chain: t.ChainPath) => {
    const url = `${API_ENDPOINT}/${chain.toLowerCase()}/validators.json`;
    return get<t.MevValidatorsResponse>(url);
  },
};

/**
 * Helper function to invoke fetch and return JSON as given generic type.
 *
 * @example
 * ```ts
 * const data = await get<{ foo: string }>("https://example.com");
 * ```
 */
export const get = async <T = any>(url: string) => {
  const res = await fetch(url);
  return res.json() as T;
};
