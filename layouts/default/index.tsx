/**
 * This is the default layout which contains permanent navbars and the container
 * which wraps the page content.
 */

import { Container, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { PrimaryNavbar, SecondaryNavbar } from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <Flex flexDir="column" minH="screen-h">
      <PrimaryNavbar />
      <SecondaryNavbar />
      <Container display="flex" flexDir="column" flexGrow={1} maxW="container.2xl" pos="relative">
        {children}
      </Container>
    </Flex>
  );
};
