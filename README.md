Create a simple command-line interface for any string-to-string transformation

```shellsession
$ npm i --save stdin-transform-cli
```

If your transformation is a synchronous function of the form `function(string)`, add the following to your `package.json`:

```shellsession
$ cp node_modules/stdin-transform-cli/sync.js $YOUR_PACKAGE_NAME
```

```json
{
  "preferGlobal": true,
  "bin": "$YOUR_PACKAGE_NAME"
}
```

If your transformation is an asynchronous function of the form `function(string, errorFirstCallback)`:

```shellsession
$ cp node_modules/stdin-transform-cli/async.js $YOUR_PACKAGE_NAME
```

```json
{
  "preferGlobal": true,
  "bin": "$YOUR_PACKAGE_NAME"
}
```

Otherwise:

```json
{
  "preferGlobal": true,
  "bin": "cli.js"
}
```

and in `cli.js`:

```javascript
#!/usr/bin/env node
var meta = require('./package')
require('stdin-transform-cli')(
  meta.name,
  meta.version,
  function(input, callback) {
    // Apply your transformation and invoke
    callback(error, result) })()
```
