<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import useAuth from '~/composables/useAuth'

const user = useSupabaseUser()

const auth = useAuth()

function logout() {
  auth.logout()
}
</script>

<template>
  <div>
    <AppButton
      v-if="!user"
      icon="i-mdi-login"
      text="Iniciar sesión"
      description="Iniciar sesión"
      icon-only
      @click="auth.login()"
    />

    <Dialog v-if="user">
      <DialogTrigger>
        <AppButton
          icon="i-mdi-logout"
          description="Cerrar sesión"
          icon-only
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Cerrar sesión
          </DialogTitle>
          <DialogDescription>
            Para cerrar sesión, presiona el botón de confirmación.
          </DialogDescription>
        </DialogHeader>

        <div class="flex items-center justify-end space-x-4">
          <DialogClose as-child>
            <AppButton
              text="Confirmar"
              color="red"
              icon="i-mdi-logout"
              prevent-tooltip
              @click="logout"
            />
          </DialogClose>

          <DialogClose as-child>
            <AppButton
              text="Cancelar"
              color="black"
              icon="i-mdi-close"
              prevent-tooltip
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
