<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'

const settings = useSettings().settings
</script>

<template>
  <div class="w-full h-[calc(100dvh)] bg-gray-50 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <div class="flex flex-col w-full h-full">
      <AppBar class="h-10" />

      <div :class="{'pt-1': settings.embed}" class="flex flex-row flex-grow">
        <div class="relative flex flex-1">
          <slot />
        </div>
      </div>
    </div>

    <Toaster />
  </div>
</template>
