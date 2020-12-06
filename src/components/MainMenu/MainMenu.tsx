import React, { useContext, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
  IonRouterLink,
  IonLoading,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import {
  homeOutline,
  homeSharp,
  logInOutline,
  logInSharp,
  logOutOutline,
  logOutSharp,
  settingsOutline,
  settingsSharp,
  informationCircleOutline,
  informationCircleSharp,
  layersOutline,
  layersSharp,
  mapOutline,
  mapSharp,
} from "ionicons/icons";
import "./MainMenu.css";
import packageJson from "../../../package.json";
import { AuthenticationContext, GeneralContext } from "../../context";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const corePages: AppPage[] = [
  {
    title: "Home",
    url: "/page/home",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Layers",
    url: "/page/layers",
    iosIcon: layersOutline,
    mdIcon: layersSharp,
  },
  {
    title: "Maps",
    url: "/page/maps",
    iosIcon: mapOutline,
    mdIcon: mapSharp,
  },
  {
    title: "Settings",
    url: "/page/settings",
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
  {
    title: "About",
    url: "/page/about",
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
];

/**
 * The main menu of the application
 */
const MainMenu: React.FC = () => {
  const { currentUser, logoutHandler } = useContext(AuthenticationContext);
  const { setShowLoginModal } = useContext(GeneralContext);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const location = useLocation();

  const defaultAvatar = "/assets/img/avatar.svg";

  const logout = async () => {
    setShowLoading(true);
    await logoutHandler();
    setShowLoading(false);
  };

  return (
    <IonMenu contentId="main-menu" type="overlay">
      <IonContent>
        <IonLoading isOpen={showLoading} message={"Please wait..."} />
        <IonGrid className="cover-background">
          <IonRow className="ion-justify-content-center ion-margin-top">
            {currentUser ? (
              <IonRouterLink href="/page/profile">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="user-thumbnail"
                />
              </IonRouterLink>
            ) : (
              <img
                src={defaultAvatar}
                alt="profile"
                className="user-thumbnail"
              />
            )}
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <h1 className="ion-no-margin color-white">
              {currentUser?.username}
            </h1>
          </IonRow>
        </IonGrid>
        <IonList id="inbox-list">
          {!currentUser && (
            <IonItem
              className="ion-margin-bottom"
              lines="none"
              detail={false}
              onClick={() => setShowLoginModal(true)}
            >
              <IonIcon
                className="ion-padding-start"
                slot="start"
                ios={logInOutline}
                md={logInSharp}
              />
              <IonLabel>Login</IonLabel>
            </IonItem>
          )}
          {corePages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    className="ion-padding-start"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          {currentUser && (
            <IonItem
              className="ion-margin-top"
              lines="none"
              detail={false}
              onClick={logout}
            >
              <IonIcon
                className="ion-padding-start"
                slot="start"
                ios={logOutOutline}
                md={logOutSharp}
              />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
      <IonNote className="ion-margin-start">
        {"version: " + packageJson.version}
      </IonNote>
    </IonMenu>
  );
};

export default MainMenu;
