import {
  calculateHeight,
  calculateNameBasedWidth,
  calculatePosition,
  delegateInit,
  setupBasicBehaviour,
  setupInitialProperties,
  setupInitialSelectors,
} from './BaseShape'
import { getRoundedRectangle } from '@/shared/utils/svgPrimitives'
import { assignState } from '@/shared/utils/composition'

const ENTITY_FIELD_NAME = 'DestructedNode'

const setupDestructedNodeBehaviour = state => ({
  print(config) {
    const theme = state.theme
    const suffixTheme = theme.suffix

    const { x, y } = state.position
    const h = state.dimensions.h
    const w = state.dimensions.w - 2 * (suffixTheme.width + suffixTheme.space)
    const namePosition = { x, y }

    const suffix1 = getRoundedRectangle(
      x + w + suffixTheme.space,
      y,
      suffixTheme.width,
      h,
      suffixTheme,
    )
    const suffix2 = getRoundedRectangle(
      x + w + 2 * suffixTheme.space + suffixTheme.width,
      y,
      suffixTheme.width,
      h,
      suffixTheme,
    )

    return `
            <g>
                ${getRoundedRectangle(x, y, w, h, theme)}

                ${suffix1}
                ${suffix2}

                ${this.printName(namePosition)}
                ${this.printDebugInfo(config)}
            </g>`
  },
})

const calculateWidth = (state) => {
  const theme = state.theme
  const suffix = theme.suffix

  return (
    2 * theme.horizontalPadding
        + 2 * (suffix.width + +suffix.space)
        + calculateNameBasedWidth(state)
  )
}

const calculateDimensions = state => ({
  w: calculateWidth(state),
  h: calculateHeight(state),
})

const extractBasicState = state => ({
  ...state,
  position: calculatePosition(state),
  dimensions: calculateDimensions(state),
})

export const DestructedNode = (initialState) => {
  let state = extractBasicState(initialState)

  state = { ...state, ...setupInitialProperties(state) }

  return assignState(state, [
    setupInitialSelectors,
    setupBasicBehaviour,
    setupDestructedNodeBehaviour,
  ])
}

export default delegateInit(DestructedNode, ENTITY_FIELD_NAME)
