import React from "react";
import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
} from "@ionic/react";

/**
 * The default page header in most of the pages
 */
const PageHeader: React.FC<{
  title: string;
}> = (props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/page/home" />
        </IonButtons>
        <IonTitle>{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
