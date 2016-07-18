"use strict";

module.exports = function(inspection) {
    for (let i in inspection) {
        if (!inspection.hasOwnProperty(i)) {
            continue;
        }
        let sources = inspection[i].files;
        let out = [
            i, "=", inspection[i].value,
            "(" + sources[sources.length - 1] + ")"
        ];

        if (inspection[i].files.length > 1) {
            out.push("[ " + sources.slice(0, -1).reverse().join(", ") + " ]");
        }

        console.log.apply(console, out);
    }
};
