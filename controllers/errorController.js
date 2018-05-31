'use strict';
const router = require('koa-router')();
const fs = require('fs');

//404
router.get('/404', ctx => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('./views/404.html');
});

//500
router.get('/500', ctx => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('./views/500.html');
});

module.exports = router.routes();