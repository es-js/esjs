<script setup>
import { Separator } from '@/components/ui/separator'

const props = defineProps({
  horizontal: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <Separator :orientation="props.horizontal ? 'horizontal' : 'vertical'" />
</template>
