import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Table: ComponentStyleConfig = {
  variants: {
    custom: {
      table: {
        borderCollapse: "separate",
        borderSpacing: "0 4px",
      },
      tbody: {
        td: {
          bgColor: "whiteAlpha.100",
          "&:first-child": { roundedLeft: "md" },
          "&:last-child": { roundedRight: "md" },
        },
      },
    },
  },
};
