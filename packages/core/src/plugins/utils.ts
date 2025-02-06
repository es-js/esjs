import { invertMap } from '../utils'

let toEsJS = false

export function setToEsJS(value: boolean) {
  toEsJS = value
}

export function getToEsJS() {
  return toEsJS
}

export function replaceObjectNew({
  from,
  to,
}: {
  from: string
  to: string
}) {
  const a = toEsJS ? to : from
  const b = toEsJS ? from : to

  return {
    [`new ${a}(__args)`]: `new ${b}(__args)`,
    [`new ${a}.__a`]: `new ${b}.__a`,
    [`new ${a}()`]: `new ${b}()`,
  }
}

export function replaceObjectCall({
  from,
  to,
}: {
  from: string
  to: string
}) {
  const a = toEsJS ? to : from
  const b = toEsJS ? from : to

  return {
    [`${a}(__args)`]: `${b}(__args)`,
    [`${a}.__a`]: `${b}.__a`,
  }
}

export function replaceObject({
  from,
  to,
}: {
  from: string
  to: string
}) {
  return {
    ...replaceObjectNew({
      from,
      to,
    }),
    ...replaceObjectCall({
      from,
      to,
    }),
  }
}

export function replaceObjects({
  objects,
}: {
  objects: Map<string, string>
}) {
  const rules = []

  for (const [from, to] of objects) {
    rules.push(
      replaceObject({
        from,
        to,
      }),
    )
  }

  return Object.assign({}, ...rules)
}

export function replaceExpressionMethods({
  methods,
}: {
  methods: Map<string, string>
}) {
  const dictionary = toEsJS ? invertMap(methods) : methods

  return Object.fromEntries(
    [...dictionary].map(([key, value]) => {
      return [`__a.${key}`, `__a.${value}`]
    }),
  )
}

export function replaceObjectStaticMethods({
  from,
  to,
  methods,
}: {
  from: string
  to: string
  methods: Map<string, string>
}) {
  const a = toEsJS ? to : from
  const b = toEsJS ? from : to

  const dictionary = toEsJS ? invertMap(methods) : methods

  return Object.fromEntries(
    [...dictionary].map(([key, value]) => {
      return [`${a}.${key}`, `${b}.${value}`]
    }),
  )
}

export function replaceObjectProperties({
  properties,
}: {
  properties: Map<string, string>
}) {
  const dictionary = toEsJS ? invertMap(properties) : properties

  return Object.fromEntries(
    [...dictionary].map(([key, value]) => {
      return [`__a.${key}`, `__a.${value}`]
    }),
  )
}

export function replaceObjectStaticProperties({
  from,
  to,
  properties,
}: {
  from: string
  to: string
  properties: Map<string, string>
}) {
  const a = toEsJS ? to : from
  const b = toEsJS ? from : to

  const dictionary = toEsJS ? invertMap(properties) : properties

  return Object.fromEntries(
    [...dictionary].map(([key, value]) => {
      return [`${a}.${key}`, `${b}.${value}`]
    }),
  )
}

export function replaceGlobalMethods({
  methods,
}: {
  methods: Map<string, string>
}) {
  const dictionary = toEsJS ? invertMap(methods) : methods

  return Object.fromEntries(
    [...dictionary].map(([key, value]) => {
      return [key, value]
    }),
  )
}

export function replaceKeyword({
  from,
  to,
}: {
  from: string
  to: string
}) {
  const a = toEsJS ? to : from
  const b = toEsJS ? from : to

  return {
    [a]: b,
  }
}

export function replaceInstanceof({
  from,
  to,
}: {
  from: string
  to: string
}) {
  const a = toEsJS ? to : from
  const b = toEsJS ? from : to

  return {
    [`__a instanceof ${a}`]: `__a instanceof ${b}`,
  }
}

export function replaceKeywords({
  keywords,
}: {
  keywords: Map<string, string>
}) {
  const rules = []

  for (const [from, to] of keywords) {
    rules.push(
      replaceKeyword({
        from,
        to,
      }),
    )
  }

  return Object.assign({}, ...rules)
}
