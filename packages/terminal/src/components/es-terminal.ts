import { usarTerminal } from '../composables/usarTerminal'
import style from '../style.css?inline'

class EsTerminal extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor() {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })

    this.#shadowRoot.innerHTML = `
      <style>
        ${style}
      </style>

      <div style="width: 100%; height: 100%;"></div>
    `
  }

  connectedCallback() {
    usarTerminal().iniciar(this.#shadowRoot.querySelector('div') as HTMLElement, {
      theme: this.getAttribute('tema') === 'oscuro' ? 'dark' : 'light',
    })
  }

  disconnectedCallback() {
    usarTerminal().destruir()
  }
}

if (!customElements.get('es-terminal'))
  customElements.define('es-terminal', EsTerminal)

