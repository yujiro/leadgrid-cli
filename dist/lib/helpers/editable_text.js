"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
var dot = require("dot-object");
handlebars_1.default.registerHelper("editable_text", function (context, options) {
    return dot.pick(context, options['data']['root']);
});
//# sourceMappingURL=editable_text.js.map