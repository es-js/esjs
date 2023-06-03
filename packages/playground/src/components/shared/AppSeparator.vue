<script setup>
const props = defineProps({
  horizontal: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    :class="{
      'w-px h-4 ': !props.horizontal,
      'w-4 h-px': props.horizontal,
    }"
    class="bg-gray-200 dark:bg-gray-700"
  />
</template>
