export const getLngLatFromString = (gps: string): google.maps.LatLngLiteral => {
  const lngLatStringArray = gps.split('|');

  if (lngLatStringArray.length < 2) {
    return { lat: 0, lng: 0 };
  }

  return {
    lat: Number(lngLatStringArray[0]),
    lng: Number(lngLatStringArray[1]),
  };
};
