"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
handlebars_1.default.registerHelper("pagination", function (options) {
    var template = handlebars_1.default.compile("{{> pagination }}");
    return new handlebars_1.default.SafeString(template(__assign(__assign({}, options), { prev: 2, next: 4, pages: [
            { page: 1, active: false },
            { page: 2, active: false },
            { page: 3, active: true },
            { page: 4, active: false },
            { page: 5, active: false },
        ] })));
});
//# sourceMappingURL=pagination.js.map