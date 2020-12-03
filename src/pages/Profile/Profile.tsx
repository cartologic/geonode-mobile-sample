import React, { useContext } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonInput,
  IonDatetime,
} from "@ionic/react";
import { camera, cloudUpload, trash } from "ionicons/icons";

import "./Profile.css";
import { PageHeader } from "../../components";
import { AuthenticationContext } from "../../context";

const Profile: React.FC = () => {
  const { currentUser } = useContext(AuthenticationContext);

  return (
    <IonPage>
      <PageHeader title="Profile" />
      <IonContent>
        <IonGrid className="ion-margin-top">
          <IonRow>
            <IonCol className="ion-text-center">
              <img
                className="profile-picture"
                src={currentUser.avatar}
                alt="profile"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton fill="outline">
                <IonIcon icon={cloudUpload} slot="start" />
                Upload
              </IonButton>
              <IonButton fill="outline">
                <IonIcon icon={camera} slot="start" />
                Camera
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-start ion-margin-end">
            <IonCol
              sizeXs="12"
              sizeMd="6"
              className="ion-padding-start ion-padding-end"
            >
              <IonItem>
                <IonLabel position="floating">First Name</IonLabel>
                <IonInput readonly type="text" value={currentUser?.firstName} />
              </IonItem>
            </IonCol>
            <IonCol
              sizeXs="12"
              sizeMd="6"
              className="ion-padding-start ion-padding-end"
            >
              <IonItem>
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput readonly type="text" value={currentUser?.lastName} />
              </IonItem>
            </IonCol>
            <IonCol
              sizeXs="12"
              sizeMd="6"
              className="ion-padding-start ion-padding-end"
            >
              <IonItem>
                <IonLabel position="floating">Date Joined</IonLabel>
                <IonDatetime
                  readonly
                  value={currentUser?.dateJoined?.toString()}
                  displayFormat="DD-MMM-YYYY"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton disabled>Save</IonButton>
              <IonButton
                color="danger"
                fill="outline"
                className="ion-margin-start"
                disabled
              >
                <IonIcon icon={trash} slot="start" />
                Discard
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
