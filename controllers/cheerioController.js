`use strict`
const router = require('koa-router')();
const cheerio = require('cheerio');
const request = require('request');
const util = require('util');
const getPromise = util.promisify(request.get);

// router.get("/cheerio", async ctx => {
//     var news = new Array();
//     await util.promisify(request.get)('https://www.jianshu.com/').then((err, res) => {
//         if (err) return console.error(err);
//         var $ = cheerio.load(res.body.toString());
//         var table = $('.note-list');
//         console.log(table);
//         console.log(ctx);
//         ctx.response.body = 123;
//     }).catch((err) => {
//         console.log(err.message);
//     });
// });

router.get("/cheerio", async ctx => {
    let result = await getPromise('https://www.jianshu.com/', {
        'auth': {
            'user': 'xx',
            'pass': 'xx',
            'sendImmediately': 'false',
        }
    });
    // 可以加入 try catch 捕获异常  也可以加 .catch()
    console.log("result", result);
    ctx.response.body = result;
});

module.exports = router.routes();