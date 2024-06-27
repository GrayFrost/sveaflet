import { Map as LeafletMap, LayerGroup, Layer, Control, Marker } from 'leaflet';

// export type ControlledLayer = {
// 	addLayer(layer: Layer): void;
// 	removeLayer(layer: Layer): void;
// };

export type LeafletContextInterface = Readonly<{
	getMap: () => LeafletMap | undefined;
	getLayer?: () => LayerGroup | undefined;
	getControl?: () => Control.Layers | undefined;
	getOverlay?: () => Layer | Marker | undefined;
	// pane?: string;
}>;
