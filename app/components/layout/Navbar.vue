<script setup lang="ts">
import { useElementSize } from '@vueuse/core'

const header = ref(null)
const { height } = useElementSize(header)

onMounted(() => {
  document.documentElement.style.setProperty('--header-height', `${height.value}px`)
})
</script>

<template>
  <div ref="header" class="flex items-center justify-between bg-gray-900 px-4 py-2 shadow-lg">
    <h1 class="font-instrument text-2xl italic text-white">
      Inkly
    </h1>
    <UTooltip text="GitHub Repository">
      <NuxtLink to="https://github.com/HugoRCD/inkly" target="_blank" class="flex items-center gap-2">
        <UIcon name="lucide:github" class="size-6 cursor-pointer text-white hover:text-gray-300" />
      </NuxtLink>
    </UTooltip>
  </div>
</template>

<style scoped>
</style>
