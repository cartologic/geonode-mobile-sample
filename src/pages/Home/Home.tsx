import React, { useEffect, useContext, useState } from "react";
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
  IonCardContent,
  IonIcon
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";

import axios from "../../utils/axios";
import { AuthenticationContext } from "../../context";
import { AndroidBackButtonExit } from "../../components";

/**
 * The About page
 */
const Home: React.FC = () => {
  const { currentUser } = useContext(AuthenticationContext);
  const [layers, setLayers] = useState([]);

  const fetchLayers = (token = null) => {
    axios
      .get("/api/layers", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const tempLayers = response.data.objects.map((singleLayer) => {
          return {
            id: singleLayer.uuid,
            title: singleLayer.title,
            abstract: singleLayer.abstract,
            thumbnail: singleLayer.thumbnail_url,
            date: singleLayer.date.split("T")[0],
          };
        });
        setLayers(tempLayers);
      });
  };

  useEffect(() => {
    currentUser ? fetchLayers(currentUser.accessToken) : fetchLayers();
  }, [currentUser]);

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
          <h1>Available Layers {`(${layers.length})`}</h1>
        </IonListHeader>
        <IonGrid>
          <IonRow>
            {layers.map((layer) => (
              <IonCol size="6" key={layer.id}>
                <IonCard>
                  <img src={layer.thumbnail} alt="layer" />
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
