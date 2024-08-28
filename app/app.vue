<script setup lang="ts">
const fullName = ref('')
const jobTitle = ref('')
const company = ref('')
const email = ref('')
const phone = ref('')
const imagePreview = ref('')
const copyButtonText = ref('Copy Signature')

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select an image file')
      e.target.value = ''
    }
  }
}

const generateSignatureHTML = computed(() => {
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333333;">
      <tr>
        <td style="vertical-align: top; padding-right: 15px;">
          ${imagePreview.value ? `<img src="${imagePreview.value}" alt="Profile Picture" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">` : ''}
        </td>
        <td style="vertical-align: top;">
          <strong style="font-size: 16px; color: #000000;">${fullName.value}</strong><br>
          ${jobTitle.value}<br>
          ${company.value}<br>
          ${email.value}<br>
          ${phone.value}
        </td>
      </tr>
    </table>
  `
})

const copySignature = async () => {
  try {
    await navigator.clipboard.writeText(generateSignatureHTML.value)
    copyButtonText.value = 'Copied!'
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
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-semibold mb-6 text-center">Email Signature Generator</h1>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="flex flex-col">
                <label class="leading-loose">Profile Picture</label>
                <input type="file" @change="onFileChange" accept="image/*" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                <img v-if="imagePreview" :src="imagePreview" alt="Profile Picture Preview" class="mt-2 w-24 h-24 object-cover rounded-full">
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Full Name</label>
                <input type="text" v-model="fullName" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="John Doe">
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Job Title</label>
                <input type="text" v-model="jobTitle" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Software Engineer">
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Company</label>
                <input type="text" v-model="company" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Acme Inc.">
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Email</label>
                <input type="email" v-model="email" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="john@example.com">
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Phone</label>
                <input type="tel" v-model="phone" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="+1 (555) 123-4567">
              </div>
            </div>
            <div class="pt-4 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <p class="text-gray-900">Signature Preview</p>
              <div class="mt-2 p-4 border rounded-md">
                <div class="flex items-center space-x-4">
                  <img v-if="imagePreview" :src="imagePreview" alt="Profile Picture" class="w-16 h-16 object-cover rounded-full">
                  <div class="text-sm">
                    <p class="font-bold text-gray-900">{{ fullName }}</p>
                    <p class="text-gray-600">{{ jobTitle }}</p>
                    <p class="text-gray-600">{{ company }}</p>
                    <p class="text-gray-600">{{ email }}</p>
                    <p class="text-gray-600">{{ phone }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <button
                  @click="copySignature"
                  class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  :disabled="!fullName"
                  :class="{ 'opacity-50 cursor-not-allowed': !fullName }"
                  aria-live="polite"
                >
                  {{ copyButtonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

