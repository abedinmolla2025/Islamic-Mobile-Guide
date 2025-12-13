// Calculate Qibla direction from user's location to Kaaba (Mecca)

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export function calculateQiblaDirection(userLat: number, userLng: number): number {
  // Convert degrees to radians
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const lat1 = toRad(userLat);
  const lng1 = toRad(userLng);
  const lat2 = toRad(KAABA_LAT);
  const lng2 = toRad(KAABA_LNG);

  const dLng = lng2 - lng1;

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  let bearing = toDeg(Math.atan2(y, x));
  bearing = (bearing + 360) % 360; // Normalize to 0-360

  return bearing;
}
