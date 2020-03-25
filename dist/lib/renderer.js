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
var handlebars_1 = require("handlebars");
var logger = require("./logger");
var file = require("./file");
require("./helpers");
function render(leadGridConfig, pageName, pageConfig) {
    var files = file.readDir(leadGridConfig.dirs.componentsDir);
    files.forEach(function (f) {
        handlebars_1.default.registerPartial(f.split('.')[0], file.read(leadGridConfig.dirs.componentsDir + "/" + f));
    });
    var layoutPath = leadGridConfig.dirs.layoutDir + "/" + pageConfig.layout + ".hbs";
    if (!file.isFileExists(layoutPath)) {
        logger.warning("no such file or directory " + layoutPath);
        return "no such file or directory " + layoutPath;
    }
    var template = handlebars_1.default.compile(file.read(layoutPath));
    var sectionTemplates = pageConfig === null || pageConfig === undefined ? [] : pageConfig.sections || [];
    var values = __assign(__assign({}, (pageConfig.values || {})), { page_name: pageName });
    var sections = renderSection(sectionTemplates, leadGridConfig.dirs.sectionsDir, values);
    try {
        return template(__assign({ sections: sections }, values), { data: { site: pageConfig.site } });
    }
    catch (e) {
        var message = "Parse error! check this layout file ---> " + layoutPath;
        logger.error(message);
        logger.debug(e);
        return message;
    }
}
exports.render = render;
function renderSection(sectionTemplates, sectionsDir, pageValues) {
    if (sectionTemplates === void 0) { sectionTemplates = []; }
    return sectionTemplates.map(function (section) {
        var filePath = sectionsDir + "/" + section.name + ".hbs";
        if (!file.isFileExists(filePath)) {
            logger.warning("no such file or directory " + filePath);
            return '';
        }
        var sectionTemplate = handlebars_1.default.compile(file.read(filePath));
        var values = section.values === null ? {} : section.values || {};
        try {
            return sectionTemplate(__assign(__assign({}, pageValues), values));
        }
        catch (e) {
            console.error("Parse error! check this section file ---> " + filePath);
            throw e;
        }
    }).join('');
}
exports.renderSection = renderSection;
//# sourceMappingURL=renderer.js.map