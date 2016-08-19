var vm = require('vm')
var process = require('process')
var glob = require('glob')
var fs = require('fs')
var pretty = require('pretty-time')

var Immutable = require('immutable')
var Extendable = require('../lib/index')

var context = vm.createContext({
  require: require,
  exports: exports,
  module: { exports },

  Extendable: Extendable,
  Immutable: Immutable
})

function createContext(code) {
  var script = new vm.Script(code, {
    displayErrors: true,
    timeout: 10 * 1000 // 10 sec timeout
  });

  return (function() {
    script.runInContext(context, {
      breakOnSigint: true
    })
  })
}

function createBenchmark(fn, repetitions) {
  return (function() {
    if (!repetitions) {
      repetitions = 1
    }

    var time = process.hrtime()
    for (var i = 0; i <= repetitions; i++) {
      fn()
    }

    var diff = process.hrtime(time)

    return [ diff[0] / repetitions, diff[1] / repetitions ]
  })
}

function sampleBenchmark(fn, samples) {
  if (!samples) {
    samples = 1000
  }

  var total = [ 0, 0 ]

  for (var i = 0; i <= samples; i++) {
    var res = fn()

    total[0] += res[0]
    total[1] += res[1]
  }

  return {
    total: total,
    average: [ total[0] / samples, total[1] / samples ],
  }
}

function bench(code) {
  var benchmark = createBenchmark(createContext(code), 100)
  var result = sampleBenchmark(benchmark, 1000)

  var prettyTotal = pretty(result.total)
  var prettyAverage = pretty(result.average)

  console.log('Benchmark took ' + prettyTotal + '. Average run takes ' + prettyAverage + '.')
}

glob('./perf/**/*.js', function (err, files) {
  if (err) {
    throw err
  }

  files.forEach(function (file) {
    var code = fs.readFileSync(file)

    console.log('Benchmarking ' + file + '...')
    bench(code)
    console.log('')
  })
})

