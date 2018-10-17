const fs = require('fs');

// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤出.js文件:
var js_files = files.filter((f) => {
	return f.endsWith('.js');
});

let routes = [];

global.urlDictionary = [];

// 处理每个js文件:
js_files.map((item, index) => {
	console.log(`loading controller: ${item.split(".")[0]}`);
	// 导入js文件:
	let mapping = require(__dirname + '/controllers/' + item.split(".")[0]);
	try {
		mapping.router.stack.forEach(element => {
			if (global.urlDictionary.indexOf(element.path) == -1) {
				global.urlDictionary.push(element.path);
			} else {
				throw (`Duplicate Definition Path:${element.path}`);
			}
		});
	} catch (error) {
		console.log('\x1B[31m%s\x1B[0m', error);
	}
	routes.push(mapping);
});

module.exports = routes;