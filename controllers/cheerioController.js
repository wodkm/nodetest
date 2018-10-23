`use strict`
const router = require('koa-router')();
const cheerio = require('cheerio');
const request = require('request');
const util = require('util');
const getPromise = util.promisify(request.get);

router.get("/cheerio", async ctx => {
    let result = await getPromise('https://www.jianshu.com/', {
        'auth': {
            'user': 'xx',
            'pass': 'xx',
            'sendImmediately': 'false',
        }
    });
    // 可以加入 try catch 捕获异常  也可以加 .catch()
    console.log("result", result.body);
    ctx.response.body = result.body;
});

module.exports = router.routes();