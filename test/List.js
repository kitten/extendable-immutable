import expect from 'expect'
import { List } from '../src/index'
import { List as ImmutableList } from 'immutable'

describe('Extendable.List', () => {
  it('constructs an Extendable.List that behaves like an Immutable.List', () => {
    const obj = new List()

    expect(obj.size).toBe(0)
    expect(obj).toBe(new List())
    expect(obj.clear()).toBe(new List())
    expect(ImmutableList.isList(obj)).toBeTruthy()
    expect(obj instanceof ImmutableList).toBeTruthy()
  })

  it('yields an Extendable.List on calling a wrapped method', () => {
    const obj = new List()
    const _obj = obj.push('test')

    expect(_obj.size).toBe(1)
    expect(_obj.first()).toBe('test')
    expect(List.isList(_obj)).toBeTruthy()
    expect(ImmutableList.isList(_obj)).toBeTruthy()
  })

  it('constructs an Extendable.List when passing values like an Immutable.List', () => {
    const obj = new List([ 'test' ])

    expect(obj.size).toBe(1)
    expect(obj.first()).toBe('test')
    expect(List.isList(obj)).toBeTruthy()
    expect(ImmutableList.isList(obj)).toBeTruthy()
  })

  it('has a correct output on toString', () => {
    const obj = new List([ 'test' ])

    expect(obj.toString()).toBe('Extendable.List [ "test" ]')
  })
})

