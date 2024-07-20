import { Opciones, Pagina } from '../index'

export function getPage(
  options: Opciones,
  pageName: string,
): Pagina | undefined {
  if (pageName === 'index') {
    return options?.paginas?.indice ?? options?.paginas?.index
  }

  return options?.paginas?.[pageName]
}
