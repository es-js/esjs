<script setup lang="ts">
import { toString } from 'hast-util-to-string'
import { fromHtml } from 'hast-util-from-html'
import { codeToHtml } from 'shiki'
import { isDark } from '~/composables/dark'

const slot: Ref<null | HTMLElement> = ref(null)

const editor = useEditor()

const codeFromCodeBlock = computed(
  () => {
    return getCodeFromCodeBlock(slot.value)
  },
)

const esjsCode = ref(null)
const esjsPreHtml = ref(null)

const jsCode = ref(null)
const jsPreHtml = ref(null)

function getCodeFromCodeBlock(slot: HTMLElement | null): string | null {
  if (!slot) { return null }

  const codeElement = slot.getElementsByTagName('pre')

  if (!codeElement || !codeElement.length) { return null }

  return removeMultipleEmptyLines(toString(fromHtml(codeElement[0].innerHTML)))
}

function useInEditor() {
  useFiles().updateFile(FILE_CODE, {
    content: editor.language.value === 'esjs' ? esjsCode.value : jsCode.value,
  })
}

function removeMultipleEmptyLines(code: string): string {
  return code.replace(/\n{3,}/g, '\n\n')
}

function setupCodes() {
  if (!esjsCode.value) {
    esjsCode.value = codeFromCodeBlock.value
  }

  if (!jsCode.value) {
    jsCode.value = editor.formatCode(esjsCode.value, 'esjs', 'js').replace(/\n$/, '')
  }
}

async function setupCodesPreHtml() {
  if (!slot.value) { return }

  const code = codeFromCodeBlock.value

  if (!code) { return }

  if (!esjsPreHtml.value) {
    esjsPreHtml.value = slot.value.getElementsByTagName('pre')[0].innerHTML
  }

  if (!jsPreHtml.value) {
    let html = await codeToHtml(jsCode.value, {
      lang: 'js',
      theme: isDark.value ? 'vitesse-dark' : 'vitesse-light',
    })
    html = html.replace(/<pre[^>]*>/, '').replace(/<\/pre>/, '')

    jsPreHtml.value = html
  }
}

function setupPreHtml() {
  if (!slot.value) { return }

  slot.value.getElementsByTagName('pre')[0].innerHTML = editor.language.value === 'esjs' ? esjsPreHtml.value : jsPreHtml.value
}

watch(
  editor.language,
  () => {
    setupPreHtml()
  },
  { immediate: true },
)

const unwatch = watch(
  slot,
  async() => {
    if (!slot.value) { return }

    setupCodes()
    await setupCodesPreHtml()

    setupPreHtml()

    unwatch()
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <div ref="slot" class="relative">
      <slot />

      <div class="absolute inset-y-0 right-0 flex flex-col items-center justify-center">
        <div class="relative w-px h-full">
          <div class="sticky top-0 flex flex-row items-center -ml-2 mt-2 z-50">
            <AppButton
              text="Utilizar"
              description="Utilizar en el Editor"
              icon="i-mdi-chevron-right"
              icon-only
              @click="useInEditor"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
