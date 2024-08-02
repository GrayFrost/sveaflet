import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import Greeter from '../lib/greeter.svelte';

test('no initial greeting', () => {
	render(Greeter, { name: 'World' });

	const button = screen.getByRole('button', { name: 'Greet' });
	const greeting = screen.queryByText(/hello/iu);

	expect(button).toBeInTheDocument();
	expect(greeting).not.toBeInTheDocument();
});

test('greeting appears on click', async () => {
	const user = userEvent.setup();
	render(Greeter, { name: 'World' });

	const button = screen.getByRole('button');
	await user.click(button);
	const greeting = screen.getByText(/hello world/iu);

	expect(greeting).toBeInTheDocument();
});
