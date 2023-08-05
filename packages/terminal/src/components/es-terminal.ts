import { usarTerminal } from '../composables/usarTerminal'
import style from '../style.css?inline'

class EsTerminal extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor() {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })

    const styleElement = document.createElement('style')
    styleElement.textContent = style
    this.#shadowRoot.appendChild(styleElement)

    const terminalElement = this.#shadowRoot.appendChild(document.createElement('div'))
    terminalElement.style.width = '100%'
    terminalElement.style.height = '100%'
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

customElements.define('es-terminal', EsTerminal)
