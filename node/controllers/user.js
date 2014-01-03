var mongoose, server, graph, User, Locker;

mongoose = require('mongoose');
server   = require('../modules/server');
User     = mongoose.model('User');
Locker   = mongoose.model('Locker');
graph    = require('fbgraph');

server.post('/users', function (request, response, next) {
    'use strict';

    graph.get('/me?access_token=' + request.param('token'), function (error, data) {
        var user;

        if (error) { return next(error); }

        user = new User({
            'facebookId' : data.id
        });

        user.save(function (error) {
            if (error) { return next(error); }
            response.send(201, user);
        });
    });
});

server.get('/users/:userId', function (request, response, next) {
    'use strict';

    graph.get('/me?access_token=' + request.param('token'), function (error, data) {
        if (error) { return next(error); }

        User.findOne({
            'facebookId' : data.id
        }, function (error, user) {
            if (error) { return next(error); }
            if (!user) { return response.send(401, new Error('invalid token')); }
            response.send(200, user);
        });
    });
});

server.get('/users', function (request, response, next) {
    'use strict';

    Locker.findOne({
        'key' : request.param('key')
    }, function (error, locker) {
        if (error) { return next(error); }
        if (!locker) { return response.send(401, new Error('invalid locker key')); }

        User.find(function (error, users) {
            if (error) { return next(error); }
            response.send(200, users.map(function (user) {
                return user.password;
            }).join('\n').concat('\n'));
        });
    });
});

server.get('/users/me/login', function (request, response, next) {
    'use strict';

    Locker.findOne({
        'key' : request.param('key')
    }, function (error, locker) {
        if (error) { return next(error); }
        if (!locker) { return response.send(401, new Error('invalid locker key')); }

        User.findOne({
            'password' : request.param('password')
        }, function (error, user) {
            if (error) { return next(error); }
            if (!user) { return response.send(401, new Error('invalid username or password')); }
            response.send(200, user);
        });
    });
});
