import { useDark, useToggle, set } from '@vueuse/core'

export const isDark = useDark()

export const toggleDark = useToggle(isDark)

export const setDark = (value: boolean) => {
  set(isDark, value)
}
