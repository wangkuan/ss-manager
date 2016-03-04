var express = require('express');
var router = express.Router();

var pages = [
    {
        name: '主页',
        url: '/index',
        view: 'center/index',
        navShow: false
    },
    {
        name: '套餐升级',
        url: '/package',
        view: 'center/package',
        navShow: true
    },
    {
        name: '流量统计',
        url: '/flow',
        view: 'center/flow',
        navShow: true
    },
    {
        name: '线路列表',
        url: '/channel',
        view: 'center/channel',
        navShow: true
    },
    {
        name: '交流讨论',
        url: '/forum',
        view: 'center/forum',
        navShow: true
    },
    {
        name: '修改密码',
        url: '/password',
        view: 'center/password',
        navShow: true
    },
    {
        name: '注销登录',
        url: '/logout',
        view: 'center/logout',
        navShow: true
    }
]

router.get('/', function (req, res, next) {
    res.redirect('/center/index');
});
for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    router.get(page.url, function (req, res, next) {
        var page = undefined;
        var i;
        for (i = 0; i < pages.length; i++) {
            if (pages[i].url == req.url) {
                page = pages[i];
                break;
            }
        }
        if (page) {
            res.render(page.view, { pages: pages, navIndex: i, pageName: page.name });
        } else {
            next();
        }
    });
}
module.exports = router;