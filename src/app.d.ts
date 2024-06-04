// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'leaflet?client' {
	import all from 'leaflet'
	export = all
}

declare module '*?client'
declare module '*?server'

export {};
