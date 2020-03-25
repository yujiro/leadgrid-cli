"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registerHelper_1 = require("../registerHelper");
registerHelper_1.default("form_options", function (values, options) {
    return values.map(function (value) {
        return "<option value=\"" + value + "\">" + options.fn(value) + "</option>";
    }).join('');
});
//# sourceMappingURL=options.js.map