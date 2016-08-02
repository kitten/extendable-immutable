import expect from 'expect'
import { Map } from '../src/index'
import { Map as ImmutableMap } from 'immutable'

describe('extendable(Map)', () => {
  class Item extends Map {
    test() {
      return this.set('test', 'test')
    }
  }

  it('behaves like a normal Immutable.Map', () => {
    const obj = new Item()

    expect(ImmutableMap.isMap(obj)).toBeTruthy()
    expect(Map.isMap(obj)).toBeTruthy()

    expect(obj).toBeA(ImmutableMap)
    expect(obj).toBeA(Map)
  })

  it('yields another custom Extendable.Map on operations', () => {
    const obj = new Item()
      .set('a', 'a')

    expect(ImmutableMap.isMap(obj)).toBeTruthy()
    expect(Map.isMap(obj)).toBeTruthy()
    expect(obj.get('a')).toBe('a')
  })

  it('accepts values in its constructor similar to the Immutable.Map one', () => {
    const obj = new Item({ a: 'a' })

    expect(Map.isMap(obj)).toBeTruthy()
    expect(obj.get('a')).toBe('a')
  })

  it('has a consistent reference for empty Extendable.Map inheritors', () => {
    const empty = new Item()
    const filled = new Item({ a: 'a' })

    expect(filled.clear()).toBe(empty)
    expect(filled.delete('a')).toBe(empty)
    expect(filled).toNotBe(empty)
  })

  it('returns a correct toString value', () => {
    const obj = new Item({ a: 'a' })

    expect(obj.toString()).toBe('Extendable.Map { "a": "a" }')
  })

  it('allows the use of intermittent mutable operations', () => {
    let obj = new Item().asMutable()

    expect(Map.isMap(obj)).toBeTruthy()
    expect(obj.size).toBe(0)

    obj.set('a', 'a')

    expect(Map.isMap(obj)).toBeTruthy()
    expect(obj.size).toBe(1)

    obj = obj.asImmutable()

    expect(Map.isMap(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.get('a')).toBe('a')
  })

  it('allows the use of custom, extended methods', () => {
    const obj = new Item().test()

    expect(Map.isMap(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.get('test')).toBe('test')
  })

  it('returns the Immutable.Map equivalent on calling toMap', () => {
    const obj = new Item()
      .test()
      .toMap()

    expect(Map.isMap(obj)).toBeFalsy()
    expect(ImmutableMap.isMap(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.get('test')).toBe('test')
  })
})
