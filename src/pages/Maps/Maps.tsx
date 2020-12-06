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
import "./Maps.css";

const Maps: React.FC = () => {
  const { currentUser } = useContext(AuthenticationContext);
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [maps, setMaps] = useState([]);
  const [sortMapsBy, setSortMapsBy] = useState("-date");

  const fetchMaps = useCallback(
    async (token = null) => {
      setShowLoadingSpinner(true);
      try {
        const response = await axios.get("/api/maps", {
          params: {
            order_by: sortMapsBy,
          },
        });
        const tempMaps = response.data.objects.map((singleMap) => {
          return {
            id: singleMap.uuid,
            title: singleMap.title,
            abstract: singleMap.abstract,
            thumbnail: singleMap.thumbnail_url,
            date: singleMap.date.split("T")[0],
            url: singleMap.detail_url,
            viewCount: singleMap.popular_count,
            ownerName: singleMap.owner_name,
          };
        });
        setMaps(tempMaps);
      } finally {
        setShowLoadingSpinner(false);
      }
    },
    [sortMapsBy]
  );

  useEffect(() => {
    currentUser ? fetchMaps(currentUser.accessToken) : fetchMaps();
  }, [currentUser, fetchMaps]);

  const refreshPage = async (event) => {
    currentUser ? await fetchMaps(currentUser.accessToken) : await fetchMaps();
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
          <IonTitle>Maps</IonTitle>
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
            value={sortMapsBy}
            onIonChange={(e) => setSortMapsBy(e.detail.value)}
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
            <h1>{`${maps.length} Maps found`}</h1>
          </IonListHeader>
          {maps.map((map) => (
            <IonItem
              key={map.id}
              href={appConfig.serverBaseURL + map.url}
              target="_blank"
            >
              <IonThumbnail slot="start" className="map-image">
                <img src={map.thumbnail} alt="map" />
              </IonThumbnail>
              <IonLabel>
                <h2>{map.title}</h2>
                <p>{map.abstract}</p>
                <p>
                  <IonChip>
                    <IonIcon icon={personOutline} />
                    <IonLabel>{map.ownerName}</IonLabel>
                  </IonChip>
                </p>
                <IonChip>
                  <IonIcon icon={calendarOutline} />
                  <IonLabel>{map.date}</IonLabel>
                </IonChip>
                <IonChip>
                  <IonIcon icon={eyeOutline} />
                  <IonLabel>{map.viewCount}</IonLabel>
                </IonChip>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
