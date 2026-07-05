import { describe, expect, test, vi } from 'vitest';
import { EventBridge } from '../../lib/utils/event';

describe('utils/event', () => {
	test('normalizes Svelte event props to Leaflet event names', () => {
		const instance = {
			on: vi.fn(),
			off: vi.fn()
		};
		const onClick = vi.fn();
		const onMoveEnd = vi.fn();
		const bridge = new EventBridge(instance);

		bridge.addEvents({
			onClick,
			onMoveEnd,
			title: 'not an event'
		});

		expect(instance.on).toHaveBeenCalledWith({
			click: onClick,
			moveend: onMoveEnd
		});
	});

	test('keeps lowercase event props working', () => {
		const instance = {
			on: vi.fn(),
			off: vi.fn()
		};
		const onclick = vi.fn();
		const bridge = new EventBridge(instance);

		bridge.addEvents({ onclick });

		expect(instance.on).toHaveBeenCalledWith({ click: onclick });
	});
});
