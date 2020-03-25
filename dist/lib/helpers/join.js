"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
handlebars_1.default.registerHelper("join", function (context, options) {
    if (context === void 0) { context = []; }
    return context.join(options['hash']['separator'] || '');
});
//# sourceMappingURL=join.js.map