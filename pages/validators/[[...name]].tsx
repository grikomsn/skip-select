/**
 * Displays information about each validators MEV revenue for a particular
 * chain, includes a button to select which chain you’d like to view
 * (e.g. Osmosis, JUNO, etc...)
 *
 * @see https://www.figma.com/file/4eFNCvISChvK54WbRhMohH/Skip-Select
 */

import { InfoIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CardBody, Container, Stack } from "@chakra-ui/react";
import { EmptyState, LoadingOverlay, LoadingSpinner, LoadingText } from "@saas-ui/react";
import capitalize from "lodash/capitalize";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useChainValidators } from "@/hooks/api";
import type { ChainPath } from "@/types/api";
import { ChainValidatorStatsCard } from "@/ui/cards/chain-validator-stats";
import { MetricDisplay } from "@/ui/metrics/display";
import { MetricSearchInput } from "@/ui/metrics/search-input";
import { useModals } from "@/ui/modals";
import { MevValidatorsTable } from "@/ui/tables/mev-validators";
import tunnel from "@/ui/tunnel";
import { WrapMatchSorter } from "@/ui/wrap-match-sorter";

const t = tunnel();

const routes = [
  { href: "/validators/osmosis", children: "Osmosis" },
  { href: "/validators/juno", children: "Juno" },
  { href: "/validators/cosmoshub", children: "Cosmoshub" },
  { href: "/validators/evmos", children: "Evmos" },
];

const ValidatorsPage = () => {
  const modals = useModals();
  const router = useRouter();

  const name = useMemo(() => {
    if (!Array.isArray(router.query.name)) return;
    return router.query.name[0] as Maybe<ChainPath>;
  }, [router.query]);

  const { data: chainValidators = [], isLoading, isError } = useChainValidators(name);

  useEffect(() => {
    if (router.asPath === "/validators") {
      void router.replace("/validators/osmosis");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const shouldShowLoading = !name || isLoading;
  const shouldShowError = isError;
  const shoudShowContent = name && !isLoading && !isError;

  return (
    <>
      <Container
        alignItems="center"
        as="nav"
        display="flex"
        flexDir={{ base: "column", sm: "row" }}
        gap={4}
        maxW="container.2xl"
        mb={16}
        p={0}
        py={4}
      >
        <ButtonGroup spacing={4} variant="link">
          {routes.map((props, i) => (
            <Button key={i} as={NextLink} color={router.asPath !== props.href ? "muted" : undefined} {...props} />
          ))}
        </ButtonGroup>
      </Container>

      <Box flexGrow={1} pb={16} pos="relative">
        {shouldShowLoading ? (
          <LoadingOverlay variant="overlay">
            <LoadingSpinner />
            <LoadingText>Loading validators...</LoadingText>
          </LoadingOverlay>
        ) : null}

        {shouldShowError ? (
          <EmptyState
            description="No validators were found for the selected chain."
            icon={NotAllowedIcon}
            py={16}
            title="No Validators Found"
          />
        ) : null}

        {shoudShowContent ? (
          <>
            <t.In>
              <ChainValidatorStatsCard h="full" name={name} />
            </t.In>
            <Stack align="stretch" direction={{ base: "column", lg: "row" }} spacing={4}>
              <WrapMatchSorter data={chainValidators} options={{ keys: ["Name"] }}>
                {({ filtered, query, setQuery }) => (
                  <MetricDisplay
                    actions={[
                      <Button
                        key="stats"
                        display={{ base: "flex", lg: "none" }}
                        leftIcon={<InfoIcon />}
                        onClick={() => modals.drawer({ title: <></>, body: <t.Out /> })}
                      >
                        Open Stats
                      </Button>,
                      <MetricSearchInput
                        key="search"
                        onChange={(e) => setQuery(e.target.value)}
                        onReset={() => setQuery("")}
                        placeholder="Filter validators"
                        value={query}
                      />,
                    ]}
                    flexGrow={1}
                    overflowX="auto"
                    title={`Top MEV Validators on ${capitalize(name)}`}
                  >
                    <Card>
                      <CardBody overflowX="auto">
                        <MevValidatorsTable data={filtered} isSortable size={{ base: "sm", sm: "md" }} />
                      </CardBody>
                    </Card>
                  </MetricDisplay>
                )}
              </WrapMatchSorter>
              <Box display={{ base: "none", lg: "block" }} maxW="xs" minW="xs">
                <t.Out />
              </Box>
            </Stack>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default ValidatorsPage;
