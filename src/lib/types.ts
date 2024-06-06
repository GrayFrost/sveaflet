import { type Writable } from 'svelte/store';
import { Map, Marker, LayerGroup } from 'leaflet';

export interface MapContext {
  map: Writable<Map | undefined>;
  removeDefaultLayer: () => void;
}

export type MarkerContext = Writable<Marker | undefined>;

export type LayerGroupContext = Writable<LayerGroup | undefined>;