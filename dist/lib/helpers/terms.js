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
handlebars_1.default.registerHelper("terms", function (context, options) {
    var _a;
    var data = options.data.root[context] || [];
    var newContext = __assign(__assign({}, options.data.root), (_a = {}, _a[context] = data, _a));
    if (data.length > 0) {
        return options.fn(newContext);
    }
});
//# sourceMappingURL=terms.js.map