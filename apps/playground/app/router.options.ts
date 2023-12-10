import type { RouterOptions } from '@nuxt/schema'
export default <RouterOptions>{
  routes: (_routes) => {
    const { ssrContext } = useNuxtApp()
    let subdomain = useCookie('subdomain').value
    if (ssrContext?.event.context.subdomain) {
      subdomain = ssrContext?.event.context.subdomain
    }

    if (subdomain === 'aprender') {
      const learnRoutes = _routes
        .filter(i => i.name === 'aprender-slug')
        .map(i => ({
          ...i,
          path: '/:slug(.*)*',
        }))

      return learnRoutes
    }

    return _routes
  },
}
