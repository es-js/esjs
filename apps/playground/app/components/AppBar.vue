<script setup lang="ts">
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import AppOptionsMenu from '~/components/AppOptionsMenu.vue';
import { isDark, toggleDark } from '~/composables/dark'
import { useSettings } from '~/composables/useSettings'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'

const { settings, setInfiniteLoopProtection } = useSettings()

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

function setupInfiniteLoopProtection() {
  setInfiniteLoopProtection(!settings.value.infiniteLoopProtection)

  if (settings.value.infiniteLoopProtection) {
    toast.success('Protección de bucle infinito habilitada')
  } else {
    toast.error('Protección de bucle infinito deshabilitada. ¡Ten cuidado!')
  }
}
</script>

<template>
  <NuxtScrollbar :options="{ suppressScrollY: true }" class="w-full h-10 px-2 flex items-center overflow-x-auto overflow-y-hidden">
    <div class="flex flex-row items-center space-x-2">
      <AppMenu :class="{'hidden': settings.embed}" />

      <div class="flex flex-row items-center space-x-1">
        <NuxtLink :to="settings.embed ? undefined : '/'">
          <Button
            variant="link"
            class="w-7 p-0"
          >
            <img
              src="/favicon.ico"
              alt="EsJS Logo"
              class="w-7 h-7 rounded"
            >
          </Button>
        </NuxtLink>
        <span v-show="mdAndUp" class="text-sm font-medium text-indigo-800 dark:text-indigo-200">EsJS</span>
        <span v-show="mdAndUp" class="text-xs uppercase font-medium text-indigo-800 dark:text-indigo-200">Editor</span>
      </div>

      <div>
        <AppButton
          :icon="isDark ? 'i-mdi-weather-night' : 'i-mdi-weather-sunny'"
          icon-only
          :description="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
          @click="toggleDark()"
        />
      </div>

      <div
        v-if="!settings.hideOptions"
        class="flex flex-row items-center space-x-2"
      >
        <AppSeparator />

        <ShareModal />
      </div>
    </div>

    <div class="flex-1 min-w-2" />

    <div class="flex flex-row justify-end items-center space-x-2">
        <div class="flex flex-row items-center space-x-2">
          <AppButton
            icon="i-mdi-shield-sync"
            text="Protección de código"
            description="Habilita la protección contra bucles infinitos"
            icon-only
            color="gray"
            :active="settings.infiniteLoopProtection"
            @click="setupInfiniteLoopProtection"
          />

          <AppOptionsMenu />
        </div>

        <div
          v-if="!settings.hideOptions"
          class="flex flex-row justify-end items-center space-x-2"
          :class="{'hidden': settings.embed}"
        >
          <LoginButton />

          <AppButton
            icon="i-mdi-github"
            href="https://github.com/es-js/esjs"
            description="GitHub"
          />
        </div>
      </div>
  </NuxtScrollbar>
</template>
