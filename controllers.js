import fs from 'fs';

// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤出.js文件:
var js_files = files.filter((f) => {
	return f.endsWith('.js');
});

let routes = [];
// 处理每个js文件:

js_files.map((item, index) => {
	console.log(`process controller: ${item.split(".")[0]}`);
	// 导入js文件:
	let mapping = require(__dirname + '/controllers/' + item.split(".")[0]);
	routes.push(mapping);
});

module.exports = routes;