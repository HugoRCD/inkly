<script setup lang="ts">
import type { Signature } from '~~/types'

const props = defineProps<Signature & { theme?: string }>()
const { data, options, theme = 'dark' } = props

const toast = useToast()
const signatureContainer = ref<HTMLElement>()

const { copy, copied } = useClipboard({ 
  source: () => signatureContainer.value!.innerHTML, 
  copiedDuring: 1000 
})

function copyToClipboard() {
  try {
    copy()
    toast.add({
      title: 'Signature copied to clipboard!',
      description: 'You can now paste it in your email client.',
      icon: 'i-heroicons-clipboard-document-check',
      color: 'green',
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
              <td 
                style="padding: 6px;" 
                :style="[
                  { width: `${options.image.size + options.gap.image}px` },
                  options.image.align === 'top' ? { verticalAlign: 'top' } : {},
                  options.image.align === 'center' ? { verticalAlign: 'middle' } : {},
                  options.image.align === 'bottom' ? { verticalAlign: 'bottom' } : {},
                ]"
              >
                <img
                  :src="data.image"
                  alt="Profile Picture"
                  :style="[
                    options.image.form === 'rectangle' ? { width: `${options.image.size}px` } : {},
                    options.image.form === 'square' ? { width: `${options.image.size}px`, height: `${options.image.size}px` } : {},
                    options.image.form === 'circle' ? { width: `${options.image.size}px`, height: `${options.image.size}px`, borderRadius: `${options.image.size}px` } : {},
                    { objectFit: 'cover' },
                    options.image.border ? {
                      border: `${options.image.borderWidth}px ${options.image.borderStyle} ${options.image.borderColor}`,
                    } : {},
                    options.image.shadow ? {
                      boxShadow: `0 ${options.image.shadowIntensity * 2}px ${options.image.shadowIntensity * 4}px -${options.image.shadowIntensity}px rgb(0 0 0 / ${options.image.shadowIntensity * 0.05})`
                    } : {},
                  ]"
                >
              </td>
              <td
                style="padding: 6px;"
                :style="[
                  { fontSize: `${options.size.subtitle}px` }
                ]"
                :class="[
                  options.font.family === 'inter' ? 'font-inter' :
                  options.font.family === 'sf' ? 'font-sf' :
                  options.font.family === 'roboto' ? 'font-roboto' :
                  'font-arial'
                ]"
              >
                <table :style="{ fontSize: `${options.size.subtitle}px` }">
                  <tr v-if="data.fullName">
                    <td
                      :style="[
                        { 
                          fontSize: `${options.size.title}px`,
                          color: options.color.autoTitle ? '' : options.color.title,
                          fontWeight: options.font.titleWeight
                        }
                      ]"
                    >
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

    <div class="flex justify-center mt-6">
      <UButton
        size="lg"
        color="primary"
        variant="solid"
        :icon="copied ? 'i-heroicons-clipboard-document-check' : 'i-heroicons-clipboard-document'"
        :label="copied ? 'Copied!' : 'Copy Signature'"
        @click="copyToClipboard()"
      />
    </div>
  </div>
</template>

