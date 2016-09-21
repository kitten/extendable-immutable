import expect from 'expect'
import { Map } from '../src/index'
import { Map as ImmutableMap } from 'immutable'
import extendable from '../src/extendable'

describe('extendable(Map)', () => {
  class Item extends Map {
    test() {
      return this.set('test', 'test')
    }
  }

  it('throws if a non-supported object is passed', () => {
    expect(() => {
      extendable(class Test {})
    }).toThrow(`extendable: \`Test\` is not supported.`);
  })

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

    obj.set('b', 'b')

    expect(Map.isMap(obj)).toBeTruthy()
    expect(obj.size).toBe(2)

    obj = obj.asImmutable()

    expect(Map.isMap(obj)).toBeTruthy()
    expect(obj.size).toBe(2)
    expect(obj.get('a')).toBe('a')
    expect(obj.get('b')).toBe('b')
  })

  it('allows the use of withMutations methods', () => {
    const orig = new Item()

    expect(Map.isMap(orig)).toBeTruthy()
    expect(orig.size).toBe(0)

    const res = orig.withMutations(map => {
      map.set('a', 'a')

      expect(map).toBeTruthy()
      expect(map.size).toBe(1)
    })

    expect(Map.isMap(res)).toBeTruthy()
    expect(res.size).toBe(1)
    expect(res.get('a')).toBe('a')
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

  it('doesn\'t copy custom values that are set on Extendable.Map', () => {
    const obj = new Item()
    obj.custom = 'test'

    expect(obj.custom).toBe('test')

    const obj2 = obj.set('a', 'b')
    expect(obj2.custom).toBeFalsy()
  })


})
