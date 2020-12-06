import React, { useEffect, useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
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
  IonCardContent,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";

import axios from "../../utils/axios";
import { AuthenticationContext } from "../../context";
import { AndroidBackButtonExit } from "../../components";
import appConfig from "../../config";

/**
 * The About page
 */
const Home: React.FC = () => {
  const { currentUser } = useContext(AuthenticationContext);
  const [layers, setLayers] = useState([]);

  const fetchLayers = async (token = null) => {
    const response = await axios.get("/api/layers");
    const tempLayers = response.data.objects.map((singleLayer) => {
      return {
        id: singleLayer.uuid,
        title: singleLayer.title,
        abstract: singleLayer.abstract,
        thumbnail: singleLayer.thumbnail_url,
        date: singleLayer.date.split("T")[0],
        url: singleLayer.detail_url,
      };
    });
    setLayers(tempLayers);
  };

  useEffect(() => {
    currentUser ? fetchLayers(currentUser.accessToken) : fetchLayers();
  }, [currentUser]);

  const refreshPage = async (event) => {
    currentUser
      ? await fetchLayers(currentUser.accessToken)
      : await fetchLayers();
    event.detail.complete();
  };

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
        <IonRefresher slot="fixed" onIonRefresh={refreshPage}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonListHeader>
          <h1>Available Layers {`(${layers.length})`}</h1>
        </IonListHeader>
        <IonGrid>
          <IonRow>
            {layers.map((layer) => (
              <IonCol size="12" key={layer.id} className="ion-text-center">
                <IonCard>
                  <a
                    href={appConfig.serverBaseURL + layer.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={layer.thumbnail} alt="layer" />
                  </a>
                  <IonCardHeader>
                    <IonCardTitle>{layer.title}</IonCardTitle>
                    <IonCardSubtitle>{layer.abstract}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonIcon icon={calendarOutline} slot="start" /> {layer.date}
                  </IonCardContent>
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
