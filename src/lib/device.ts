import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";

export async function getCurrentPosition() {
  if (Capacitor.isNativePlatform()) {
    return Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });
  }

  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
    });
  });
}
