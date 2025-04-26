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
    border: false,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderWidth: 1,
    shadow: false,
    shadowIntensity: 2
  },
  font: {
    family: 'inter',
    titleWeight: '600'
  }
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

const emailSubject = 'Professionnal Email Signature'
const emailContent = ref(`Hello,

I'm pleased to share with you my new email signature created with Inkly.
Feel free to reach out if you have any questions!

Best regards,`)

const isMobile = ref(false)
const showSidebar = ref(true)

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024
    if (isMobile.value) {
      showSidebar.value = false
    } else {
      showSidebar.value = true
    }
  }
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  return () => {
    window.removeEventListener('resize', checkMobile)
  }
})
</script>

<template>
  <div class="flex h-full flex-col lg:flex-row">
    <div 
      v-if="showSidebar" 
      class="w-full lg:w-80 h-full overflow-y-auto border-r border-neutral-800 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 flex flex-col"
    >
      <div class="sticky top-0 z-10 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <h2 class="text-sm font-medium">
          Signature Settings
        </h2>
        <UButton 
          icon="i-lucide-x" 
          color="neutral" 
          variant="ghost" 
          class="lg:hidden"
          size="xs"
          @click="showSidebar = false"
        />
      </div>
      <div class="p-4">
        <SettingsOption v-model:options="options" v-model:data="data" />
      </div>
    </div>

    <div class="lg:hidden fixed bottom-4 right-4 z-20">
      <UButton 
        v-if="!showSidebar"
        icon="i-lucide-settings"
        color="neutral" 
        variant="solid"
        size="lg"
        class="shadow-lg" 
        @click="showSidebar = true"
      />
    </div>

    <div class="relative flex-1 h-full overflow-auto bg-neutral-100 dark:bg-black">
      <div class="absolute right-4 top-4 z-10 flex gap-2">
        <UTooltip :text="theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'">
          <UButton
            :icon="theme === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            color="neutral"
            variant="ghost"
            size="xs"
            @click="theme = theme === 'dark' ? 'light' : 'dark'"
          />
        </UTooltip>
      </div>

      <div class="h-full p-4 flex flex-col">
        <div class="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-900 h-full flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div class="bg-neutral-100 dark:bg-neutral-800 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center">
                <h3 class="font-medium text-sm">
                  {{ emailSubject }}
                </h3>
                <div class="flex gap-1">
                  <UIcon name="i-lucide-archive" class="text-neutral-500 dark:text-neutral-400 text-sm" />
                  <UIcon name="i-lucide-trash" class="text-neutral-500 dark:text-neutral-400 text-sm" />
                  <UIcon name="i-lucide-reply" class="text-neutral-500 dark:text-neutral-400 text-sm" />
                </div>
              </div>
              <div class="flex items-center gap-2">
                <UAvatar
                  :src="data.image"
                  :alt="data.fullName"
                  size="xs"
                />
                <div class="text-xs">
                  <span class="font-medium">{{ data.fullName }}</span>
                  <span class="text-neutral-500 dark:text-neutral-400"> ({{ data.email || 'email@example.com' }})</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-5 flex-1 overflow-auto" :class="theme === 'light' ? 'bg-white text-black' : 'bg-neutral-900 text-white'">
            <div class="max-w-2xl space-y-6">
              <div class="whitespace-pre-line text-sm">
                {{ emailContent }}
              </div>

              <SignaturePreview
                :data
                :options
                :theme
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
