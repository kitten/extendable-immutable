import createExtendable from './util/createExtendable'

export default function extendable(Base) {
  const NAME = Base.prototype.constructor.name
  const emptyBase = new Base()

  let exampleBase
  if (emptyBase.add) {
    exampleBase = emptyBase.add("a")
  } else if (emptyBase.set) {
    exampleBase = emptyBase.set("a", "b")
  } else if (emptyBase.push) {
    exampleBase = emptyBase.push("a")
  } else {
    throw new Error(`extendable: \`${NAME}\` is not supported.`)
  }

  const KEYS = Object.keys(exampleBase)
  const EMPTY = KEYS.reduce((acc, key) => {
    acc[key] = emptyBase[key]
    return acc
  }, {})

  function copy(val, update) {
    for (const key of KEYS) {
      val[key] = update[key]
    }

    return val
  }

  function empty(val) {
    return Object.assign(val, EMPTY)
  }

  function ExtendableWrapper(val) {
    return this.__wrapImmutable(new Base(val))
  }

  ExtendableWrapper['is' + NAME] = function is(obj) {
    return obj && obj instanceof ExtendableWrapper
  }

  ExtendableWrapper.prototype = createExtendable(Base, copy, empty)
  ExtendableWrapper.prototype.constructor = ExtendableWrapper

  ExtendableWrapper.prototype.toString = function toString() {
    return 'Extendable.' + Base.prototype.toString.call(this)
  }

  return ExtendableWrapper
}
