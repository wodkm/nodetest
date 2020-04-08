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
    // let result = await remote_get('https://www.jianshu.com/');
    // let $ = cheerio.load(result.text);
    // $('li').each((index: any, item: any) => {
    //     //此处将爬下来的图片URL存入redis当中，只是爬虫和redis联动的一次尝试
    //     try {
    //         if ($(item).find('img').attr('src')) {
    //             //此处使用redis中的set，避免重复数据
    //             redisUtil.sadd('cheerio_imgUrl', $(item).find('img').attr('src'));
    //         }
    //     } catch (error) {
    //         logger.error(error);
    //     }
    // });
    // redisUtil.multi()
    //     .scard("cheerio_imgUrl")
    //     .smembers("cheerio_imgUrl").keys("*", function (err, replies) {
    //     });
    // redisUtil.smembers('cheerio_imgUrl', data => {
    //     console.log(data);
    //     ctx.response.body = data;
    // });
});

myRouter.get("/cheerio_html", async ctx => {
    let result = await remote_get('https://www.jianshu.com/');
    ctx.response.body = result.text;
});

export = myRouter.routes();