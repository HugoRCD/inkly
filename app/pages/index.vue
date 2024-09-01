<script setup lang="ts">
import type { SignatureFormData, SignatureOptions } from '~~/types'

const options = ref<SignatureOptions>({
  gap: {
    title: 10,
    subtitle: 10,
    social: 10,
  },
  size: {
    title: 16,
    subtitle: 14,
    social: 14,
  },
  color: {
    title: '#000000',
    subtitle: '#848484',
    background: '#ffffff',
  },
  image: {
    align: 'center',
    form: 'circle',
    size: 90,
  },
})

const data = ref<SignatureFormData>({
  image: 'https://avatars.githubusercontent.com/u/71938701?v=4',
  fullName: 'Hugo Richard',
  jobTitle: 'Développeur Web / Directeur Artistique',
  company: 'Apple',
  email: 'hrichard206@gmail.com',
  phone: '0621562218',
})

const theme = ref('light')
</script>

<template>
  <div class="flex h-full flex-col bg-black text-white">
    <div class="relative flex flex-col gap-8 bg-gray-900 p-5 shadow-lg">
      <SettingsOption v-model:options="options" v-model:data="data" />
    </div>
    <div class="relative flex h-full flex-col items-center justify-center" :class="theme === 'light' ? 'text-black bg-white' : 'text-white bg-black '">
      <div class="absolute right-2 top-2 z-10 flex cursor-pointer select-none items-center gap-2">
        <UTooltip :text="theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'">
          <UIcon v-if="theme === 'dark'" name="lucide:sun" class="size-6" @click="theme = 'light'" />
          <UIcon v-else name="lucide:moon" class="size-6" @click="theme = 'dark'" />
        </UTooltip>
      </div>
      <SignaturePreview
        :data
        :options
      />
    </div>
  </div>
</template>
