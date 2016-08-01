import expect from 'expect'
import { List } from '../src/index'
import { List as ImmutableList } from 'immutable'

describe('List', () => {
  class Collection extends List {
    test() {
      return this.push('test')
    }
  }

  it('behaves like a normal Immutable.List', () => {
    const obj = new Collection()

    expect(ImmutableList.isList(obj)).toBeTruthy()
    expect(List.isList(obj)).toBeTruthy()

    expect(obj).toBeA(ImmutableList)
    expect(obj).toBeA(List)
  })

  it('yields another custom Extendable.List on operations', () => {
    const obj = new Collection()
      .push('a')

    expect(ImmutableList.isList(obj)).toBeTruthy()
    expect(List.isList(obj)).toBeTruthy()
    expect(obj.first()).toBe('a')
  })

  it('accepts values in its constructor similar to the Immutable.List one', () => {
    const obj = new Collection([ 'a' ])

    expect(List.isList(obj)).toBeTruthy()
    expect(obj.first()).toBe('a')
  })

  it('has a consistent reference for empty Extendable.List inheritors', () => {
    const empty = new Collection()
    const filled = new Collection([ 'a' ])

    expect(filled.clear()).toBe(empty)
    expect(filled.delete(0)).toBe(empty)
    expect(filled).toNotBe(empty)
  })

  it('returns a correct toString value', () => {
    const obj = new Collection([ 'a' ])

    expect(obj.toString()).toBe('Extendable.List [ "a" ]')
  })

  it('allows the use of intermittent mutable operations', () => {
    let obj = new Collection().asMutable()

    expect(List.isList(obj)).toBeTruthy()
    expect(obj.size).toBe(0)

    obj.push('a')

    expect(List.isList(obj)).toBeTruthy()
    expect(obj.size).toBe(1)

    obj = obj.asImmutable()

    expect(List.isList(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.first()).toBe('a')
  })

  it('allows the use of custom, extended methods', () => {
    const obj = new Collection().test()

    expect(List.isList(obj)).toBeTruthy()
    expect(obj.size).toBe(1)
    expect(obj.first()).toBe('test')
  })

})
