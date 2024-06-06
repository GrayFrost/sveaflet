import { type Writable } from 'svelte/store';
import { Map, Marker } from 'leaflet';

export interface MapContext {
  map: Writable<Map | undefined>;
  removeDefaultLayer: () => void;
}

export type MarkerContext = Writable<Marker | undefined>;