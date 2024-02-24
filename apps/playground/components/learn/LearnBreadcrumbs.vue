<script setup lang="ts">
import type { NavItem, ParsedContent } from '@nuxt/content/dist/runtime/types'
const { navigation, page, prev, next } = useContent()

type BreadcrumbItem = {
  title: string
  path?: string
}

function findNavItemFromPath(path: string, items = navigation.value): NavItem | undefined {
  const item = items.find(i => i._path === path)
  if (item) {
    return item
  }

  const parts = path.split('/').filter(Boolean)
  for (let i = parts.length - 1; i > 0; i--) {
    const parentPath = `/${parts.slice(0, i).join('/')}`
    const parent = items.find(i => i._path === parentPath)
    if (parent) {
      return findNavItemFromPath(path, parent.children || [])
    }
  }
}

const contentPath = computed(() => page.value?._path as string | undefined)

const breadcrumbs = computed(() => {
  const parts = contentPath.value?.split('/').filter(Boolean) || []
  const breadcrumbs = parts
    .map((part, idx): BreadcrumbItem => {
      const path = `/${parts.slice(0, idx + 1).join('/')}`
      const item = findNavItemFromPath(path)
      return {
        title: item?.title || 'Not found',
        path: item ? path : undefined,
      }
    })

  if (!breadcrumbs.find(i => i.path === '/')) {
    breadcrumbs.unshift({
      title: 'Guía',
      path: '/',
    })
  }
  return breadcrumbs
})
</script>

<template>
  <div class="w-full flex items-center h-8 bg-gray-100 dark:bg-gray-800">
    <NuxtLink
      v-for="(breadcrumb, idx) in breadcrumbs"
      :key="`breadcrumb-${idx}-${breadcrumb.path}`"
      :to="breadcrumb.path"
      class="h-full text-sm hover:text-primary flex items-center hover:bg-gray-200 dark:hover:bg-gray-900 px-2 py-1 gap-1"
    >
      <UIcon
        :name="idx === 0 ? 'i-mdi-text-box-outline' : 'i-mdi-chevron-right'"
        class="text-gray-500 dark:text-gray-400 w-4 h-4"
      />
      <span>{{ breadcrumb.title }}</span>
    </NuxtLink>
  </div>
</template>
