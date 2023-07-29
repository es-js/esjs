<template>
  <div class="h-full grid grid-rows-[min-content,auto] bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-row items-center">
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
