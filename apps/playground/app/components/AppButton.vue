<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  icon: String,
  description: String,
  iconOnly: Boolean,
  iconOnlyMobile: Boolean,
  color: {
    type: String,
    default: 'gray',
  },
  active: Boolean,
  href: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: '_self',
  },
  variant: {
    type: String,
    default: 'outline',
  },
  size: {
    type: String,
    default: 'sm',
  },
  preventTooltip: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const isIconOnly = computed(() => props.iconOnly || !props.text)

const color = computed(() => {
  if (props.active) {
    return 'blue'
  }

  if (!props.color) {
    return 'gray'
  }

  return props.color
})
</script>

<template>
  <TooltipProvider :disabled="props.preventTooltip || !props.description && !props.text">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          :size="isIconOnly ? 'icon' : props.size"
          :variant="props.variant"
          v-bind="$attrs"
          :disabled="props.loading"
          :as-child="props.href !== null"
          class="space-x-2"
          :class="{
            'bg-teal-100 hover:bg-teal-200 disabled:bg-teal-50 dark:bg-teal-950 dark:hover:bg-teal-900 dark:disabled:bg-teal-950 text-teal-700 dark:text-teal-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500 dark:focus-visible:ring-teal-400 border-teal-200 dark:border-teal-800': color === 'teal' && props.variant === 'outline',
            'bg-black hover:bg-gray-900 disabled:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-gray-900 text-white hover:text-white dark:text-gray-900 disabled:dark:text-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black dark:focus-visible:ring-gray-900 border-black dark:border-gray-900': color === 'black' && props.variant === 'outline',
            'bg-blue-100 hover:bg-blue-200 disabled:bg-blue-50 dark:bg-blue-950 dark:hover:bg-blue-900 dark:disabled:bg-blue-950 text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 border-blue-200 dark:border-blue-800': color === 'blue' && props.variant === 'outline',
            'dark:text-gray-100': color === 'gray' && props.variant === 'outline',
          }"
          @click="emit('click')"
        >
          <template v-if="props.href === null">
            <Icon v-if="props.icon" :name="props.icon" class="w-4 h-4" />
            <span v-if="!isIconOnly"
                  :class="{
                    'hidden sm:inline': props.iconOnlyMobile,
                  }">
              {{ props.loading ? 'Cargando...' : props.text }}
            </span>
          </template>

          <template v-if="props.href !== null">
            <a :href="props.href" :target="props.target" class="flex items-center space-x-2">
              <Icon v-if="props.icon" :name="props.icon" class="w-4 h-4" />
              <span v-if="!isIconOnly"
                    :class="{
                      'hidden sm:inline': props.iconOnlyMobile,
                    }">
                {{ props.loading ? 'Cargando...' : props.text }}
              </span>
            </a>
          </template>
        </Button>
      </TooltipTrigger>

      <TooltipContent v-if="!props.preventTooltip && (props.description || props.text)">
        <p>{{ props.description || props.text }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
