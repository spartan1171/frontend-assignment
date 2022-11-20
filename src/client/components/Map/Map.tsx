import React, { FC, useCallback, useState, memo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAc5wLk0_9ouUSuw5Q8CtSoS6rRjZAiAoA';

interface MapProps {
  center?: google.maps.LatLngLiteral;
  currentCoordinates?: google.maps.LatLngLiteral;
}

const containerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const Map: FC<MapProps> = (props: MapProps) => {
  const { center, currentCoordinates } = props;
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(defaultCenter);

      map.fitBounds(bounds);
      setMap(map);
    },
    [setMap]
  );

  const onUnmount = useCallback(
    (map: google.maps.Map) => {
      setMap(null);
    },
    [setMap]
  );

  useEffect(() => {
    if (map && center) {
      map.setCenter(center);
      map.setZoom(13);
    }
  }, [map, center]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {currentCoordinates && <Marker position={currentCoordinates} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
