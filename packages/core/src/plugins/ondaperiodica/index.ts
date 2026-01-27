import { replaceObjects, replaceInstanceof } from '../utils'

export const report = () => 'Converts ondaperiodica to periodicwave'

export const objects = new Map<string, string>([
  ['OndaPeriodica', 'PeriodicWave'],
])

export function replace() {
  return {
    ...replaceInstanceof({
      from: 'OndaPeriodica',
      to: 'PeriodicWave',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
