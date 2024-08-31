<script setup lang="ts">
import type { Signature } from '~~/types'

const { data, options } = defineProps<Signature>()

const toast = useToast()

const copyButtonText = ref('Copy Signature')

const generateSignatureHTML = computed(() => {
  return `
    <table style="
    font-family: Arial,
    sans-serif; font-size: ${options.fontSize}px;
    line-height: 1.4;
    color: ${options.textColor};
    background-color: ${options.backgroundColor};
    width: 100%;
    ">
      <tr>
        <td style="vertical-align: top; padding-right: ${options.gap}px;">
          ${data.image ? `<img src="${data.image}" alt="Profile Picture" style="width: ${options.imageSize}px; height: ${options.imageSize}px; border-radius: 50%; object-fit: cover;">` : ''}
        </td>
        <td style="vertical-align: top;">
          <strong style="font-size: ${options.fontSize + 2}px; color: ${options.titleColor};">${data.fullName}</strong><br>
          ${data.jobTitle}<br>
          ${data.company}<br>
          ${data.email}<br>
          ${data.phone}
        </td>
      </tr>
    </table>
  `
})

const copySignature = async () => {
  try {
    await navigator.clipboard.writeText(generateSignatureHTML.value)
    copyButtonText.value = 'Copied!'
    toast.add({ title: 'Copied!', description: 'Signature copied to clipboard', type: 'success', icon: 'lucide:clipboard-check' })
    setTimeout(() => {
      copyButtonText.value = 'Copy Signature'
    }, 2000)
  } catch (err) {
    console.error('Failed to copy signature: ', err)
    copyButtonText.value = 'Failed to copy'
  }
}
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center space-y-4 px-4">
    <div :style="{ color: options.textColor, backgroundColor: options.backgroundColor, width: `100%` }" class="rounded-md p-4">
      <div class="flex" :style="{ gap: `${options.gap}px`, alignItems: options.align }">
        <img :src="data.image" alt="Profile Picture" :style="{ width: `${options.imageSize}px`, height: `${options.imageSize}px` }" class="rounded-full object-cover">
        <div :style="{ fontSize: `${options.fontSize}px` }">
          <p class="font-bold" :style="{ color: options.titleColor }">
            {{ data.fullName }}
          </p>
          <p>{{ data.jobTitle }}</p>
          <p>{{ data.company }}</p>
          <p>{{ data.email }}</p>
          <p>{{ data.phone }}</p>
        </div>
      </div>
    </div>
    <UButton label="Copy Signature" color="primary" @click="copySignature" />
  </div>
</template>
