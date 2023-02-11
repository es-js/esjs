<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps({
  text: String,
  icon: String,
  active: Boolean,
  color: {
    type: String,
    default: 'indigo',
  },
  iconOnly: Boolean,
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="flex flex-row justify-center items-center text-xs"
    :class="{
      'bg-indigo-500 hover:bg-indigo-400 text-white': 'indigo' === props.color,
      'bg-teal-800 hover:bg-teal-700 text-white': 'teal' === props.color,
      'bg-gray-800 hover:bg-gray-700 text-white': 'gray' === props.color,
      'py-1.5 px-2 space-x-1 rounded': !props.iconOnly,
      'py-0.5 px-1 w-7.5 h-7.5 rounded-full': props.iconOnly,
    }"
    @click="emit('click')"
  >
    <Icon :icon="props.icon" class="w-4 h-4" />
    <span v-if="!props.iconOnly">{{ props.text }}</span>
  </button>
</template>
