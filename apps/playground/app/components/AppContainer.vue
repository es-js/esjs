<template>
  <div class="h-full flex flex-col bg-gray-50 dark:bg-gray-900 rounded border dark:border-gray-800">
    <div class="flex flex-row items-center">
      <div class="w-full flex-1">
        <slot name="title" />
      </div>
      <div class="flex flex-row items-center">
        <slot name="controls" />
      </div>
    </div>

    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
