// See https://kit.svelte.dev/docs/types#app

import type { SvelteComponent } from "svelte";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	export declare const __VERSION__: string;

	export interface PageData {
		meta: {
			bredcrumb_title: string;
			component_title: string;
			description: string;
			dir: string;
			layout: string;
			title: string;
		};
		path: string;
	}

	export interface DocData extends AllPage{
		content: SvelteComponent;
		dir: string;
		title: string;
	}

	export interface AllPage {
		posts: Record<string, PageData[]>;
	}
}

export {};
