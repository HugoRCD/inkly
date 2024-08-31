<script setup lang="ts">
import type { SignatureFormData, SignatureOptions } from '~~/types'

const fields = [
  { name: 'image', label: 'Profile Picture', type: 'text' },
  { name: 'fullName', label: 'Full Name', type: 'text' },
  { name: 'jobTitle', label: 'Job Title', type: 'text' },
  { name: 'company', label: 'Company', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
]

const data = ref<SignatureFormData>({
  image: 'https://avatars.githubusercontent.com/u/71938701?v=4',
  fullName: 'Hugo Richard',
  jobTitle: 'Développeur Web / Directeur Artistique',
  company: 'Apple',
  email: 'hrichard206@gmail.com',
  phone: '0621562218',
})

const options = ref<SignatureOptions>({
  gap: 10,
  imageForm: 'circle',
  imageSize: 80,
  textGap: 0,
  titleSize: 20,
  titleColor: '#000000',
  textSize: 14,
  textColor: '#111111',
  backgroundColor: '#ffffff',
  align: 'center',
})

const theme = ref('light')
</script>

<template>
  <div class="flex h-full flex-col justify-center bg-black text-white">
    <div class="relative flex flex-1 flex-col gap-8 bg-gray-900 p-5 shadow-lg">
      <div>
        <h2 class="mb-2 block text-sm font-medium">
          Personal Information
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="field in fields" :key="field.name">
            <label :for="field.name" class="mb-2 block text-sm font-medium">{{ field.label }}</label>
            <UInput :id="field.name" v-model="data[field.name]" :type="field.type" />
          </div>
        </div>
      </div>
      <SettingsOption v-model="options" />
    </div>
    <div class="relative flex flex-1 flex-col items-center justify-center" :class="theme === 'light' ? 'text-white bg-black' : 'text-black bg-white'">
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

<style scoped>

</style>
