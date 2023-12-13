<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'

const { prev, next } = useContent()
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <Splitpanes
      class="default-theme"
    >
      <Pane
        size="35%"
        min-size="20%"
        max-size="80%"
      >
        <article class="p-6 h-full flex flex-col overflow-y-auto space-y-6">
          <ContentDoc class="prose" />

          <span class="flex-1" />

          <nav class="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4 md:space-y-0 md:justify-between">
            <NuxtLink v-if="prev" :to="prev._path" class="NavLink NavLink--prev group">
              <div class="inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50">
                <i class="i-heroicons-arrow-left-20-solid w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary" />
              </div>
              <span class="font-medium text-lg">{{ prev.title }}</span>
            </NuxtLink>
            <span v-else />

            <NuxtLink v-if="next" :to="next._path" class="NavLink NavLink--next group">
              <div class="inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50">
                <i class="i-heroicons-arrow-right-20-solid w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary" />
              </div>
              <span>{{ next.title }}</span>
            </NuxtLink>
          </nav>
        </article>
      </Pane>

      <Pane>
        <div class="w-full h-full relative flex flex-col flex-1">
          <PlaygroundShell />
        </div>
      </Pane>
    </Splitpanes>
  </div>
</template>

<style scoped>
.NavLink {
    @apply flex flex-col
    px-6 py-8
    rounded-lg
    border border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50
    text-gray-900 dark:text-gray-100
    no-underline
}
@screen md {
    .NavLink {
        @apply min-w-[13rem]
    }
}

.NavLink--prev {
    @apply text-left items-start
}
.NavLink--next {
    @apply text-right items-end
}
</style>
