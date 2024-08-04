<script setup lang="ts">
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import ExamplesDialogContent from '~/components/examples/ExamplesDialogContent.vue'
</script>

<template>
  <div>
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AppButton
            icon="i-mdi-menu"
            icon-only
            description="Mostrar opciones"
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

      <ExamplesDialogContent />
    </Dialog>
  </div>
</template>
