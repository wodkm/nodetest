'use strict';

import { Response } from "express-serve-static-core";

import router from 'koa-router';
import fs from 'fs';

const myRouter = new router();

//404
myRouter.get('/404', (ctx: any) => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('./views/404.html');
});

//500
myRouter.get('/500', (ctx: any) => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('./views/500.html');
});

export = myRouter.routes();