"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
function info() {
    var message = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        message[_i] = arguments[_i];
    }
    console.log(chalk.green(message));
}
exports.info = info;
function warning() {
    var message = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        message[_i] = arguments[_i];
    }
    console.log(chalk.yellow(message));
}
exports.warning = warning;
function error() {
    var message = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        message[_i] = arguments[_i];
    }
    console.log(chalk.red(message));
}
exports.error = error;
function debug() {
    var message = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        message[_i] = arguments[_i];
    }
    console.log(chalk.gray(message));
}
exports.debug = debug;
//# sourceMappingURL=logger.js.map