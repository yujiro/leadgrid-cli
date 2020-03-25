"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function isFileExists(filePath) {
    try {
        fs.statSync(filePath);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isFileExists = isFileExists;
function read(path) {
    return fs.readFileSync(path, 'utf8');
}
exports.read = read;
function readDir(path) {
    return fs.readdirSync(path);
}
exports.readDir = readDir;
//# sourceMappingURL=file.js.map