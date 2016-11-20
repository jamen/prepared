# prepared [![NPM version](https://badge.fury.io/js/prepared.svg)](https://npmjs.org/package/prepared) [![Build Status](https://travis-ci.org/jamen/prepared.svg?branch=master)](https://travis-ci.org/jamen/prepared)

> Prepared callback error handling.

Have you ever been making a server or something or some async program, like this:

```js
blahBlah(function (err, data) {
  if (err) return response('error happened blah blah')
  // ...
})

fooBarBaz(function (err, data) {
  if (err) return response('error happened blah blah')
  // ...
})
```

But you end up handling a lot of particular/noisy errors the same way?

This is a super small way of solving that:

```js
var handler = prepared(() => response('internal server error'))

blahBlah(handler(function (data) {
  // ...
}))

fooBarBaz(handler(function (data) {
  // ...
}))
```

You can make them a bit more dynamic through arguments.  Useful for a logging mechanism as well.

## Installation

```sh
$ npm install --save prepared
```

## Usage

### `prepared(errorHandler)` -> `handler`

Prepare a Node-style callback with an error handler, so subsequent usage only focuses on data.

#### Parameters

 - `errorHandler` (`Function`): A node-style callback with parameters `(err, ...args)`.

#### Returns

This only returns `handler`, another function.  See docs below for more details.

#### Examples

```js
var handler = prepared(function (err) {
  // handle the error...
})
```

### `handler(callback)`

Create a callback function combined with your prepared error handler.

#### Parameters

 - `callback` (`Function`): A regular callback with no `err` parameter (already handled).

#### Returns

This only returns a Node-style callback that is combined with your previous `errorHandler`.

#### Examples

```js
// Create `handler` function:
var h = prepared(function (err) {
  console.error('Failed to read file')
})

// Use it as a callback
fs.readFile('./blah.js', h(function (data) {
  // ...
}))

// Reuse again:
fs.readFile('./foo.txt', h(function (data) {
  // ...
}))
```

### Arrow functions

Get slim and good looking code with arrow functions in combination with this module:

```js
// Create `handler` function:
var h = prepared(err => console.error('Failed to read file'))

// Use it as a callback
fs.readFile('./blah.js', h(data => ...))

// Reuse again:
fs.readFile('./foo.txt', h(data => ...))
```

## License

MIT © [Jamen Marz](https://git.io/jamen)
