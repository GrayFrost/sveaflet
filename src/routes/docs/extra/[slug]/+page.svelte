<script lang="ts">
  interface Props {
    data: DocData;
  }

  let { data }: Props = $props();
</script>

<data.content />
