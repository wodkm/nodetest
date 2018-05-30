'use strict';
const koa = require('koa');
const path = require('path');
const serve = require('koa-static'); //静态资源
const bodyParser = require('koa-bodyparser'); //json

const app = new koa();

app.use(serve(path.join(__dirname)));
app.use(bodyParser());

app.on('error', (err, ctx) => {
	console.error('server error', err);
	console.error('server status', ctx.response.status);
});

let controllers = require('./controllers');
controllers.map((item, index) => {
	app.use(item);
});

app.use((ctx, next) => {
	console.log(1);
	if (ctx.response.status == '404') {
		ctx.response.redirect('/404');
	}
	if (ctx.response.status == '500') {
		ctx.response.redirect('/500');
	}
});

app.listen(3000);