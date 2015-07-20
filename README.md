Create a simple command-line interface for any string-to-string transformation.

```shellsession
$ npm install --save stdin-transform-cli
```

If your transformation is a synchronous function of the form `module.exports = function(string) { }`, add the following to your `package.json`:

```json
{ "bin": "node_modules/stdin-transform-cli/sync" }
```

If your transformation is an asynchronous function of the form `module.exports = function(string, errorFirstCallback) { }`:

```json
{ "bin": "node_modules/stdin-transform-cli/async" }
```

Otherwise, create your own bin script using the JavaScript API:

```javascript
#!/usr/bin/env node
require('stdin-transform-cli')(
  require('./package/json'),
  function(input, callback) {
    // Require and apply your transformation, then invoke
    callback(error, result) })()
```
