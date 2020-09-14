import { useEffect, useState } from "react";

import MESSAGES from "../../const/messages";

function useGeoLocation(props) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Location available");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          console.log({ position });
          setPosition(position);
        },
        function (error) {
          console.log({ error });
          console.error("Error Code = " + error.code + " - " + error.message);
          setError(MESSAGES.errorLocationNotAllowed);
        }
      );
    } else {
      console.log("location unavailable");
      setError(MESSAGES.errorBrowserNotCompatibleLocation);
    }
  }, []);

  return { position, error };
}

export default useGeoLocation;
