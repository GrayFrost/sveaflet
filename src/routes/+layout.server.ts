import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '$env/static/private';

export async function load() {
	return {
		apiKey: ALGOLIA_API_KEY,
		appId: ALGOLIA_APP_ID
	};
}
