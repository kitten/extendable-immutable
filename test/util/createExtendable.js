import expect from 'expect'
import { createExtendable } from '../../src/index'
import { Map } from 'immutable'

describe('createExtendable', () => {
  it('creates a prototype that contains the base in its chain', () => {
    const obj = Object.create(createExtendable(Map))

    expect(obj).toBeA(Map)
    expect(Map.isMap(obj)).toBeTruthy()
  })
})

