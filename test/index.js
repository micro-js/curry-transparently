/**
 * Imports
 */

var curry = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  var fn = curry(add)

  t.deepEqual(fn.$$args, [])
  t.equal(fn.$$fn, add)

  t.deepEqual(fn(1).$$args, [1])
  t.deepEqual(fn(1).$$fn, add)

  t.ok(compare(fn(1), fn(1)))
  t.notOk(compare(fn(1), fn(2)))

  t.equal(fn(1)(2), 3)

  t.end()
})

test('multiple levels', function (t) {
  var fn = curry(add, Infinity)

  var a = fn(1)
  var b = a(2)

  t.deepEqual(a.$$args, [1])
  t.deepEqual(b.$$args, [1, 2])

  t.end()
})

/**
 * Helpers
 */

function add (a, b) {
  return a + b
}

function compare (fn1, fn2) {
  if (fn1.$$fn !== fn2.$$fn) return false
  if (fn1.$$args.length !== fn2.$$args.length) return false

  for (var i = 0; i < fn1.$$args; i++) {
    if (fn1.$$args[i] !== fn2.$$args[i]) {
      return false
    }
  }

  return true
}
