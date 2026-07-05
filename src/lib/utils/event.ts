import type { DomEvent, Layer, Map } from 'leaflet';
import { isFunction } from './equal';

type EventProps = Record<string, unknown>;

export class EventBridge<T extends Layer | Map> {
	instance: T | undefined;
	eventMap: { [eventName: string]: DomEvent.EventHandlerFn } = {};
	constructor(instance: T) {
		this.instance = instance;
	}
	getListenerType(propName: string) {
		return propName.slice(2).toLowerCase();
	}
	addEvents(events: EventProps = {}) {
		try {
			Object.entries(events).forEach(([key, value]) => {
				if (key.startsWith('on') && key.length > 2 && isFunction(value)) {
					const listenerType = this.getListenerType(key);
					this.eventMap[listenerType] = value as DomEvent.EventHandlerFn;
				}
			});

			this.instance?.on?.(this.eventMap);
		} catch (e) {
			console.error('Bind event error:', e);
		}
	}
	removeEvents() {
		if (Object.keys(this.eventMap).length !== 0) {
			this.instance?.off?.(this.eventMap);
			this.eventMap = {};
		}
	}
}
