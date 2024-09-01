<script setup lang="ts">
import type { Signature } from '~~/types'

const { data, options } = defineProps<Signature>()

const toast = useToast()

const copyButtonText = ref('Copy Signature')

const signatureContainer = ref<HTMLElement>()

const { copy, copied } = useClipboard({ source: () => signatureContainer.value.innerHTML, copiedDuring: 2000 })

function copyToClipboard() {
  try {
    copy()
    toast.add({
      title: 'Copied!',
      description: 'Signature copied to clipboard',
      icon: 'lucide:clipboard-check',
      variant: 'success',
      timeout: 2000,
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to copy signature to clipboard',
      icon: 'lucide:alert-circle',
      variant: 'danger',
      timeout: 2000,
    })
  }
}
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center space-y-4 px-4">
    <div ref="signatureContainer" class="w-full rounded-md p-4">
      <ClientOnly>
        <table>
          <tbody>
            <tr>
              <td style="padding: 6px;">
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
              <td style="padding: 6px; font-family: 'Inter', sans-serif;" :style="{ fontSize: `${options.size.subtitle}px`, color: `${options.color.subtitle}` }">
                <table :style="{ fontSize: `${options.size.subtitle}px` }">
                  <tr>
                    <td :style="{ fontWeight: '600', fontSize: `${options.size.title}px`, color: `${options.color.title}` }">
                      {{ data.fullName }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {{ data.jobTitle }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {{ data.phone }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table style="padding-top: 6px;">
                        <tbody>
                          <tr :style="{ fontSize: `${options.size.social}px` }">
                            <td style="padding-right: 10px;">
                              <a href="https://hrcd.fr">Portfolio</a>
                            </td>
                            <td style="padding-right: 10px;">
                              <a href="https://dub.sh/oQ44pBH">Twitter</a>
                            </td>
                            <td style="padding-right: 10px;">
                              <a href="https://www.instagram.com/hugo.rcd_/">Instagram</a>
                            </td>
                            <td style="padding-right: 10px;">
                              <a href="https://git.new/hugorcd">GitHub</a>
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
          <div class="h-28" />
        </template>
      </ClientOnly>
    </div>
    <UButton :label="!copied ? copyButtonText : 'Copied!'" color="primary" :disabled="copied" @click="copyToClipboard()" />
  </div>
</template>

