module.exports = {
    host : {port : process.env.PORT || 3000, url : process.env.URL || 'localhost'},
    mongo : {uri : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/zonadarede'}
};
