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
    class="h-full flex flex-row justify-center items-center text-xs px-3.5 py-1.5 space-x-1.5 border-b-4 hover:border-indigo-400 font-600"
    :class="{
      'border-indigo-500 text-indigo-600 dark:text-indigo-200': props.active,
      'border-gray-500 text-gray-600 dark:text-white': !props.active,
    }"
    @click="emit('click')"
  >
    <Icon
      :icon="props.icon"
      class="w-4 h-4"
      :class="{
        'text-indigo-500 dark:text-indigo-400': props.active,
        'dark:text-white': !props.active,
      }"
    />
    <span>{{ props.text }}</span>
  </button>
</template>
