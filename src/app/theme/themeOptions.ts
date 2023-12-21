import { ThemeOptions } from "@mui/material/styles";
import { components } from "./components";
import { blue, marron, paste, primary, themeColors } from "./themeColors";
import { typography } from "./typography";

const THEMES = {
  GIFT: "GIFT",
  HEALTH: "HEALTH",
  DEFAULT: "DEFAULT",
  GROCERY: "GROCERY",
  FURNITURE: "FURNITURE",
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 910,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

interface ExtendedThemeOptions extends ThemeOptions {
  [key: string]: any;
}

const themesOptions: ExtendedThemeOptions = {
  [THEMES.DEFAULT]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: { primary: { ...primary, light: primary[100] }, ...themeColors },
  },
};

const themeOptions: ExtendedThemeOptions = themesOptions[THEMES.DEFAULT];

export default themeOptions;
