export default function () {
  const supabase = useSupabaseClient()


  async function login() {
    const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo,
        scopes: 'read:org, repo',
      },
    })
  }

  function logout() {
    supabase.auth.signOut()
  }

  return {
    login,
    logout,
  }
}
