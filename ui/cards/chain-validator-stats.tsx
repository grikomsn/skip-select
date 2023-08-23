import {} from "@chakra-ui/icons";
import type { CardProps } from "@chakra-ui/react";
import { Card, CardBody, Heading, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import capitalize from "lodash/capitalize";

import type { ChainPath } from "@/types/api";
import { formatBmk } from "@/utils/intl";

/**
 * **(PLACEHOLDER DATA)** Displays cumulative MEV stats across all validators for the chain ss all validators for the chain.
 */
export const ChainValidatorStatsCard = ({ name, ...props }: CardProps & { name: ChainPath }) => {
  return (
    <Card {...props}>
      <CardBody display="flex" flexDir="column" gap={4} p={8}>
        <Heading as="h3" mb={8} size="md">
          {capitalize(name)} Validator Stats
        </Heading>
        <Stat>
          <StatLabel>% Validators using Skip</StatLabel>
          <StatNumber>87%</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>MEV captured for delegates</StatLabel>
          <StatNumber>${formatBmk(1500000, 1)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total MEV captured</StatLabel>
          <StatNumber>${formatBmk(1200000, 1)}</StatNumber>
        </Stat>
      </CardBody>
    </Card>
  );
};
