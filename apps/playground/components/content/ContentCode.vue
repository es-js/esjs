<script setup lang="ts">

const slot: Ref<null | HTMLElement> = ref(null)

function getCodeFromCodeBlock(slot: HTMLElement | null): string | null {
  if (!slot) { return null }

  const codeElement = slot.getElementsByTagName('pre')

  if (!codeElement || !codeElement.length) { return null }

  const code = codeElement[0].innerText

  return code
}

const codeFromCodeBlock = computed(
  () => {
    return getCodeFromCodeBlock(slot.value)
  },
)

function useInEditor() {
  const code = codeFromCodeBlock.value

  if (!code) { return }

  useFiles().updateFile(FILE_CODE, code)
}
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
