import { describe, expect, test, vi } from 'vitest';
import { latLngBounds } from 'leaflet';
import { Compare } from '../../lib/utils/update-props';

describe('utils/update-props', () => {
	test('preserves Leaflet bounds instances when updating props', () => {
		const prevBounds = latLngBounds([
			[51.49, -0.1],
			[51.5, -0.08]
		]);
		const curBounds = latLngBounds([
			[51.5, -0.11],
			[51.51, -0.09]
		]);
		const instance = {
			setBounds: vi.fn()
		};
		const compare = new Compare(instance, { bounds: prevBounds });

		compare.updateProps({ bounds: curBounds });

		expect(instance.setBounds).toHaveBeenCalledWith(curBounds);
		expect(instance.setBounds.mock.calls[0][0].getNorthEast()).toEqual(curBounds.getNorthEast());
	});
});
