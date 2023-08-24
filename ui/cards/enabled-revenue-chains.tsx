import { Box, Card, CardBody, Center, HStack, SimpleGrid } from "@chakra-ui/react";
import { DataTable, PersonaAvatar } from "@saas-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import capitalize from "lodash/capitalize";
import dynamic from "next/dynamic";

import { useThemeProxy } from "@/hooks/theme";
import type { RevenueChains } from "@/types/api";
import { formatUsd } from "@/utils/intl";

/**
 * Dynamic import of `@nivo/pie` due to client-side API usage.
 */
const Pie = dynamic(() => import("@nivo/pie").then((mod) => mod.ResponsivePie), {
  ssr: false,
});

/**
 * Displays cumulative MEV revenue in a line/bar chart.
 *
 * @see {@link RevenueChains}
 * @see https://nivo.rocks/pie
 */
export const EnabledRevenueChainsCard = ({ data }: { data: Maybe<RevenueChains> }) => {
  const t = useThemeProxy();

  /**
   * Transform data to pass on `@nivo/pie`.
   */
  const transformed = Object.entries(data ?? {}).map(([id, value], index) => ({
    id,
    label: capitalize(id),
    value,
    color: t("colors", `gray.${index + 2}00`),
  }));

  const h = createColumnHelper<(typeof transformed)[number]>();

  const columns = [
    h.display({
      header: "#",
      cell: ({ row }) => row.index + 1,
      size: 8,
    }),
    h.accessor("label", {
      header: "Chain",
      cell: ({ getValue, row }) => {
        const value = getValue();
        return (
          <HStack>
            <PersonaAvatar name={value} size="xs" src={`/api/chain-logo/${value}`} /> <span>{value}</span>
            <Box bgColor={row.original.color} boxSize={3} rounded="full" />
          </HStack>
        );
      },
    }),
    h.accessor("value", {
      header: "Revenue",
      cell: ({ getValue }) => {
        const value = getValue();
        return <Box color="green.500">{formatUsd(value)}</Box>;
      },
    }),
  ];

  return (
    <Card>
      <CardBody p={8}>
        <SimpleGrid columns={{ base: 1, md: 2 }} h="full" minH="xs">
          <Pie
            colors={{ datum: "data.color" }}
            data={transformed}
            enableArcLabels={false}
            enableArcLinkLabels={false}
            tooltip={({ datum }) => (
              <HStack bgColor="white" boxShadow="sm" color="black" p={1.5} rounded="sm">
                <PersonaAvatar
                  name={datum.label.toString()}
                  size="xs"
                  src={`/api/chain-logo/${datum.label.toString()}`}
                />
                <strong>{datum.label}</strong>
                <Box color="green.500">{formatUsd(datum.value)}</Box>
              </HStack>
            )}
          />
          <Center overflowX="auto">
            <DataTable columns={columns} data={transformed} isSortable size="sm" />
          </Center>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};
