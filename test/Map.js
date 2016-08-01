import expect from 'expect'
import { Map } from '../src/index'
import { Map as ImmutableMap } from 'immutable'

describe('Extendable.Map', () => {
  it('constructs an Extendable.Map that behaves like an Immutable.Map', () => {
    const obj = new Map()

    expect(obj.size).toBe(0)
    expect(obj).toBe(new Map())
    expect(obj.clear()).toBe(new Map())
    expect(ImmutableMap.isMap(obj)).toBeTruthy()
    expect(obj instanceof ImmutableMap).toBeTruthy()
  })

  it('yields an Extendable.Map on calling a wrapped method', () => {
    const obj = new Map()
    const _obj = obj.set('test', 'test')

    expect(_obj.size).toBe(1)
    expect(_obj.get('test')).toBe('test')
    expect(Map.isMap(_obj)).toBeTruthy()
    expect(ImmutableMap.isMap(_obj)).toBeTruthy()
  })

  it('constructs an Extendable.Map when passing values like an Immutable.Map', () => {
    const obj = new Map({ test: 'test' })

    expect(obj.size).toBe(1)
    expect(obj.get('test')).toBe('test')
    expect(Map.isMap(obj)).toBeTruthy()
    expect(ImmutableMap.isMap(obj)).toBeTruthy()
  })

  it('has a correct output on toString', () => {
    const obj = new Map({ test: 'test' })

    expect(obj.toString()).toBe('Extendable.Map { "test": "test" }')
  })
})

