import { type Writable } from 'svelte/store';
import { Map, LayerGroup, Layer, Marker } from 'leaflet';

export interface MapContext {
  map: Writable<Map | undefined>;
  removeDefaultLayer: () => void;
}

export type LayerGroupContext = Writable<LayerGroup | undefined>;

export type LayerContext = Writable<Layer | undefined>;

export type MarkerContext = Writable<Marker | undefined>;
