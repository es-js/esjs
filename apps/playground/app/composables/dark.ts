import { set, useDark, useToggle } from '@vueuse/core'

export const isDark = useDark()

export const toggleDark = useToggle(isDark)

export const setDark = (value: boolean) => {
  set(isDark, value)
}
