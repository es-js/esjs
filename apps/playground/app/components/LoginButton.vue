<script setup lang="ts">
import useAuth from '~/composables/useAuth'

const user = useSupabaseUser()

const auth = useAuth()

const isOpen = ref(false)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function logout() {
  auth.logout()

  close()
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

    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Cerrar sesión
          </h3>
        </template>

        <div class="flex flex-col space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            Para cerrar sesión, presiona el botón de confirmación.
          </p>
          <div class="flex items-center justify-end space-x-4">
            <UButton
              label="Confirmar"
              color="red"
              variant="soft"
              icon="i-mdi-logout"
              @click="logout"
            />
            <UButton
              label="Cancelar"
              color="black"
              icon="i-mdi-close"
              @click="close"
            />
          </div>
        </div>
      </UCard>
    </UModal>

    <AppButton
      v-if="user"
      icon="i-mdi-logout"
      description="Cerrar sesión"
      icon-only
      @click="open"
    />
  </div>
</template>
