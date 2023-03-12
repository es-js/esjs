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
        'bg-indigo-500 hover:bg-indigo-400 text-white': 'indigo' === props.color || props.active,
        'bg-teal-800 hover:bg-teal-700 text-white': 'teal' === props.color,
        'bg-gray-700 hover:bg-gray-600 text-white': 'gray' === props.color,
        'py-1.5 px-2 space-x-1 rounded': !isIconOnly,
        'p-1 rounded-full': isIconOnly,
      }"
      @click="emit('click')"
    >
      <Icon :icon="props.icon" class="w-4 h-4" />
      <span v-if="!isIconOnly">{{ props.text }}</span>
    </button>

    <template #popper>
      {{ props.description }}
    </template>
  </VTooltip>
</template>
