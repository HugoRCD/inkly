<script setup lang="ts">
import type { Alignment, SignatureFormData, SignatureOptions, TabsItem } from '~~/types'

const options = defineModel<SignatureOptions>('options', { required: true })
const data = defineModel<SignatureFormData>('data', { required: true })

function setAlign(newAlign: Alignment) {
  options.value.image.align = newAlign
}

function setImageForm(newImageForm: any) {
  options.value.image.form = newImageForm
}

const items = [
  { 
    label: 'Information',
    icon: 'i-lucide-user',
    slot: 'information' as const
  },
  { 
    label: 'Socials',
    icon: 'i-lucide-share',
    slot: 'socials' as const
  },
  { 
    label: 'Image',
    icon: 'i-lucide-image',
    slot: 'image' as const
  },
  { 
    label: 'Size',
    icon: 'i-lucide-type',
    slot: 'size' as const
  },
  { 
    label: 'Color',
    icon: 'i-lucide-palette',
    slot: 'color' as const
  },
  { 
    label: 'Gap',
    icon: 'i-lucide-move-horizontal',
    slot: 'gap' as const
  }
] satisfies TabsItem[]

const fields = [
  { name: 'fullName', label: 'Full Name', type: 'text', icon: 'i-lucide-user' },
  { name: 'jobTitle', label: 'Job Title', type: 'text', icon: 'i-lucide-briefcase' },
  { name: 'company', label: 'Company', type: 'text', icon: 'i-lucide-building' },
  { name: 'email', label: 'Email', type: 'email', icon: 'i-lucide-mail' },
  { name: 'phone', label: 'Phone', type: 'tel', icon: 'i-lucide-phone' },
]

const socialIcons = {
  portfolio: 'i-lucide-globe',
  twitter: 'i-simple-icons-x',
  instagram: 'i-simple-icons-instagram',
  github: 'i-simple-icons-github',
  linkedin: 'i-simple-icons-linkedin',
}

const uid = Math.random().toString(36).substring(2, 15)
</script>

<template>
  <div>
    <UTabs :items class="w-full">
      <template #information>
        <div class="mt-4">
          <div v-for="field in fields" :key="field.name" class="mb-4">
            <label :for="field.name" class="block text-sm font-medium mb-1">{{ field.label }}</label>
            <UInput 
              :id="`${field.name}-${uid}`" 
              v-model="data[field.name]" 
              :type="field.type"
              :icon="field.icon"
            />
          </div>
        </div>
      </template>

      <template #socials>
        <div class="mt-4">
          <div v-for="social in data.socials" :key="social.title" class="mb-4">
            <label class="block text-sm font-medium mb-1">{{ social.title }}</label>
            <UInput 
              v-model="social.url" 
              type="text" 
              :icon="socialIcons[social.type] || 'i-lucide-link'"
              :placeholder="`${social.title} URL`"
              class="w-full"
            />
          </div>
        </div>
      </template>

      <template #image>
        <div class="mt-4 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Image URL</label>
            <UInput 
              id="image" 
              v-model="data.image" 
              type="text" 
              icon="i-lucide-link"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Image Shape</label>
            <UButtonGroup>
              <UButton
                v-for="form in ['circle', 'square', 'rectangle']"
                :key="form"
                size="xs"
                :color="form === options.image.form ? 'primary' : 'gray'"
                :variant="form === options.image.form ? 'solid' : 'ghost'"
                @click="setImageForm(form)"
              >
                <UIcon :name="form === 'circle' ? 'i-lucide-circle' : form === 'square' ? 'i-lucide-square' : 'i-lucide-rectangle-horizontal'" class="size-4" />
                <span class="ml-1">{{ form }}</span>
              </UButton>
            </UButtonGroup>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Image Alignment</label>
            <UButtonGroup>
              <UButton
                v-for="alignment in ['top', 'center', 'bottom']"
                :key="alignment"
                size="xs"
                :color="alignment === options.image.align ? 'primary' : 'neutral'"
                :variant="alignment === options.image.align ? 'solid' : 'ghost'"
                @click="setAlign(alignment as Alignment)"
              >
                <UIcon 
                  :name="
                    alignment === 'top' ? 'i-lucide-arrow-big-up-dash' : 
                    alignment === 'center' ? 'i-lucide-align-center-vertical' : 
                    'i-lucide-arrow-big-down-dash'
                  " 
                  class="size-4"
                />
                <span class="ml-1">{{ alignment }}</span>
              </UButton>
            </UButtonGroup>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Image Size</label>
            <div class="flex items-center gap-2">
              <USlider
                v-model="options.image.size"
                :min="40"
                :max="120"
                class="flex-1"
              />
              <UInput
                v-model.number="options.image.size"
                type="number"
                :min="40"
                :max="120"
                size="sm"
                class="w-20"
              >
                <template #trailing>
                  <span class="text-xs text-gray-500">px</span>
                </template>
              </UInput>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-medium">Image Border</label>
              <UCheckbox 
                v-model="options.image.border" 
                label="Show border" 
                :ui="{ wrapper: 'items-center gap-1.5' }"
              />
            </div>
            <div v-if="options.image.border" class="space-y-3">
              <div>
                <label class="block text-xs text-muted mb-1">Style</label>
                <UButtonGroup class="w-full">
                  <UButton
                    v-for="style in ['solid', 'dashed', 'dotted']"
                    :key="style"
                    size="xs"
                    class="flex-1"
                    :color="style === options.image.borderStyle ? 'primary' : 'neutral'"
                    :variant="style === options.image.borderStyle ? 'solid' : 'ghost'"
                    @click="options.image.borderStyle = style"
                  >
                    {{ style }}
                  </UButton>
                </UButtonGroup>
              </div>
              
              <div>
                <label class="block text-xs text-muted mb-1">Width</label>
                <div class="flex items-center gap-2">
                  <USlider
                    v-model="options.image.borderWidth"
                    :min="1"
                    :max="5"
                    class="flex-1"
                  />
                  <UInput
                    v-model.number="options.image.borderWidth"
                    type="number"
                    :min="1"
                    :max="5"
                    size="sm"
                    class="w-20"
                  >
                    <template #trailing>
                      <span class="text-xs text-muted">px</span>
                    </template>
                  </UInput>
                </div>
              </div>
              
              <div>
                <label class="block text-xs text-muted mb-1">Color</label>
                <UPopover>
                  <UButton color="neutral" variant="outline" size="sm" class="w-full">
                    <template #leading>
                      <span 
                        class="size-4 rounded-full border border-default" 
                        :style="{ backgroundColor: options.image.borderColor }"
                      />
                    </template>
                    Border Color
                  </UButton>

                  <template #content>
                    <div class="p-2 w-[240px]">
                      <UColorPicker v-model="options.image.borderColor" />
                    </div>
                  </template>
                </UPopover>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-medium">Image Shadow</label>
              <UCheckbox 
                v-model="options.image.shadow" 
                label="Add shadow" 
                :ui="{ wrapper: 'items-center gap-1.5' }"
              />
            </div>
            <div v-if="options.image.shadow" class="space-y-3">
              <div>
                <label class="block text-xs text-muted mb-1">Intensity</label>
                <USlider
                  v-model="options.image.shadowIntensity"
                  :min="1"
                  :max="5"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #size>
        <div class="mt-4 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Title Font Size</label>
            <div class="flex items-center gap-2">
              <USlider
                v-model="options.size.title"
                :min="12"
                :max="24"
                class="flex-1"
              />
              <UInput
                v-model.number="options.size.title"
                type="number"
                :min="12"
                :max="24"
                size="sm"
                class="w-20"
              >
                <template #trailing>
                  <span class="text-xs text-muted">px</span>
                </template>
              </UInput>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Subtitle Font Size</label>
            <div class="flex items-center gap-2">
              <USlider
                v-model="options.size.subtitle"
                :min="10"
                :max="18"
                class="flex-1"
              />
              <UInput
                v-model.number="options.size.subtitle"
                type="number"
                :min="10"
                :max="18"
                size="sm"
                class="w-20"
              >
                <template #trailing>
                  <span class="text-xs text-muted">px</span>
                </template>
              </UInput>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Social Font Size</label>
            <div class="flex items-center gap-2">
              <USlider
                v-model="options.size.social"
                :min="10"
                :max="18"
                class="flex-1"
              />
              <UInput
                v-model.number="options.size.social"
                type="number"
                :min="10"
                :max="18"
                size="sm"
                class="w-20"
              >
                <template #trailing>
                  <span class="text-xs text-muted">px</span>
                </template>
              </UInput>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Font Family</label>
            <USelect
              v-model="options.font.family"
              :items="[
                { label: 'Inter', value: 'inter' },
                { label: 'SF Pro', value: 'sf' },
                { label: 'Roboto', value: 'roboto' },
                { label: 'Arial', value: 'arial' }
              ]"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Title Font Weight</label>
            <USelect
              v-model="options.font.titleWeight"
              :items="[
                { label: 'Regular', value: '400' },
                { label: 'Medium', value: '500' },
                { label: 'Semi Bold', value: '600' },
                { label: 'Bold', value: '700' }
              ]"
              class="w-full"
            />
          </div>
        </div>
      </template>

      <template #color>
        <div class="mt-4 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UPopover>
                <UButton color="neutral" variant="outline" size="sm">
                  <template #leading>
                    <span 
                      class="size-4 rounded-full border border-default" 
                      :style="{ backgroundColor: options.color.title }"
                    />
                  </template>
                  Title Color
                </UButton>

                <template #content>
                  <div class="p-2 w-[240px]">
                    <UColorPicker v-model="options.color.title" />
                  </div>
                </template>
              </UPopover>

              <UCheckbox 
                v-model="options.color.autoTitle" 
                label="Auto adapt" 
                :ui="{ 
                  wrapper: 'items-center gap-1.5',
                  label: 'text-xs text-muted'
                }"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <UPopover>
              <UButton color="neutral" variant="outline" size="sm">
                <template #leading>
                  <span 
                    class="size-4 rounded-full border border-default" 
                    :style="{ backgroundColor: options.color.subtitle }"
                  />
                </template>
                Subtitle Color
              </UButton>

              <template #content>
                <div class="p-2 w-[240px]">
                  <UColorPicker v-model="options.color.subtitle" />
                </div>
              </template>
            </UPopover>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UPopover>
                <UButton color="neutral" variant="outline" size="sm">
                  <template #leading>
                    <span 
                      class="size-4 rounded-full border border-default" 
                      :style="{ 
                        backgroundColor: options.color.background,
                        opacity: options.color.transparent ? 0.5 : 1
                      }"
                    />
                  </template>
                  Background
                </UButton>

                <template #content>
                  <div class="p-2 w-[240px]">
                    <UColorPicker v-model="options.color.background" />
                  </div>
                </template>
              </UPopover>

              <UCheckbox 
                v-model="options.color.transparent" 
                label="Transparent" 
                :ui="{ 
                  wrapper: 'items-center gap-1.5',
                  label: 'text-xs text-muted'
                }"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <UPopover>
              <UButton color="neutral" variant="outline" size="sm">
                <template #leading>
                  <span 
                    class="size-4 rounded-full border border-default" 
                    :style="{ backgroundColor: options.color.social }"
                  />
                </template>
                Social Links
              </UButton>

              <template #content>
                <div class="p-2 w-[240px]">
                  <UColorPicker v-model="options.color.social" />
                </div>
              </template>
            </UPopover>
          </div>
        </div>
      </template>

      <template #gap>
        <div class="mt-4 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Image Gap</label>
            <div class="flex items-center gap-2">
              <USlider
                v-model="options.gap.image"
                :min="0"
                :max="30"
                class="flex-1"
              />
              <span class="bg-gray-200 dark:bg-neutral-800 px-2 py-1 rounded-md text-xs">
                {{ options.gap.image }}px
              </span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Social Links Gap</label>
            <div class="flex items-center gap-2">
              <USlider
                v-model="options.gap.social"
                :min="0"
                :max="20"
                class="flex-1"
              />
              <span class="bg-gray-200 dark:bg-neutral-800 px-2 py-1 rounded-md text-xs">
                {{ options.gap.social }}px
              </span>
            </div>
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>
