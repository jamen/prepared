var fargs = require('fast-args')

module.exports = prepared

/**
 * Prepare a callback function with an error handler
 */
function prepared (errorHandler) {
  return function handler (callback) {
    return function _callback () {
      var input = fargs(arguments, 1)
      if (arguments[0]) return errorHandler.apply(this, arguments)
      else return callback.apply(this, input)
    }
  }
}
