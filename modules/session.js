var slugid = require('slugid');

function session() {
    this.did = null;
    this.ip = null;
    this.userAgent = null;
    this.userId = null;
    this.save = (redisClient) => {
        redisClient.set('sessions:' + this.did, this.toString());
    };
    this.isLogin = () => {
        if (this.userId && this.userId != null) {
            return true;
        }
        else {
            return false;
        }
    };
    this.login = (userId) => {
        this.userId = userId;
    };
    this.logout = () => {
        this.userId = null;
    };
    this.toString = () => {
        return JSON.stringify(this);
    };
}

session.create = (ip, userAgent) => {
    var obj = new session();
    obj.did = slugid.nice();;
    obj.ip = ip;
    obj.userAgent = userAgent;
    return obj;
}

session.load = (redisClient, did, callback) => {
    redisClient.get("sessions:" + did, function (err, json) {
        if (json != null) {
            var temp = JSON.parse(json);
            var obj = new session();
            obj.did = temp.did;
            obj.ip = temp.ip;
            obj.userAgent = temp.userAgent;
            obj.userId = temp.userId;
            callback(true, obj);
        } else {
            callback(false, undefined);
        }
    });
};

exports.init = function (redisClient) {
    return function (req, res, next) {
        var did = req.cookies.did;
        if (!did) {
            req.session = session.create(req.ip, req.get('User-Agent'));
            req.session.save(redisClient);
            res.cookie('did', req.session.did);
            next();
        } else {
            session.load(redisClient, did, (success, obj) => {
                if (!success) {
                    req.session = session.create(req.ip, req.get('User-Agent'));
                    res.cookie('did', req.session.did);
                } else {
                    req.session = obj;
                }
                next();
            });
        }
    }
}