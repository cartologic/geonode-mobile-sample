import React, { useState, useEffect, useCallback } from "react";
import { Plugins } from "@capacitor/core";
import GeneralContext, { defaultSettings, Settings } from "./GeneralContext";

const { Storage } = Plugins;

const GeneralContextProvider: React.FC = (props) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Save to disk whenever there is a change
  useEffect(() => {
    Storage.set({
      key: "settings",
      value: JSON.stringify(settings),
    });
  }, [settings]);

  const initializeGeneralContext = useCallback(async () => {
    const settingsData = await Storage.get({ key: "settings" });
    const storedSettings = settingsData.value
      ? JSON.parse(settingsData.value)
      : defaultSettings;
    setSettings(storedSettings);
    setDarkMode(storedSettings.darkMode);
    setShowWelcomeScreen(storedSettings.showWelcomeScreen);
  }, []);

  const setDarkMode = (darkMode: boolean = defaultSettings.darkMode) => {
    document.body.classList.toggle("dark", darkMode);
    const updatedSettings = { darkMode };
    setSettings((currentSettings) => {
      return { ...currentSettings, ...updatedSettings };
    });
  };

  const setShowWelcomeScreen = (showWelcomeScreen: boolean = true) => {
    const updatedSettings = { showWelcomeScreen };
    setSettings((currentSettings) => {
      return { ...currentSettings, ...updatedSettings };
    });
  };

  return (
    <GeneralContext.Provider
      value={{
        settings,
        showLoginModal,
        initializeGeneralContext,
        setDarkMode,
        setShowWelcomeScreen,
        setShowLoginModal,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
