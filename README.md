# node-config-inspector
An utility for inspection of node-config configurations

## Installation

```bash
npm install node-config-inspector
```

## Usage

Create a file somewhere in your project with the following contents

```javascript
// config.js

const argv = require("yargs").argv;
const inspector = require("node-config-inspector");
const config = require("config");
const DeferredConfig = require("config/defer").DeferredConfig;

let prefix = "";

if (argv._.length >= 1) {
	prefix = argv._[0];
}

inspector.print(inspector.inspect(config, DeferredConfig, prefix));
```

and then run it

```bash
node config.js [prefix]
```

This will dump one line per configuration key for each key which name starts
with `prefix`, or all keys if `prefix` is not specified.

```
config.key = value (source) [ other, parent, sources ]
```

## API

```javascript
/**
 * Get info about configuration values
 *
 * @param {object} config instance of node-config module (require("config"))
 * @param {object} DeferredConfig instance of node-config's deferred module (require("config/defer")).DeferredConfig
 * @param string [prefix=""]
 * @return {object}
 */
inspect(config, DeferredConfig, prefix)
```

```javascript
/**
 * Print configuration info returned by inspect()
 *
 * @param {object} inspectData the result of calling inspect()
 * @return {void}
 */
print(inspectData)
```
