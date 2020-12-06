import React, { useEffect, useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  isPlatform,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonCardHeader,
  IonCardContent,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonLabel,
  IonChip,
  IonBadge,
  IonSpinner,
} from "@ionic/react";
import {
  layersOutline,
  mapOutline,
  documentTextOutline,
  personOutline,
} from "ionicons/icons";

import axios from "../../utils/axios";
import { AuthenticationContext } from "../../context";
import { AndroidBackButtonExit } from "../../components";

/**
 * The About page
 */
const Home: React.FC = () => {
  const { currentUser } = useContext(AuthenticationContext);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [layersCount, setLayersCount] = useState(0);
  const [mapsCount, setMapsCount] = useState(0);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  const fetchCounts = async (token = null) => {
    setShowLoadingSpinner(true);
    try {
      const layersCountResponse = await axios.get("/api/layers");
      const mapsCountResponse = await axios.get("/api/maps");
      const documentsCountResponse = await axios.get("/api/documents");
      const usersCountResponse = await axios.get("/api/profiles");
      setLayersCount(layersCountResponse.data.meta.total_count);
      setMapsCount(mapsCountResponse.data.meta.total_count);
      setDocumentsCount(documentsCountResponse.data.meta.total_count);
      setUsersCount(usersCountResponse.data.meta.total_count);
    } finally {
      setShowLoadingSpinner(false);
    }
  };

  useEffect(() => {
    currentUser ? fetchCounts(currentUser.accessToken) : fetchCounts();
  }, [currentUser]);

  const refreshPage = async (event) => {
    currentUser
      ? await fetchCounts(currentUser.accessToken)
      : await fetchCounts();
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
          {showLoadingSpinner && (
            <IonSpinner slot="end" color="light" className="ion-margin-end" />
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refreshPage}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonListHeader>
          <h1>Welcome</h1>
        </IonListHeader>
        <IonItem lines="none">
          GeoNode is an open source platform for sharing geospatial data and
          maps.
        </IonItem>
        <IonCard>
          <IonCardHeader>
            <IonItem
              lines="none"
              className="ion-no-padding"
              href="/page/layers"
            >
              <IonChip slot="start">
                <IonIcon icon={layersOutline} />
                <IonLabel>Layers</IonLabel>
              </IonChip>
              <IonBadge slot="end">{layersCount}</IonBadge>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            Geospatial data published by other users, organizations and public
            sources. Download data in standard formats.
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonItem lines="none" className="ion-no-padding">
              <IonChip slot="start">
                <IonIcon icon={mapOutline} />
                <IonLabel>Maps</IonLabel>
              </IonChip>
              <IonBadge slot="end">{mapsCount}</IonBadge>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            Data is available for browsing, aggregating and styling to generate
            maps which can be saved, downloaded, shared publicly or restricted
            to specify users only.
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonItem lines="none" className="ion-no-padding">
              <IonChip slot="start">
                <IonIcon icon={documentTextOutline} />
                <IonLabel>Documents</IonLabel>
              </IonChip>
              <IonBadge slot="end">{documentsCount}</IonBadge>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            As for the layers and maps GeoNode allows to publish tabular and
            text data, manage theirs metadata and associated documents.
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonItem lines="none" className="ion-no-padding">
              <IonChip slot="start">
                <IonIcon icon={personOutline} />
                <IonLabel>Users</IonLabel>
              </IonChip>
              <IonBadge slot="end">{usersCount}</IonBadge>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            Geonode allows registered users to easily upload geospatial data and
            various documents in several formats.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
