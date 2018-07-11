`use strict`
const router = require('koa-router')();
const cheerio = require('cheerio');
const request = require('request');

router.get("/queryInfo", ctx => {
    var news = new Array();
    request('http://jwc.scu.edu.cn/jwc/frontPage.action', function (err, res) {
        if (err) return console.error(err);

        var $ = cheerio.load(res.body.toString());

        var table = $('body').children('table').eq(3).html();
        console.log(table);
    });
});

module.exports = router.routes();