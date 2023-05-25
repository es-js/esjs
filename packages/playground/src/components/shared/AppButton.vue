<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  icon: String,
  description: String,
  iconOnly: Boolean,
  color: {
    type: String,
    default: 'gray',
  },
  active: Boolean,
})

const emit = defineEmits(['click'])

const isIconOnly = computed(() => props.iconOnly || !props.text)
</script>

<template>
  <VTooltip :disabled="!props.description">
    <button
      class="flex flex-row justify-center items-center text-xs"
      :class="{
        'bg-indigo-100 hover:bg-indigo-200 text-indigo-900 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-white': 'indigo' === props.color || props.active,
        'bg-teal-100 hover:bg-teal-200 text-teal-900 dark:bg-teal-800 dark:hover:bg-teal-700 dark:text-white': 'teal' === props.color,
        'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white': 'gray' === props.color && !props.active,
        'dark:bg-stone-500 dark:hover:bg-stone-400 dark:text-white': 'stone' === props.color,
        'py-1.5 px-2 space-x-1 rounded': !isIconOnly,
        'p-1 rounded-full': isIconOnly,
      }"
      @click="emit('click')"
    >
      <Icon
        :icon="props.icon"
        :class="{
          'text-indigo-700 dark:text-white': 'indigo' === props.color || props.active,
          'text-white': 'teal' === props.color,
          'text-gray-900 dark:text-white': 'gray' === props.color && !props.active,
          'text-white': 'stone' === props.color,
        }"
        class="w-4 h-4"
      />
      <span v-if="!isIconOnly">{{ props.text }}</span>
    </button>

    <template #popper>
      {{ props.description }}
    </template>
  </VTooltip>
</template>
