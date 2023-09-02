export default function () {
  const supabase = useSupabaseClient()


  async function login() {
    // Save current URL to redirect the user back to it after signing in.
    const currentUrl = window.location.href
    localStorage.setItem('redirect_url', currentUrl)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
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
