// https://github.com/typekit/webfontloader
export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      families: ['Fira Code:400&display=swap'],
    },
  })
}
