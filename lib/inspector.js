"use strict";

module.exports = function(config, DeferredConfig, prefix) {
    const configSources = config.util.getConfigSources();
    const NODE_CONFIG_DIR = config.util.getEnv("NODE_CONFIG_DIR");

    /**
     * Deep scan an object and get all its keys, dot-separated
     *
     * @param {any} object object to scan
     * @return {Array<String>} flatened keys of the object
     */
    function flatKeysDeep(object) {
        let keys = [];

        /**
         * Private function for scanning object keys
         *
         * @param {any} obj Object whose keys to be resolved
         * @param {string} prefix contains current "depth"
         * @access private
         */
        function resolveKeys(obj, prefix) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let prop = `${prefix}${key}`;
                    let val = obj[key];

                    if (val instanceof DeferredConfig) {
                        keys.push(prop);
                    } else if (typeof val === "object" &&
                        Boolean(val) &&
                        !(val instanceof Array)) {
                        resolveKeys(val, `${prop}.`);
                    } else {
                        keys.push(prop);
                    }
                }
            }
        }

        resolveKeys(object, "");

        return keys;
    }

    return configSources
        .reduce((result, source) => {
            flatKeysDeep(source.parsed).forEach(key => {
                if (key.indexOf(prefix) !== 0) {
                    return;
                }
                if (typeof result[key] === "undefined") {
                    result[key] = {
                        value: config.get(key),
                        files: []
                    };
                }

                if (source.name.substr(0, NODE_CONFIG_DIR.length) === NODE_CONFIG_DIR) {
                    result[key].files.push(
                        source.name.substr(NODE_CONFIG_DIR.length + 1)
                    );
                } else {
                    result[key].files.push(source.name);
                }
            });

            return result;
        }, {});
};
