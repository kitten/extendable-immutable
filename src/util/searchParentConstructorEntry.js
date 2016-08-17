export default function searchParentConstructorEntry(c, searchKey, searchVal) {
  let anchor = c

  while (anchor && anchor.prototype) {
    const prototype = Object.getPrototypeOf(anchor.prototype)
    if (!prototype) {
      return false
    }

    anchor = prototype.constructor

    if (anchor[searchKey] === searchVal) {
      return true
    }
  }

  return false
}
