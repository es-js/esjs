<script setup lang="ts">
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
  href: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'solid',
  },
  size: {
    type: String,
    default: 'sm',
  },
  preventTooltip: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const isIconOnly = computed(() => props.iconOnly || !props.text)
</script>

<template>
  <UTooltip
    :text="props.description"
    :prevent="!props.description || props.preventTooltip"
  >
    <UButton
      :to="props.href"
      :target="props.href ? '_blank' : null"
      :aria-label="props.description"
      :color="props.active ? 'blue' : (props.color || 'gray')"
      :icon="props.icon || null"
      :label="isIconOnly ? '' : (props.text || '')"
      :variant="props.variant || 'solid'"
      :size="props.size || 'sm'"
      :ui="(props.variant === 'soft' && props.color === 'teal' ?
        {
          variant: {
            soft: 'bg-teal-100 hover:bg-teal-200 disabled:bg-teal-50 dark:bg-teal-900 dark:hover:bg-teal-800 dark:disabled:bg-teal-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500 dark:focus-visible:ring-teal-400',
          }
        } : {}
      )"
      @click="emit('click')"
    />
  </UTooltip>
</template>
