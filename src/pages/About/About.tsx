import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonHeader,
  IonTitle,
  IonToolbar,
  isPlatform,
  IonCard,
  IonCol,
  IonGrid,
  IonRow,
  IonThumbnail,
} from "@ionic/react";

import { PageHeader, AndroidBackButtonExit } from "../../components";

const About: React.FC = () => {
  return (
    <IonPage>
      {isPlatform("android") && <AndroidBackButtonExit />}
      <PageHeader title="About" />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img src="/assets/icon/icon.png" alt="logo" />
                  </IonThumbnail>
                  <IonLabel>
                    <h1>GeoNode Mobile Client</h1> by{" "}
                    <a href="http://cartologic.com/">Cartologic</a>
                  </IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default About;
