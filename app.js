'use strict';
import koa from 'koa';
import path from 'path';
import static from 'koa-static'; //静态资源
import bodyParser from 'koa-bodyparser'; //json

const app = new koa();

app.use(static(path.join(`${__dirname}/static`)));
app.use(static(path.join(`${__dirname}/views`)));
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