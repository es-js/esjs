<script setup>
import { icons } from 'vitepress/dist/client/theme-default/support/socialIcons.js'
import ejemplos from '../../../ejemplos.json'

const { src } = defineProps({
  src: {
    type: String,
    default: 'https://editor.esjs.dev',
  },
})
</script>

<template>
  <ClientOnly>
    <div class="w-full max-w-4xl mx-auto p-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="(item, idx) of ejemplos" :key="idx">
          <a :href="item.link" target="_blank" class="min-h-full flex flex-col p-3 space-y-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 rounded hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer text-center sm:text-left">
            <div
              :style="{ backgroundImage: `url('https://s.vercel.app/api?url=${item.link}&width=1280&height=800')` }"
              class="w-full h-40 bg-center bg-cover bg-no-repeat rounded group-hover:shadow transition-all duration-150"
            />
            <h1 class="font-medium text-xl group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{{ item.name }}</h1>

            <p class="text-sm">{{ item.description }}</p>

            <div class="flex flex-row flex-wrap justify-center sm:justify-start gap-2">
              <span v-for="(tag, tagIdx) of item.tags" :key="tagIdx" class="px-2 text-xs bg-gray-100 dark:bg-gray-800 rounded-full border dark:border-gray-700">{{ tag }}</span>
            </div>

            <div class="flex flex-grow" />

            <div v-if="item.repository" class="flex flex-row justify-center items-center">
              <a :href="item.repository" target="_blank" class="flex flex-row items-center py-1 px-3 space-x-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full border hover:bg-indigo-800 dark:hover:bg-indigo-600 hover:border-indigo-300 hover:text-white">
                <div class="w-4 h-4 hover:text-white fill-current" v-html="icons.github" />
                <span>Repositorio</span>
              </a>
            </div>
          </a>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
