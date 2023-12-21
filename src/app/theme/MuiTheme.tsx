"use client";

import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import merge from "lodash/merge";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import useSettings from "../hooks/useSettings";
import themeOptions from "./themeOptions";

// =======================================================
type MuiThemeProps = { children?: ReactNode };
// =======================================================

const MuiTheme: FC<MuiThemeProps> = ({ children }) => {
  const { settings } = useSettings();
  const pathname = usePathname();

  // 환경 변수 사용

  let theme = createTheme(
    merge({}, { ...themeOptions, direction: settings.direction })
  );
  theme = responsiveFontSizes(theme);

  // theme shadows
  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
