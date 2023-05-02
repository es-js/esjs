import { calculateChildOffsetPoint, calculateDimensions, calculateFromPoint } from './Rhombus'
import {
  calculateBackPoint,
  calculateBoundaries,
  calculateToPoint,
  delegateInit,
  setupBasicBehaviour,
  setupInitialSelectors,
} from './BaseShape'
import { getRhombus, getRoundedRectangle, getText } from '@/shared/utils/svgPrimitives'
import { assignState } from '@/shared/utils/composition'
import { TOKEN_TYPES } from '@/shared/constants'
import { translate } from '@/shared/utils/translate'

const ENTITY_FIELD_NAME = 'LoopRhombus'

const LoopMarksMap = {
  [TOKEN_TYPES.FOR_OF_STATEMENT]: `${translate('for')}`,
  [TOKEN_TYPES.FOR_IN_STATEMENT]: `${translate('for')}`,
  [TOKEN_TYPES.FOR_STATEMENT]: `${translate('for')}`,
  [TOKEN_TYPES.WHILE_STATEMENT]: `${translate('while')}`,
  [TOKEN_TYPES.DO_WHILE_STATEMENT]: `${translate('while')}`,
}

const calculateMidPoint = ({ position, dimensions }) => ({
  x: position.x + dimensions.h / 2,
  y: position.y,
})

const setupInitialProperties = state => ({
  fromPoint: calculateFromPoint(state),
  childOffsetPoint: calculateChildOffsetPoint(state),
  toPoint: calculateToPoint(state),
  backPoint: calculateBackPoint(state),
  boundaries: calculateBoundaries(state),

  midPoint: calculateMidPoint(state),
})

const setupAdditionalSelectors = state => ({
  getMidPoint() {
    return state.midPoint
  },

  getLoopedConnectionArrow() {
    return state.loopedConnectionArrow
  },
})

const setupLoopRhombusBehavior = state => ({
  assignLoopedConnectionArrow(loopedConnectionArrow) {
    state.loopedConnectionArrow = loopedConnectionArrow
  },

  printConditionMarks() {
    const theme = state.theme
    const { x, y } = state.position
    const R = state.dimensions.h
    const text = state.prefixName || LoopMarksMap[state.node.subType] || `${translate('for')}`

    return getText(
      x + R / 2 - text.length * theme.symbolWidth / 2,
      y + R / 2 + theme.symbolHeight / 2,
      theme,
      text,
    )
  },

  print(config) {
    const theme = state.theme
    const { x, y } = state.position
    const { w, h } = state.dimensions

    const R = h
    const rH = h - 2 * theme.thinPartOffset

    const namePosition = {
      x: x + R,
      y: y + rH / 2,
    }

    return `<g>

            ${getRoundedRectangle(x + h / 2, y + h / 4, w - R / 2, rH, theme)}
            ${getRhombus(x, y, R, R, theme)}

            ${this.printName(namePosition)}
            ${this.printDebugInfo(config)}
            ${this.printConditionMarks()}
        </g>`
  },
})

const calculatePosition = ({ initialPosition, theme }) => ({
  x: initialPosition.x,
  y: initialPosition.y + theme.positionTopShift,
})

const extractBasicState = state => ({
  ...state,
  position: calculatePosition(state),
  dimensions: calculateDimensions(state),
})

export const LoopRhombus = (initialState) => {
  let state = extractBasicState(initialState)

  state = { ...state, ...setupInitialProperties(state) }

  return assignState(state, [
    setupInitialSelectors,
    setupAdditionalSelectors,
    setupBasicBehaviour,
    setupLoopRhombusBehavior,
  ])
}

export default delegateInit(LoopRhombus, ENTITY_FIELD_NAME)
