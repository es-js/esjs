<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const { prev, next } = useContent()
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel :size="50"
                      :min-size="30"
                      :max-size="50">
        <div class="flex flex-col h-full">
          <LearnBreadcrumbs />

          <article class="p-6 h-full flex flex-col overflow-y-auto space-y-6">
            <ContentDoc class="prose max-w-full" />

            <span class="flex-1" />

            <nav class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <NuxtLink v-if="prev" :to="prev._path" class="NavLink NavLink--prev group">
                <div class="inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50">
                  <UIcon name="mdi-arrow-left" class="w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary" />
                </div>
                <span class="font-medium text-lg">{{ prev.title }}</span>
              </NuxtLink>
              <span v-else />

              <NuxtLink v-if="next" :to="next._path" class="NavLink NavLink--next group">
                <div class="inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50">
                  <UIcon name="mdi-arrow-right" class="w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary" />
                </div>
                <span>{{ next.title }}</span>
              </NuxtLink>
            </nav>
          </article>
        </div>
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel :size="50"
                      :min-size="50"
                      :max-size="80">
        <div class="w-full h-full relative flex flex-col flex-1">
          <PlaygroundShell />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
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

.NavLink--prev {
    @apply text-left items-start
}
.NavLink--next {
    @apply text-right items-end
}
</style>
