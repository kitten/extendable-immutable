import invariant from 'invariant'
import createExtendable from './util/createExtendable'

import {
  Set as ImmutableSet,
  Map as ImmutableMap
} from 'immutable'

const EMPTY_MAP = new ImmutableMap()

// Copy all attributes from an Immutable.List to an Extendable.List
function copy(val, immutable) {
  val.size = immutable.size
  val._map = immutable._map
  val.__ownerid = immutable.__ownerid

  return val
}

function empty(val) {
  val.size = 0
  val._map = EMPTY_MAP
  val.__ownerid = undefined

  return val
}

function Set(val) {
  return this.__wrapImmutable(new ImmutableSet(val))
}

Set.isSet = function isSet(obj) {
  return obj && obj instanceof Set
}

// Inherit methods from Immutable.OrderedMap
Set.prototype = createExtendable(ImmutableSet, copy, empty)
Set.prototype.constructor = Set

Set.prototype.toString = function toString() {
  return this.__toString('Extendable.Set {', '}')
}

export default Set

