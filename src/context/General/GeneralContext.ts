import React from "react";

export interface Settings {
  darkMode: boolean;
  showWelcomeScreen: boolean;
  geonodeUrl: string;
  clientId: string;
  clientSecret: string;
}

interface Context {
  settings: Settings;
  showLoginModal: boolean;
  initializeGeneralContext: () => void;
  setDarkMode: (darkMode: boolean) => void;
  setShowWelcomeScreen: (showWelcomeScreen: boolean) => void;
  setShowLoginModal: (showLoginModal: boolean) => void;
  setGeonodeUrl: (geonodeUrl: string) => void;
  setClientId: (clientId: string) => void;
  setClientSecret: (clientSecret: string) => void;
}

export const defaultSettings: Settings = {
  darkMode: false,
  showWelcomeScreen: true,
  geonodeUrl: "",
  clientId: "",
  clientSecret: "",
};

const GeneralContext = React.createContext<Context>({
  settings: defaultSettings,
  showLoginModal: false,
  initializeGeneralContext: () => {},
  setDarkMode: () => {},
  setShowWelcomeScreen: () => {},
  setShowLoginModal: () => {},
  setGeonodeUrl: () => {},
  setClientId: () => {},
  setClientSecret: () => {},
});

export default GeneralContext;
