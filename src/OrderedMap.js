import invariant from 'invariant'
import createExtendable from './util/createExtendable'

import {
  List as ImmutableList,
  Map as ImmutableMap,
  OrderedMap as ImmutableOrderedMap
} from 'immutable'

const EMPTY_LIST = new ImmutableList()
const EMPTY_MAP = new ImmutableMap()

// Copy all attributes from an Immutable.List to an Extendable.List
function copy(val, immutable) {
  val.size = immutable.size
  val._list = immutable._list
  val._map = immutable._map
  val.__ownerId = immutable.__ownerId
  val.__hash = immutable.__hash

  return val
}

function empty(val) {
  val.size = 0
  val._list = EMPTY_LIST
  val._map = EMPTY_MAP
  val.__ownerid = undefined
  val.__hash = undefined

  return val
}

function OrderedMap(val) {
  return this.__wrapImmutable(new ImmutableOrderedMap(val))
}

OrderedMap.isOrderedMap = function isOrderedMap(obj) {
  return obj && obj instanceof OrderedMap
}

// Inherit methods from Immutable.OrderedMap
OrderedMap.prototype = createExtendable(ImmutableOrderedMap, copy, empty)
OrderedMap.prototype.constructor = OrderedMap

OrderedMap.prototype.toString = function toString() {
  return this.__toString('Extendable.OrderedMap {', '}')
}

export default OrderedMap

