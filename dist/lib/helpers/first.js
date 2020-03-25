"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
handlebars_1.default.registerHelper("first", function (list) {
    return list === null || list === undefined ? undefined : list[0];
});
//# sourceMappingURL=first.js.map