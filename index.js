"use strict";

const inspector = require("./lib/inspector");
const print = require("./lib/print");

module.exports = function(config, DeferredConfig, prefix) {
    print(inspector(config, DeferredConfig, prefix));
};

module.exports.inspect = inspector;
