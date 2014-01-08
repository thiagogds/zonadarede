var mongoose, server, schema, objectId, crypto;

mongoose = require('mongoose');
objectId = mongoose.Schema.Types.ObjectId;
server   = require('../modules/server');
crypto   = require('crypto');

schema = new mongoose.Schema({
    'facebookId' : {
        'type' : String,
        'required' : true
    },
    'password' : {
        'type' : String,
        'unique' : {'index' : {
            'unique' : true
        }}
    },
    'rfid' : {
        'type' : String
    }
},{
    'collection' : 'users'
});

schema.pre('save', function (next) {
    'use strict';

    if(!this.isNew) {return next();}

    this.password = Math.floor(Math.random() * 100000000).toString(14);
    next();
});

schema.plugin(require('mongoose-json-select'), {
    '_id' : 1,
    'facebookId' : 1,
    'password' : 1,
    'rfid' : 1
});

mongoose.model('User', schema);
