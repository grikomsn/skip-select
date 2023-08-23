import type { Styles } from "@chakra-ui/theme-tools";

export const styles: Styles = {
  global: {
    ":root": {
      colorScheme: "dark light",
      scrollBehavior: "smooth",
    },
    "::selection": {
      //
    },
    "html, body, #__next": {
      h: "full",
    },
    body: {
      bg: "chakra-body-bg",
      color: "chakra-body-text",
      fontFamily: "body",
      lineHeight: "base",
      minH: "100vh",
      textRendering: "optimizeLegibility",
      transitionDuration: "normal",
      transitionProperty: "background-color",
      MozOsxFontSmoothing: "grayscale",
      WebkitFontSmoothing: "antialiased",
    },
    "*::placeholder": {
      color: "chakra-placeholder-color",
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
    },
    "[data-debug], [data-debug] *": {
      outline: "1px solid red",
    },
  },
};
