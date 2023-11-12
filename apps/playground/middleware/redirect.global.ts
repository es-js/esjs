export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const redirectUrl = localStorage.getItem('redirect_url')

    if (redirectUrl) {
      localStorage.removeItem('redirect_url')
      return navigateTo(redirectUrl, {
        external: true,
      })
    }
  }
})
