import router from 'koa-router';
import cheerio from 'cheerio';
import superagent from 'superagent';
import redisUtil from '../utils/redisUtil';
import { logger } from '../utils/loggerUtil';

const myRouter = new router();

const remote_get = function (url: string) {
    const promise = new Promise<superagent.Response>(function (resolve, reject) {
        superagent.get(url)
            .end(function (err, res) {
                if (!err) {
                    resolve(res);
                } else {
                    console.log(err)
                    reject(err);
                }
            });
    });
    return promise;
}

myRouter.get("/cheerio_imgUrl", async ctx => {
    let result = await remote_get('https://www.jianshu.com/');
    let $ = cheerio.load(result.text);
    // 可以加入 try catch 捕获异常  也可以加 .catch()
    let img_url: any[] = [];
    $('li').each((index: any, item: any) => {
        img_url.push($(item).find('img').attr('src'));
        try {
            if ($(item).find('img').attr('src')) {
                redisUtil.lpush('cheerio_imgUrl', $(item).find('img').attr('src'));
            }
        } catch (error) {
            logger.error(error);
        }
    });
    ctx.response.body = img_url.join('\n');
});

myRouter.get("/cheerio_html", async ctx => {
    let result = await remote_get('https://www.jianshu.com/');
    ctx.response.body = result.text;
});

export = myRouter.routes();