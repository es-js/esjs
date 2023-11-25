<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import { isDark } from '~/composables/dark'

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close'])

onMounted(() => {
  loadItems()
})

const items = ref([])

const loading = ref(true)

async function loadItems() {
  const response = await fetch(`https://api.github.com/repos/es-js/ejemplos/contents/editor/${props.category}`)

  const data = await response.json()

  loading.value = false

  if (!data) {
    items.value = []
    return
  }

  items.value = data.map((item: any) => ({
    name: item.name.replace('.esjs', '').replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase()).replace(/-/g, ' '),
    url: `/github/${item.download_url.replace('https://raw.githubusercontent.com/', '')}`,
  }))
}

async function openExample(url: string) {
  emit('close')

  useToast().add({
    title: 'Cargando ejemplo...',
    timeout: 1500,
  })

  await useRouter().push({
    path: url,
  })
}
</script>

<template>
  <div>
    <div v-if="loading" class="flex flex-col items-center justify-center flex-1">
      <UIcon
        name="i-mdi-loading"
        size="2x"
        class="text-gray-400 dark:text-gray-500 animate-spin"
      />
    </div>

    <div v-else>
      <div
        v-if="items"
        class="grid grid-cols-2 md:grid-cols-3 gap-2"
      >
        <a
          v-for="item in items"
          :key="item.name"
          class="min-h-[4rem] flex flex-col items-center justify-center p-2 text-center bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          @click="openExample(item.url)"
        >
          {{ item.name }}
        </a>
      </div>

      <div
        v-if="!items || items.length === 0"
        class="flex flex-col items-center justify-center flex-1"
      >
        <div class="flex flex-col items-center justify-center space-y-2">
          <div class="flex flex-col items-center justify-center space-y-2">
            <UIcon
              name="i-mdi-emoticon-sad-outline"
              size="2x"
              class="text-gray-400 dark:text-gray-500"
            />
            <span class="text-sm font-medium text-gray-400 dark:text-gray-500">
              No hay ejemplos disponibles
            </span>

            <a
              href="https://github.com/es-js/esjs"
              target="_blank"
              class="text-sm font-medium text-primary-500 dark:text-primary-400 hover:underline"
            >
              Colabora en GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
