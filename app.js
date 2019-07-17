'use strict';
const koa = require('koa');
const compress = require('koa-compress');
const path = require('path');
const serve = require('koa-static');//静态资源
const bodyParser = require('koa-bodyparser');//json
global.config = require('./const/config');

//加载log4js
const log4js = require('log4js');
log4js.configure(config.log4jsConfigure);
global.logger = log4js.getLogger();
logger.info('Log4js loaded');

const app = new koa();

//gzip设置
// app.use(
// 	compress({
// 		// filter: function (content_type) { // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
// 		// 	return /text/i.test(content_type);
// 		// },
// 		threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
// 		flush: require('zlib').Z_SYNC_FLUSH // zlib是node的压缩模块
// 	})
// );

app.use(serve(__dirname + '/static'));
app.use(serve(__dirname + '/views'));
app.use(bodyParser());

app.on('error', (err, ctx) => {
	console.error('server error', err);
	console.error('server status', ctx.response.status);
});

logger.info('Begin loading controllers');
let controllers = require('./controllers');
controllers.map((item, index) => {
	app.use(item);
});

app.use((ctx, next) => {
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