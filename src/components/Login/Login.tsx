import React, { useRef, useState, useContext } from "react";
import {
  IonContent,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonLoading,
  IonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import { person, closeCircle } from "ionicons/icons";

import { AuthenticationContext, GeneralContext } from "../../context";
import "./Login.css";

/**
 * The login modal
 */
const Login: React.FC = () => {
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const { loginHandler } = useContext(AuthenticationContext);
  const { showLoginModal, setShowLoginModal } = useContext(GeneralContext);

  const usernameRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const loginWithUsernameAndPasswordHandler = async () => {
    const enteredUsername = usernameRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    if (
      !enteredUsername ||
      !enteredPassword ||
      enteredUsername.toString().trim().length === 0 ||
      enteredPassword.toString().trim().length === 0
    ) {
      setNotificationMessage("Please enter valid data");
      return;
    }
    setNotificationMessage("");
    setShowLoading(true);
    const isLoggedIn = await loginHandler(
      enteredUsername.toString(),
      enteredPassword.toString()
    );
    setShowLoading(false);
    if (isLoggedIn) {
      setShowLoginModal(false);
    } else {
      setNotificationMessage("Failed to login");
    }
  };

  return (
    <IonModal isOpen={showLoginModal}>
      <IonLoading isOpen={showLoading} message={"Please wait..."} />
      <IonToast
        isOpen={!!notificationMessage}
        onDidDismiss={() => setNotificationMessage("")}
        message={notificationMessage}
        duration={2000}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowLoginModal(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol
              sizeXs="12"
              sizeMd="6"
              className="ion-padding-start ion-padding-end"
            >
              <IonItem>
                <IonLabel position="floating">Username</IonLabel>
                <IonInput ref={usernameRef} type="text" />
              </IonItem>
            </IonCol>
            <IonCol
              sizeXs="12"
              sizeMd="6"
              className="ion-padding-start ion-padding-end"
            >
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput ref={passwordRef} type="password" />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol offset="3" size="6" className="ion-text-center">
              <IonButton
                expand="block"
                onClick={loginWithUsernameAndPasswordHandler}
              >
                <IonIcon slot="start" icon={person} />
                Login
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeXs="12" className="ion-text-center ion-margin-top">
              <IonLabel>If you don't have an account yet</IonLabel>
            </IonCol>
            <IonCol sizeXs="12" className="ion-text-center">
              <IonButton disabled fill="clear">
                Register Now
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol offset="3" size="6" className="ion-text-center">
              <IonButton
                fill="outline"
                onClick={() => setShowLoginModal(false)}
              >
                <IonIcon slot="start" icon={closeCircle} />
                Close
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default Login;
