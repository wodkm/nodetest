`use strict`
const router = require('koa-router')();
const cheerio = require('cheerio');
const request = require('request');
const util = require('util');
const getPromise = util.promisify(request.get);

router.get("/cheerio_imgUrl", async ctx => {
    let result = await getPromise('https://www.jianshu.com/', {
        'auth': {
            'user': 'xx',
            'pass': 'xx',
            'sendImmediately': 'false',
        }
    });
    let $ = cheerio.load(result.body);
    // 可以加入 try catch 捕获异常  也可以加 .catch()
    let img_url = [];
    $('li').each((index, item) => {
        img_url.push($(item).find('img').attr('src'));
    });
    ctx.response.body = img_url.join('\n');
});

router.get("/cheerio_html", async ctx => {
    let result = await getPromise('https://www.jianshu.com/', {
        'auth': {
            'user': 'xx',
            'pass': 'xx',
            'sendImmediately': 'false',
        }
    });
    ctx.response.body = result.body;
});

module.exports = router.routes();