const isProd = process.env.NODE_ENV === 'production'

const site = isProd ? 'https://esjs.dev/' : 'http://localhost:5173'

export const metaData = {
  lang: 'es-AR',
  title: 'EsJS',
  description: 'Lenguaje de programación con sintaxis en Español basado en JavaScript',
  site,
  image: `${site}/assets/logo.png`,
}
