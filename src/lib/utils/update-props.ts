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
		this.prevProps = this.toRawProps(props);
	}
	firstLetterUpper(str: string) {
		return str[0].toUpperCase() + str.slice(1);
	}
	// 解构 proxy 对象,获取原始值
	toRawValue(value: any): any {
		if (!value || typeof value !== 'object') {
			return value;
		}

		if (Array.isArray(value)) {
			return value.map(item => this.toRawValue(item));
		}

		return Object.fromEntries(
			Object.entries(value).map(([key, val]) => [
				key, 
				this.toRawValue(val)
			])
		);
	}
	toRawProps(value: SvelteAllProps) {
		return this.toRawValue(value);
	}
	storeProps(props: SvelteAllProps) {
		this.prevProps = this.toRawProps(props);
	}
	updateProps(curProps: SvelteAllProps) {
		const rawCurProps = this.toRawProps(curProps)

		Object.keys(rawCurProps).forEach((key) => {
			const curVal = rawCurProps[key];
			const prevVal = this.prevProps[key];

			if (key === 'options') {
				const prevOptions = prevVal as Record<string, unknown>;
				const curOptions = curVal;

				let styles: Partial<Record<string, unknown>> = {};

				if (curOptions) {
					Object.keys(curOptions).forEach((optionKey) => {
						const curOptionVal = curOptions[optionKey];
						const prevOptionVal = prevOptions?.[optionKey];
						// @ts-expect-error key is string
						if (this.styleKeys.includes(optionKey)) {
							if (this.shouldUpdate(prevOptionVal, curOptionVal)) {
								styles[optionKey] = curOptionVal;
							}
						}
						// e.g. TileLyaer opacity directly use setOpacity
						if (this.shouldUpdate(prevOptionVal, curOptionVal)) {
							const funcName =
								optionKey === 'center' ? 'setView' : `set${this.firstLetterUpper(optionKey)}`;
							this.executeUpdate(funcName, curOptionVal);
						}
					});
				}

				if (Object.keys(styles).length) {
					this.executeUpdate('setStyle', styles);
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
		// 处理 proxy 对象
		const rawPrevVal = this.toRawValue(prevVal);
		const rawCurVal = this.toRawValue(curVal);

		if (Array.isArray(rawPrevVal) && Array.isArray(rawCurVal)) {
			return !isArrayEqual(rawPrevVal, rawCurVal);
		}

		if (isObject(rawPrevVal) && isObject(rawCurVal)) {
			return !isObjectEqual(
				rawPrevVal as Record<string, unknown>,
				rawCurVal as Record<string, unknown>
			);
		}

		return !isPrimitiveEqual(rawPrevVal, rawCurVal) && !isNil(rawCurVal);
	}
	executeUpdate(funcName: string, value: unknown) {
		// @ts-expect-error map instance update functions
		this.instance[funcName]?.(value);
	}
}
