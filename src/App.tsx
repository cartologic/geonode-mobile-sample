import React, { useContext, useEffect, Suspense } from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  IonSplitPane,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import { GeneralContext, AuthenticationContext } from "./context";
import { MainMenu, Login } from "./components";
import { WelcomeScreen, Home, Profile, Settings } from "./pages";

const App: React.FC = () => {
  const { initializeGeneralContext, settings } = useContext(GeneralContext);
  const { initializeAuthenticationContext } = useContext(AuthenticationContext);

  useEffect(() => {
    initializeGeneralContext();
    initializeAuthenticationContext();
  }, [initializeAuthenticationContext, initializeGeneralContext]);

  return (
    <IonApp>
      <Login />
      <IonReactRouter>
        <Suspense fallback={<IonSpinner />}>
          <IonSplitPane contentId="main-menu">
            <MainMenu />
            <IonRouterOutlet id="main-menu">
              <Route path="/page/home" component={Home} exact />
              <Route path="/page/settings" component={Settings} exact />
              <Route path="/page/profile" component={Profile} exact />
              <Route path="/page/welcome" component={WelcomeScreen} exact />
              <Redirect
                from="/"
                to={settings.showWelcomeScreen ? "/page/welcome" : "/page/home"}
                exact
              />
            </IonRouterOutlet>
          </IonSplitPane>
        </Suspense>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
