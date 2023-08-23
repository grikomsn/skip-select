/**
 * Displays summary information about MEV extraction on a handful of different
 * chains (e.g. revenue breakdown by chain, total number of validators running
 * Skip, etc...)
 *
 * @see https://www.figma.com/file/4eFNCvISChvK54WbRhMohH/Skip-Select
 */

import { Box, SimpleGrid, Stack } from "@chakra-ui/react";

import { useEnabledMevRevenue, useEnabledRevenueChains, useSkipStats, useTopMevValidators } from "@/hooks/api";
import { EnabledMEVRevenueCard } from "@/ui/cards/enabled-mev-revenue";
import { EnabledRevenueChainsCard } from "@/ui/cards/enabled-revenue-chains";
import { MetricDisplay } from "@/ui/metrics/display";
import { MetricSortSelect, timeIntervalOptions } from "@/ui/metrics/sort-select";
import { SkipStats } from "@/ui/skip-stats";
import { TopMevValidatorsTable } from "@/ui/tables/mev-validators";

const OverviewPage = () => {
  const { data: enabledMevRevenue } = useEnabledMevRevenue();
  const { data: enabledRevenueChains } = useEnabledRevenueChains();
  const { data: skipStats } = useSkipStats();
  const { data: topMevValidators } = useTopMevValidators();

  return (
    <Stack py={16} spacing={16}>
      <SimpleGrid columns={2} gap={4}>
        <MetricDisplay
          actions={<MetricSortSelect defaultValue="Week" name="sort-by" options={timeIntervalOptions} />}
          title="Skip Enabled MEV Revenue"
        >
          <EnabledMEVRevenueCard data={enabledMevRevenue} />
        </MetricDisplay>

        <MetricDisplay
          actions={<MetricSortSelect defaultValue="Today" name="sort-by" options={timeIntervalOptions} />}
          title="Skip Enabled Revenue - Chains"
        >
          <EnabledRevenueChainsCard data={enabledRevenueChains} />
        </MetricDisplay>
      </SimpleGrid>

      <MetricDisplay
        actions={<MetricSortSelect defaultValue="Last Year" name="sort-by" options={timeIntervalOptions} />}
        title="Skip Stats"
      >
        <SkipStats data={skipStats} />
      </MetricDisplay>

      <MetricDisplay
        actions={<MetricSortSelect defaultValue="All Time" name="sort-by" options={timeIntervalOptions} />}
        title="Top MEV Validators"
      >
        <Box overflowX="auto">
          <TopMevValidatorsTable data={topMevValidators} isSortable variant="custom" />
        </Box>
      </MetricDisplay>
    </Stack>
  );
};

export default OverviewPage;
