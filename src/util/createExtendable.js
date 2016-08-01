import invariant from 'invariant'

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
    const { constructor } = this
    const { prototype } = constructor

    if (!val.size && !val.__ownerID) {
      if (!constructor[emptySymbol]) {
        constructor[emptySymbol] = empty(Object.create(prototype))
      }

      return constructor[emptySymbol]
    }

    if (val.__ownerID) {
      return copy(this, val)
    }

    return copy(Object.create(prototype), val)
  }

  // Methods which will yield a Map and have to be wrapped before returning a result
  for (const key in base.prototype) {
    if (!key.startsWith('__') && base.prototype.hasOwnProperty(key)) {
      const _originalMethod = base.prototype[key]

      if (typeof _originalMethod === 'function') {
        proto[key] = function wrappedMethod(...args) {
          const res = _originalMethod.apply(this, args)
          if (res instanceof base && !(res instanceof proto.constructor)) {
            return this.__wrapImmutable(res)
          }

          return res
        }
      }
    }
  }

  return proto
}

