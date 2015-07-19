function fail() {
  process.exit(1) }

function stdinTransformCLI(name, version, transform) {
  var usage = 'Usage: ' + name + ' < input'

  function transformStream(stream) {
    var input = ''
    stream
      .on('data', function(buffer) {
        input += buffer.toString() })
      .on('end', function() {
        try {
          transform(input, function(error, output) {
            if (error) {
              console.error(error)
              fail() }
            else {
              console.log(output) } }) }
        catch (error) {
          console.error(error)
          fail() } }) }

  return function() {
    var argumentCount = process.argv.length
    if (argumentCount === 2) {
      transformStream(process.stdin)
      process.stdin.resume() }
    else if (argumentCount === 3) {
      var argument = process.argv[2]
      if (argument === '--help' || argument === '-h') {
        console.log(usage) }
      else if (argument === '--version' || argument === '-v') {
        console.log(name, version) }
      else if (argument.charAt(0) === '-') {
        console.error(usage)
        fail() }
      else {
        transformStream(require('fs').createReadStream(argument)) } }
    else {
      console.error(usage)
      fail() } } }

module.exports = stdinTransformCLI
