declare module '*.md' {
  import type { SvelteComponentTyped } from 'svelte';

  export default class Comp extends SvelteComponentTyped {
    $$prop_def: {};
    metadata: Record<string, any>;
  }
  export const metadata: Record<string, any>;
}
