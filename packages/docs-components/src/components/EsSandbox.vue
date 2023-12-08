<script setup lang="ts">
import { createSandbox } from '@es-js/sandbox/render'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  testsCode: {
    type: String,
    default: '',
  },
  hidePreview: {
    type: [Boolean, String],
    default: false,
  },
  hideConsole: {
    type: [Boolean, String],
    default: false,
  },
  height: {
    type: String,
    default: '30em',
  },
  theme: {
    type: String,
    default: null,
  },
})

const sandboxElement = ref<HTMLDivElement | null>(null)

const iframe = ref<HTMLIFrameElement | null>(null)

const checkDark = () => document.documentElement.classList.contains('dark')

const isDark = ref(checkDark())

const observer = new MutationObserver(() => {
  isDark.value = checkDark()
})
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class'],
})

const theme = computed(() => {
  if (props.theme === 'dark')
    return 'dark'

  if (props.theme === 'light')
    return 'light'

  return isDark.value ? 'dark' : 'light'
})

function triggerDarkMode() {
  if (!iframe.value)
    return

  console.debug(['triggerDarkMode', {
    iframe: iframe.value,
    isDark: isDark.value,
    theme: theme.value,
  }])

  iframe.value.contentWindow!.postMessage({
    action: 'DARK_MODE',
    cmd_id: Math.random() * 1000,
    args: theme.value === 'dark',
  }, '*')
}

onMounted(() => {
  if (!sandboxElement.value)
    return

  iframe.value = createSandbox(sandboxElement.value, {
    theme: theme.value,
    hidePreview: String(props.hidePreview) === 'true',
    previewTab: String(props.hideConsole) === 'true' ? 'hidden' : 'console',
    files: [
      {
        name: 'codigo.esjs',
        content: props.code,
        main: true,
      },
      {
        name: 'pruebas.esjs',
        content: props.testsCode,
      },
    ],
  })

  triggerDarkMode()
})

onBeforeUnmount(() => {
  observer.disconnect()
})

watch(isDark, () => {
  triggerDarkMode()
})
</script>

<template>
  <div ref="sandboxElement" class="EsSandbox w-full relative" :style="{ height: props.height }" />
</template>
