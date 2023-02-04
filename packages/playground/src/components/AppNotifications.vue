<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNotification } from '@/composables/useNotification'

const notification = useNotification()

const innerNotification = ref(null)

watch(
  () => notification.notification.value,
  (n) => {
    if (n == null) {
      innerNotification.value = null
      return
    }

    if (innerNotification.value) {
      innerNotification.value = null
      setTimeout(() => {
        innerNotification.value = n
      }, 200)
    }
    else {
      innerNotification.value = n
    }
  },
)
</script>

<template>
  <div>
    <div
      v-if="innerNotification"
      :class="{
        'bg-green-900 text-green-50 border-green-700': innerNotification.type === 'success',
        'bg-blue-900 text-blue-50 border-blue-700': innerNotification.type === 'info',
        'bg-red-900 text-red-50 border-red-700': innerNotification.type === 'error',
      }"
      style="left: 50%; transform: translateX(-50%); bottom: 0.5rem;"
      class="fixed w-full max-w-sm mx-auto p-2 text-sm text-center rounded border z-50"
    >
      {{ innerNotification.message }}
    </div>
  </div>
</template>
