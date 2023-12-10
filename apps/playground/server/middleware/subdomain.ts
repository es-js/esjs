import { getHeaders } from 'h3'
import { mainDomain } from '~/constants/app'

export default defineEventHandler((event) => {
  const headers = getHeaders(event)
  const hostname = headers.host ?? 'esjs.dev'

  if (!mainDomain.includes(hostname)) {
    const currentHost = hostname.match(/^[^.]*/g)[0]
    event.context.subdomain = currentHost

    setCookie(event, 'subdomain', currentHost)

    if (headers.referer) {
      setCookie(event, 'currentUrl', headers.referer)
    }
  }
})
