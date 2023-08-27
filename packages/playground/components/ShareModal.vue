<script setup lang="ts">
import ShareGithubTab from "~/components/ShareGithubTab.vue"
import ShareUrlTab from "~/components/ShareUrlTab.vue"
import {useLZShare} from "~/composables/app/useLZShare"

const isOpen = ref(false)

const share = useLZShare()

const items = [{
  key: 'url',
  label: 'URL',
  description: 'Compartir vía URL',
}, {
  key: 'github',
  label: 'GitHub',
  description: 'Compartir vía GitHub',
}]

const loginEnabled = useRuntimeConfig().loginEnabled

function shareCode() {
  share.shareCode()

  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}
</script>

<template>
  <div>
    <AppButton
      icon="i-mdi-share"
      text="Compartir"
      description="Compartir código"
      color="teal"
      variant="soft"
      @click="shareCode"
    />

    <UModal v-model="isOpen">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Compartir código
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-mdi-close"
              @click="isOpen = false"
            />
          </div>
        </template>

        <UTabs
          :items="items"
          class="w-full"
        >
          <template #item="{ item }">
            <UCard>
              <div v-if="item.key === 'url'">
                <ShareUrlTab @close="closeModal" />
              </div>
              <div v-else-if="item.key === 'github'">
                <ShareGithubTab
                  v-if="loginEnabled"
                  @close="closeModal"
                />

                <div
                  v-if="!loginEnabled"
                  class="flex flex-col space-y-4 p-4"
                >
                  <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                    Crea un proyecto en GitHub
                  </h3>

                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Pronto podrás compartir tu código vía GitHub
                  </p>
                </div>
              </div>
            </UCard>
          </template>
        </UTabs>
      </UCard>
    </UModal>
  </div>
</template>
