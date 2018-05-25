'use strict';
const koa = require('koa');
const path = require('path');
const serve = require('koa-static');

const app = new koa();

app.use(serve(path.join(__dirname)));

let controllers = require('./controllers');
controllers.map((item, index) => {
	app.use(item);
});

app.listen(3000);