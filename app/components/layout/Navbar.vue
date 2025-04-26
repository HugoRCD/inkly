<script setup lang="ts">
const header = ref(null)
const { height } = useElementSize(header)

onMounted(() => {
  document.documentElement.style.setProperty('--header-height', `${height.value}px`)
})
</script>

<template>
  <div ref="header" class="flex items-center justify-between bg-neutral-900 px-4 py-2 shadow-lg">
    <h1 class="font-serif text-2xl italic text-white">
      Inkly
    </h1>
    <UTooltip text="GitHub Repository">
      <NuxtLink to="https://github.com/HugoRCD/inkly" target="_blank" class="flex items-center gap-2">
        <UButton icon="lucide:github" color="neutral" variant="ghost" />
      </NuxtLink>
    </UTooltip>
  </div>
</template>
