<script setup lang="ts">
import ShareGithubTab from '~/components/share/ShareGithubTab.vue'
import ShareUrlTab from '~/components/share/ShareUrlTab.vue'
import { useLZShare } from '~/composables/useLZShare'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const share = useLZShare()

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
          icon-only-mobile
          @click="shareCode"
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Compartir código
          </DialogTitle>
        </DialogHeader>

        <Tabs default-value="url">
          <TabsList class="grid grid-flow-col justify-stretch">
            <TabsTrigger value="url">
              URL
            </TabsTrigger>
            <TabsTrigger value="github">
              GitHub
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url">
            <ShareUrlTab />
          </TabsContent>
          <TabsContent value="github">
            <ShareGithubTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  </div>
</template>
