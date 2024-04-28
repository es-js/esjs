let size = 50

let activePreviewTab: 'console' | 'flowchart' | 'hidden' = 'console'

const flowchartSvg = ''

let initialized = false

let eruda: any = null

export async function setupEruda() {
  if (!eruda) {
    eruda = await import('eruda')
  }

  const erudaContainerElement = document.getElementById('eruda-container')
  const showFlowchart = false

  if (!erudaContainerElement)
    return

  eruda.init({
    container: erudaContainerElement,
    tool: ['console'],
    autoScale: true,
    useShadowDom: false,
    defaults: {
      displaySize: size,
      transparency: 100,
      theme: document.documentElement.classList.contains('dark') ? 'Material Darker' : 'Light',
    },
  })

  if (showFlowchart)
    addFlowchartPlugin()

  eruda.remove('settings')

  setupErudaConsoleClickHandler()

  eruda.show()

  renameErudaTabs()

  setActiveTab(activePreviewTab)

  fixDevToolsPadding()

  initialized = true
}

export function changeSize(value: number) {
  size = value
}

export function getActiveTab() {
  return activePreviewTab
}

export function setActiveTab(value: 'console' | 'flowchart' | 'hidden') {
  if (value === getActiveTab())
    return

  activePreviewTab = value

  switch (activePreviewTab) {
    case 'console':
      openConsole()
      break
    case 'flowchart':
      openFlowchart()
      break
    case 'hidden':
      hideEruda()
      break
  }
}

export function setErudaTheme(theme: 'dark' | 'light') {
  setErudaConfig('theme', theme === 'dark' ? 'Material Darker' : 'Light')
}

export function openEruda() {
  setErudaConfig('displaySize', size)

  const consoleElement = document.getElementById('console-container')

  if (consoleElement) {
    consoleElement.classList.remove('h-eruda-tab')
    consoleElement.classList.add('flex-1')
  }

  const lunaTabSliderElement: HTMLElement | null = document.querySelector('.luna-tab-slider')
  if (lunaTabSliderElement)
    lunaTabSliderElement.style.display = 'inline-block'
}

export function hideEruda() {
  activePreviewTab = 'hidden'
  parent.postMessage({ action: 'activePreviewTab', data: 'hidden' }, '*')

  setErudaConfig('displaySize', 1)

  const consoleElement = document.getElementById('console-container')
  if (consoleElement) {
    consoleElement.classList.remove('flex-1')
    consoleElement.classList.add('h-eruda-tab')
  }

  const lunaTabsElements = document.querySelectorAll('.luna-tab-item')
  lunaTabsElements.forEach((element) => {
    element.classList.remove('luna-tab-selected')
  })

  const lunaTabSliderElement: HTMLElement | null = document.querySelector('.luna-tab-slider')
  if (lunaTabSliderElement)
    lunaTabSliderElement.style.display = 'none'
}

function openConsole() {
  activePreviewTab = 'console'
  parent.postMessage({ action: 'activePreviewTab', data: 'console' }, '*')

  eruda.show('console')
  openEruda()

  const consoleElement = document.getElementById('console-container')
  if (consoleElement) {
    consoleElement.classList.remove('h-eruda-tab')
    consoleElement.classList.add('flex-1')
  }
}

function openFlowchart() {
  activePreviewTab = 'flowchart'
  parent.postMessage({ action: 'activePreviewTab', data: 'flowchart' }, '*')

  eruda.show('flowchart')
  openEruda()

  const consoleElement = document.getElementById('console-container')
  if (consoleElement) {
    consoleElement.classList.remove('h-eruda-tab')
    consoleElement.classList.add('flex-1')
  }
}

function addFlowchartPlugin() {
  eruda.add((eruda: any) => {
    class Flowchart extends eruda.Tool {
      name: string

      constructor() {
        super()
        this.name = 'flowchart'
      }

      init($el: any) {
        super.init($el)
        $el.html(flowchartSvg)
      }

      show() {
        return super.show()
      }

      hide() {
        return super.hide()
      }

      destroy() {
        return super.destroy()
      }
    }

    return new Flowchart()
  })
  setupErudaFlowchartClickHandler()
}

function setupErudaConsoleClickHandler() {
  const erudaConsoleTab = document.querySelector('.luna-tab-item[data-id="console"]')

  if (!erudaConsoleTab)
    return

  erudaConsoleTab.addEventListener('click', handleErudaConsoleClick)
}

function setupErudaFlowchartClickHandler() {
  const erudaFlowchartTab = document.querySelector('.luna-tab-item[data-id="flowchart"]')

  if (!erudaFlowchartTab)
    return

  erudaFlowchartTab.addEventListener('click', handleErudaFlowchartClick)
}

function handleErudaConsoleClick() {
  if (activePreviewTab === 'console')
    hideEruda()

  else
    openConsole()
}

function handleErudaFlowchartClick() {
  if (activePreviewTab === 'flowchart')
    hideEruda()

  else
    openFlowchart()
}

function renameErudaTabs() {
  const erudaTabs = document.querySelectorAll('.luna-tab-item')

  if (erudaTabs && erudaTabs.length) {
    if (erudaTabs[0])
      erudaTabs[0].innerHTML = 'Consola'

    if (erudaTabs[1])
      erudaTabs[1].innerHTML = 'Diagrama de flujo'
  }
}

/**
 * Necesario para modificar el padding una vez renderizado el elemento. Idealmente debería tomarlo de style.css.
 */
function fixDevToolsPadding() {
  const erudaDevToolsElements = document.getElementsByClassName('eruda-dev-tools')
  const erudaDevToolsElement: HTMLElement | null = erudaDevToolsElements.length ? erudaDevToolsElements[0] as HTMLElement : null
  if (erudaDevToolsElement)
    erudaDevToolsElement.style.setProperty('padding-top', '28px', 'important')
}

function getErudaConfig() {
  return initialized && eruda && eruda.get('')?.config
}

function setErudaConfig(key: string, value: any) {
  const config = getErudaConfig()

  if (!config)
    return

  config.set(key, value)
}
