"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logger = require("./logger");
var Server = /** @class */ (function () {
    function Server() {
        this.routes = [];
        this.staticRoutes = [];
    }
    Server.prototype.route = function (url, html) {
        this.routes.push({ url: url, html: html });
    };
    Server.prototype.staticRoute = function (url, staticDirPath) {
        this.staticRoutes.push({ url: url, staticDirPath: staticDirPath });
    };
    Server.prototype.start = function (port) {
        var app = express();
        this.routes.forEach(function (route) {
            app.get(route.url, function (_, res) { return res.send(route.html); });
        });
        this.staticRoutes.forEach(function (route) {
            app.use(route.url, express.static(route.staticDirPath));
        });
        app.listen(port, function () { return logger.info("LeadGrid simulator listening on port " + port + "!"); });
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map