import { getContext, setContext } from 'svelte';
import type { MapContext, MarkerContext, LayerGroupContext } from './types.ts';

// Map
export const MapContextKey = Symbol();
export const useProvideMap = (state: MapContext) => {
	setContext<MapContext>(MapContextKey, state);
};

export const useConsumeMap = (): MapContext => {
	return getContext<MapContext>(MapContextKey);
};

// Marker
export const MarkerContextKey = Symbol();
export const useProvideMarker = (state: MarkerContext) => {
	setContext<MarkerContext>(MarkerContextKey, state);
};

export const useConsumeMarker = (): MarkerContext => {
	return getContext<MarkerContext>(MarkerContextKey);
};

// LayerGroup
export const LayerGroupContextKey = Symbol();
export const useProvideLayerGroup = (state: LayerGroupContext) => {
	setContext<LayerGroupContext>(LayerGroupContextKey, state);
};
export const useConsumeLayerGroup = (): LayerGroupContext => {
	return getContext<LayerGroupContext>(LayerGroupContextKey);
};
