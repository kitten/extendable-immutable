import invariant from 'invariant'
import { disabledMethods, wrappedMethods } from '../constants/Methods'

const emptySymbol = Symbol('empty')

export default function createExtendable(base, copy, empty, additionalWrapped = []) {
  invariant(typeof copy === 'function',
    `${name}: \`copy\` is expected to be a function.`)
  invariant(typeof empty === 'function',
    `${name}: \`empty\` is expected to be a function.`)

  const name = base.prototype.constructor.name
  const proto = Object.create(base.prototype)

  // A method for wrapping an immutable object, with reference equality for empty objects
  proto.__wrapImmutable = function __wrapImmutable(val) {
    const { constructor, prototype } = this

    if (!val.size && !val.__ownerId) {
      if (!constructor[emptySymbol]) {
        constructor[emptySymbol] = empty(Object.create(prototype))
      }

      return constructor[emptySymbol]
    }

    if (val.__ownerId) {
      return copy(this, val)
    }

    return copy(Object.create(prototype), val)
  }

  // Methods which will throw, because they're not supported in extendable types
  for (const key of disabledMethods) {
    proto[key] = function disabled() {
      throw new Error(`${name}: \`${key}\` is not available for Extendables.`)
    }
  }

  // Methods which will yield a Map and have to be wrapped before returning a result
  wrappedMethods
    .concat(additionalWrapped)
    .forEach(key => {
      const _originalMethod = proto[key]

      proto[key] = function wrappedMethod(...args) {
        return this.__wrapImmutable(_originalMethod.apply(this, args))
      }
    })

  return proto
}

