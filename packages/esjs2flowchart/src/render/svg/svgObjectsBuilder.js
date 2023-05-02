import { SVGBase } from './SVGBase'
import { createConnectionArrow, createRootCircle, createShapeForNode } from './shapesFactory'
import { complexTraversal } from '@/shared/utils/traversalWithTreeLevelsPointer'
import { ARROW_TYPE, TOKEN_KEYS, TOKEN_TYPES } from '@/shared/constants'

export const buildSVGObjectsTree = (flowTree, styleTheme) => {
  const svg = SVGBase()

  const shapeStructures = buildShapeStructures(flowTree, styleTheme)
  const connections = buildConnections(shapeStructures.root, styleTheme)

  svg.addShapes(shapeStructures.list).addShapes(shapeStructures.root)
  svg.addArrowConnections(connections)

  return svg
}

export const buildShapeStructures = (flowTree, styleTheme) => {
  const root = createRootCircle(flowTree, styleTheme)
  const position = { ...root.getChildOffsetPoint() }
  const shapesList = []

  let latestNode

  complexTraversal(
    flowTree,
    root,
    (parentNode, parentShape) => {
      position.x += parentShape.getChildOffsetPoint().x
    },
    (node, parentShape) => {
      position.y += addExtraSpacingBeforeShape(styleTheme, node, latestNode)

      // TODO: refactor, move cases out of func, it will to many of them soon
      if (
        parentShape.getNodeType() === TOKEN_TYPES.CONDITIONAL
                && node.key === TOKEN_KEYS.ALTERNATE
                && !parentShape.checkIfChildExist(TOKEN_KEYS.ALTERNATE)
      ) {
        const alternatePoint = parentShape.getAlternativeBranchChildOffsetPoint()
        position.x = alternatePoint.x + parentShape.getMargin()
        position.y = alternatePoint.y
      }

      const shape = createShapeForNode(node, { x: position.x, y: position.y }, styleTheme)

      position.x = shape.getPosition().x
      position.y = shape.getPosition().y

      shapesList.push(shape)
      parentShape.connectChild(shape)
      position.y += shape.getChildOffsetPoint().y

      latestNode = node
      return shape
    },
    (parentNode, parentShape) => {
      if (parentNode.type === TOKEN_TYPES.CONDITIONAL)
        position.y = parentShape.getChildBoundaries().max.y + parentShape.getMargin()

      position.x = parentShape.getPosition().x
    },
  )

  return {
    list: shapesList,
    root,
  }
}

const addExtraSpacingBeforeShape = (theme, node, latestNode = {}) => {
  const complexNodeTypes = [
    TOKEN_TYPES.FUNCTION,
    TOKEN_TYPES.FUNCTION_DECLARATION,
    TOKEN_TYPES.FUNCTION_EXPRESSION,
    TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION,
    TOKEN_TYPES.CLASS_DECLARATION,
    TOKEN_TYPES.IMPORT_DECLARATION,
    TOKEN_TYPES.EXPORT_NAMED_DECLARATION,
    TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION,
  ]

  if (
    complexNodeTypes.includes(node.type)
        && !complexNodeTypes.includes(latestNode.type)
        && node.pathParentType !== TOKEN_TYPES.CALL_EXPRESSION
  )
    return theme.BaseShape.complexTypeExtraSpace

  return 0
}

export const buildConnections = (shapesTree, styleTheme) => {
  const connections = []
  const pushArrow = (config) => {
    const connection = createConnectionArrow(config, styleTheme)
    connections.push(connection)

    return connection
  }

  let latestShape = null
  let latestParentShape = null

  complexTraversal(
    shapesTree,
    shapesTree,
    (parentShape) => {},
    (shape, parentShape) => {
      latestShape = shape

      const config = buildConnectionConfig(shape, parentShape)
      const arrow = pushArrow(config)

      shape.assignConnectionArrow(arrow)

      return shape
    },
    (parentShape) => {
      latestParentShape = parentShape
      if (parentShape.getNodeType() !== TOKEN_TYPES.LOOP)
        return

      const { max } = parentShape.getChildBoundaries()

      parentShape.assignLoopedConnectionArrow(
        pushArrow({
          startPoint: latestShape.getBackPoint(),
          endPoint: parentShape.getMidPoint(),
          boundaryPoint: { x: max.x },
          arrowType: ARROW_TYPE.DOWN,
        }),
      )
    },
    {
      getBody: node => node.getBody(),
    },
  )

  return connections
}

const isNoArrow = (toShape, fromShape) => {
  if (
    [
      TOKEN_TYPES.IMPORT_SPECIFIER,
      TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER,
      TOKEN_TYPES.OBJECT_PROPERTY,
    ].includes(toShape.getNodeType())
  )
    return true

  if (
    [
      TOKEN_TYPES.FUNCTION_DECLARATION,
      TOKEN_TYPES.FUNCTION_EXPRESSION,
      TOKEN_TYPES.FUNCTION,
      TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION,
    ].includes(toShape.getNodeType())
        && [
          TOKEN_TYPES.CALL_EXPRESSION,
          TOKEN_TYPES.VARIABLE_DECLARATOR,
          TOKEN_TYPES.ASSIGNMENT_EXPRESSION,
          TOKEN_TYPES.NEW_EXPRESSION,
        ].includes(fromShape.getNodeType())
  )
    return true
}

const buildConnectionConfig = (toShape, fromShape) => {
  const config = {
    endPoint: toShape.getToPoint(),
    arrowType: ARROW_TYPE.RIGHT,
    noArrow: isNoArrow(toShape, fromShape),
  }

  if (
    toShape.getNodeKey() === TOKEN_KEYS.ALTERNATE
        && fromShape.getAlternativeBranchChildOffsetPoint
  ) {
    const boundaryPoint = fromShape.getAlternativeBranchChildOffsetPoint()

    config.startPoint = fromShape.getAlternateFromPoint()
    config.boundaryPoint = { x: boundaryPoint.x }
  }
  else {
    config.startPoint = fromShape.getFromPoint()
  }

  return config
}
