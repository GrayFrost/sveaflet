import { getContext, setContext } from 'svelte';
import type { MapContext, LayerGroupContext, LayerContext, MarkerContext } from './types.ts';

// Map
export const MapContextKey = Symbol('MapContext');
export const useProvideMap = (state: MapContext) => {
	setContext<MapContext>(MapContextKey, state);
};
export const useConsumeMap = (): MapContext => {
	return getContext<MapContext>(MapContextKey);
};

// LayerGroup
export const LayerGroupContextKey = Symbol('LayerGroupContext');
export const useProvideLayerGroup = (state: LayerGroupContext) => {
	setContext<LayerGroupContext>(LayerGroupContextKey, state);
};
export const useConsumeLayerGroup = (): LayerGroupContext => {
	return getContext<LayerGroupContext>(LayerGroupContextKey);
};

// Layer
export const LayerContextKey = Symbol('LayerContext');
export const useProvideLayer = (state: LayerContext) => {
	setContext<LayerContext>(LayerContextKey, state);
};
export const useConsumeLayer = (): LayerContext => {
	return getContext<LayerContext>(LayerContextKey);
};

// Marker
export const MarkerContextKey = Symbol('MarkerContext');
export const useProvideMarker = (state: MarkerContext) => {
	setContext<MarkerContext>(MarkerContextKey, state);
};
export const useConsumeMarker = (): MarkerContext => {
	return getContext<MarkerContext>(MarkerContextKey);
};
