import { describe, expect, test, vi } from 'vitest';
import { writable, get } from 'svelte/store';
import { Compare } from '../../lib/utils/update-props';
import { render } from '@testing-library/svelte';
import MapTest from '../ui/Map.test.svelte';

describe('utils/update-props', () => {
	test('Compare is a class', () => {
		const compare = new Compare();
		expect(compare).toBeInstanceOf(Compare);
	});

	describe('Map update', () => {
		test('setView will call when update center from [51.505, -0.09] to [51.505, -0.08]', async () => {
			const instanceStore = writable();
			let center = [51.505, -0.09];
			let zoom = 13;
			const options = {
				center,
				zoom
			};
			const { rerender } = render(MapTest, { instanceStore, options });
			const instance = get(instanceStore);
			let newCenter = [51.505, -0.08];
			const newOptions = {
				center: newCenter,
				zoom
			};
			const setViewFn = vi.spyOn(instance, 'setView');
			const setZoomFn = vi.spyOn(instance, 'setZoom');
			await rerender({ options: newOptions })
			expect(setViewFn).toBeCalled();
			expect(setZoomFn).toBeCalled();
		});
	});
});
