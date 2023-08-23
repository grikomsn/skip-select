import { extendTheme } from "@chakra-ui/react";
import { theme as saasTheme } from "@saas-ui/theme";

import { borders } from "./borders";
import { colors } from "./colors";
import { components } from "./components";
import { config } from "./config";
import { sizes } from "./foundations";
import { styles } from "./styles";
import * as typography from "./typography";

export const theme = extendTheme(saasTheme, {
  borders,
  colors,
  components,
  config,
  sizes,
  styles,
  ...typography,
});
