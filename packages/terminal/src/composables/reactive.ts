/**
 * Basado en https://github.com/gorenamir/reactive-light
 * @author [Amir Goren](https://github.com/gorenamir)
 */

let updaterFunction = null
const depsMap = new WeakMap()

class Deps {
  #deps = new Set()

  add(f) {
    this.#deps.add(f)
  }

  notify(obj) {
    this.#deps.forEach((func) => { func(obj) })
  }
}

export class Ref {
  #internalValue = null

  constructor(initialValue = null) {
    this.#internalValue = initialValue
  }

  get value() {
    let deps = depsMap.get(this)

    if (deps === undefined) {
      deps = new Deps()
      depsMap.set(this, deps)
    }

    if (updaterFunction !== null)
      deps.add(updaterFunction)

    return this.#internalValue
  }

  set value(newVal) {
    this.#internalValue = newVal
    const deps = depsMap.get(this)
    if (deps !== undefined)
      deps.notify(this)

    return true
  }
}

function ref(initialValue = null): Ref {
  return new Ref(initialValue)
}

class Computed {
  #cb = null
  #updaterFunction = null
  #cachedValue = null
  #calculated = false

  constructor(cb) {
    this.#cb = cb
  }

  get value() {
    let deps = depsMap.get(this)

    if (deps === undefined) {
      deps = new Deps()
      depsMap.set(this, deps)
    }

    if (updaterFunction !== null)
      deps.add(updaterFunction)

    if (this.#updaterFunction === null) {
      this.#updaterFunction = () => {
        const newValue = this.#cb()
        if (newValue !== this.#cachedValue) {
          this.#cachedValue = newValue
          deps.notify(this)
        }
      }
    }

    const oldUpdaterFunction = updaterFunction
    updaterFunction = this.#updaterFunction
    if (!this.#calculated) {
      this.#cachedValue = this.#cb()
      this.#calculated = true
    }
    updaterFunction = oldUpdaterFunction
    return this.#cachedValue
  }
}

function computed(cb) {
  if (typeof cb !== 'function')
    throw new TypeError('Argument is not a function.')

  return new Computed(cb)
}

const reactiveHandler = {
  get(obj, prop) {
    let deps = depsMap.get(obj)

    if (deps === undefined) {
      deps = new Deps()
      depsMap.set(obj, deps)
    }

    if (updaterFunction !== null)
      deps.add(updaterFunction)

    return obj[prop]
  },
  set(obj, prop, value) {
    if (isObject(value))
      obj[prop] = reactive(value)
    else
      obj[prop] = value

    const deps = depsMap.get(obj)
    if (deps !== undefined)
      deps.notify(obj)

    return true
  },
  deleteProperty(obj, prop) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop]
      const deps = depsMap.get(obj)
      if (deps !== undefined)
        deps.notify(obj)
    }
    return true
  },
}

function reactive(obj) {
  const objCopy = { ...obj }
  for (const key in objCopy) {
    if (objCopy.hasOwnProperty(key) && isObject(objCopy[key]))
      objCopy[key] = reactive(objCopy[key])
  }
  return new Proxy(objCopy, reactiveHandler)
}

function watchEffect(cb) {
  const oldUpdaterFunction = updaterFunction
  updaterFunction = cb
  cb()
  updaterFunction = oldUpdaterFunction
}

function watch(whatToWatch, cb, deep = false) {
  const oldUpdaterFunction = updaterFunction

  let unsubscribed = false

  const unsubscribe = () => {
    unsubscribed = true
  }

  updaterFunction = () => {
    if (unsubscribed)
      return

    const newVal = whatToWatch()

    if (newVal !== val) {
      cb(newVal, val)
      val = newVal
      if (isObject(val) && deep)
        setDeepWatch(val, whatToWatch, cb)
    }
  }

  let val = whatToWatch()
  if (isObject(val) && deep)
    setDeepWatch(val, whatToWatch, cb)

  updaterFunction = oldUpdaterFunction

  return unsubscribe
}

function setDeepWatch(obj, whatToWatch, cb) {
  const oldUpdaterFunction = updaterFunction
  updaterFunction = () => {
    if (whatToWatch() === obj)
      cb(obj, obj)
  }
  accessObjectAndChildrenObjects(obj)
  updaterFunction = oldUpdaterFunction
}

const DUMMY_PROP = Symbol('DUMMY_PROP')

function accessObjectAndChildrenObjects(obj) {
  obj[DUMMY_PROP] // access dummy prop on the object to manually trigger the get trap of the reactive object's Proxy
  for (const key in obj) {
    if (isObject(obj[key]))
      accessObjectAndChildrenObjects(obj[key])
  }
}

function isObject(value) {
  if (value === null)
    return false

  const type = (typeof value)
  return type === 'object' || type === 'function'
}

export { ref, computed, reactive, watch, watchEffect }
