<script setup lang="ts">
const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  prependLabel: {
    type: String,
    required: false,
    default: null,
  },
  description: {
    type: String,
    default: '',
  },
  tooltipPlacement: {
    type: String,
    default: 'top',
  },
})

const emit = defineEmits(['change'])
</script>

<template>
  <VTooltip :disabled="!props.description" :placement="props.tooltipPlacement">
    <label class="inline-flex items-center mb-5 cursor-pointer">
      <span v-if="props.prependLabel" class="mr-3 text-xs font-medium text-gray-900 dark:text-gray-300">
        {{ props.prependLabel }}
      </span>

      <div class="relative">
        <input
          type="checkbox"
          :checked="props.checked"
          class="sr-only peer"
          @change="emit('change', $event)"
        >
        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600" />
      </div>

      <span class="ml-3 text-xs font-medium text-gray-900 dark:text-gray-300">
        {{ props.label }}
      </span>
    </label>

    <template #popper>
      {{ props.description }}
    </template>
  </VTooltip>
</template>
