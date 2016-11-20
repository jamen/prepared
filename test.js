var test = require('tape')
var fs = require('fs')
var prepared = require('./')

test('fires callbacks correctly', function (t) {
  t.plan(2)

  var h = prepared(function (err) {
    t.true(err, 'correctly errors')
  })


  // Run something stupid
  fs.readFile('./mooooooooooooooooooooooooooooooo.grass', h(function (data) {
    // This should not fire, will error if it does somehow:
    t.true(data, 'incorrectly calls')
  }))

  // Run something readsonable:
  fs.readFile('./package.json', h(function (data) {
    t.true(data, 'correctly calls')
  }))
})
