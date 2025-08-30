import { LocationObject } from "expo-location";

const radiansToDegrees = (angle: number) => {
  return angle * (180 / Math.PI);
};

const degreesToRadians = (angle: number) => {
  return angle * (Math.PI / 180);
};

const latitudesToKM = (latitudes: number) => {
  return latitudes * 110.574;
};

const kMToLatitudes = (km: number) => {
  return km / 110.574;
};

const longitudesToKM = (longitudes: number, atLatitude: number) => {
  return longitudes * 111.32 * Math.cos(degreesToRadians(atLatitude));
};

export const kMToLongitudes = (km: number, atLatitude: number) => {
  return (km * 0.0089831) / Math.cos(degreesToRadians(atLatitude));
};

export const isValidCoordinates = (location: LocationObject) => {
  return (
    location.coords &&
    typeof location.coords.latitude === "number" &&
    typeof location.coords.longitude === "number" &&
    !isNaN(location.coords.latitude) &&
    !isNaN(location.coords.longitude)
  );
};

export const toNumber5DP = (str: string) => {
  const num = Number(str);
  if (isNaN(num)) return 0; // fallback for invalid strings
  return Math.round(num * 1e5) / 1e5; // round to 5 decimal places
}