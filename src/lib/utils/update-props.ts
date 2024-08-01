import type { PathOptions } from 'leaflet';
import type { MapInstance } from '../types';
import { isArrayEqual, isObjectEqual, isPrimitiveEqual, isNil, isObject } from './equal';

export class Compare {
	instance: MapInstance;
	prevProps: Record<string, unknown>;
	styleKeys: Array<keyof PathOptions> = [
		'stroke',
		'color',
		'weight',
		'opacity',
		'lineCap',
		'lineJoin',
		'dashArray',
		'dashOffset',
		'fill',
		'fillColor',
		'fillOpacity',
		'fillRule',
		'renderer',
		'className'
	];
	constructor(instance: MapInstance, props: SvelteAllProps) {
		this.instance = instance;
		this.prevProps = props;
	}
	firstLetterUpper(str: string) {
		return str[0].toUpperCase() + str.slice(1);
	}
	storeProps(props: SvelteAllProps) {
		this.prevProps = props;
	}
	updateProps(curProps: SvelteAllProps) {
		Object.keys(curProps).forEach((key) => {
			const curVal = curProps[key];
			const prevVal = this.prevProps[key];
			if (key === 'options') {
				const prevOptions = prevVal as Record<string, unknown>;
				const curOptions = curVal;

				let styles: Partial<Record<string, unknown>> = {};
				Object.keys(curOptions).forEach((optionKey) => {
					const curOptionVal = curOptions?.[optionKey];
					const prevOptionVal = prevOptions?.[optionKey];
					// @ts-expect-error key is string
					if (this.styleKeys.includes(optionKey)) {
						// collect changed style
						if (this.shouldUpdate(prevOptionVal, curOptionVal)) {
							styles[optionKey] = curOptionVal;
						}
						// return;
					}
					// e.g. TileLyaer opacity directly use setOpacity
					if (this.shouldUpdate(prevOptionVal, curOptionVal)) {
						const funcName =
							optionKey === 'center' ? 'setView' : `set${this.firstLetterUpper(optionKey)}`;
						this.executeUpdate(funcName, curOptionVal);
					}
				});

				if (Object.keys(styles).length) {
					const funcName: string = 'setStyle';
					this.executeUpdate(funcName, styles);
					styles = {};
				}
				return;
			}
			if (this.shouldUpdate(prevVal, curVal)) {
				const funcName = `set${this.firstLetterUpper(key)}`;
				this.executeUpdate(funcName, curVal);
			}
		});
	}
	shouldUpdate(prevVal: unknown, curVal: unknown) {
		if (Array.isArray(prevVal) && Array.isArray(curVal)) {
			return !isArrayEqual(prevVal, curVal);
		}
		if (isObject(prevVal) && isObject(curVal)) {
			return !isObjectEqual(prevVal as Record<string, unknown>, curVal as Record<string, unknown>);
		}
		return !isPrimitiveEqual(prevVal, curVal) && !isNil(curVal);
	}
	executeUpdate(funcName: string, value: unknown) {
		// @ts-expect-error map instance update functions
		this.instance[funcName]?.(value);
	}
}
