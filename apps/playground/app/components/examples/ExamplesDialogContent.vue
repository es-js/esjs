<script setup lang="ts">
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import ExampleCategoryItems from '~/components/examples/ExampleCategoryItems.vue'
import { isDark } from '~/composables/dark'

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
</script>

<template>
  <DialogContent class="w-full max-w-2xl h-[90dvh] md:h-[60dvh] grid-rows-[auto_minmax(0,1fr)]">
    <DialogHeader>
      <DialogTitle>
        Ejemplos en EsJS
      </DialogTitle>
    </DialogHeader>

    <div class="flex flex-1 flex-row space-x-2 sm:space-x-4">
      <div class="flex flex-col w-full max-w-[13rem] bg-gray-50 dark:bg-gray-800">
        <div
          v-for="category in categories"
          :key="category.key"
        >
          <AppButton
            :text="category.label"
            :color="selectedCategory.key === category.key ? 'primary' : (isDark ? 'black' : 'white')"
            variant="secondary"
            prevent-tooltip
            class="w-full"
            @click="selectedCategory = category"
          />
        </div>
      </div>

      <div class="flex flex-col flex-1 overflow-y-auto">
        <ExampleCategoryItems :key="selectedCategory.key" :category="selectedCategory.key" />
      </div>
    </div>
  </DialogContent>
</template>
