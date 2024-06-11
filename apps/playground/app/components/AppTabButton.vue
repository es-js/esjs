<script setup lang="ts">

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
    class="h-full flex flex-row justify-center items-center text-xs px-2 py-1.5 space-x-1.5 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-b-2"
    :class="{
      'border-indigo-700 dark:border-indigo-500': props.active,
      'border-transparent hover:border-gray-400 dark:hover:border-gray-700': !props.active,
    }"
    @click="emit('click')"
  >
    <UIcon
      :name="props.icon"
      class="w-4 h-4"
      :class="{
        'text-indigo-500 dark:text-indigo-200': props.active,
        'dark:text-white': !props.active,
      }"
    />
    <span>{{ props.text }}</span>
  </button>
</template>
