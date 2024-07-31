import type {
	Map,
	Layer,
	Marker,
	Circle,
	PathOptions,
	CircleMarker,
	Control,
	ImageOverlay,
	Polygon,
	Polyline,
	Popup,
	Rectangle,
	SVGOverlay,
	TileLayer,
} from 'leaflet';

type MapInstance =
	| Circle
	| CircleMarker
	| Control
	| ImageOverlay
	| Map
	| Marker
	| Polygon
	| Polyline
	| Popup
	| Rectangle
	| SVGOverlay
	| TileLayer;

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
		// TODO: array value compare
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
						if (curOptionVal !== prevOptionVal && curOptionVal !== undefined) {
							styles[optionKey] = curOptionVal;
						}
						return;
					}
					if (curOptionVal !== prevOptionVal && curOptionVal !== undefined) {
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
			if (curVal !== prevVal && curVal !== undefined) {
				const funcName = `set${this.firstLetterUpper(key)}`;
				this.executeUpdate(funcName, curVal);
			}
		});
	}
	executeUpdate(funcName: string, value: unknown) {
		// @ts-expect-error map instance function
		this.instance[funcName]?.(value);
	}
}
