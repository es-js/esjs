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
</script>

<template>
  <div class="w-full px-2">
    <div class="h-full grid grid-cols-3">
      <div class="flex flex-row items-center space-x-2">
        <div class="flex flex-row items-center space-x-1">
          <UButton
            to="/aprender"
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
          <span v-show="mdAndUp" class="text-xs uppercase font-medium text-indigo-800 dark:text-indigo-200">Aprender.EsJS.Dev</span>
        </div>
      </div>

      <div class="flex flex-row justify-center items-center">
        <!--        TODO-->
      </div>

      <div class="flex flex-row justify-end items-center space-x-2">
        <AppButton
          :icon="isDark ? 'i-mdi-weather-night' : 'i-mdi-weather-sunny'"
          icon-only
          :description="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
          @click="toggleDark()"
        />

        <AppButton
          icon="i-mdi-github"
          href="https://github.com/es-js/esjs"
          description="GitHub"
        />
      </div>
    </div>
  </div>
</template>
