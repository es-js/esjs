import { defineConfigWithTheme } from 'vitepress'
import { markdown } from './config/markdown'
import { getHighlighter } from './config/getHighlighter'
import { metaData } from './config/constants'

const gtagId = process.env.NODE_ENV === 'production' ? 'G-0XH36H9K3M' : 'G-TEST'

export default async () => {
  const highlighter = await getHighlighter()

  const defaultSidebar = [
    {
      text: 'Introducción',
      items: [
        { text: '¿Por qué usar EsJS?', link: '/guia/por-que-usar-esjs' },
        { text: 'Empezando', link: '/guia/empezando' },
      ],
    },

    {
      text: 'Guía EsJS',
      items: [
        { text: 'Introducción', link: '/guia/introduccion' },
        { text: 'Gramática y Tipos', link: '/guia/gramatica-y-tipos' },
        { text: 'Control del flujo y manejo de errores', link: '/guia/control-del-flujo-y-manejo-de-errores' },
        { text: 'Bucles e iteración', link: '/guia/bucles-e-iteracion' },
        { text: 'Funciones', link: '/guia/funciones' },
        { text: 'Expresiones y operadores', link: '/guia/expresiones-y-operadores' },
        { text: 'Números y fechas', link: '/guia/numeros-y-fechas' },
        { text: 'Formato de texto', link: '/guia/formato-de-texto' },
      ],
    },

    {
      text: 'Sintaxis',
      items: [
        { text: 'Palabras reservadas', link: '/sintaxis/palabras-reservadas' },
        { text: 'Comentarios', link: '/sintaxis/comentarios' },
        { text: 'Variables', link: '/sintaxis/variables' },
        { text: 'Constantes', link: '/sintaxis/constantes' },
        { text: 'Operadores', link: '/sintaxis/operadores' },
        { text: 'Condición si ... sino', link: '/sintaxis/condicion-si' },
        { text: 'Declaración elegir', link: '/sintaxis/elegir' },
        { text: 'Bucle para', link: '/sintaxis/para' },
        { text: 'Bucle mientras', link: '/sintaxis/mientras' },
        { text: 'Bucle hacer ... mientras', link: '/sintaxis/hacer-mientras' },
        { text: 'Módulos', link: '/sintaxis/modulos' },
      ],
    },

    {
      text: 'Tipos de datos',
      items: [
        { text: 'Booleano', link: '/tipos-de-datos/booleano' },
        { text: 'nulo', link: '/tipos-de-datos/nulo' },
        { text: 'Numero', link: '/tipos-de-datos/numero' },
        { text: 'Cadena', link: '/tipos-de-datos/cadena' },
        { text: 'Objeto', link: '/tipos-de-datos/objeto' },
        { text: 'Matriz', link: '/tipos-de-datos/matriz' },
        { text: 'funcion', link: '/tipos-de-datos/funcion' },
        { text: 'Simbolo', link: '/tipos-de-datos/simbolo' },
      ],
    },

    {
      text: 'Avanzado',
      items: [
        { text: 'Elevación', link: '/avanzado/elevacion' },
      ],
    },
  ]

  return defineConfigWithTheme(
    {
      lang: metaData.lang,
      title: metaData.title,
      description: metaData.description,
      markdown: markdown(highlighter),

      head: [
        ['meta', { name: 'theme-color', content: '#673AB7' }],

        [
          'script',
          {
            async: 'true',
            src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
          },
        ],
        [
          'script',
          {},
          `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gtagId}');`,
        ],
      ],

      themeConfig: {
        logo: '/assets/logo.png',

        outline: [1, 3],

        nav: [
          { text: 'Guía', link: '/guia/empezando' },
          { text: 'Ecosistema', link: '/ecosistema/' },
          { text: 'Ejemplos', link: '/ejemplos' },
        ],

        sidebar: {
          '/guia/': defaultSidebar,

          '/sintaxis/': defaultSidebar,

          '/tipos-de-datos/': defaultSidebar,

          '/avanzado/': defaultSidebar,

          '/ecosistema/': [
            {
              text: 'Ecosistema',
              items: [
                { text: 'Prueba', link: '/ecosistema/prueba' },
                { text: 'Terminal', link: '/ecosistema/terminal' },
                { text: 'Tiza', link: '/ecosistema/tiza' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/enzonotario/esjs.dev/edit/main/src/:path',
          text: 'Editar esta página en GitHub',
        },

        socialLinks: [
          { icon: 'discord', link: 'https://discord.gg/QeNt3ZvZ' },
          { icon: 'github', link: 'https://github.com/es-js/esjs' },
        ],

        footer: {
          message: 'Publicado bajo licencia MIT.',
          copyright: 'Copyright © 2022-presente Enzo Notario',
        },

        algolia: {
          appId: 'JXOQXAM65O',
          apiKey: '7545f38dfa3c4f435bbad0de83ec7189',
          indexName: 'esjs',
        },
      },
    },
  )
}
