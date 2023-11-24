<script setup lang="ts">
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import PlaygroundDesktopView from '~/components/playground/PlaygroundDesktopView.vue'
import PlaygroundMobileView from '~/components/playground/PlaygroundMobileView.vue'
import { useSettings } from '~/composables/app/useSettings'

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

const settings = useSettings().settings
</script>

<template>
  <div>
    <PlaygroundMobileView v-if="!mdAndUp && settings.layout === 'horizontal'" />
    <PlaygroundDesktopView v-else />
  </div>
</template>
