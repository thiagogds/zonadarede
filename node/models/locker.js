var mongoose, server, schema, objectId;

mongoose = require('mongoose');
objectId = mongoose.Schema.Types.ObjectId;
server   = require('../modules/server');

schema = new mongoose.Schema({
    'key' : {
        'type' : String,
        'required' : true
    }
},{
    'collection' : 'lockers'
});

schema.plugin(require('mongoose-json-select'), {
    '_id' : 1,
    'key' : 1
});

mongoose.model('Locker', schema);
