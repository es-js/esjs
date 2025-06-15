<script setup lang="ts">
import confetti from 'canvas-confetti'
import randomWords from 'random-spanish-words'
import { z } from 'zod'
import useAuth from '~/composables/useAuth'
import { FILE_CODE, useFiles } from '~/composables/useFiles'
import useOctokit from '~/composables/useOctokit'
import { DialogClose } from '@/components/ui/dialog'
import { toast } from 'vue-sonner'

const user = useSupabaseUser()

const auth = useAuth()

const loading = ref(false)

const loadingLogin = ref(false)

const projectCreated = ref(false)

const projectUrl = ref('')

const form = ref()

const state = ref({
  name: 'esjs-' + randomWords({ exactly: 1, join: '' }) + '-app',
  private: true,
})

const schema = z.object({
  name: z.string()
    .min(3)
    .max(50)
    .refine(
      async(name) => {
        try {
          const repo = await useOctokit().rest.repos.get({
            owner: user.value?.user_metadata?.user_name,
            repo: name,
          })

          return !repo?.data?.name
        } catch (e) {
          return true
        }
      },
      'Ya existe un repositorio con ese nombre',
    ),
  private: z.boolean(),
})

async function validate() {
  const errors: any[] = []

  const result = await schema.safeParseAsync(state.value)

  if (!result.success) {
    for (const error of result.error.errors) {
      errors.push({
        path: error.path.join('.'),
        message: error.message,
      })
    }
  }

  return errors
}

async function submit() {
  loading.value = true

  try {
    const octokit = useOctokit()

    await form.value!.validate()

    const repo = await octokit.rest.repos.createUsingTemplate({
      template_owner: 'es-js',
      template_repo: 'crear-terminal-app',
      name: state.value.name,
      private: state.value.private,
      description: 'Aplicación Web desarrollada en EsJS',
    })

    const currentCommit = await octokit.rest.repos.getCommit({
      owner: repo.data.owner.login,
      repo: repo.data.name,
      ref: 'heads/main',
    })

    const newTree = await octokit.rest.git.createTree({
      owner: repo.data.owner.login,
      repo: repo.data.name,
      tree: [
        {
          path: 'src/app.esjs',
          mode: '100644',
          type: 'blob',
          content: useFiles().getFileContent(FILE_CODE),
        },

        {
          path: 'README.md',
          mode: '100644',
          type: 'blob',
          content: `# ${state.value.name}

Aplicación Web desarrollada en [EsJS](https://es.js.org/).`,
        },
      ],
      base_tree: currentCommit.data.commit.tree.sha,
    })

    const commit = await octokit.rest.git.createCommit({
      owner: repo.data.owner.login,
      repo: repo.data.name,
      message: 'Primer commit',
      tree: newTree.data.sha,
      parents: [
        currentCommit.data.sha,
      ],
    })

    await octokit.rest.git.updateRef({
      owner: repo.data.owner.login,
      repo: repo.data.name,
      ref: 'heads/main',
      sha: commit.data.sha,
    })

    projectUrl.value = repo.data.html_url
    projectCreated.value = true
    confettis()
  } catch (e) {
    toast.error('Ups!', {
      description: 'Ocurrió un error al crear el proyecto. Por favor, intenta de nuevo.',
    })
  } finally {
    loading.value = false
  }
}

async function login() {
  loadingLogin.value = true
  await auth.login()
}

function confettis() {
  const end = Date.now() + (3 * 1000);

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }())
}
</script>

<template>
  <div class="flex flex-col rounded border dark:border-gray-800 p-4">
    <div
      v-if="!projectCreated"
      class="flex flex-col space-y-4"
    >
      <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
        Crea un proyecto en GitHub
      </h3>

      <template v-if="!user">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Para crear un proyecto en GitHub, primero debes iniciar sesión con tu cuenta de GitHub
        </p>

        <AppButton
          icon="i-mdi-github"
          text="Iniciar sesión con GitHub"
          color="black"
          :loading="loadingLogin"
          @click="login"
          prevent-tooltip
        />

        <p class="text-sm text-gray-500 dark:text-gray-400">
          Al iniciar sesión, se te pedirá que autorices a la aplicación a crear un repositorio en tu cuenta de GitHub
        </p>
      </template>

      <UForm
        v-if="user"
        ref="form"
        :state="state"
        :validate="validate"
        class="space-y-4"
        @submit="submit"
      >
        <UFormGroup
          label="Nombre del repositorio"
          name="name"
        >
          <UInput v-model="state.name" />
        </UFormGroup>

        <UCheckbox
          v-model="state.private"
          name="private"
          :loading="loading"
          label="Repositorio privado"
        />

        <AppButton
          type="submit"
          text="Crear repositorio"
          :loading="loading"
          color="black"
          prevent-tooltip
          class="w-full"
        />
      </UForm>
    </div>

    <div
      v-if="projectCreated"
      class="flex flex-col space-y-4"
    >
      <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
        ¡Listo!
      </h3>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        Tu proyecto ha sido creado. Puedes acceder a él en el siguiente enlace:
      </p>

      <div class="flex flex-col space-y-2">
        <DialogClose as-child>
          <AppButton
            :href="projectUrl"
            target="_blank"
            icon="i-mdi-github"
            text="Ir al repositorio"
            color="black"
            prevent-tooltip
            class="w-full"
          />
        </DialogClose>
      </div>
    </div>
  </div>
</template>
