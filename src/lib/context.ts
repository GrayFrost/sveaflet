import { getContext, setContext } from 'svelte';
import type { MapContext, MarkerContext } from './types.ts';

export const MapContextKey = Symbol();
export const useProvideMap = (state: MapContext) => {
	setContext<MapContext>(MapContextKey, state);
};

export const useConsumeMap = (): MapContext => {
	return getContext<MapContext>(MapContextKey);
};

export const MarkerContextKey = Symbol();
export const useProvideMarker = (state: MarkerContext) => {
	setContext<MarkerContext>(MarkerContextKey, state);
};

export const useConsumeMarker = (): MarkerContext => {
	return getContext<MarkerContext>(MarkerContextKey);
};
