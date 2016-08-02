import createExtendable from './util/createExtendable'

export default function extendable(Base) {
  const emptyBase = new Base()

  const NAME = Base.prototype.constructor.name
  const EMPTY = Object
    .keys(new Base())
    .reduce((acc, key) => {
      acc[key] = emptyBase[key]
      return acc
    }, {})

  function copy(val, update) {
    for (const key of Object.keys(update)) {
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
