<script setup lang="ts">
import type { Alignment, SignatureFormData, SignatureOptions } from '~~/types'

const options = defineModel<SignatureOptions>('options', { required: true })
const data = defineModel<SignatureFormData>('data', { required: true })

function setAlign(newAlign: Alignment) {
  options.value.image.align = newAlign
}

function setImageForm(newImageForm: any) {
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
  { label: 'Socials', icon: 'lucide:share-2', slot: 'socials' },
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
  { label: 'Color', icon: 'lucide:palette', slot: 'color' },
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
        <div class="grid grid-cols-2 gap-6 rounded-md bg-neutral-950 p-4">
          <div v-for="field in fields" :key="field.name">
            <label :for="field.name" class="mb-2 block text-sm font-medium">{{ field.label }}</label>
            <UInput :id="field.name" v-model="data[field.name]" :type="field.type" />
          </div>
        </div>
      </template>
      <template #socials>
        <div class="mt-4 grid grid-cols-2 gap-6 rounded-md bg-neutral-950 p-4">
          <div v-for="social in data.socials" :key="social.title">
            <UFormField :label="social.title">
              <UInput v-model="social.url" type="text" />
            </UFormField>
          </div>
        </div>
      </template>
      <template #image>
        <div class="mt-4 grid grid-cols-2 gap-6 rounded-md bg-neutral-950 p-4">
          <UFormField label="Image URL">
            <UInput id="image" v-model="data.image" type="text" />
          </UFormField>
          <UFormField label="Image Form">
            <UButtonGroup label="Image Form" class="w-full" orientation="horizontal">
              <UButton
                v-for="form in ['circle', 'square', 'rectangle']"
                :key="form"
                :color="form === options.image.form ? 'primary' : 'neutral'"
                @click="setImageForm(form)"
              >
                {{ form }}
              </UButton>
            </UButtonGroup>
          </UFormField>
          <UFormField label="Image Size">
            <USlider
              id="imageSize"
              v-model="options.image.size"
              type="range"
              :min="40"
              :max="120"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Image Alignment">
            <UButtonGroup label="Image Alignment" class="w-full" orientation="horizontal">
              <UButton
                v-for="alignment in ['top', 'center', 'bottom']"
                :key="alignment"
                :color="alignment === options.image.align ? 'primary' : 'neutral'"
                @click="setAlign(alignment as Alignment)"
              >
                {{ alignment }}
              </UButton>
            </UButtonGroup>
          </UFormField>
        </div>
      </template>
      <template #size>
        <div class="mt-4 grid grid-cols-2 gap-6 rounded-md bg-neutral-950 p-4">
          <UFormField label="Title Size">
            <USlider
              id="titleSize"
              v-model="options.size.title"
              type="range"
              :min="12"
              :max="24"
            />
          </UFormField>
          <UFormField label="Subtitle Size">
            <USlider
              id="textSize"
              v-model="options.size.subtitle"
              type="range"
              :min="12"
              :max="24"
            />
          </UFormField>
          <UFormField label="Social Size">
            <USlider
              id="socialSize"
              v-model="options.size.social"
              type="range"
              :min="12"
              :max="24"
            />
          </UFormField>
        </div>
      </template>
      <template #color>
        <div class="mt-4 grid grid-cols-2 gap-6 rounded-md bg-neutral-950 p-4">
          <div class="flex flex-col gap-2">
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Title Color
            </span>
            <div class="flex w-full items-center gap-4">
              <UInput v-model="options.color.title" type="color" class="w-full" />
              <UTooltip text="Auto-color">
                <UCheckbox v-model="options.color.autoTitle" />
              </UTooltip>
            </div>
          </div>
          <UFormField label="Subtitle Color">
            <UInput v-model="options.color.subtitle" type="color" />
          </UFormField>
          <div class="flex flex-col gap-2">
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Background Color
            </span>
            <div class="flex w-full items-center gap-4">
              <UInput v-model="options.color.background" type="color" class="w-full" />
              <UTooltip text="Transparent">
                <UCheckbox v-model="options.color.transparent" />
              </UTooltip>
            </div>
          </div>
          <UFormField label="Social Color">
            <UInput v-model="options.color.social" type="color" />
          </UFormField>
        </div>
      </template>
      <template #gap>
        <div class="mt-4 grid grid-cols-2 gap-6 rounded-md bg-neutral-950 p-4">
          <UFormField label="Image Gap">
            <USlider
              id="gap"
              v-model="options.gap.image"
              type="range"
              :min="12"
              :max="30"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Social Gap">
            <USlider
              id="gap"
              v-model="options.gap.social"
              type="range"
              :min="0"
              :max="20"
              class="w-full"
            />
          </UFormField>
        </div>
      </template>
    </UTabs>
    <div id="copy_button" />
  </div>
</template>
