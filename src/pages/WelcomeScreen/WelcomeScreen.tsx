import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { IonButton, IonContent, IonSlide, IonSlides } from "@ionic/react";

import "./WelcomeScreen.css";
import { GeneralContext } from "../../context";

const Menu: React.FC = () => {
  const { setShowWelcomeScreen } = useContext(GeneralContext);
  const slidesRef = useRef<HTMLIonSlidesElement>(null);
  const history = useHistory();

  const handleFinish = () => {
    setShowWelcomeScreen(false);
    history.replace("/page/home");
  };

  return (
    <IonContent fullscreen>
      <IonSlides
        pager
        className="ion-padding primary-color-background"
        ref={slidesRef}
      >
        <IonSlide className="ion-padding">
          <div className="slide">
            <img src="/assets/icon/icon.png" alt="logo" />
            <h3 className="color-primary">
              GeoNode Mobile Client Brought to you by Cartologic
            </h3>
            <IonButton
              expand="block"
              onClick={handleFinish}
              className="ion-margin-top"
              color="danger"
            >
              Get Started
            </IonButton>
          </div>
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
};

export default Menu;
