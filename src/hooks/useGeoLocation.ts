import { useEffect, useState } from "react";
import axios from "axios";

function useGeoLocation() {
  const [location, setLocation] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position: any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      } catch (error) {
        setError(error);
      }
    };

    if (!location) {
      getCurrentLocation();
    } else {
      const { latitude, longitude } = location;
      const apiKey = "AIzaSyD7bARiUKUXtiNSaKdiuMj8xC8otWvw_6M"; // Replace with your Google Maps Geocoding API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          const addressComponents = data.results[0].address_components;
          const postalCode = addressComponents.find((component: any) =>
            component.types.includes("postal_code")
          );
          setAddress(postalCode.short_name);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [location]);

  return { location, address, error };
}

export default useGeoLocation;
