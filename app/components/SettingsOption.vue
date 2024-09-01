<script setup lang="ts">
import type { Alignment, SignatureFormData, SignatureOptions } from '~~/types'

const options = defineModel<SignatureOptions>('options')
const data = defineModel<SignatureFormData>('data')

function setAlign(newAlign: Alignment) {
  options.value.image.align = newAlign
}

function setImageForm(newImageForm: ImageForm) {
  options.value.image.form = newImageForm
}

const fields = [
  { name: 'fullName', label: 'Full Name', type: 'text' },
  { name: 'jobTitle', label: 'Job Title', type: 'text' },
  { name: 'company', label: 'Company', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
]

const items = [
  {
    label: 'Personal Information',
    icon: 'lucide:user',
    slot: 'information',
  },
  {
    label: 'Image',
    icon: 'lucide:image',
    slot: 'image',
  },
  {
    label: 'Size',
    icon: 'lucide:ruler',
    slot: 'size',
  },
  {
    label: 'Gap',
    icon: 'lucide:grid',
    slot: 'gap',
  },
]
</script>

<template>
  <div>
    <UTabs :items>
      <template #information>
        <div class="grid grid-cols-2 gap-6 rounded-md bg-gray-950 p-4">
          <div v-for="field in fields" :key="field.name">
            <label :for="field.name" class="mb-2 block text-sm font-medium">{{ field.label }}</label>
            <UInput :id="field.name" v-model="data[field.name]" :type="field.type" />
          </div>
        </div>
      </template>
      <template #image>
        <div class="mt-4 grid grid-cols-2 gap-6 rounded-md bg-gray-950 p-4">
          <UFormGroup label="Image URL">
            <UInput id="image" v-model="data.image" type="text" />
          </UFormGroup>
          <UFormGroup label="Image Form">
            <UButtonGroup label="Image Form" class="w-full" orientation="horizontal">
              <UButton
                v-for="form in ['circle', 'square', 'rectangle']"
                :key="form"
                :color="form === options.image.form ? 'primary' : 'gray'"
                @click="setImageForm(form)"
              >
                {{ form }}
              </UButton>
            </UButtonGroup>
          </UFormGroup>
          <UFormGroup label="Image Size">
            <URange
              id="imageSize"
              v-model="options.image.size"
              type="range"
              :min="40"
              :max="120"
              class="w-full"
            />
          </UFormGroup>
          <UFormGroup label="Image Alignment">
            <UButtonGroup label="Image Alignment" class="w-full" orientation="horizontal">
              <UButton
                v-for="alignment in ['top', 'center', 'bottom']"
                :key="alignment"
                :color="alignment === options.image.align ? 'primary' : 'gray'"
                @click="setAlign(alignment)"
              >
                {{ alignment }}
              </UButton>
            </UButtonGroup>
          </UFormGroup>
        </div>
      </template>
      <template #size>
        <div class="mt-4 grid grid-cols-2 gap-6 rounded-md bg-gray-950 p-4">
          <UFormGroup label="Title Size">
            <URange
              id="titleSize"
              v-model="options.size.title"
              type="range"
              :min="12"
              :max="24"
            />
          </UFormGroup>
          <UFormGroup label="Subtitle Size">
            <URange
              id="textSize"
              v-model="options.size.subtitle"
              type="range"
              :min="12"
              :max="24"
            />
          </UFormGroup>
          <UFormGroup label="Social Size">
            <URange
              id="socialSize"
              v-model="options.size.social"
              type="range"
              :min="12"
              :max="24"
            />
          </UFormGroup>
        </div>
      </template>
      <template #gap>
        <div class="mt-4 grid grid-cols-2 gap-6 rounded-md bg-gray-950 p-4">
          <UFormGroup label="Image Gap">
            <URange
              id="gap"
              v-model="options.gap.image"
              type="range"
              :min="0"
              :max="20"
              class="w-full"
            />
          </UFormGroup>
        </div>
      </template>
    </UTabs>
  </div>
</template>
