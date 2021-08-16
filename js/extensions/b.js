const a = require('is-plain-object');

/**
 * [Nightmare Action for injecting remote jQuery (http://jquery.com/download/)]
 * @param  {[Object]} options [List of options]
 * @param  {[Function]} onJqueryLoadCallback [A function to execute once jQuery has loaded]
 * @return {[Promise]} [Evaluated]
 * Usage:
 * Nightmare.injectJQ(
 * {
 *  src: '<JQUERY_URL>'
 * }, function(someArg) {
 *  // ES5 code that will execute in the browser scope
 * },
 * someArg,... // arguments to pass from Node scope to browser scope
 * )
 */

module.exports = Nightmare => {
  return Nightmare.action('injectJQ', function(...args) {
    const done = args[args.length - 1] // extract `done` from Nightmare `action` wrapper
    // stringify `Function` arguments, otherwise `evaluate_now` will nullify them
    let normalizedArgs = [].slice.call(args, 0, args.length - 1).map(item => {
      if (typeof item === 'function') {
        return `(${item.toString()})`;
      }
      return item
    })
    const defaults = {
      src: 'https://code.jquery.com/jquery-3.2.1.min.js'
    }
    let options = defaults
    if (a(args[0])) { // was `options` passed?
      options = Object.assign({}, options, args[0])
      // remove `options` from arguments passed to `evaluate_now`
      normalizedArgs = [].slice.call(normalizedArgs, 1)
    }
    this.evaluate_now(function(_args, options, done) {
      // ES5 code >>>
      /* eslint-disable no-undef */
      var nmJQ = document.createElement('script');
      document.getElementsByTagName('head')[0].appendChild(nmJQ)
      nmJQ.onload = function() {
        (function($) { // eslint-disable-line
          // execute callback with arguments (minus callback argument itself)
          var evaluated = eval(_args[0]).apply(this, [].slice.call(_args, 1));
          if (evaluated && evaluated.then) { // is Promise?
            evaluated.always(function() {
              done(null, [].slice.call(arguments))
            })
          } else {
            done(null, evaluated)
          }
        }(jQuery.noConflict()))
      }
      nmJQ.src = options.src
      /* eslint-enable no-undef */
      // <<< ES5 code
    }, done, normalizedArgs, options)
  })
}