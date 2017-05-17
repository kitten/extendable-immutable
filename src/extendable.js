import createExtendable from './util/createExtendable'

export default function extendable(Base) {
  const NAME = Base.prototype.constructor.name
  const emptyBase = new Base()

  let exampleBase
  if (emptyBase.add) {
    exampleBase = emptyBase.add('a')
  } else if (emptyBase.set) {
    exampleBase = emptyBase.set('a', 'b')
  } else if (emptyBase.push) {
    exampleBase = emptyBase.push('a')
  } else {
    throw new Error(`extendable: \`${NAME}\` is not supported.`)
  }

  const KEYS = Object.keys(exampleBase)
  const EMPTY = KEYS.reduce((acc, key) => {
    acc[key] = emptyBase[key]
    return acc
  }, {})

  function copy(val, update) {
    return KEYS.reduce((acc, key) => {
      acc[key] = update[key]
      return acc
    }, val)
  }

  function empty(val) {
    return Object
      .keys(EMPTY)
      .reduce((acc, key) => {
        acc[key] = EMPTY[key]
        return acc
      }, val)
  }

  function ExtendableWrapper(val) {
    let instance = this
    if (instance === undefined) {
      instance = new ExtendableWrapper(val)
    }

    return instance.__wrapImmutable(new Base(val))
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
