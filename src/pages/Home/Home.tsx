import React from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonCard,
  IonThumbnail,
  isPlatform,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";

import { AndroidBackButtonExit } from "../../components";

/**
 * The About page
 */
const Home: React.FC = () => {
  return (
    <IonPage>
      {isPlatform("android") && <AndroidBackButtonExit />}

      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>GeoNode Mobile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
        <IonListHeader>
          <h1>Available Layers (4)</h1>
        </IonListHeader>
        <IonGrid>
          <IonRow>
            {[1, 2, 3, 4].map((item) => (
              <IonCol size="6" key={item}>
                <IonCard>
                  <img src="http://placehold.it/300x300" alt="layer" />
                  <IonCardHeader>
                    <IonCardTitle>Layer Title</IonCardTitle>
                    <IonCardSubtitle>Layer abstract</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
