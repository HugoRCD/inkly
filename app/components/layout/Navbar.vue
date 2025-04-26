<script setup lang="ts">
const header = ref(null)
const { height } = useElementSize(header)

onMounted(() => {
  document.documentElement.style.setProperty('--header-height', `${height.value}px`)
})
</script>

<template>
  <header 
    ref="header" 
    class="px-4 py-3 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
  >
    <div class="flex items-center">
      <h1 class="font-serif text-xl italic font-medium">
        Inkly
      </h1>
    </div>
    
    <div class="flex items-center gap-1">
      <NuxtLink to="https://github.com/HugoRCD/inkly" target="_blank">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
          size="xs"
        />
      </NuxtLink>
      
      <NuxtLink to="https://github.com/HugoRCD/inkly/issues/new" target="_blank">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-alert-circle"
          size="xs"
        />
      </NuxtLink>
    </div>
  </header>
</template>
