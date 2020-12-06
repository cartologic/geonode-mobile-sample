import React, { useEffect, useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  isPlatform,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonButton,
  IonListHeader,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
} from "@ionic/react";
import { calendarOutline, filter, options, eyeOutline } from "ionicons/icons";

import axios from "../../utils/axios";
import { AuthenticationContext } from "../../context";
import { AndroidBackButtonExit } from "../../components";
import appConfig from "../../config";
import "./Layers.css";

/**
 * The About page
 */
const Home: React.FC = () => {
  const { currentUser } = useContext(AuthenticationContext);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [layers, setLayers] = useState([]);

  const fetchLayers = async (token = null) => {
    setShowLoadingSpinner(true);
    try {
      const response = await axios.get("/api/layers");
      const tempLayers = response.data.objects.map((singleLayer) => {
        return {
          id: singleLayer.uuid,
          title: singleLayer.title,
          abstract: singleLayer.abstract,
          thumbnail: singleLayer.thumbnail_url,
          date: singleLayer.date.split("T")[0],
          url: singleLayer.detail_url,
          viewCount: singleLayer.popular_count,
        };
      });
      setLayers(tempLayers);
    } finally {
      setShowLoadingSpinner(false);
    }
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
          <IonTitle>Layers</IonTitle>
          <IonButtons slot="secondary">
            {showLoadingSpinner && (
              <IonSpinner slot="end" color="light" className="ion-margin-end" />
            )}
            <IonButton>
              <IonIcon slot="icon-only" icon={options} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={filter} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refreshPage}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          <IonListHeader>
            <h1>{`${layers.length} Layers found`}</h1>
          </IonListHeader>
          {layers.map((layer) => (
            <IonItem
              key={layer.id}
              href={appConfig.serverBaseURL + layer.url}
              target="_blank"
            >
              <IonThumbnail slot="start" className="layer-image">
                <img src={layer.thumbnail} alt="layer" />
              </IonThumbnail>
              <IonLabel>
                <h2>{layer.title}</h2>
                <p>{layer.abstract}</p>
                <p>
                  <IonIcon icon={calendarOutline} slot="start" /> {layer.date}
                </p>
                <p>
                  <IonIcon icon={eyeOutline} slot="start" /> {layer.viewCount}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
