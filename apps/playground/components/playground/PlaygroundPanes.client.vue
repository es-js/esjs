<script setup lang="ts">
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import PlaygroundDesktopView from '~/components/playground/PlaygroundDesktopView.vue'
import PlaygroundMobileView from '~/components/playground/PlaygroundMobileView.vue'
import { useSettings } from '~/composables/useSettings'

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

const settings = useSettings().settings
</script>

<template>
  <div>
    <PlaygroundDesktopView v-if="mdAndUp || settings.layout === 'vertical'" />
    <PlaygroundMobileView v-else />
  </div>
</template>
