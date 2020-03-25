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
var express = require("express");
var yaml = require("js-yaml");
var fs = require("fs");
var handlebars_1 = require("handlebars");
var chalk = require("chalk");
var nodemon = require("nodemon");
nodemon({
    script: __dirname + '/../dist/serve.js',
    ext: 'js json ts hbs yml js css'
});
nodemon.on('start', function () {
    console.log('LeadGrid has started');
    watch();
}).on('quit', function () {
    console.log('LeadGrid has quit');
    process.exit();
}).on('restart', function (files) {
    console.log('LeadGrid restarted due to: ', files);
});
function watch() {
    var rootDir = process.cwd();
    var pagesDir = rootDir + "/pages";
    var layoutDir = rootDir + "/layouts";
    var sectionsDir = rootDir + "/sections";
    var componentsDir = rootDir + "/components";
    var routeFilePath = rootDir + "/routes.yml";
    var publicDir = rootDir + "/assets";
    var port = 5000;
    var app = express();
    handlebars_1.default.registerHelper("get", function (context, options) {
        var _a;
        var data = options.data.root[context] || [];
        var newContext = __assign(__assign({}, options.data.root), (_a = {}, _a[context] = data, _a));
        if (data.length > 0) {
            return options.fn(newContext);
        }
    });
    fs.readdir(componentsDir, function (error, files) {
        if (files === void 0) { files = []; }
        files.forEach(function (file) {
            handlebars_1.default.registerPartial(file.split('.')[0], fs.readFileSync(componentsDir + "/" + file, 'utf8'));
        });
        var pages = yaml.safeLoad(fs.readFileSync(routeFilePath, 'utf8'));
        pages.forEach(function (page) {
            var doc = yaml.safeLoad(fs.readFileSync(pagesDir + "/" + page.page + ".yml", 'utf8'));
            var layoutPath = layoutDir + "/" + doc.layout + ".hbs";
            var layout = fs.readFileSync(layoutPath, 'utf8');
            var template = handlebars_1.default.compile(layout);
            var sectionTemplates = doc === null || doc === undefined ? [] : doc.sections || [];
            var sections = sectionTemplates.map(function (section) {
                var filePath = sectionsDir + "/" + section + ".hbs";
                var sectionTemplate = handlebars_1.default.compile(fs.readFileSync(filePath, 'utf8'));
                var values = doc.values[section] || {};
                try {
                    return sectionTemplate(values);
                }
                catch (e) {
                    console.error("Parse error! check this section file ---> " + filePath);
                    throw e;
                }
            }).join('');
            try {
                var values_1 = doc.values || {};
                app.get(page.path, function (_, res) { return res.send(template(__assign({ sections: sections }, values_1))); });
            }
            catch (e) {
                console.error(chalk.red("Parse error! check this layout file ---> " + layoutPath));
                throw e;
            }
        });
        app.use('/assets', express.static(publicDir));
        app.listen(port, function () { return console.log("LeadGrid simulator listening on port " + port + "!"); });
    });
}
//# sourceMappingURL=serve.js.map