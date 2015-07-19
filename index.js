var EOL = require('os').EOL

function fail() {
  process.exit(1) }

function stdinTransformCLI(metadata, transform) {
  var name = metadata.name
  var version = metadata.version
  var description = metadata.description

  var usage = [
    description,
    '',
    'Usage:',
    '  ' + name + ' [<file>]',
    '  ' + name + ' -h | --help',
    '  ' + name + ' -v | --version',
    '',
    'Options:',
    '  -h, --help      Show this screen.',
    '  -v, --version   Show version.' ].join(EOL)

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
