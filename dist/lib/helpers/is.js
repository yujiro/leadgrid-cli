"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
handlebars_1.default.registerHelper("is", function (context, options) {
    if (context === void 0) { context = ''; }
    var is = context.split(',')
        .map(function (pageName) { return pageName.trim(); })
        .some(function (pageName) { return pageName === options.data.root.page_name; });
    return is
        ? options.fn(options.data.root)
        : options.inverse(options.data.root);
});
//# sourceMappingURL=is.js.map