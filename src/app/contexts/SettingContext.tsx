"use client";

import { Direction } from "@mui/material";
import { createContext, ReactNode, useEffect, useState } from "react";

// ============================================================
export type SettingsOptions = { direction: Direction };
// ============================================================

// SET "rtl" OR "ltr" HERE
// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCALSTORAGE
const initialSettings: SettingsOptions = { direction: "ltr" };

export const SettingsContext = createContext({
  settings: initialSettings,
  updateSettings: (arg: SettingsOptions) => {},
});

// ============================================================
type settingsProviderProps = { children?: ReactNode };
// ============================================================

const SettingsProvider = ({ children }: settingsProviderProps) => {
  const [settings, setSettings] = useState(initialSettings);

  const updateSettings = (updatedSetting: SettingsOptions) => {
    setSettings(updatedSetting);
    window.localStorage.setItem(
      "bazaar_settings",
      JSON.stringify(updatedSetting)
    );
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
