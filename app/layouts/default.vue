<script setup lang="ts">

</script>

<template>
  <div>
    <LayoutNavbar />
    <div style="height: calc(100vh - var(--header-height))">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
