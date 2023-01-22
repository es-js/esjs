<script setup>
import {computed, ref} from "vue";
import * as lzs from 'lz-string'
import {Icon} from '@iconify/vue';
import {EDITOR_BASE_URL} from '../constants/Constants.ts'

const props = defineProps({
  onlyPlayground: {
    type: Boolean,
    default: false,
  },
  hidePreview: {
    type: Boolean,
    default: true,
  },
  hideConsole: {
    type: Boolean,
    default: false,
  },
  hideOptions: {
    type: Boolean,
    default: true,
  },
  layout: {
    type: String,
  },
})

const running = ref(props.onlyPlayground)

const slot = ref(null)

const sharedCode = computed(
  () => {
    if (!slot || !slot.value) {
      return null;
    }

    const codeElement = slot.value.getElementsByTagName('code');

    if (!codeElement || !codeElement.length) {
      return null;
    }

    const code = codeElement[0].innerText;

    return lzs.compressToEncodedURIComponent(code);
  }
)

function run() {
  running.value = true
}

function stop() {
  running.value = false
}

const openEditorUrl = computed(
  () => {
    if (!sharedCode.value) {
      return;
    }

    const url = new URL(EDITOR_BASE_URL);
    url.pathname = sharedCode.value;

    return url;
  }
)

const playgroundUrl = computed(
  () => {
    if (!sharedCode.value) {
      return;
    }

    const url = new URL(EDITOR_BASE_URL);
    url.pathname = sharedCode.value;

    url.searchParams.set('layout', props.layout || 'vertical');
    url.searchParams.set('hidePreview', props.hidePreview);
    url.searchParams.set('hideEditor', !props.onlyPlayground);
    url.searchParams.set('hideConsole', props.hideConsole);
    url.searchParams.set('hideOptions', props.hideOptions);

    return url;
  }
)
</script>

<template>
  <div class="flex flex-col my-[16px] group-hover">
      <div ref="slot" :class="{ 'hidden': props.onlyPlayground }">
        <slot />
      </div>

      <div v-if="!props.onlyPlayground" class="relative flex flex-row justify-center items-center">
        <div class="absolute flex flex-row justify-center z-10 -mt-4">
          <button class="flex flex-row items-center space-x-1 px-2 py-1 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white"
                  @click="running ? stop() : run()">
            <Icon :icon="running ? 'mdi:stop' : 'mdi:play'" class="w-4 h-4" />
            <span>{{ running ? 'Detener' : 'Ejecutar' }}</span>
          </button>
        </div>
      </div>

      <div v-if="running" class="flex flex-col">
        <EmbedPlayground v-if="running"
                         :src="playgroundUrl"
                         height="50vh" />

        <div class="flex flex-row justify-center -mt-2 z-10">
          <a :href="openEditorUrl"
             target="_blank"
             class="flex flex-row items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-500 hover:bg-indigo-400">
            <Icon icon="mdi:open-in-new" class="w-4 h-4 text-white" />
            <span class="text-white text-sm">Abrir Editor</span>
          </a>
        </div>
      </div>
    </div>
</template>
