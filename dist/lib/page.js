"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yaml = require("js-yaml");
var logger = require("./logger");
var file = require("./file");
function loadPageConfig(config, pageName) {
    var pageFilePath = config.dirs.pagesDir + "/" + pageName + ".yml";
    if (!file.isFileExists(pageFilePath)) {
        logger.warning("no such file or directory " + pageFilePath);
        return {};
    }
    return yaml.safeLoad(file.read(pageFilePath));
}
exports.loadPageConfig = loadPageConfig;
//# sourceMappingURL=page.js.map