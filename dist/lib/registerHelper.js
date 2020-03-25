"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
exports.default = (function (name, callback) {
    return handlebars_1.default.registerHelper(name, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            var res = callback.apply(void 0, args);
            return res;
        }
        catch (e) {
            return '';
        }
    });
});
//# sourceMappingURL=registerHelper.js.map