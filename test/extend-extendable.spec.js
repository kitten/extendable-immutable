import expect from 'expect'
import { OrderedMap } from '../src/index'

describe('extend extendable(OrderedMap)', () => {
  class First extends OrderedMap {
  }

  class Second extends First {
    setTest() {
      return this
        .set("test", true)
        .sort()
    }
  }

  it('constructs a Second extending First extending Map', () => {
    // Test if empty instances interfere with eachother
    const _dummy = new First()
    const obj = new Second()

    expect(new Second()).toNotBe(new First())
    expect(obj).toBeA(Second)
    expect(obj).toBeA(First)
    expect(obj).toBeA(OrderedMap)

    expect(obj.constructor).toBe(Second)
    expect(obj.constructor.prototype).toBeA(First)
    expect(obj.constructor.prototype).toBeA(OrderedMap)
  })

  it('yields a Second on calling a Second method', () => {
    const obj = new Second()
    const res = obj.setTest()

    expect(obj).toBeA(Second)
    expect(res).toBeA(Second)

    expect(res.constructor).toBe(Second)
    expect(res.get("test")).toBe(true)
  })

  it('has a consistent reference for empty instances', () => {
    const a = new First({ a: 'a' })
    const b = new Second({ b: 'b' })

    expect(a.clear()).toBe(a.delete('a'))
    expect(b.clear()).toBe(b.delete('b'))
    expect(b.clear()).toNotBe(a.delete('a'))
    expect(a.clear()).toNotBe(b.delete('b'))
  })
})
