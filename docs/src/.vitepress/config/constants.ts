const isProd = process.env.NODE_ENV === 'production'

const site = isProd ? 'https://esjs.dev/' : 'http://localhost:5173'

export const metaData = {
  lang: 'es-AR',
  title: 'EsJS',
  description: 'JavaScript con sintaxis en Español',
  site,
  image: `${site}/assets/logo.png`,
}

