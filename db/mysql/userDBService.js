exports.register = function (connection, username, passwordx, callback) {
    var sql = 'INSERT INTO users(`Username`,`PasswordX`,`RegisterTime`,`LastLoginTime`)VALUES(?,?,?,?);'
    connection.query(sql, [username, passwordx, new Date(), new Date()], function (err, rows) {
        if (err == null) {
            if (rows.affectedRows == 1) {
                callback(true, rows.insertId);
            } else {
                callback(false, undefined, '请联系管理员！');
            }
        }
    });
};
exports.isExist = function (connection, username, callback) {
    connection.query('SELECT Id FROM users WHERE Username = ?', [username], function (err, rows) {
        if (err == null) {
            if (rows.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
};
exports.login = function (connection, username, passwordx, callback) {
    connection.query('SELECT Id FROM users WHERE Username = ? AND PasswordX = ?', [username, passwordx], function (err, rows) {
        if (err == null) {
            if (rows.length == 1) {
                callback(true, rows[0]);
            } else {
                callback(false);
            }
        }
    });
};
exports.testUserId = (connection, userId, callback) => {
    connection.query('SELECT Id FROM users WHERE Id = ?', [userId], function (err, rows) {
        if (err == null) {
            if (rows.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
};