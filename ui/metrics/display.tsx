import type { StackProps } from "@chakra-ui/react";
import { Heading, Spacer, Stack } from "@chakra-ui/react";
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
      <Stack align="center" direction={{ base: "column", sm: "row" }} spacing={{ base: 2, sm: 4 }}>
        <Heading alignSelf={{ base: "center", sm: "inherit" }} as="h3" size="sm">
          {title}
        </Heading>
        <Spacer />
        {actions ? (
          <Stack
            align="center"
            direction="row"
            flexWrap="wrap"
            justify={{ base: "center", sm: "end" }}
            shouldWrapChildren
          >
            {actions}
          </Stack>
        ) : null}
      </Stack>
      {children}
    </Stack>
  );
};
