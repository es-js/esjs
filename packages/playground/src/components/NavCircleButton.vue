<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps({
  icon: String,
  active: Boolean,
})

const emit = defineEmits(['click'])
</script>

<template>
  <button class="p-1 bg-gray-700 hover:bg-gray-600 rounded-full" :class="{ 'bg-indigo-500 hover:bg-indigo-400': props.active }" @click="emit('click')">
    <Icon :icon="props.icon" class="w-4 h-4" />
  </button>
</template>
