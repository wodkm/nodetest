import koa from 'koa';
import compress from 'koa-compress';
import path from 'path';
import serve from 'koa-static';//静态资源
import bodyParser from 'koa-bodyparser';//json
import { config } from './const/config';
import { logger } from './utils/loggerUtil';
import { controllers } from './controllers';

logger.info('Log4js loaded');

const app = new koa();

/**
 * gzip设置-启用后如果资源文件所在目录下有同名且以.gz结尾的文件会优先使用已有的文件，若没有则会临时压缩
 */
app.use(
	compress({
		filter: function (content_type: any) { // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
			return /text/i.test(content_type);
		},
		threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
		flush: require('zlib').Z_SYNC_FLUSH // zlib是node的压缩模块
	})
);

app.use(serve(__dirname + '/static'));
app.use(serve(__dirname + '/views'));
app.use(bodyParser());

app.on('error', (err: any, ctx: any) => {
	console.error('server error', err);
	console.error('server status', ctx.response.status);
});

logger.info('Begin loading controllers');

controllers.map((item: any, index: any) => {
	app.use(item);
});

app.use((ctx: any, next: any) => {
	if (ctx.response.status == '404') {
		ctx.response.redirect('/404');
	}
	if (ctx.response.status == '500') {
		ctx.response.redirect('/500');
	}
});

let port = config.server.port || 8080;
logger.info('Start listening on port ' + port);
app.listen(port);