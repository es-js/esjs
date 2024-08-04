<script setup lang="ts">
import { useLZShare } from '~/composables/useLZShare'
import { DialogClose } from '@/components/ui/dialog'

const share = useLZShare()

function shareCode() {
  share.shareCode()
}

const url = computed(() => {
  return share.getSharedUrl()
})
</script>

<template>
  <div class="flex flex-col space-y-2">
    <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
      Compartir vía URL
    </h3>

    <div class="flex flex-row items-center space-x-2">
      <input
        type="text"
        class="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-700"
        :value="url"
        readonly
      >
      <AppButton
        icon="i-mdi-content-copy"
        icon-only
        color="gray"
        description="Copiar URL"
        @click="shareCode"
      />
    </div>

    <DialogClose as-child>
      <AppButton
        text="Listo"
        color="black"
        prevent-tooltip
      />
    </DialogClose>
  </div>
</template>
