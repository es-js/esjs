<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useGrid } from 'vue-screen'

const props = defineProps({
  text: String,
  icon: String,
  active: Boolean,
  color: {
    type: String,
    default: 'indigo',
  },
})

const emit = defineEmits(['click'])

const grid = useGrid('tailwind')
</script>

<template>
  <button
    class="flex flex-row items-center py-1.5 px-2 space-x-1 text-xs "
    :class="{
      'bg-indigo-500 hover:bg-indigo-400 text-white': 'indigo' === props.color,
      'bg-teal-800 hover:bg-teal-700 text-white': 'teal' === props.color,
      'rounded': grid.sm,
      'w-8 h-8 rounded-full': !grid.sm,
    }"
    @click="emit('click')"
  >
    <Icon :icon="props.icon" class="w-4 h-4" />
    <span v-if="grid.sm">{{ props.text }}</span>
  </button>
</template>
