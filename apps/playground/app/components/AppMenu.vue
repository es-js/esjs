<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog'
import ExamplesModal from '~/components/examples/ExamplesDialogContent.vue';

</script>

<template>
  <div>
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AppButton
            icon="i-mdi-menu"
            icon-only
            description="Abrir menú"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <DialogTrigger>
              <div class="flex items-center space-x-2">
                <UIcon name="i-mdi-rocket-launch-outline" />
                <span>Ejemplos</span>
              </div>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ExamplesModal />
    </Dialog>
  </div>
</template>
