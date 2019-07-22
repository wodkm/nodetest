import router from 'koa-router';
import nunjucks from 'nunjucks';
import fs from 'fs';
import { config } from '../const/config';
import { logger } from '../utils/loggerUtil';

const myRouter = new router();

function createEnv(path: any, opts: any) {
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
		hex: function (n: any) {
			return '0x' + n.toString(16);
		}
	}
});

myRouter.get(`/modules/:moduleName`, (ctx: any) => {
	logger.info(`Module request: ${ctx.params.moduleName}`);
	let html = env.render('../views/index.html', {
		moduleName: ctx.params.moduleName,
		title: ctx.params.moduleName,
		contentPath: config.contextPath,
	});
	ctx.response.body = html;
});

export = myRouter.routes();