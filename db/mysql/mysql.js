var mysql = require('mysql');
var connectionOption = {
    host: 'localhost',
    database: 'hexiaoma',
    user: 'root',
    password: 'P@ssw0rd'
};
exports.createConnection = () => {
    var connection = mysql.createConnection(connectionOption);
    connection.connect();
    return connection;
};
exports.closeConnection = (connection) => {
    connection.end();
};