import { calculateChildOffsetPoint, calculateDimensions, calculateFromPoint } from './Rhombus'
import {
  calculateBackPoint,
  calculateBoundaries,
  calculatePosition,
  delegateInit,
  setupBasicBehaviour,
  setupInitialSelectors,
} from './BaseShape'
import { TOKEN_KEYS, TOKEN_TYPES } from '@/shared/constants'
import { getRhombus, getRoundedRectangle, getText } from '@/shared/utils/svgPrimitives'
import { assignState } from '@/shared/utils/composition'
import { translate } from '@/shared/utils/translate'

const ENTITY_FIELD_NAME = 'ConditionRhombus'

const calculateAlternateFromPoint = ({ position, dimensions }) => ({
  x: position.x + dimensions.w,
  y: position.y + dimensions.h / 2,
})

const calculateToPoint = ({ position, dimensions }) => ({
  x: position.x,
  y: position.y + dimensions.h / 2,
})

const setupInitialProperties = state => ({
  fromPoint: calculateFromPoint(state),
  childOffsetPoint: calculateChildOffsetPoint(state),
  toPoint: calculateToPoint(state),
  backPoint: calculateBackPoint(state),
  boundaries: calculateBoundaries(state),

  alternateFromPoint: calculateAlternateFromPoint(state),
})

const setupAdditionalSelectors = state => ({
  getAlternateFromPoint() {
    return state.alternateFromPoint
  },
})

export const setupConditionRhombusBehavior = state => ({
  getConsequentBranchChildBoundary() {
    return this.getChildBoundaries(child => child.state.node.key === TOKEN_KEYS.CONSEQUENT)
  },

  getAlternativeBranchChildOffsetPoint() {
    const theme = state.theme
    const position = {}

    position.y = state.position.y + state.childOffsetPoint.y

    position.x = this.getConsequentBranchChildBoundary().max.x
    position.x += theme.alternateBranchOffset

    const rightLimit = state.position.x + state.dimensions.w + theme.childOffset
    if (position.x <= rightLimit)
      position.x = rightLimit

    return position
  },

  checkIfChildExist(key) {
    return state.body.filter(shape => shape.getNodeKey() === key).length
  },

  printConditionMarks() {
    const theme = state.theme
    const { x, y } = state.position
    const R = state.dimensions.h
    const w = state.dimensions.w
    const node = state.node

    const text = node.subType === TOKEN_TYPES.CONDITIONAL_EXPRESSION ? '?' : `${translate('if')}`
    const positive = '+'
    const alternative = '-'

    return `${getText(
            x + R / 2 - text.length * theme.symbolWidth / 2,
            y + R / 2 + theme.symbolHeight / 2,
            theme,
            text,
        )} ${getText(
            x + R / 2 + theme.symbolWidth,
            y + R + theme.symbolWidth / 4,
            theme,
            positive,
        )} ${
            this.checkIfChildExist(TOKEN_KEYS.ALTERNATE)
                ? getText(
                      x + w + theme.symbolWidth / 2,
                      y + R / 2 - theme.symbolWidth / 4,
                      theme,
                      alternative,
                  )
                : ''
        }`
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

const extractBasicState = state => ({
  ...state,
  position: calculatePosition(state),
  dimensions: calculateDimensions(state),
})

export const ConditionRhombus = (initialState) => {
  let state = extractBasicState(initialState)

  state = { ...state, ...setupInitialProperties(state) }

  return assignState(state, [
    setupInitialSelectors,
    setupAdditionalSelectors,
    setupBasicBehaviour,
    setupConditionRhombusBehavior,
  ])
}

export default delegateInit(ConditionRhombus, ENTITY_FIELD_NAME)
