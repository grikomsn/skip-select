import type { StackProps } from "@chakra-ui/react";
import { Heading, HStack, Spacer, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface MetricDisplayProps extends StackProps {
  actions?: ReactNode;
}

/**
 * Frame component to show grouped title and action elements above component children.
 *
 * ```
 * ┌──────────────────────────────────┐
 * │                      ┌─────────┐ │
 * │  title               │ actions │ │
 * │                      └─────────┘ │
 * │ ┌──────────────────────────────┐ │
 * │ │           children           │ │
 * │ └──────────────────────────────┘ │
 * └──────────────────────────────────┘
 * ```
 */
export const MetricDisplay = ({ title, actions, children, ...props }: MetricDisplayProps) => {
  return (
    <Stack spacing={4} {...props}>
      <HStack spacing={4}>
        <Heading as="h3" size="sm">
          {title}
        </Heading>
        <Spacer />
        {actions}
      </HStack>
      {children}
    </Stack>
  );
};
