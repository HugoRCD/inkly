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
  jobTitle: 'Developer',
  company: 'Apple',
  email: 'hrichard206@gmail.com',
  phone: '0621562218',
})

const options = ref<SignatureOptions>({
  fontSize: 14,
  gap: 10,
  imageSize: 80,
  titleColor: '#000000',
  textColor: '#111111',
  backgroundColor: '#ffffff',
  align: 'center',
})

const theme = ref('light')
</script>

<template>
  <div class="flex justify-center bg-black text-white">
    <div class="relative mx-auto flex-1 bg-gray-900 p-5 shadow-lg sm:max-w-xl">
      <div class="space-y-6">
        <div v-for="field in fields" :key="field.name">
          <label :for="field.name" class="mb-2 block text-sm font-medium">{{ field.label }}</label>
          <UInput :id="field.name" v-model="data[field.name]" :type="field.type" />
        </div>
        <SettingsOption v-model="options" />
      </div>
    </div>
    <div class="relative flex flex-1 flex-col items-center justify-center" :class="theme === 'light' ? 'text-white bg-black' : 'text-black bg-white'">
      <div class="absolute right-2 top-2 z-10 flex cursor-pointer items-center gap-2">
        <UIcon v-if="theme === 'dark'" name="lucide:sun" @click="theme = 'light'" />
        <UIcon v-else name="lucide:moon" @click="theme = 'dark'" />
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
