import { delegateInit, setupBasicBehaviour, setupCompleteState, setupInitialSelectors } from './BaseShape'
import { getCircle, getRoundedRectangle } from '@/shared/utils/svgPrimitives'
import { assignState } from '@/shared/utils/composition'

const ENTITY_FIELD_NAME = 'Rectangle'

const setupRectangleBehavior = state => ({
  print(config = {}) {
    const theme = state.theme
    const dotTheme = theme.dot
    const { x, y } = state.position
    const { w, h } = state.dimensions
    const node = state.node

    return `
                <g>
                   ${getRoundedRectangle(x, y, w, h, theme)}
                   ${this.printName()}
                   ${
                       node.chain
                           ? getCircle(
                                 x + dotTheme.offset,
                                 y + h - dotTheme.offset,
                                 dotTheme.radius,
                                 dotTheme,
                             )
                           : ''
                   }
                   ${this.printDebugInfo(config)}
                </g>`
  },
})

export const Rectangle = (initialState) => {
  const state = setupCompleteState(initialState)

  return assignState(state, [setupInitialSelectors, setupBasicBehaviour, setupRectangleBehavior])
}

export default delegateInit(Rectangle, ENTITY_FIELD_NAME)
