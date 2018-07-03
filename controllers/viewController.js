'use strict';
const router = require('koa-router')();
const nunjucks = require('nunjucks');
const fs = require('fs');

function createEnv(path, opts) {
	var
		autoescape = opts.autoescape === undefined ? true : opts.autoescape,
		noCache = opts.noCache || false,
		watch = opts.watch || false,
		throwOnUndefined = opts.throwOnUndefined || false,
		env = new nunjucks.Environment(
			new nunjucks.FileSystemLoader(path, {
				noCache: noCache,
				watch: watch,
			}), {
				autoescape: autoescape,
				throwOnUndefined: throwOnUndefined
			});
	if (opts.filters) {
		for (var f in opts.filters) {
			env.addFilter(f, opts.filters[f]);
		}
	}
	return env;
}

let env = createEnv('view', {
	watch: true,
	filters: {
		hex: function (n) {
			return '0x' + n.toString(16);
		}
	}
});


//index
// router.get("/index", ctx => {
// 	ctx.response.type = 'html';
// 	ctx.response.body = fs.createReadStream('./views/index.html');
// });
router.get("/index", ctx => {
	let html = env.render('../views/index.html', {
		moduleName: 'index'
	});
	ctx.response.body = html;
});

//hello
router.get("/hello", ctx => {
	let html = env.render('../views/index.html', {
		moduleName: 'index2',
		name: '小明'
	});
	ctx.response.body = html;
});

//query
router.get("/query", ctx => {
	let html = env.render('../views/query/query.html');
	ctx.response.body = html;
});

module.exports = router.routes();