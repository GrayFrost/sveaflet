<script lang="ts">
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
</script>

<Sidebar asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:static lg:h-auto border-e border-gray-200 dark:border-gray-600 lg:overflow-y-visible lg:pt-0 lg:block">
  <SidebarWrapper divClass="overflow-y-auto px-4 pt-20 lg:pt-0 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-8rem)] lg:block dark:bg-gray-900 lg:me-0 lg:sticky top-20">
    <nav class="font-normal text-base lg:text-sm">
      <SidebarGroup ulClass="list-unstyled fw-normal small mb-4"></SidebarGroup>
    </nav>
  </SidebarWrapper>
</Sidebar>

<main class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
  <slot />
</main>