<script setup lang="ts">
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import ExamplesModal from '~/components/examples/ExamplesModal.vue'
import { isDark, toggleDark } from '~/composables/dark'
import { useLZShare } from '~/composables/useLZShare'
import { useSettings } from '~/composables/useSettings'

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
    <div class="h-full grid grid-cols-3">
      <div class="flex flex-row items-center space-x-2">
        <UPopover>
          <UButton
            icon="i-mdi-menu"
            icon-only
            variant="soft"
            color="black"
            description="Mostrar opciones"
          />
          <template #panel="{close}">
            <div class="p-2">
              <ExamplesModal @close="close" />
            </div>
          </template>
        </UPopover>

        <div class="flex flex-row items-center space-x-1">
          <UButton
            to="/"
            variant="link"
            :padded="false"
            class="w-7"
          >
            <img
              src="/favicon.ico"
              alt="EsJS Logo"
              class="w-7 h-7 rounded"
            >
          </UButton>
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

      <div class="flex flex-row justify-end items-center space-x-3">
        <div
          v-if="!settings.settings.value.hideOptions"
          class="flex flex-row justify-end items-center space-x-3"
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

        <div class="flex flex-row items-center space-x-3">
          <AppButton
            icon="i-mdi-shield-sync"
            text="Protección de código"
            description="Habilita la protección contra bucles infinitos"
            icon-only
            color="gray"
            :active="settings.settings.value.infiniteLoopProtection"
            @click="setupInfiniteLoopProtection"
          />

          <UPopover
            mode="hover"
            :close-delay="300"
          >
            <AppButton
              description="Opciones"
              prevent-tooltip
              icon="i-mdi-cog"
              icon-only
              color="gray"
            />

            <template #panel>
              <div class="flex flex-row items-center p-1 space-x-2">
                <AppButton
                  icon="i-mdi-view-split-vertical"
                  :active="'horizontal' === settings.settings.value.layout"
                  description="Orientación vertical"
                  variant="outline"
                  @click="settings.setLayout('horizontal')"
                />

                <AppButton
                  icon="i-mdi-view-split-horizontal"
                  :active="'vertical' === settings.settings.value.layout"
                  description="Orientación horizontal"
                  variant="outline"
                  @click="settings.setLayout('vertical')"
                />

                <AppSeparator />

                <AppButton
                  icon="i-mdi-code"
                  :active="!settings.settings.value.hideEditor"
                  description="Mostrar editor"
                  variant="outline"
                  @click="settings.setHideEditor(!settings.settings.value.hideEditor)"
                />

                <AppButton
                  icon="i-mdi-compare-horizontal"
                  :active="settings.settings.value.showCompiledEditor"
                  description="Mostrar código compilado"
                  variant="outline"
                  @click="settings.setShowCompiledEditor(!settings.settings.value.showCompiledEditor)"
                />

                <AppButton
                  icon="i-mdi-eye"
                  :active="!settings.settings.value.hideOutput"
                  description="Mostrar vista previa"
                  variant="outline"
                  @click="settings.setHideOutput(!settings.settings.value.hideOutput)"
                />

                <AppSeparator />

                <AppButton
                  icon="i-mdi-autorenew"
                  :active="settings.settings.value.autoCompile"
                  description="Ejecutar automáticamente"
                  variant="outline"
                  @click="settings.setAutoCompile(!settings.settings.value.autoCompile)"
                />

                <AppButton
                  icon="i-mdi-publish"
                  text="Exportar módulo"
                  description="Genera una URL con el módulo actual y la copia al portapapeles"
                  variant="outline"
                  icon-only
                  color="gray"
                  @click="share.shareModule()"
                />

                <AppSeparator />

                <AppButton
                  icon="i-mdi-dots-horizontal"
                  :active="!settings.settings.value.hideOptions"
                  description="Mostrar opciones"
                  variant="outline"
                  @click="settings.setHideOptions(!settings.settings.value.hideOptions)"
                />

                <AppButton
                  icon="i-mdi-cogs"
                  :active="settings.settings.value.showAdvanced"
                  description="Mostrar avanzado"
                  variant="outline"
                  @click="settings.setShowAdvanced(!settings.settings.value.showAdvanced)"
                />
              </div>
            </template>
          </UPopover>
        </div>

        <div
          v-if="!settings.settings.value.hideOptions"
          class="flex flex-row justify-end items-center space-x-3"
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
