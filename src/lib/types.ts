import { type Writable } from 'svelte/store';
import { Map, Marker } from 'leaflet';

export type MapContext = Writable<Map | undefined>

export type MarkerContext = Writable<Marker | undefined>;