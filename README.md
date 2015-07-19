Create a simple command-line interface for any string-to-string transformation

```shellsession
$ npm install --save stdin-transform-cli
```

If your transformation is a synchronous function of the form `function(string)`, copy the prebuilt command-line script into your package:

```shellsession
$ cp node_modules/stdin-transform-cli/sync.js cli.js

```

Then reference in `package.json`:

```json
{
  "bin": "cli.js"
}
```

If your transformation is an asynchronous function of the form `function(string, errorFirstCallback)`:

```shellsession
$ cp node_modules/stdin-transform-cli/async.js cli.js
```

Otherwise:

```javascript
#!/usr/bin/env node
require('stdin-transform-cli')(
  require('./package/json'),
  function(input, callback) {
    // Apply your transformation and invoke
    callback(error, result) })()
```
