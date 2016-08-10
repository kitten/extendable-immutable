import invariant from 'invariant'

const emptySymbol = Symbol('empty')
const unwrappedMethods = [
  'get',
  'getIn',
  'first',
  'last',
  'getIn',
  'reduce',
  'reduceRight',
  'find',
  'findLast',
  'findEntry',
  'findLastEntry',
  'max',
  'maxBy',
  'min',
  'minBy'
]

export default function createExtendable(base, copy, empty) {
  invariant(typeof copy === 'function',
    `${name}: \`copy\` is expected to be a function.`)
  invariant(typeof empty === 'function',
    `${name}: \`empty\` is expected to be a function.`)

  const name = base.prototype.constructor.name
  const proto = Object.create(base.prototype)

  // A method for wrapping an immutable object, with reference equality for empty objects
  proto.__wrapImmutable = function __wrapImmutable(val, forceCreation = false) {
    const { constructor } = this
    const { prototype } = constructor

    if (!forceCreation && !val.size && !val.__ownerID) {
      if (!constructor[emptySymbol]) {
        constructor[emptySymbol] = empty(Object.create(prototype))
      }

      return constructor[emptySymbol]
    }

    return copy(Object.create(prototype), val)
  }

  // Methods which will yield a Map and have to be wrapped before returning a result
  for (const key in base.prototype) {
    if (
      !key.startsWith('__') &&
      !key.startsWith('to') &&
      unwrappedMethods.indexOf(key) === -1 &&
      base.prototype.hasOwnProperty(key)
    ) {
      const _originalMethod = base.prototype[key]

      if (typeof _originalMethod === 'function') {
        proto[key] = function wrappedMethod(...args) {
          const res = _originalMethod.apply(this, args)
          if (res && typeof res === 'object' && res.constructor === base.prototype.constructor) {
            return this.__wrapImmutable(res)
          }

          return res
        }
      }
    }
  }

  proto.__ensureOwner = function __ensureOwner(ownerID) {
    if (ownerID === this.__ownerID) {
      return this
    } else if (!ownerID) {
      this.__ownerID = undefined
      this.__altered = false
      return this
    }

    const res = this.__wrapImmutable(this, true)
    res.__ownerID = ownerID
    return res
  }

  return proto
}

