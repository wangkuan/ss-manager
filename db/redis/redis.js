var redis = require("redis");
var connectionOption = {
    host: 'localhost',
    port: 6379,
    db: 'db0',
    password: 'P@ssw0rd'
};
exports.createConnection = function () {
    var connection =  redis.createClient(connectionOption);
    return connection;
};