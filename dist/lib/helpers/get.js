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
var registerHelper_1 = require("../registerHelper");
registerHelper_1.default("get", function (context, options) {
    var _a;
    try {
        var data = options.data.root[context] || [];
        var newContext = __assign(__assign({}, options.data.root), (_a = {}, _a[context] = data, _a));
        // const hash = options.hash || {}
        // const filter = hash.filter || {}
        if (data.length > 0) {
            return options.fn(newContext);
        }
    }
    catch (e) {
        console.log(e);
        return '';
    }
});
//# sourceMappingURL=get.js.map