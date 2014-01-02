var Express, server, config;

Express    = require('express');
config     = require('../config');

if (!server) {
    server   = new Express();
    server.use(Express.static(__dirname.replace('node/modules','angular')));
    server.use(Express.static(__dirname.replace('node/modules','angular_modules')));
    server.use(Express.compress());
    server.use(Express.urlencoded());
    server.use(Express.json());
    server.use(Express.cookieParser());
    server.use(server.router);
    server.get('/', function (request, response) {
        'use strict';
        response.sendfile(__dirname.replace('node/modules','angular') + '/views/home/index.html');
    });
}

module.exports = server;
