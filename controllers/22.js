const nunjucks = require('nunjucks');
const koa = require('koa');
const route = require('koa-route');
const app = new koa();

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

var env = createEnv('view', {
    watch: true,
    filters: {
        hex: function(n) {
            return '0x' + n.toString(16);
        }
    }
});


const hello = ctx => {
    let html = env.render('hello.html', {
        name: '小明'
    });
    ctx.response.body = html;
};

app.use(route.get('/hello', hello));

app.listen(3000);