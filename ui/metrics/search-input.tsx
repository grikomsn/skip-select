import type { BoxProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import type { SearchInputProps } from "@saas-ui/react";
import { SearchInput } from "@saas-ui/react";

/**
 * Same as regular {@link SearchInput} but wrapped with {@link Box} component
 * to prevent input stretching full width of the parent.
 */
export const MetricSearchInput = ({ _outer, ...props }: SearchInputProps & { _outer?: BoxProps }) => {
  return (
    <Box {..._outer}>
      <SearchInput {...props} />
    </Box>
  );
};
