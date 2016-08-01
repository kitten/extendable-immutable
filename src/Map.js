import invariant from 'invariant'
import createExtendable from './util/createExtendable'
import { Map as ImmutableMap } from 'immutable'

// copy all attributes from an immutable.list to an extendable.list
function copy(val, immutable) {
  val.size = immutable.size
  val._root = immutable._root
  val.__ownerid = immutable.__ownerid
  val.__hash = immutable.__hash
  val.__altered = immutable.__altered

  return val
}

function empty(val) {
  val.size = 0
  val._root = undefined
  val.__ownerid = undefined
  val.__hash = undefined
  val.__altered = false

  return val
}

function Map(val) {
  if (!this) {
    return new Map(val)
  }

  return this.__wrap(new ImmutableMap(val))
}

Map.isMap = function isMap(obj) {
  return obj && obj instanceof Map
}

// Inherit methods from Immutable.Map
Map.prototype = createExtendable(ImmutableMap, copy, empty)
Map.prototype.constructor = Map

Map.prototype.toString = function toString() {
  return this.__toString('Extendable.Map {', '}')
}

export default Map

