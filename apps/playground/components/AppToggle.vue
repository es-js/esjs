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
  <UTooltip
    :text="props.description"
    :prevent="!props.description"
  >
    <label class="inline-flex items-center cursor-pointer">
      <span
        v-if="props.prependLabel"
        class="mr-3 text-xs font-medium text-gray-900 dark:text-gray-300"
      >
        {{ props.prependLabel }}
      </span>

      <UToggle
        :model-value="props.checked"
        @update:modelValue="emit('change', $event)"
      />

      <span class="ml-3 text-xs font-medium text-gray-900 dark:text-gray-300">
        {{ props.label }}
      </span>
    </label>
  </UTooltip>
</template>
