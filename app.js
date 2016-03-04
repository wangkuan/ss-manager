var express = require('express');
var redis = require("redis");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log = require('./modules/log');
var session = require('./modules/session');
var userRouter = require('./routers/userRouter');
var centerRouter = require('./routers/centerRouter');

var app = express();
var redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    db: 'db0',
    password: 'P@ssw0rd'
});

app.use(express.static('static'));
app.set('view engine', 'xtpl');
app.set('views', './views');

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(log.console());
app.use(session.init(redisClient));

app.get('/', function (req, res) {
    res.redirect('/center/index');
});
app.use('/user', userRouter(redisClient));
app.use('/center', centerRouter);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    redisClient.on("error", function (err) {
        console.log("Error " + err);
    });
    redisClient.auth(redisClient.options.password, () => {
        console.log('Example app listening at http://%s:%s', host, port);
    });
});