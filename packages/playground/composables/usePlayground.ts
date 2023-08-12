import { useEventBus } from '@vueuse/core'

export const usePlayground = () => {
  const bus = useEventBus('editor_code')

  function handleWindowKeyup($event: any) {
    if ($event.key === 'Escape')
      bus.emit('focus')
  }

  function handleWindowClose($event: any) {
    if (import.meta.env.MODE === 'development')
      return

    // Cancelar el cierre de la ventana
    $event.preventDefault()
    // Chrome requiere que se establezca la propiedad returnValue en una cadena vacía
    $event.returnValue = ''
  }

  return {
    handleWindowKeyup,
    handleWindowClose,
  }
}
