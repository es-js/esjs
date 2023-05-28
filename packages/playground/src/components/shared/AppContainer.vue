<template>
  <div class="h-full grid grid-rows-[min-content,auto] border border-gray-300 dark:border-gray-800 rounded">
    <div class="flex flex-row items-center bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-800 rounded-t">
      <div class="flex-1">
        <slot name="title" />
      </div>
      <div class="flex flex-row items-center">
        <slot name="controls" />
      </div>
    </div>
    <slot />
  </div>
</template>
