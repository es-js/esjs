<script setup lang="ts">
import {FormError} from "@nuxthq/ui/dist/runtime/types"
import {defineEmits} from 'vue'
import {z} from 'zod'
import {useEditor} from "~/composables/app/useEditor"
import useAuth from "~/composables/useAuth"
import useOctokit from "~/composables/useOctokit"
import randomWords from 'random-spanish-words'
import confetti from 'canvas-confetti'

const emit = defineEmits(['close'])

const user = useSupabaseUser()

const auth = useAuth()

const octokit = useOctokit()

const toast = useToast()

const loading = ref(false)

const loadingLogin = ref(false)

const projectCreated = ref(false)

const projectUrl = ref('')

const form = ref()

const state = ref({
  name: 'esjs-' + randomWords({exactly: 1, join: ''}) + '-app',
  private: true,
})

const schema = z.object({
  name: z.string()
    .min(3)
    .max(50)
    .refine(
      async (name) => {
        try {
          const repo = await octokit.rest.repos.get({
            owner: user.value?.user_metadata?.user_name,
            repo: name,
          })

          return !repo?.data?.name
        } catch (e) {
          return true
        }
      },
      'Ya existe un repositorio con ese nombre'
    ),
  private: z.boolean(),
})

async function validate() {
  const errors: FormError[] = []

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
  await form.value!.validate()

  loading.value = true

  try {
    const repo = await octokit.rest.repos.createUsingTemplate({
      template_owner: 'es-js',
      template_repo: 'crear-terminal-app',
      name: state.value.name,
      private: state.value.private,
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
          content: useEditor().code.value,
        },

        {
          path: 'README.md',
          mode: '100644',
          type: 'blob',
          content: `# ${state.value.name}

Aplicación Web desarrollada en [EsJS](https://esjs.dev/).`,
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
    toast.add({
      title: 'Ups!',
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
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div
      v-if="!projectCreated"
      class="flex flex-col space-y-2"
    >
      <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
        Crea un proyecto en GitHub
      </h3>

      <div
        v-if="!user"
        class="flex flex-col space-y-2"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Para crear un proyecto en GitHub, primero debes iniciar sesión con tu cuenta de GitHub
        </p>

        <div class="flex flex-col space-y-2">
          <UButton
            icon="i-mdi-github"
            label="Iniciar sesión con GitHub"
            color="black"
            :block="true"
            :loading="loadingLogin"
            @click="login"
          />
        </div>

        <p class="text-sm text-gray-500 dark:text-gray-400">
          Al iniciar sesión, se te pedirá que autorices a la aplicación a crear un repositorio en tu cuenta de GitHub
        </p>
      </div>

      <UForm
        v-if="user"
        ref="form"
        :state="state"
        :validate="validate"
        class="space-y-2"
        @submit.prevent="submit"
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

        <UButton
          type="submit"
          :loading="loading"
          color="black"
          :block="true"
        >
          Crear repositorio
        </UButton>
      </UForm>
    </div>

    <div
      v-if="projectCreated"
      class="flex flex-col space-y-2"
    >
      <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
        ¡Listo!
      </h3>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        Tu proyecto ha sido creado. Puedes acceder a él en el siguiente enlace:
      </p>

      <div class="flex flex-col space-y-2">
        <UButton
          :to="projectUrl"
          target="_blank"
          icon="i-mdi-github"
          label="Ir al repositorio"
          color="black"
          :block="true"
        />
      </div>
    </div>
  </div>
</template>
