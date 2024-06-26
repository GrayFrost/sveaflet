import { Map, Control, Layer } from 'leaflet';

export const setControlLayer = (params: {
	layerType: 'base' | 'overlay' | undefined;
	checked: boolean;
	map: Map;
	controlLayers: Control.Layers;
	name: string;
	layer: Layer;
}) => {
	const { layerType, checked, map, controlLayers, name, layer } = params;

	if (layerType === 'base') {
		if (checked) {
			map.addLayer(layer);
			controlLayers.addBaseLayer(layer, name);
		} else {
			controlLayers.addBaseLayer(layer, name);
		}
	} else if (layerType === 'overlay') {
		if (checked) {
			map.addLayer(layer);
			controlLayers.addOverlay(layer, name);
		} else {
			controlLayers.addOverlay(layer, name);
		}
	}
};
