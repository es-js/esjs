// https://github.com/typekit/webfontloader
export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      families: ['Fira Code:300,400,600&display=swap', 'Roboto:300,400,600&display=swap'],
    },
  })
}
