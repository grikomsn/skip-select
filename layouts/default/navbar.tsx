/**
 * Default layout has two navbars:
 *
 * - {@link PrimaryNavbar}: home link, top level links, and cta buttons
 * - {@link SecondaryNavbar}: main nav links
 */

import { HamburgerIcon } from "@chakra-ui/icons";
import type { ContainerProps } from "@chakra-ui/react";
import { Box, Button, ButtonGroup, Container, Show, Spacer, Stack } from "@chakra-ui/react";
import { ChevronDownIcon, SearchInput } from "@saas-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { metadata } from "@/site.config";
import { useModals } from "@/ui/modals";

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
  const modals = useModals();

  const handleMobileDrawer = () => {
    modals.drawer({
      title: <></>,
      body: (
        <Stack spacing={4}>
          <ButtonGroup flexDirection="column" gap={2} justifyContent="center" size="lg" spacing={0}>
            <Button colorScheme="whiteAlpha" rightIcon={<ChevronDownIcon />}>
              Sign Up
            </Button>
            <Button rightIcon={<ChevronDownIcon />} variant="subtle">
              Connect Wallet
            </Button>
          </ButtonGroup>
          <ButtonGroup flexDirection="column" gap={2} size="lg" spacing={0} variant="ghost">
            {primaryRoutes.map((props, i) => (
              <Button key={i} as={NextLink} {...props} />
            ))}
          </ButtonGroup>
        </Stack>
      ),
    });
  };

  return (
    <Box bgColor="blackAlpha.600">
      <Container {...baseProps} px={4} py={2}>
        <Button as={NextLink} href="/overview" py={2} size="lg" variant="link">
          {metadata.name}
        </Button>

        <Spacer />

        <Show above="md">
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
        </Show>

        <Show below="md">
          <Button leftIcon={<HamburgerIcon />} onClick={handleMobileDrawer}>
            Open Menu
          </Button>
        </Show>
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
      <Container {...baseProps} flexDir={{ base: "column", sm: "row" }} px={4} py={{ base: 4, sm: 2 }}>
        <ButtonGroup py={2} spacing={4} variant="link">
          {secondaryRoutes.map((props, i) => (
            <Button
              key={i}
              as={NextLink}
              color={!router.asPath.startsWith(props.href) ? "muted" : undefined}
              {...props}
            />
          ))}
        </ButtonGroup>
        <Spacer display={{ base: "none", sm: "flex" }} />
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
