import { type Writable } from 'svelte/store';
import { Map, LayerGroup, Layer, Marker, Control } from 'leaflet';

export type MapContext = Writable<Map | undefined>;

export type ControlLayersContext = Writable<Control.Layers | undefined>;

export type LayerGroupContext = Writable<LayerGroup | undefined>;

export type LayerContext = Writable<Layer | undefined>;

export type MarkerContext = Writable<Marker | undefined>;
