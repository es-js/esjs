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
    class="h-full flex flex-row justify-center items-center text-xs px-2.5 py-1.5 space-x-1.5 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-b-2"
    :class="{
      'border-indigo-700 dark:border-indigo-500': props.active,
      'border-transparent': !props.active,
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
