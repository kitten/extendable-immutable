import expect from 'expect'
import { Map } from '../src/index'

describe('extend extendable(Map)', () => {
  class First extends Map {
  }

  class Second extends First {
  }

  it('constructs a Second extending First extending Map', () => {
    // Test if empty instances interfere with eachother
    const _dummy = new First()
    const obj = new Second()

    expect(new Second()).toNotBe(new First())
    expect(obj).toBeA(Second)
    expect(obj).toBeA(First)
    expect(obj).toBeA(Map)

    expect(obj.constructor).toBe(Second)
    expect(obj.constructor.prototype).toBeA(First)
    expect(obj.constructor.prototype).toBeA(Map)
  })
})
