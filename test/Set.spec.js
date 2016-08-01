import expect from 'expect'
import { Set } from '../src/index'
import { Set as ImmutableSet } from 'immutable'

describe('Set', () => {
  class Collection extends Set {
    test() {
      return this.add('test')
    }
  }

  it('behaves like a normal Immutable.Set', () => {
    const obj = new Collection()

    expect(ImmutableSet.isSet(obj)).toBeTruthy()
    expect(Set.isSet(obj)).toBeTruthy()

    expect(obj).toBeA(ImmutableSet)
    expect(obj).toBeA(Set)
  })

  it('yields another custom Extendable.Set on operations', () => {
    const obj = new Collection()
      .add('a')

    expect(ImmutableSet.isSet(obj)).toBeTruthy()
    expect(Set.isSet(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.has('a')).toBeTruthy()
  })

  it('accepts values in its constructor similar to the Immutable.Set one', () => {
    const obj = new Collection([ 'a' ])

    expect(Set.isSet(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.has('a')).toBeTruthy()
  })

  it('has a consistent reference for empty Extendable.Set inheritors', () => {
    const empty = new Collection()
    const filled = new Collection([ 'a' ])

    expect(filled.clear()).toBe(empty)
    expect(filled.delete('a')).toBe(empty)
    expect(filled).toNotBe(empty)
  })

  it('returns a correct toString value', () => {
    const obj = new Collection([ 'a' ])

    expect(obj.toString()).toBe('Extendable.Set { "a" }')
  })

  it('allows the use of intermittent mutable operations', () => {
    let obj = new Collection().asMutable()

    expect(Set.isSet(obj)).toBeTruthy()
    expect(obj.size).toBe(0)

    obj.add('a')

    expect(Set.isSet(obj)).toBeTruthy()
    expect(obj.size).toBe(1)

    obj = obj.asImmutable()

    expect(Set.isSet(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.has('a')).toBeTruthy()
  })

  it('allows the use of custom, extended methods', () => {
    const obj = new Collection().test()

    expect(Set.isSet(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.has('test')).toBeTruthy()
  })

})
