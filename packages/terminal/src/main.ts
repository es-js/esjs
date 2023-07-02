import { defineCustomElement } from 'vue'
import EsTerminal from './components/EsTerminal.vue'
import { usarTerminal } from './composables/usarTerminal'
import './style.css'

if (!window.customElements.get('es-terminal'))
  customElements.define('es-terminal', defineCustomElement(EsTerminal))

export { usarTerminal } from './composables/usarTerminal'

export const Terminal = usarTerminal()
