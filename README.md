<p align="center"><img src="https://raw.githubusercontent.com/philpl/extendable-immutable/master/docs/intro.gif" width=400></p>
<p align="center">
<strong>Wrapper classes around Immutable.js that turn it inheritable</strong>
<br><br>
<a href="https://travis-ci.org/philpl/extendable-immutable"><img src="https://img.shields.io/travis/philpl/extendable-immutable/master.svg"></a>
<a href="https://coveralls.io/github/philpl/extendable-immutable"><img src="https://img.shields.io/coveralls/philpl/extendable-immutable/master.svg"></a>
<a href="https://npmjs.com/package/extendable-immutable"><img src="https://img.shields.io/npm/dm/extendable-immutable.svg"></a>
<a href="https://npmjs.com/package/extendable-immutable"><img src="https://img.shields.io/npm/v/extendable-immutable.svg"></a>
</p>

# Extendable [Immutable.js](https://github.com/facebook/immutable-js/)

## About

Ever wished that you could have OrderedMaps, Maps or Lists with extra methods,
that make your life easier? `.ofCourse()`!

- Behaves like normal [Immutable.js](https://github.com/facebook/immutable-js/) data structures
- Doesn't break [Immutable.js'](https://github.com/facebook/immutable-js/) inheritance (*.is and instanceof still pass!)

## Getting Started

Installing the latest version via npm takes just a second:

```bash
npm install --save extendable-immutable
```

Import what you need:

```js
import { OrderedMap } from 'extendable-immutable'

class Collection extends OrderedMap {
// ...
```

## Quick Intro

```js
import { OrderedMap } from 'extendable-immutable'

class Collection extends OrderedMap {
  static isCollection(val) {
    return val && val instanceof Collection;
  }

  doMagic() {
    return this.map(x => x.set("magic", true));
  }
}

const magic = new Collection();

magic instanceof Immutable.OrderedMap; // true
Immutable.OrderedMap.isOrderedMap(magic); // true
```

