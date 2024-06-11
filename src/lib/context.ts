import { getContext, setContext } from 'svelte';
import type { MapContext, LayerGroupContext, LayerContext, MarkerContext, ControlContext } from './types.ts';

// Map
export const MapContextKey = Symbol();
export const useProvideMap = (state: MapContext) => {
	setContext<MapContext>(MapContextKey, state);
};
export const useConsumeMap = (): MapContext => {
	return getContext<MapContext>(MapContextKey);
};

// Control
export const ControlContextKey = Symbol();
export const useProvideControl = (state: ControlContext) => {
	setContext<ControlContext>(ControlContextKey, state);
}
export const useConsumeControl = (): ControlContext => {
	return getContext<ControlContext>(ControlContextKey);
}

// LayerGroup
export const LayerGroupContextKey = Symbol();
export const useProvideLayerGroup = (state: LayerGroupContext) => {
	setContext<LayerGroupContext>(LayerGroupContextKey, state);
};
export const useConsumeLayerGroup = (): LayerGroupContext => {
	return getContext<LayerGroupContext>(LayerGroupContextKey);
};

// Layer
export const LayerContextKey = Symbol();
export const useProvideLayer = (state: LayerContext) => {
	setContext<LayerContext>(LayerContextKey, state);
};
export const useConsumeLayer = (): LayerContext => {
	return getContext<LayerContext>(LayerContextKey);
};

// Marker
export const MarkerContextKey = Symbol();
export const useProvideMarker = (state: MarkerContext) => {
	setContext<MarkerContext>(MarkerContextKey, state);
};
export const useConsumeMarker = (): MarkerContext => {
	return getContext<MarkerContext>(MarkerContextKey);
};
