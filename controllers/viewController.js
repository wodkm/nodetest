'use strict';
const router = require('koa-router')();
const nunjucks = require('nunjucks');


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
		hex: function(n) {
			return '0x' + n.toString(16);
		}
	}
});


//hello
router.get("/hello", ctx => {
	let html = env.render('../views/hello.html', {
		name: '小明'
	});
	ctx.response.body = html;
});

module.exports = router.routes();