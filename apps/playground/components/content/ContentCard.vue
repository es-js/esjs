<script setup lang="ts">
defineProps<{
  to: string
  icon?: string
  title: string
  description: string
  wip?: boolean
}>()
</script>

<template>
  <div
    class="flex-1 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary relative block"
  >
    <!-- Just to make sure the icon is loaded -->
    <UIcon v-if="false" name="i-mdi-shape-outline" />

    <UIcon
      v-if="icon"
      :name="icon"
      class="my-2 h-8 w-8 text-gray-800 dark:text-gray-200"
    />

    <div class="my-0 text-lg font-semibold">
      <h2 class="text-lg my-1">
        {{ title }}
        <sup
          v-if="wip"
          class="px-1 text-sm font-normal rounded bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300"
        >
          Próximamente
        </sup>
      </h2>
    </div>

    <div>
      <p class="my-1">
        {{ description }}
      </p>
      <slot />
    </div>

    <NuxtLink :to="to" class="absolute inset-0" />
  </div>
</template>
