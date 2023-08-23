/**
 * Default layout has two navbars:
 *
 * - {@link PrimaryNavbar}: home link, top level links, and cta buttons
 * - {@link SecondaryNavbar}: main nav links
 */

import type { ContainerProps } from "@chakra-ui/react";
import { Box, Button, ButtonGroup, Container, Spacer } from "@chakra-ui/react";
import { ChevronDownIcon, SearchInput } from "@saas-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { metadata } from "@/site.config";

///////////////////////////////////////////////////////////////////////////////

const primaryRoutes = [
  { href: "/", children: "Home", isDisabled: true },
  { href: "/", children: "Governance", isDisabled: true },
  { href: metadata.github.url, children: "GitHub" },
];

/**
 * Topmost navbar with the home link, top level links, and cta buttons.
 */
export const PrimaryNavbar = () => {
  return (
    <Box bgColor="blackAlpha.600">
      <Container {...baseProps} px={4} py={2}>
        <Button as={NextLink} href="/overview" size="lg" variant="link">
          {metadata.name}
        </Button>
        <Spacer />
        <ButtonGroup spacing={4} variant="link">
          {primaryRoutes.map((props, i) => (
            <Button key={i} as={NextLink} {...props} />
          ))}
        </ButtonGroup>
        <ButtonGroup>
          <Button colorScheme="whiteAlpha" rightIcon={<ChevronDownIcon />}>
            Sign Up
          </Button>
          <Button rightIcon={<ChevronDownIcon />} variant="subtle">
            Connect Wallet
          </Button>
        </ButtonGroup>
      </Container>
    </Box>
  );
};

///////////////////////////////////////////////////////////////////////////////

const secondaryRoutes = [
  { href: "/overview", children: "Overview" },
  { href: "/validators", children: "Validators" },
  { href: "/chains", children: "Chains", isDisabled: true },
];

/**
 * Second navbar with the main nav links.
 */
export const SecondaryNavbar = () => {
  const router = useRouter();
  return (
    <Box bgColor="blackAlpha.400">
      <Container {...baseProps} px={4}>
        <ButtonGroup py={4} spacing={4} variant="link">
          {secondaryRoutes.map((props, i) => (
            <Button
              key={i}
              as={NextLink}
              color={!router.asPath.startsWith(props.href) ? "muted" : undefined}
              {...props}
            />
          ))}
        </ButtonGroup>
        <Spacer />
        {router.pathname.startsWith("/validators") && (
          <Box>
            <SearchInput />
          </Box>
        )}
      </Container>
    </Box>
  );
};

/**
 * Shared navbar props to adjust item positioning.
 */
const baseProps: ContainerProps = {
  alignItems: "center",
  as: "nav",
  display: "flex",
  gap: 4,
  maxW: "container.2xl",
};
