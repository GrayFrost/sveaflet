import type {
	LayerGroup,
	Layer,
	Map,
	Marker,
	Circle,
	CircleMarker,
	Control,
	ImageOverlay,
	Polygon,
	Polyline,
	Popup,
	Rectangle,
	SVGOverlay,
	TileLayer,
	Tooltip,
	VideoOverlay
} from 'leaflet';

export type MapInstance =
	| Circle
	| CircleMarker
	| Control
	| ImageOverlay
	| Map
	| Marker
	| Polygon
	| Polyline
	| Popup
	| Rectangle
	| SVGOverlay
	| TileLayer
	| Tooltip
	| VideoOverlay;

export type LeafletContextInterface = Readonly<{
	getMap: () => Map | undefined;
	getLayer?: () => LayerGroup | undefined;
	getControl?: () => Control.Layers | undefined;
	getOverlay?: () => Layer | Marker | undefined;
	// pane?: string;
}>;
