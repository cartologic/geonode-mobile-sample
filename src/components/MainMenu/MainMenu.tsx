import React, { useContext } from "react";
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
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import {
  homeOutline,
  homeSharp,
  logOutOutline,
  logOutSharp,
  settingsOutline,
  settingsSharp,
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
    title: "Settings",
    url: "/page/settings",
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
];

/**
 * The main menu of the application
 */
const MainMenu: React.FC = () => {
  const { currentUser, logoutHandler } = useContext(AuthenticationContext);
  const { setShowLoginModal } = useContext(GeneralContext);
  const location = useLocation();

  const defaultAvatar = "/assets/img/avatar.svg";

  return (
    <IonMenu contentId="main-menu" type="overlay">
      <IonContent>
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
          <IonRow className="ion-justify-content-center">
            <h1
              className="ion-no-margin color-white"
              onClick={currentUser ? undefined : () => setShowLoginModal(true)}
            >
              {currentUser ? currentUser.username : "Login"}
            </h1>
          </IonRow>
        </IonGrid>
        <IonList id="inbox-list">
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
            <IonMenuToggle>
              <IonItem
                className="ion-margin-top"
                lines="none"
                detail={false}
                onClick={logoutHandler}
              >
                <IonIcon
                  className="ion-padding-start"
                  slot="start"
                  ios={logOutOutline}
                  md={logOutSharp}
                />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonMenuToggle>
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
