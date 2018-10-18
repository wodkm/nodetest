`use strict`
const router = require('koa-router')();
const cheerio = require('cheerio');
const request = require('request');

router.get("/cheerio", ctx => {
    var news = new Array();
    ctx.body = 123;
    request('https://www.jianshu.com/', function (err, res) {
        if (err) return console.error(err);
        var $ = cheerio.load(res.body.toString());
        var table = $('.note-list');
        console.log(table);
        console.log(ctx);
        ctx.body = 123;
    });
});

router.post("/cheerio", ctx => {
    var news = new Array();
    ctx.body = 456;
    request('https://www.jianshu.com/', function (err, res) {
        if (err) return console.error(err);
        var $ = cheerio.load(res.body.toString());
        var table = $('.note-list');
        console.log(table);
        console.log(ctx);
        ctx.body = 456;
    });
});

router.post("/cheerio", ctx => {
    var news = new Array();
    ctx.body = 789;
    request('https://www.jianshu.com/', function (err, res) {
        if (err) return console.error(err);
        var $ = cheerio.load(res.body.toString());
        var table = $('.note-list');
        console.log(table);
        console.log(ctx);
        ctx.body = 456;
    });
});

module.exports = router.routes();