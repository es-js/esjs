import { GITHUB_TOKEN_KEY } from '~/composables/useOctokit'

export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient()

  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.provider_token) {
      localStorage.setItem(GITHUB_TOKEN_KEY, session.provider_token)
    }

    if (event === 'SIGNED_OUT') {
      localStorage.removeItem(GITHUB_TOKEN_KEY)
    }
  })
})
