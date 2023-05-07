import { ref } from 'vue'

const state = ref({
  importMap: null,
})

export const store = () => {
  function initImportMap() {
    const map = state.value.files['import-map.json']
    if (!map) {
      state.value.files['import-map.json'] = new File(
        'import-map.json',
        JSON.stringify(
          {
            imports: {
              'vue': this.defaultVueRuntimeURL,
              'vue/server-renderer': this.defaultVueServerRendererURL,
            },
          },
          null,
          2,
        ),
      )
    }
    else {
      try {
        const json = JSON.parse(map.code)
        if (!json.imports.vue)
          json.imports.vue = this.defaultVueRuntimeURL
        else
          json.imports.vue = fixURL(json.imports.vue)

        if (!json.imports['vue/server-renderer']) {
          json.imports['vue/server-renderer'] = this.defaultVueServerRendererURL
        }
        else {
          json.imports['vue/server-renderer'] = fixURL(
            json.imports['vue/server-renderer'],
          )
        }
        map.code = JSON.stringify(json, null, 2)
      }
      catch (e) {}
    }
  }
}
