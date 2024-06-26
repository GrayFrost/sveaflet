import { Map as LeafletMap, LayerGroup, Layer, Control } from 'leaflet';

export type ControlledLayer = {
	addLayer(layer: Layer): void;
	removeLayer(layer: Layer): void;
};

export type LeafletContextInterface = Readonly<{
	getMap: () => LeafletMap | undefined;
	getLayer?: () => ControlledLayer | LayerGroup | undefined;
	getControl?: () => Control.Layers | undefined;
	getOverlay?: () => Layer | undefined;
	// pane?: string;
}>;
