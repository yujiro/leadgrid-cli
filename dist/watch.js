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
var renderer = require("./lib/renderer");
var system = require("./lib/system");
var page = require("./lib/page");
var config_1 = require("./config");
var server_1 = require("./lib/server");
system.exitIfFileNotExists(config_1.default.dirs.configFilePath, 'error', 1);
var server = new server_1.default();
server.staticRoute('/assets', config_1.default.dirs.publicDir);
config_1.default.routes.forEach(function (route) {
    var pageConfig = __assign(__assign({}, page.loadPageConfig(config_1.default, route.page)), { site: config_1.default.dummy.site });
    server.route(route.path, renderer.render(config_1.default, route.page, pageConfig));
});
Object.entries(config_1.default.post_types).map(function (postType) {
    var key = postType[0], value = postType[1];
    var listPageConfig = __assign(__assign({}, page.loadPageConfig(config_1.default, value.list)), { site: config_1.default.dummy.site });
    server.route("/" + key, renderer.render(config_1.default, value.list, listPageConfig));
    var detailPageConfig = __assign(__assign({}, page.loadPageConfig(config_1.default, value.detail)), { site: config_1.default.dummy.site });
    server.route("/" + key + "/*", renderer.render(config_1.default, value.detail, detailPageConfig));
});
server.start(config_1.default.port);
//# sourceMappingURL=watch.js.map