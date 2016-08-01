import invariant from 'invariant'
import createExtendable from './util/createExtendable'
import { Map as ImmutableMap } from 'immutable'

function Map(val) {
  if (!val) {
    return emptyMap()
  }

  return Map.fromImmutable(new ImmutableMap(val))
}

Map.of = function of(...args) {
  if (!args.length) {
    return emptyMap()
  }

  return Map.fromImmutable(ImmutableMap.of(...args))
}

// Method for converting an Immutable.Map to an Extendable.Map
Map.fromImmutable = function fromImmutable(val) {
  invariant(ImmutableMap.isMap(val),
    'Map: `val` is expected to be an Immutable.Map.')

  if (!val.size) {
    return emptyMap()
  }

  const map = Object.create(Map.prototype)

  map.size = val.size
  map._root = val._root
  map.__ownerId = val.__ownerId
  map.__hash = val.__hash
  map.__altered = val.__altered

  return map
}

// Method for copying attributes from a mutable to an Extendable.Map
Map.fromMutable = function fromMutable(val, mutable) {
  invariant(Map.isMap(val),
    'Map: `val` is expected to be an Extendable.Map.')
  invariant(ImmutableMap.isMap(mutable),
    'Map: `immutable` is expected to be an Immutable.Map.')

  val.size = mutable.size
  val._root = mutable._root
  val.__ownerId = mutable.__ownerId
  val.__hash = undefined
  val.__altered = true

  return val
}

Map.isMap = function isMap(obj) {
  return obj && obj instanceof Map
}

// Inherit methods from Immutable.Map
Map.prototype = createExtendable(ImmutableMap)
Map.prototype.constructor = Map

Map.prototype.toString = function toString() {
  return this.__toString('Extendable.Map {', '}')
}

// Method for creating an empty Extendable.Map
let EMPTY_MAP
function emptyMap() {
  if (!EMPTY_MAP) {
    const map = Object.create(Map.prototype)
    map.size = 0
    map.__altered = false
    EMPTY_MAP = map
  }

  return EMPTY_MAP
}

export default Map

