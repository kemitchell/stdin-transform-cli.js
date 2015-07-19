Create a simple command-line interface for any string-to-string transformation

```shellsession
$ npm install --save stdin-transform-cli
```

If your transformation is a synchronous function of the form `function(string)`, add the following to your `package.json`:

```shellsession
$ cp node_modules/stdin-transform-cli/sync.js cli.js
```

```json
{
  "bin": "cli.js"
}
```

If your transformation is an asynchronous function of the form `function(string, errorFirstCallback)`:

```shellsession
$ cp node_modules/stdin-transform-cli/async.js cli.js
```

```json
{
  "bin": "cli.js"
}
```

Otherwise:

```json
{
  "bin": "cli.js"
}
```

and in `cli.js`:

```javascript
#!/usr/bin/env node
require('stdin-transform-cli')(
  require('./package/json'),
  function(input, callback) {
    // Apply your transformation and invoke
    callback(error, result) })()
```
