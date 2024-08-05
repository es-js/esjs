<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { computed } from 'vue';
import { useGrid } from 'vue-screen';
import { useLZShare } from '~/composables/useLZShare';
import { useSettings } from '~/composables/useSettings';

const share = useLZShare()

const settings = useSettings()

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <AppButton
        description="Opciones"
        icon="i-mdi-cog"
        icon-only
        color="gray"
      />
    </PopoverTrigger>

    <PopoverContent class="w-full max-w-md">
      <div class="flex flex-col space-y-2">
        <h2>Orientación</h2>

        <div class="grid grid-cols-2 gap-2">
          <AppButton
            text="Horizontal"
            icon="i-mdi-view-split-vertical"
            :active="'horizontal' === settings.settings.value.layout"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            @click="settings.setLayout('horizontal')"
          />

          <AppButton
            text="Vertical"
            icon="i-mdi-view-split-horizontal"
            :active="'vertical' === settings.settings.value.layout"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            @click="settings.setLayout('vertical')"
          />
        </div>

        <AppSeparator horizontal />

        <h2>Vistas</h2>

        <div class="grid grid-cols-2 gap-2">
          <AppButton
            text="Editor"
            icon="i-mdi-code"
            :active="!settings.settings.value.hideEditor"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            @click="settings.setHideEditor(!settings.settings.value.hideEditor)"
          />

          <AppButton
            text="Compilado"
            icon="i-mdi-compare-horizontal"
            :active="settings.settings.value.showCompiledEditor"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            @click="settings.setShowCompiledEditor(!settings.settings.value.showCompiledEditor)"
          />

          <AppButton
            text="Resultado"
            icon="i-mdi-eye"
            :active="!settings.settings.value.hideOutput"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            @click="settings.setHideOutput(!settings.settings.value.hideOutput)"
          />
        </div>

        <AppSeparator horizontal />

        <h2>Ejecución</h2>

        <div class="grid grid-cols-2 gap-2">
          <AppButton
            text="Auto-ejecución"
            icon="i-mdi-autorenew"
            :active="settings.settings.value.autoCompile"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            @click="settings.setAutoCompile(!settings.settings.value.autoCompile)"
          />
        </div>

        <AppSeparator horizontal />

        <h2>Opciones</h2>

        <div class="grid grid-cols-2 gap-2">
          <AppButton
            icon="i-mdi-publish"
            text="Exportar módulo"
            description="Genera una URL con el módulo actual y la copia al portapapeles"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            color="gray"
            @click="share.shareModule()"
          />

          <AppButton
            text="Opciones"
            icon="i-mdi-dots-horizontal"
            :active="!settings.settings.value.hideOptions"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            @click="settings.setHideOptions(!settings.settings.value.hideOptions)"
          />

          <AppButton
            text="Avanzado"
            icon="i-mdi-cogs"
            :active="settings.settings.value.showAdvanced"
            :icon-only="!mdAndUp"
            :prevent-tooltip="mdAndUp"
            @click="settings.setShowAdvanced(!settings.settings.value.showAdvanced)"
          />
        </div>

        <template v-if="settings.settings.value.showAdvanced">
          <AppSeparator horizontal />

          <h2>Sólo lectura</h2>

          <div class="grid grid-cols-2 gap-2">
            <AppButton
              :icon="settings.settings.value.readonlyCode ? 'i-mdi-pen-off' : 'i-mdi-pen'"
              text="Código"
              :icon-only="!mdAndUp"
              :prevent-tooltip="mdAndUp"
              :active="settings.settings.value.readonlyCode"
              @click="settings.setReadonlyCode(!settings.settings.value.readonlyCode)"
            />

            <AppButton
              text="Pruebas"
              :icon-only="!mdAndUp"
              :prevent-tooltip="mdAndUp"
              :active="settings.settings.value.readonlyTests"
              @click="settings.setReadonlyTests(!settings.settings.value.readonlyTests)"
            />
          </div>

          <AppSeparator horizontal />

          <h2>Ofuscar</h2>

          <div class="grid grid-cols-2 gap-2">
            <AppButton
              icon="i-mdi-code-braces"
              text="Ofuscar código"
              :icon-only="!mdAndUp"
              :prevent-tooltip="mdAndUp"
              color="red"
              @click="useEventBus('editor_code').emit('obfuscate')"
            />

            <AppButton
              icon="i-mdi-code-braces"
              text="Ofuscar pruebas"
              :icon-only="!mdAndUp"
              :prevent-tooltip="mdAndUp"
              color="red"
              @click="useEventBus('editor_tests').emit('obfuscate')"
            />
          </div>
        </template>
      </div>
    </PopoverContent>
  </Popover>
</template>
