import { ref } from 'vue'

const DEFAULT_NOTIFICATION_TIMEOUT = 3000

const notification = ref(null)

export const useNotification = () => {
  function success(message: string) {
    addNotification({
      type: 'success',
      message,
      timeout: DEFAULT_NOTIFICATION_TIMEOUT,
    })
  }

  function info(message: string) {
    addNotification({
      type: 'info',
      message,
      timeout: DEFAULT_NOTIFICATION_TIMEOUT,
    })
  }

  function error(message: string) {
    addNotification({
      type: 'error',
      message,
      timeout: DEFAULT_NOTIFICATION_TIMEOUT,
    })
  }

  function addNotification({ type, message, timeout }) {
    notification.value = {
      type,
      message,
      timeout,
    }

    setTimeout(() => {
      notification.value = null
    }, timeout)
  }

  return {
    notification,
    success,
    info,
    error,
  }
}
