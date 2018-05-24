'use strict';
const koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const fs = require('');

const app = new koa();

app.use(serve(path.join(__dirname)));

let viewController = require('./controllers/viewController');
viewController.map((item, index) => {
	app.use(item);
});

app.listen(3000);