import { Box, Card, CardBody } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { useThemeProxy } from "@/hooks/theme";
import type { MevRevenue } from "@/types/api";

/**
 * Dynamic import of `@nivo/bar` due to client-side API usage.
 */
const Bar = dynamic(() => import("@nivo/bar").then((mod) => mod.ResponsiveBarCanvas), {
  ssr: false,
});

/**
 * Displays cumulative MEV revenue relative to other chains in a pie chart.
 *
 * @see {@link MevRevenue}
 * @see https://nivo.rocks/bar
 */
export const EnabledMEVRevenueCard = <TData extends MevRevenue>({ data = [] }: { data: Maybe<Prettify<TData>[]> }) => {
  const t = useThemeProxy();

  return (
    <Card>
      <CardBody p={8}>
        <Box h="full" minH="xs">
          <Bar
            colors={() => t("colors", "gray.500")}
            data={data}
            enableLabel={false}
            indexBy="date"
            keys={["revenue"]}
            theme={{
              grid: { line: { stroke: t("colors", "whiteAlpha.200") } },
              tooltip: { container: { color: t("colors", "blackAlpha.800") } },
            }}
          />
        </Box>
      </CardBody>
    </Card>
  );
};
