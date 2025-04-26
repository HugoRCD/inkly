<script setup lang="ts">
import type { Signature } from '~~/types'

const props = defineProps<Signature & { theme?: string }>()
const { data, options, theme = 'dark' } = props

const toast = useToast()
const signatureContainer = ref<HTMLElement>()

const { copy, copied } = useClipboard({ 
  source: () => signatureContainer.value!.innerHTML, 
  copiedDuring: 2000 
})

function copyToClipboard() {
  try {
    copy()
    toast.add({
      title: 'Copied to clipboard',
      icon: 'i-heroicons-clipboard-document-check',
      color: 'neutral',
      timeout: 2000,
    })
  } catch (error) {
    toast.add({
      title: 'Failed to copy',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 2000,
    })
  }
}
</script>

<template>
  <div class="w-full">
    <div ref="signatureContainer" class="py-2">
      <ClientOnly>
        <table :style="options.color.transparent ? {} : { backgroundColor: `${options.color.background}` }" style="width: 100%;">
          <tbody>
            <tr>
              <td style="padding: 6px;" :style="{ width: `${options.image.size + options.gap.image}px` }">
                <img
                  :src="data.image"
                  alt="Profile Picture"
                  :style="[
                    options.image.form === 'rectangle' ? { width: `${options.image.size}px` } : {},
                    options.image.form === 'square' ? { width: `${options.image.size}px`, height: `${options.image.size}px` } : {},
                    options.image.form === 'circle' ? { width: `${options.image.size}px`, height: `${options.image.size}px`, borderRadius: `${options.image.size}px` } : {},
                    { objectFit: 'cover' },
                  ]"
                >
              </td>
              <td style="padding: 6px; font-family: 'Inter', sans-serif;" :style="{ fontSize: `${options.size.subtitle}px` }">
                <table :style="{ fontSize: `${options.size.subtitle}px` }">
                  <tr v-if="data.fullName">
                    <td :style="{ fontWeight: '600', fontSize: `${options.size.title}px`, color: options.color.autoTitle ? '' : options.color.title }">
                      {{ data.fullName }}
                    </td>
                  </tr>
                  <tr v-if="data.jobTitle" :style=" { color: `${options.color.subtitle}`}">
                    <td>
                      {{ data.jobTitle }}
                    </td>
                  </tr>
                  <tr v-if="data.company" :style=" { color: `${options.color.subtitle}`}">
                    <td :style="{ fontSize: `${options.size.subtitle}px`, color: `${options.color.subtitle}` }">
                      {{ data.company }}
                    </td>
                  </tr>
                  <tr v-if="data.email" :style=" { color: `${options.color.subtitle}`}">
                    <td :style="{ fontSize: `${options.size.subtitle}px`, color: `${options.color.subtitle}` }">
                      {{ data.email }}
                    </td>
                  </tr>
                  <tr v-if="data.phone" :style=" { color: `${options.color.subtitle}`}">
                    <td>
                      {{ data.phone }}
                    </td>
                  </tr>
                  <tr v-if="data.socials.length > 0">
                    <td>
                      <table>
                        <tbody>
                          <tr :style="{ fontSize: `${options.size.social}px` }">
                            <td v-for="social in data.socials.filter((social) => social.url)" :key="social.title" :style="{ paddingRight: `${options.gap.social}px` }">
                              <a :href="social.url" style="text-decoration: underline" :style="{ color: `${options.color.social}` }">{{ social.title }}</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <template #fallback>
          <div class="h-24 animate-pulse bg-neutral-700 rounded-md" />
        </template>
      </ClientOnly>
    </div>

    <div class="flex justify-end mt-2">
      <UButton
        label="Copy Signature"
        icon="i-heroicons-clipboard-document"
        :loading="copied"
        @click="copyToClipboard()"
      />
    </div>
  </div>
</template>

