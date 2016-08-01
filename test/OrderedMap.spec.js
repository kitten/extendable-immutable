import expect from 'expect'
import { OrderedMap } from '../src/index'
import { OrderedMap as ImmutableOrderedMap } from 'immutable'

describe('OrderedMap', () => {
  class Item extends OrderedMap {
    test() {
      return this.set('test', 'test')
    }
  }

  it('behaves like a normal Immutable.OrderedMap', () => {
    const obj = new Item()

    expect(ImmutableOrderedMap.isOrderedMap(obj)).toBeTruthy()
    expect(OrderedMap.isOrderedMap(obj)).toBeTruthy()

    expect(obj).toBeA(ImmutableOrderedMap)
    expect(obj).toBeA(OrderedMap)
  })

  it('yields another custom Extendable.OrderedMap on operations', () => {
    const obj = new Item()
      .set('a', 'a')

    expect(ImmutableOrderedMap.isOrderedMap(obj)).toBeTruthy()
    expect(OrderedMap.isOrderedMap(obj)).toBeTruthy()
    expect(obj.get('a')).toBe('a')
  })

  it('accepts values in its constructor similar to the Immutable.OrderedMap one', () => {
    const obj = new Item({ a: 'a' })

    expect(OrderedMap.isOrderedMap(obj)).toBeTruthy()
    expect(obj.get('a')).toBe('a')
  })

  it('has a consistent reference for empty Extendable.OrderedMap inheritors', () => {
    const empty = new Item()
    const filled = new Item({ a: 'a' })

    expect(filled.clear()).toBe(empty)
    expect(filled.delete('a')).toBe(empty)
    expect(filled).toNotBe(empty)
  })

  it('returns a correct toString value', () => {
    const obj = new Item({ a: 'a' })

    expect(obj.toString()).toBe('Extendable.OrderedMap { "a": "a" }')
  })

  it('allows the use of intermittent mutable operations', () => {
    let obj = new Item().asMutable()

    expect(OrderedMap.isOrderedMap(obj)).toBeTruthy()
    expect(obj.size).toBe(0)

    obj.set('a', 'a')

    expect(OrderedMap.isOrderedMap(obj)).toBeTruthy()
    expect(obj.size).toBe(1)

    obj = obj.asImmutable()

    expect(OrderedMap.isOrderedMap(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.get('a')).toBe('a')
  })

  it('allows the use of custom, extended methods', () => {
    const obj = new Item().test()

    expect(OrderedMap.isOrderedMap(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.get('test')).toBe('test')
  })
})

