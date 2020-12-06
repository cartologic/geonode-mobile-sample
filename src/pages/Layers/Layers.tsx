import React, { useEffect, useContext, useState, useCallback } from "react";
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
  IonPopover,
  IonRadio,
  IonRadioGroup,
  IonChip,
} from "@ionic/react";
import {
  calendarOutline,
  filter,
  eyeOutline,
  personOutline,
} from "ionicons/icons";

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
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [layers, setLayers] = useState([]);
  const [sortLayersBy, setSortLayersBy] = useState("-date");

  const fetchLayers = useCallback(
    async (token = null) => {
      setShowLoadingSpinner(true);
      try {
        const response = await axios.get("/api/layers", {
          params: {
            order_by: sortLayersBy,
          },
        });
        const tempLayers = response.data.objects.map((singleLayer) => {
          return {
            id: singleLayer.uuid,
            title: singleLayer.title,
            abstract: singleLayer.abstract,
            thumbnail: singleLayer.thumbnail_url,
            date: singleLayer.date.split("T")[0],
            url: singleLayer.detail_url,
            viewCount: singleLayer.popular_count,
            ownerName: singleLayer.owner_name,
          };
        });
        setLayers(tempLayers);
      } finally {
        setShowLoadingSpinner(false);
      }
    },
    [sortLayersBy]
  );

  useEffect(() => {
    currentUser ? fetchLayers(currentUser.accessToken) : fetchLayers();
  }, [currentUser, fetchLayers]);

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
            <IonButton onClick={() => setShowSortPopover(true)}>
              <IonIcon slot="icon-only" icon={filter} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonPopover
          isOpen={showSortPopover}
          cssClass="my-custom-class"
          onDidDismiss={(e) => setShowSortPopover(false)}
        >
          <IonRadioGroup
            value={sortLayersBy}
            onIonChange={(e) => setSortLayersBy(e.detail.value)}
          >
            <IonListHeader>
              <IonLabel>Sort by</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Most recent</IonLabel>
              <IonRadio slot="start" value="-date" color="primary" />
            </IonItem>
            <IonItem>
              <IonLabel>Less recent</IonLabel>
              <IonRadio slot="start" value="date" color="primary" />
            </IonItem>
            <IonItem>
              <IonLabel>A - Z</IonLabel>
              <IonRadio slot="start" value="title" color="primary" />
            </IonItem>
            <IonItem>
              <IonLabel>Z - A</IonLabel>
              <IonRadio slot="start" value="-title" color="primary" />
            </IonItem>
            <IonItem>
              <IonLabel>Most popular</IonLabel>
              <IonRadio slot="start" value="-popular_count" color="primary" />
            </IonItem>
          </IonRadioGroup>
        </IonPopover>
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
                  <IonChip>
                    <IonIcon icon={personOutline} />
                    <IonLabel>{layer.ownerName}</IonLabel>
                  </IonChip>
                </p>
                <IonChip>
                  <IonIcon icon={calendarOutline} />
                  <IonLabel>{layer.date}</IonLabel>
                </IonChip>
                <IonChip>
                  <IonIcon icon={eyeOutline} />
                  <IonLabel>{layer.viewCount}</IonLabel>
                </IonChip>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
