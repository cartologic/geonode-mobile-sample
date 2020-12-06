import React, { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";

import axios from "../../utils/axios";
import { PageHeader } from "../../components";

interface ParamTypes {
  mapId: string;
}

const MapDetails: React.FC = () => {
  const { mapId } = useParams<ParamTypes>();
  const [mapTitle, setMapTitle] = useState("");

  useEffect(() => {
    axios
      .get("/api/maps", {
        params: {
          id: mapId,
        },
      })
      .then((response) => {
        setMapTitle(response.data.objects[0].title);
      });
  }, [mapId]);
  return (
    <IonContent fullscreen>
      <PageHeader title={mapTitle} />
      <iframe
        title="Map View"
        width="100%"
        height="90%"
        src={`https://summit2020.cartoview.net/maps/${mapId}/embed`}
      ></iframe>
    </IonContent>
  );
};

export default MapDetails;
