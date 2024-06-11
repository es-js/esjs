<script setup lang="ts">
import ExampleCategoryItems from '~/components/examples/ExampleCategoryItems.vue'
import { isDark } from '~/composables/dark'

const emit = defineEmits(['open', 'close'])

const isOpen = ref(false)

const categories = [
  {
    key: 'basicos',
    label: 'Básicos',
    description: 'Ejemplos básicos',
  },
  {
    key: 'algoritmos',
    label: 'Algoritmos',
    description: 'Ejemplos de algoritmos',
  },
  {
    key: 'advanced',
    label: 'Avanzados',
    description: 'Ejemplos avanzados',
  },
  {
    key: 'libraries',
    label: 'Librerías',
    description: 'Ejemplos con librerías',
  },
  {
    key: 'frameworks',
    label: 'Frameworks',
    description: 'Ejemplos con frameworks',
  },
]

const selectedCategory = ref(categories[0])

function openModal() {
  isOpen.value = true

  emit('open')
}

function closeModal() {
  isOpen.value = false

  emit('close')
}

async function loadItems(category: any) {
  const response = await fetch(`https://api.github.com/repos/es-js/ejemplos/contents/editor/${category.key}`)
  const items = await response.json()

  category.items = items.map((item: any) => {
    return {
      name: item.name.replace('.esjs', ''),
      url: item.download_url,
    }
  })
}
</script>

<template>
  <div>
    <AppButton
      label="Ejemplos"
      icon="i-mdi-rocket-launch-outline"
      block
      variant="soft"
      color="black"
      @click="openModal"
    />

    <UModal
      v-model="isOpen"
      :ui="{ width: 'sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl' }"
      @close="closeModal"
    >
      <UCard
        :ui="{
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          base: 'h-full flex flex-col overflow-hidden',
          body: {
            base: 'flex h-[60vh]',
          }
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Ejemplos en EsJS
            </h3>
            <UButton
              variant="ghost"
              icon="i-mdi-close"
              @click="closeModal"
            />
          </div>
        </template>

        <div class="flex flex-1 flex-row space-x-2 sm:space-x-4">
          <div class="flex flex-col w-full max-w-[13rem] bg-gray-50 dark:bg-gray-800">
            <div
              v-for="category in categories"
              :key="category.key"
            >
              <UButton
                :label="category.label"
                :block="true"
                :color="selectedCategory.key === category.key ? 'primary' : (isDark ? 'black' : 'white')"
                variant="soft"
                @click="selectedCategory = category"
              />
            </div>
          </div>

          <div class="flex flex-col flex-1 overflow-y-auto">
            <ExampleCategoryItems
              :key="selectedCategory.key"
              :category="selectedCategory.key"
              @close="closeModal"
            />
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
