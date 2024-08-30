<script setup lang="ts">
import type { Alignment, SignatureFormData, SignatureOptions } from '~~/types'

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
  textColor: '#000000',
  backgroundColor: '#ffffff',
  align: 'center',
})

function setAlign(newAlign: Alignment) {
  options.value.align = newAlign
}
</script>

<template>
  <Html class="h-full">
    <Body class="h-screen">
      <LayoutNavbar />
      <div class="flex justify-center bg-black text-white">
        <div class="relative mx-auto flex-1 bg-gray-900 p-5 shadow-lg sm:max-w-xl">
          <div class="space-y-6">
            <div v-for="field in fields" :key="field.name">
              <label :for="field.name" class="mb-2 block text-sm font-medium">{{ field.label }}</label>
              <UInput :id="field.name" v-model="data[field.name]" :type="field.type" />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">Customization</label>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="fontSize" class="mb-1 block text-xs">Font Size</label>
                  <URange
                    id="fontSize"
                    v-model="options.fontSize"
                    type="range"
                    :min="12"
                    :max="24"
                  />
                </div>
                <div>
                  <label for="gap" class="mb-1 block text-xs">Gap</label>
                  <URange
                    id="gap"
                    v-model="options.gap"
                    type="range"
                    :min="0"
                    :max="20"
                    class="w-full"
                  />
                </div>
                <div>
                  <label for="imageSize" class="mb-1 block text-xs">Image Size</label>
                  <URange
                    id="imageSize"
                    v-model="options.imageSize"
                    type="range"
                    :min="40"
                    :max="120"
                    class="w-full"
                  />
                </div>
                <div>
                  <label for="textColor" class="mb-1 block text-xs">Text Color</label>
                  <UInput id="textColor" v-model="options.textColor" type="color" />
                </div>
                <div class="flex flex-col">
                  <label for="backgroundColor" class="mb-1 block text-xs">Background Color</label>
                  <UInput id="backgroundColor" v-model="options.backgroundColor" type="color" />
                </div>
                <div>
                  <label for="align" class="mb-1 block text-xs">Alignment</label>
                  <UButtonGroup label="Alignment" class="w-full" orientation="horizontal">
                    <UButton
                      v-for="alignment in ['top', 'center', 'bottom']"
                      :key="alignment"
                      :color="alignment === options.align ? 'primary' : 'gray'"
                      @click="setAlign(alignment)"
                    >
                      {{ alignment }}
                    </UButton>
                  </UButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-col items-center justify-center">
          <SignaturePreview
            :data
            :options
          />
        </div>
      </div>
      <UNotifications />
    </Body>
  </Html>
</template>
