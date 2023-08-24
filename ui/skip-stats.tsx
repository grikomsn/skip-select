import { Card, CardBody, SimpleGrid } from "@chakra-ui/react";
import { LoadingOverlay, LoadingSpinner, LoadingText } from "@saas-ui/react";

import type { SkipStatsResponse } from "@/types/api";
import { formatBmk } from "@/utils/intl";

/**
 * Stats component showing {@link SkipStatsResponse} per card component with formatted values.
 */
export const SkipStats = ({ data }: { data: Maybe<SkipStatsResponse> }) => {
  if (!data) {
    return (
      <LoadingOverlay h={32}>
        <LoadingSpinner />
        <LoadingText>Loading stats...</LoadingText>
      </LoadingOverlay>
    );
  }

  const stats = [
    <>
      <strong>{data.chains_running_skip}</strong> chains running Skip
    </>,
    <>
      <strong>{data.validators_running_skip}</strong> validators running Skip
    </>,
    <>
      <strong>${formatBmk(data.saved, 1)}</strong> saved
    </>,
    <>
      <strong>{formatBmk(data.number_of_wallets, 0)}</strong> wallets
    </>,
  ];

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
      {stats.map((stat, i) => (
        <Card key={i} variant="outline">
          <CardBody>{stat}</CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};
