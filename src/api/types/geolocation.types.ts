export interface GeoLocationMongoDB {
  type: 'Point';
  coordinates: [number, number];
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}
