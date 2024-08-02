<script setup lang="ts">
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import ExamplesModal from '~/components/examples/ExamplesModal.vue'
import { isDark, toggleDark } from '~/composables/dark'
import { useLZShare } from '~/composables/useLZShare'
import { useSettings } from '~/composables/useSettings'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const share = useLZShare()

const settings = useSettings()

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

const toast = useToast()

function setupInfiniteLoopProtection() {
  settings.setInfiniteLoopProtection(!settings.settings.value.infiniteLoopProtection)

  if (settings.settings.value.infiniteLoopProtection) {
    toast.add({
      title: 'Protección de bucle infinito habilitada',
      color: 'green',
    })
  } else {
    toast.add({
      title: 'Protección de bucle infinito deshabilitada. ¡Ten cuidado!',
      color: 'red',
    })
  }
}
</script>

<template>
  <div class="w-full px-2">
    <div class="h-10 grid grid-cols-3">
      <div class="flex flex-row items-center space-x-2">
        <UPopover>
          <AppButton
            icon="i-mdi-menu"
            icon-only
            description="Mostrar opciones"
          />
          <template #panel="{close}">
            <div class="p-2">
              <ExamplesModal @close="close" />
            </div>
          </template>
        </UPopover>

        <div class="flex flex-row items-center space-x-1">
          <Button
            href="/"
            variant="link"
            class="w-7 p-0"
          >
            <img
              src="/favicon.ico"
              alt="EsJS Logo"
              class="w-7 h-7 rounded"
            >
          </Button>
          <span v-show="mdAndUp" class="text-sm font-medium text-indigo-800 dark:text-indigo-200">EsJS</span>
          <span v-show="mdAndUp" class="text-xs uppercase font-medium text-indigo-800 dark:text-indigo-200">Editor</span>
        </div>

        <AppButton
          :icon="isDark ? 'i-mdi-weather-night' : 'i-mdi-weather-sunny'"
          icon-only
          :description="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
          @click="toggleDark()"
        />

        <div
          v-if="!settings.settings.value.hideOptions"
          class="flex flex-row items-center space-x-2"
        >
          <AppSeparator />

          <ShareModal />
        </div>
      </div>

      <div class="flex-1" />

      <div class="flex flex-row justify-end items-center space-x-2">
        <div
          v-if="!settings.settings.value.hideOptions"
          class="flex flex-row justify-end items-center space-x-2"
        >
          <AppButton
            v-if="settings.settings.value.showAdvanced"
            icon="i-mdi-code-braces"
            text="Ofuscar código"
            description="Ofuscar código"
            icon-only
            color="red"
            variant="soft"
            @click="useEventBus('editor_code').emit('obfuscate')"
          />

          <AppButton
            v-if="settings.settings.value.showAdvanced"
            icon="i-mdi-code-braces"
            text="Ofuscar pruebas"
            description="Ofuscar pruebas"
            icon-only
            color="red"
            variant="soft"
            @click="useEventBus('editor_tests').emit('obfuscate')"
          />

          <AppSeparator v-if="settings.settings.value.showAdvanced" />

          <AppButton
            v-if="settings.settings.value.showAdvanced"
            :icon="settings.settings.value.readonlyCode ? 'i-mdi-pen-off' : 'i-mdi-pen'"
            text="Código de solo lectura"
            description="Código de solo lectura"
            icon-only
            color="gray"
            variant="soft"
            :active="settings.settings.value.readonlyCode"
            @click="settings.setReadonlyCode(!settings.settings.value.readonlyCode)"
          />

          <AppButton
            v-if="settings.settings.value.showAdvanced"
            :icon="settings.settings.value.readonlyTests ? 'i-mdi-test-tube-off' : 'i-mdi-test-tube'"
            text="Pruebas de solo lectura"
            description="Pruebas de solo lectura"
            icon-only
            color="gray"
            variant="soft"
            :active="settings.settings.value.readonlyTests"
            @click="settings.setReadonlyTests(!settings.settings.value.readonlyTests)"
          />

          <AppSeparator v-if="settings.settings.value.showAdvanced" />
        </div>

        <div class="flex flex-row items-center space-x-2">
          <AppButton
            icon="i-mdi-shield-sync"
            text="Protección de código"
            description="Habilita la protección contra bucles infinitos"
            icon-only
            color="gray"
            :active="settings.settings.value.infiniteLoopProtection"
            @click="setupInfiniteLoopProtection"
          />

          <Popover>
            <PopoverTrigger>
              <AppButton
                description="Opciones"
                prevent-tooltip
                icon="i-mdi-cog"
                icon-only
                color="gray"
              />
            </PopoverTrigger>
            <PopoverContent>
              <div class="flex flex-row flex-wrap items-center gap-2">
                <AppButton
                  icon="i-mdi-view-split-vertical"
                  :active="'horizontal' === settings.settings.value.layout"
                  description="Orientación vertical"
                  @click="settings.setLayout('horizontal')"
                />

                <AppButton
                  icon="i-mdi-view-split-horizontal"
                  :active="'vertical' === settings.settings.value.layout"
                  description="Orientación horizontal"
                  @click="settings.setLayout('vertical')"
                />

                <AppSeparator />

                <AppButton
                  icon="i-mdi-code"
                  :active="!settings.settings.value.hideEditor"
                  description="Mostrar editor"
                  @click="settings.setHideEditor(!settings.settings.value.hideEditor)"
                />

                <AppButton
                  icon="i-mdi-compare-horizontal"
                  :active="settings.settings.value.showCompiledEditor"
                  description="Mostrar código compilado"
                  @click="settings.setShowCompiledEditor(!settings.settings.value.showCompiledEditor)"
                />

                <AppButton
                  icon="i-mdi-eye"
                  :active="!settings.settings.value.hideOutput"
                  description="Mostrar vista previa"
                  @click="settings.setHideOutput(!settings.settings.value.hideOutput)"
                />

                <AppSeparator />

                <AppButton
                  icon="i-mdi-autorenew"
                  :active="settings.settings.value.autoCompile"
                  description="Ejecutar automáticamente"
                  @click="settings.setAutoCompile(!settings.settings.value.autoCompile)"
                />

                <AppButton
                  icon="i-mdi-publish"
                  text="Exportar módulo"
                  description="Genera una URL con el módulo actual y la copia al portapapeles"
                  icon-only
                  color="gray"
                  @click="share.shareModule()"
                />

                <AppSeparator />

                <AppButton
                  icon="i-mdi-dots-horizontal"
                  :active="!settings.settings.value.hideOptions"
                  description="Mostrar opciones"
                  @click="settings.setHideOptions(!settings.settings.value.hideOptions)"
                />

                <AppButton
                  icon="i-mdi-cogs"
                  :active="settings.settings.value.showAdvanced"
                  description="Mostrar avanzado"
                  @click="settings.setShowAdvanced(!settings.settings.value.showAdvanced)"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div
          v-if="!settings.settings.value.hideOptions"
          class="flex flex-row justify-end items-center space-x-2"
        >
          <LoginButton />
          <AppButton
            icon="i-mdi-github"
            href="https://github.com/es-js/esjs"
            description="GitHub"
          />
        </div>
      </div>
    </div>
  </div>
</template>
