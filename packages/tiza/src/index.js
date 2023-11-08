import { colors } from './colors.js'

const userDefined = ['fondo', 'frente']

const modifiers = [
  'opaco',
  'negrita',
  'cursiva',
  'subrayado',
  'tachado',
  'invertido',
]

const defaultConfig = {
  fondo: null,
  frente: null,
  opaco: false,
  negrita: false,
  cursiva: false,
  subrayado: false,
  tachado: false,
  invertido: false,
}

class Tiza {
  constructor(options = { nest: false }) {
    /**
     * @private api
     */
    this._isNested = !!options?.nest
    /**
     * @private api
     */
    this._config = Object.assign({}, defaultConfig)

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const $self = this

    for (const color in colors) {
      if (Object.hasOwnProperty.call(colors, color)) {
        Object.defineProperty($self, color, {
          get() {
            if (!this._isNested)
              return $self._create(true)[color]

            if (colors[color].length > 0)
              $self._config[color.startsWith('fondo') ? 'fondo' : 'frente'] = colors[color]

            return $self._create(false)
          },
        })
      }
    }

    for (const item of modifiers) {
      Object.defineProperty($self, item, {
        get() {
          if (!this._isNested)
            return $self._create(true)[item]

          $self._config[item] = true
          return $self._create(false)
        },
      })
    }

    for (const style of userDefined) {
      Object.defineProperty($self, style, {
        get() {
          if (!this._isNested)
            return $self._create(true)[style]

          return (val) => {
            $self._config[style] = val
            return $self._create(false)
          }
        },
      })
    }
  }

  /**
   * @private api
   * @param {boolean} flag
   */
  _create(flag) {
    const $self = !flag ? this : new Tiza({ nest: true })
    const fn = $self.toString.bind($self)
    Object.setPrototypeOf(fn, $self)
    return fn
  }

  /**
   * @private
   */
  _reset() {
    if (!this._isNested)
      this._config = Object.assign({}, defaultConfig)
  }

  toJSON() {
    return this.toString()
  }

  toString(...args) {
    let data = String(args[0])

    if (args.length === 0)
      return ''

    if (args.length > 1) {
      for (let i = 1; i < args.length; i++)
        data += ` ${args[i]}`
    }

    const { fondo, frente, negrita, cursiva, subrayado, tachado, opaco, invertido } = this._config

    const wrap = fondo || frente || opaco

    const colorFondo = invertido ? frente : fondo
    const colorFrente = invertido ? fondo : frente

    const output = (wrap ? '<span style="white-space: pre-wrap;' : '')
      + (colorFondo ? `background-color:${colorFondo};` : '')
      + (colorFrente ? `color:${colorFrente};` : '')
      + (opaco ? 'opacity:0.5;' : '')
      + (wrap ? '">' : '')
      + (negrita ? '<b>' : '')
      + (subrayado ? '<u>' : '')
      + (tachado ? '<s>' : '')
      + (cursiva ? '<i>' : '')
      + (data || '')
      + (cursiva ? '</i>' : '')
      + (tachado ? '</s>' : '')
      + (subrayado ? '</u>' : '')
      + (negrita ? '</b>' : '')
      + (wrap ? '</span>' : '')

    this._reset()

    return output
  }
}

export const tiza = new Tiza()
