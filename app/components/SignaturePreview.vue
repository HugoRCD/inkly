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
      <table>
        <tr>
          <td style="padding: 6px;">
            <img
              :src="data.image"
              alt="Profile Picture"
              :style="[
                options.imageForm === 'rectangle' ? { width: `${options.imageSize}px` } : {},
                options.imageForm === 'square' ? { width: `${options.imageSize}px`, height: `${options.imageSize}px` } : {},
                options.imageForm === 'circle' ? { width: `${options.imageSize}px`, height: `${options.imageSize}px`, borderRadius: `${options.imageSize}px` } : {},
                { objectFit: 'cover' },
              ]"
            >
          </td>
          <td style="padding: 6px; font-family: 'Inter', sans-serif;">
            <table>
              <tr>
                <td style="font-weight: 600; font-size: 16px;">
                  {{ data.fullName }}
                </td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #848484;">
                  {{ data.jobTitle }}
                </td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #848484;">
                  {{ data.phone }}
                </td>
              </tr>
              <tr>
                <td>
                  <table style="padding-top: 6px;">
                    <tr>
                      <td style="padding-right: 10px;">
                        <a href="https://hrcd.fr" style="font-size: 13px; color: #848484;">Portfolio</a>
                      </td>
                      <td style="padding-right: 10px;">
                        <a href="https://dub.sh/oQ44pBH" style="font-size: 13px; color: #848484;">Twitter</a>
                      </td>
                      <td style="padding-right: 10px;">
                        <a href="https://www.instagram.com/hugo.rcd_/" style="font-size: 13px; color: #848484;">Instagram</a>
                      </td>
                      <td style="padding-right: 10px;">
                        <a href="https://git.new/hugorcd" style="font-size: 13px; color: #848484;">GitHub</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <UButton :label="!copied ? copyButtonText : 'Copied!'" color="primary" :disabled="copied" @click="copyToClipboard()" />
  </div>
</template>

