import { DomEvent } from 'leaflet';
import { isFunction } from './equal';

export const bindEvents = (el: HTMLElement, values: Record<string, any> = {}) => {
	try {
		let eventMap: { [eventName: string]: DomEvent.EventHandlerFn } = {};

		Object.entries(values).forEach(([key, value]) => {
			if (key.startsWith('on') && key.length > 2 && isFunction(value)) {
				const listenerType = key.slice(2);
				eventMap[listenerType] = value;
			}
		});

		DomEvent.on(el, eventMap);
	} catch (e) {
		console.error('Bind event error:', e);
	}
};
