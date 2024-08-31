<script setup lang="ts">
import type { Alignment, SignatureOptions } from '~~/types'

const options = defineModel<SignatureOptions>({})

function setAlign(newAlign: Alignment) {
  options.value.align = newAlign
}

function setImageForm(newImageForm: ImageForm) {
  options.value.imageForm = newImageForm
}
</script>

<template>
  <div>
    <h2 class="mb-2 block text-sm font-medium">
      Customization
    </h2>
    <div class="flex flex-col gap-4">
      <div>
        <h2 class="mb-2 block text-sm font-medium">
          Font Size
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Title Size">
            <URange
              id="titleSize"
              v-model="options.titleSize"
              type="range"
              :min="12"
              :max="24"
            />
          </UFormGroup>
          <UFormGroup label="Text Size">
            <URange
              id="textSize"
              v-model="options.textSize"
              type="range"
              :min="12"
              :max="24"
            />
          </UFormGroup>
        </div>
      </div>
      <div>
        <h2 class="mb-2 block text-sm font-medium">
          Gap
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Text Gap">
            <URange
              id="textGap"
              v-model="options.textGap"
              type="range"
              :min="0"
              :max="20"
              class="w-full"
            />
          </UFormGroup>
          <UFormGroup label="Gap">
            <URange
              id="gap"
              v-model="options.gap"
              type="range"
              :min="0"
              :max="20"
              class="w-full"
            />
          </UFormGroup>
        </div>
      </div>
      <div>
        <h2 class="mb-2 block text-sm font-medium">
          Image
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Image Form">
            <UButtonGroup label="Image Form" class="w-full" orientation="horizontal">
              <UButton
                v-for="form in ['circle', 'square', 'rectangle']"
                :key="form"
                :color="form === options.imageForm ? 'primary' : 'gray'"
                @click="setImageForm(form)"
              >
                {{ form }}
              </UButton>
            </UButtonGroup>
          </UFormGroup>
          <UFormGroup label="Image Size">
            <URange
              id="imageSize"
              v-model="options.imageSize"
              type="range"
              :min="40"
              :max="120"
              class="w-full"
            />
          </UFormGroup>
        </div>
      </div>
      <div>
        <h2 class="mb-2 block text-sm font-medium">
          Colors
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Title Color">
            <UInput id="titleColor" v-model="options.titleColor" type="color" />
          </UFormGroup>
          <UFormGroup label="Text Color">
            <UInput id="textColor" v-model="options.textColor" type="color" />
          </UFormGroup>
          <UFormGroup label="Background Color">
            <UInput id="backgroundColor" v-model="options.backgroundColor" type="color" />
          </UFormGroup>
        </div>
      </div>
      <div>
        <h2 class="mb-2 block text-sm font-medium">
          Alignment
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Alignment">
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
          </UFormGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
