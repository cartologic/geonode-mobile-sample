import React from "react";

import appConfig from "../../config";

export interface Settings {
  darkMode: boolean;
  showWelcomeScreen: boolean;
}

interface Context {
  settings: Settings;
  showLoginModal: boolean;
  initializeGeneralContext: () => void;
  setDarkMode: (darkMode: boolean) => void;
  setShowWelcomeScreen: (showWelcomeScreen: boolean) => void;
  setShowLoginModal: (showLoginModal: boolean) => void;
}

export const defaultSettings: Settings = {
  darkMode: appConfig.defaultDarkMode,
  showWelcomeScreen: true,
};

const GeneralContext = React.createContext<Context>({
  settings: defaultSettings,
  showLoginModal: false,
  initializeGeneralContext: () => {},
  setDarkMode: () => {},
  setShowWelcomeScreen: () => {},
  setShowLoginModal: () => {},
});

export default GeneralContext;
