"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
var registerHelper_1 = require("../registerHelper");
registerHelper_1.default("form_options", function (name, values, options) {
    var html = values.map(function (option) { return "<option value=\"" + option.value + "\">" + option.label + "</option>"; }).join('');
    return new handlebars_1.default.SafeString(html);
});
//# sourceMappingURL=form_options.js.map