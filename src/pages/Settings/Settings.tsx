import React, { useContext } from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonItemDivider,
  isPlatform,
} from "@ionic/react";
import { moon } from "ionicons/icons";

import "./Settings.css";
import { GeneralContext } from "../../context";
import { PageHeader, AndroidBackButtonExit } from "../../components";

const Settings: React.FC = () => {
  const { settings, setDarkMode } = useContext(GeneralContext);

  const darkModeHandler = (event: CustomEvent) => {
    setDarkMode(event.detail.checked);
  };

  const toggleDarkModeHandler = () => {
    setDarkMode(!settings.darkMode);
  };

  return (
    <IonPage>
      {isPlatform("android") && <AndroidBackButtonExit />}
      <PageHeader title="Settings" />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>General</IonLabel>
          </IonListHeader>
          <IonItem lines="none" button onClick={toggleDarkModeHandler}>
            <IonIcon
              slot="start"
              icon={moon}
              className="component-icon component-icon-dark"
            />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              name="darkMode"
              checked={settings.darkMode}
              onIonChange={darkModeHandler}
            />
          </IonItem>
          <IonItemDivider />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
