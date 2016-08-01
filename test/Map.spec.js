import expect from 'expect'
import { Map } from '../src/index'
import { Map as ImmutableMap } from 'immutable'

describe('Map', () => {
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
})
