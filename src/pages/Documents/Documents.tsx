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
import "./Documents.css";

const Documents: React.FC = () => {
  const { currentUser } = useContext(AuthenticationContext);
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [sortDocumentsBy, setSortDocumentsBy] = useState("-date");

  const fetchDocuments = useCallback(
    async (token = null) => {
      setShowLoadingSpinner(true);
      try {
        const response = await axios.get("/api/documents", {
          params: {
            order_by: sortDocumentsBy,
          },
        });
        const tempDocuments = response.data.objects.map((singleDocument) => {
          return {
            id: singleDocument.uuid,
            title: singleDocument.title,
            abstract: singleDocument.abstract,
            thumbnail: singleDocument.thumbnail_url,
            date: singleDocument.date.split("T")[0],
            url: singleDocument.detail_url,
            viewCount: singleDocument.popular_count,
            ownerName: singleDocument.owner_name,
          };
        });
        setDocuments(tempDocuments);
      } finally {
        setShowLoadingSpinner(false);
      }
    },
    [sortDocumentsBy]
  );

  useEffect(() => {
    currentUser ? fetchDocuments(currentUser.accessToken) : fetchDocuments();
  }, [currentUser, fetchDocuments]);

  const refreshPage = async (event) => {
    currentUser
      ? await fetchDocuments(currentUser.accessToken)
      : await fetchDocuments();
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
          <IonTitle>Documents</IonTitle>
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
            value={sortDocumentsBy}
            onIonChange={(e) => setSortDocumentsBy(e.detail.value)}
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
            <h1>{`${documents.length} Documents found`}</h1>
          </IonListHeader>
          {documents.map((document) => (
            <IonItem
              key={document.id}
              href={appConfig.serverBaseURL + document.url}
              target="_blank"
            >
              <IonThumbnail slot="start" className="document-image">
                <img src={document.thumbnail} alt="document" />
              </IonThumbnail>
              <IonLabel>
                <h2>{document.title}</h2>
                <p>{document.abstract}</p>
                <p>
                  <IonChip color="primary">
                    <IonIcon icon={personOutline} />
                    <IonLabel>{document.ownerName}</IonLabel>
                  </IonChip>
                </p>
                <IonChip color="primary">
                  <IonIcon icon={calendarOutline} />
                  <IonLabel>{document.date}</IonLabel>
                </IonChip>
                <IonChip color="danger">
                  <IonIcon icon={eyeOutline} />
                  <IonLabel>{document.viewCount}</IonLabel>
                </IonChip>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Documents;
