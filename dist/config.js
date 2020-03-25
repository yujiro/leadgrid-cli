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
var yaml = require("js-yaml");
var fs = require("fs");
var rootDir = process.cwd();
var configFilePath = rootDir + "/leadgrid.yml";
var config = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));
exports.default = __assign({ api_path: {
        theme_update: '/api/page_themes/update'
    }, dirs: {
        rootDir: rootDir,
        pagesDir: rootDir + "/pages",
        layoutDir: rootDir + "/layouts",
        sectionsDir: rootDir + "/sections",
        componentsDir: rootDir + "/components",
        configFilePath: rootDir + "/leadgrid.yml",
        publicDir: rootDir + "/assets",
    }, port: 5000 }, config);
//# sourceMappingURL=config.js.map