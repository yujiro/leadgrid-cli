"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clui = require("clui");
function spin(message) {
    return new clui.Spinner(message, ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
}
exports.spin = spin;
//# sourceMappingURL=spinner.js.map