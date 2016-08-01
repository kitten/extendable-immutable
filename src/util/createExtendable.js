import invariant from 'invariant'
import { disabledMethods, wrappedMethods } from '../constants/Methods'

export default function createExtendable(base, additionalWrapped = []) {
  const name = base.prototype.constructor.name
  const proto = Object.create(base.prototype)

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
      proto[key] = function(...args) {
        const { fromImmutable, fromMutable } = this.constructor

        invariant(typeof fromImmutable === 'function',
          `${name}: \`fromImmutable\` is expected to be a static method on the constructor.`)
        invariant(typeof fromMutable === 'function',
          `${name}: \`fromImmutable\` is expected to be a static method on the constructor.`)

        const res = _originalMethod.apply(this, args)
        return this.__ownerId ? fromMutable(this, res) : fromImmutable(res)
      }
    })

  return proto
}

