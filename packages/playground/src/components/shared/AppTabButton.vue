<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  active: Boolean,
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="h-full flex flex-row justify-center items-center text-xs px-3.5 py-1.5 space-x-1.5 rounded"
    :class="{
      'bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-700 text-indigo-800 hover:text-indigo-700 dark:text-indigo-100 dark:hover:text-indigo-50': props.active,
      'bg-gray-50 hover:bg-indigo-200 dark:bg-gray-800 dark:hover:bg-indigo-700 text-gray-800 hover:text-indigo-700 dark:text-light-100 dark:hover:text-indigo-50': !props.active,
    }"
    @click="emit('click')"
  >
    <Icon
      :icon="props.icon"
      class="w-4 h-4"
      :class="{
        'text-indigo-500 dark:text-indigo-200': props.active,
        'dark:text-white': !props.active,
      }"
    />
    <span>{{ props.text }}</span>
  </button>
</template>
