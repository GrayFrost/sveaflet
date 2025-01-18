import type { DomEvent, Layer, Map } from 'leaflet';
import { isFunction } from './equal';

export class EventBridge<T extends Layer | Map> {
	instance: T | undefined;
	eventMap: { [eventName: string]: DomEvent.EventHandlerFn } = {};
	constructor(instance: T) {
		this.instance = instance;
	}
	addEvents(events: Record<string, any> = {}) {
		try {
			Object.entries(events).forEach(([key, value]) => {
				if (key.startsWith('on') && key.length > 2 && isFunction(value)) {
					const listenerType = key.slice(2);
					this.eventMap[listenerType] = value;
				}
			});

			this.instance?.on(this.eventMap);
		} catch (e) {
			console.error('Bind event error:', e);
		}
	}
	removeEvents() {
		if (Object.keys(this.eventMap).length !== 0) {
			this.instance?.off(this.eventMap);
			this.eventMap = {};
		}
	}
}
