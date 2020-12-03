import React, { useEffect, useState } from "react";
import { IonToast } from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { useHistory, useLocation } from "react-router-dom";

const { App } = Plugins;

/**
 * This component handles the Android Back button behaviour
 */
const BackButtonExit: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [doubleBackPress, setDoubleBackPress] = useState(false);

  useEffect(() => {
    document.addEventListener("ionBackButton", (event: any) => {
      event.detail.register(-1, () => {
        history.goBack();
        setTimeout(() => setDoubleBackPress(false), 1500);
        if (doubleBackPress) {
          App.exitApp();
        } else {
          setDoubleBackPress(true);
          setOpen(true);
        }
      });
    });
  }, [location, history, doubleBackPress]);

  return (
    <IonToast
      isOpen={open}
      onDidDismiss={() => setOpen(false)}
      message="Press again to Exit"
      duration={1500}
    />
  );
};

export default BackButtonExit;
