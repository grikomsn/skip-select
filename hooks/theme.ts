import type { ThemeTypings } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import get from "lodash/get";

/**
 * Helper hook to access theme tokens safely due to {@link useTheme} not typed
 * and there's no way get the full theme types.
 *
 * @see {@link ThemeTypings}
 */
export const useThemeProxy = () => {
  const theme = useTheme();

  return ((key: any, value: any) => get(theme[key], value) as {}) as <
    TK extends keyof ThemeTypings,
    TV extends ThemeTypings[TK],
  >(
    key: TK,
    value: TV,
  ) => string;
};
