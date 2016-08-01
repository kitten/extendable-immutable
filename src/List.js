import invariant from 'invariant'
import createExtendable from './util/createExtendable'
import { wrappedMethods } from './constants/List'
import { List as ImmutableList } from 'immutable'

// NOTE: Copied from TrieUtils
const SHIFT = 5

function List(val) {
  if (!val || (Array.isArray(val) && !val.length)) {
    return emptyList()
  }

  return List.fromImmutable(new ImmutableList(val))
}

List.of = function of(...args) {
  return this[args]
}

// Method for converting an Immutable.List to an Extendable.List
List.fromImmutable = function fromImmutable(val) {
  invariant(ImmutableList.isList(val),
    'List: `val` is expected to be an Immutable.List.')

  if (!val.size) {
    return emptyList()
  }

  const list = Object.create(List.prototype)

  list.size = val.size
  list._origin = val._origin
  list._capacity = val._capacity
  list._level = val._level
  list._root = val._root
  list._tail = val._tail
  list.__ownerId = val.__ownerId
  list.__hash = undefined
  list.__altered = true

  return list
}

// Method for copying attributes from a mutable to an Extendable.List
List.fromMutable = function fromMutable(val, mutable) {
  invariant(List.isList(val),
    'List: `val` is expected to be an Extendable.List.')
  invariant(ImmutableList.isList(mutable),
    'List: `immutable` is expected to be an Immutable.List.')

  val.size = mutable.size
  val._root = mutable._root
  val.__ownerId = mutable.__ownerId
  val.__hash = undefined
  val.__altered = true

  return val
}

List.isList = function isList(obj) {
  return obj && obj instanceof List
}

// Inherit methods from Immutable.List
List.prototype = createExtendable(ImmutableList, wrappedMethods)
List.prototype.constructor = List

List.prototype.toString = function toString() {
  return this.__toString('Extendable.List [', ']')
}

// Method for creating an empty Extendable.List
let EMPTY_LIST
function emptyList() {
  if (!EMPTY_LIST) {
    const map = Object.create(List.prototype)
    map.size = 0
    map._origin = 0
    map._capacity = 0
    map._level = SHIFT
    map.__altered = false
    EMPTY_LIST = map
  }

  return EMPTY_LIST
}

export default List

