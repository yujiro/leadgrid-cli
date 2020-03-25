"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = require("./logger");
var file = require("./file");
function exitIfFileNotExists(path, logLevel, exitCode) {
    if (!file.isFileExists(path)) {
        logger[logLevel]("no such file or directory " + path);
        process.exit(exitCode);
    }
}
exports.exitIfFileNotExists = exitIfFileNotExists;
//# sourceMappingURL=system.js.map