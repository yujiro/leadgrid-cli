"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
handlebars_1.default.registerHelper('equals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(options['root']) : options.inverse(options['root']);
});
//# sourceMappingURL=equals.js.map