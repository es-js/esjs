<script setup lang="ts">
import ShareGithubTab from '~/components/share/ShareGithubTab.vue'
import ShareUrlTab from '~/components/share/ShareUrlTab.vue'
import { useLZShare } from '~/composables/useLZShare'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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

function shareCode() {
  share.shareCode()
}
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger>
        <AppButton
          icon="i-mdi-share"
          text="Compartir"
          description="Compartir código"
          color="teal"
          @click="shareCode"
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Compartir código
          </DialogTitle>
        </DialogHeader>

        <UTabs :items="items" class="w-full">
          <template #item="{ item }">
            <UCard>
              <div v-if="item.key === 'url'">
                <ShareUrlTab />
              </div>
              <div v-else-if="item.key === 'github'">
                <ShareGithubTab />
              </div>
            </UCard>
          </template>
        </UTabs>
      </DialogContent>
    </Dialog>
  </div>
</template>
