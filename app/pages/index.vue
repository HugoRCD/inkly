<script setup lang="ts">
import type { SignatureFormData, SignatureOptions } from '~~/types'

const options = ref<SignatureOptions>({
  gap: {
    title: 10,
    subtitle: 10,
    social: 10,
    image: 10,
  },
  size: {
    title: 16,
    subtitle: 14,
    social: 14,
  },
  color: {
    title: '#000000',
    autoTitle: true,
    subtitle: '#848484',
    social: '#848484',
    background: '#ffffff',
    transparent: true,
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
  jobTitle: 'Software Engineer at Nuxtlabs',
  company: '',
  email: '',
  phone: '(+33) 6 00 00 00 00',
  socials: [
    {
      title: 'Portfolio',
      url: 'https://hrcd.fr',
      type: 'portfolio',
    },
    {
      title: 'Twitter',
      url: 'https://dub.sh/oQ44pBH',
      type: 'twitter',
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/hugo.rcd_/',
      type: 'instagram',
    },
    {
      title: 'GitHub',
      url: 'https://git.new/hugorcd',
      type: 'github',
    },
  ],
})

const theme = ref('dark')
</script>

<template>
  <div class="flex h-full flex-col bg-black text-white">
    <div class="relative flex flex-col gap-8 bg-neutral-900 p-5 shadow-lg">
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
