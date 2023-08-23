import { Box, HStack } from "@chakra-ui/react";
import type { SelectProps } from "@saas-ui/react";
import { Select, SelectButton, SelectList } from "@saas-ui/react";

/**
 * General purpose select component for `MetricDisplay`.
 *
 * ```text
 *            ┌──────────┐
 *   Sort by  │ Option ▼ │
 *            └──────────┘
 * ```
 */
export const MetricSortSelect = (props: SelectProps) => {
  return (
    <HStack spacing={4}>
      <Box color="muted" fontSize="sm">
        Sort by
      </Box>
      <Select {...props}>
        <SelectButton />
        <SelectList />
      </Select>
    </HStack>
  );
};

export const timeIntervalOptions = ["Today", "Week", "Month", "Year", "Last Year", "All Time"];
