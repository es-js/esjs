import {
  calculateHeight,
  calculateNameBasedWidth,
  calculatePosition,
  delegateInit,
  setupBasicBehaviour,
  setupInitialProperties,
  setupInitialSelectors,
} from './BaseShape'
import { getLine, getRectangle } from '@/shared/utils/svgPrimitives'
import { assignState } from '@/shared/utils/composition'

const ENTITY_FIELD_NAME = 'VerticalEdgedRectangle'

const setupVerticalEdgedRectangleBehavior = state => ({
  print(config) {
    const theme = state.theme
    const { x, y } = state.position
    const { w, h } = state.dimensions
    const namePosition = { x: x + theme.edgeOffset, y }

    return `
            <g>
                ${getRectangle(x, y, w, h, theme)}

                ${getLine(x + theme.edgeOffset, y, x + theme.edgeOffset, y + h, theme)}
                ${getLine(x + w - theme.edgeOffset, y, x + w - theme.edgeOffset, y + h, theme)}

                ${this.printName(namePosition)}
                ${this.printDebugInfo(config)}
            </g>`
  },
})

const calculateWidth = state =>
  2 * (state.theme.horizontalPadding + state.theme.edgeOffset) + calculateNameBasedWidth(state)

const calculateDimensions = state => ({
  w: calculateWidth(state),
  h: calculateHeight(state),
})

const extractBasicState = state => ({
  ...state,
  position: calculatePosition(state),
  dimensions: calculateDimensions(state),
})

export const VerticalEdgedRectangle = (initialState) => {
  let state = extractBasicState(initialState)

  state = { ...state, ...setupInitialProperties(state) }

  return assignState(state, [
    setupInitialSelectors,
    setupBasicBehaviour,
    setupVerticalEdgedRectangleBehavior,
  ])
}

export default delegateInit(VerticalEdgedRectangle, ENTITY_FIELD_NAME)
