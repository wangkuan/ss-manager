var express = require('express');
var mysql = require('../db/mysql/mysql');
var userDBService = require('../db/mysql/userDBService');
var session = require('../modules/session');

module.exports = (redisClient) => {
    var router = express.Router();
    router.all(['/register', '/login'], function (req, res, next) {
        if (req.session.isLogin()) {
            res.redirect('/center');
        } else {
            next();
        }
    });
    router.get('/register', function (req, res, next) {
        res.render('user/register');
    });
    router.post('/register', function (req, res, next) {
        var username = req.body.username;
        var passwordx = req.body.passwordx;
        var connection = mysql.createConnection();
        userDBService.isExist(connection, username, function (exist) {
            if (exist) {
                mysql.closeConnection(connection);
                res.render('user/register', { err: '该用户名已经存在。' });
            } else {
                userDBService.register(connection, username, passwordx, function (success, userID, err) {
                    mysql.closeConnection(connection);
                    if (success) {
                        req.session.login(userID);
                        req.session.save(redisClient);
                        res.redirect('/center');
                    } else {
                        res.render('user/register', { err: err });
                    }
                });
            }
        });
    });
    router.get('/login', function (req, res, next) {
        res.render('user/login');
    });
    router.post('/login', function (req, res, next) {
        var username = req.body.username;
        var passwordx = req.body.passwordx;
        var connection = mysql.createConnection();
        userDBService.login(connection, username, passwordx, (success, user) => {
            mysql.closeConnection(connection);
            if (success) {
                req.session.login(user.Id);
                req.session.save(redisClient);
                res.redirect('/center');
            } else {
                res.render('user/login', { err: '用户名或密码不正确！' });
            }
        });
    });
    return router;
};