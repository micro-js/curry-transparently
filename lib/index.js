/**
 * Modules
 */

var extend = require('@f/extend')

/**
 * Expose curryTransparently
 */

module.exports = curryTransparently

/**
 * curryTransparently
 */

function curryTransparently (fn, arity, args) {
  if (arity === undefined) arity = fn.length

  curried.$$args = args || []
  curried.$$fn = fn.$$fn || fn

  return curried

  function curried () {
    var newArgs = curried.$$args.slice()
    for (var i = 0; i < arguments.length; i++) {
      newArgs.push(arguments[i])
    }

    return newArgs.length >= arity
      ? fn.apply(null, newArgs)
      : curryTransparently(curried, arity, newArgs)
  }
}
