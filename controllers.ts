const fs = require('fs');
import { config } from './const/config';
import { logger } from './utils/loggerUtil';

// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤出.js文件:
var js_files = files.filter((f: any) => {
	return f.endsWith('.ts');
});

let urlDictionary: any = {};

// 处理每个js文件,检测routers中是否有重复定义的path，如果有则打印错误日志并结束进程
export const controllers = js_files.map((item: any, index: any) => {
	logger.info(`Loading controller: ${item.split(".")[0]}`);
	// 导入js文件:
	let mapping = require(__dirname + '/controllers/' + item.split(".")[0]);
	try {
		mapping.router.stack.forEach((element: any) => {
			if (urlDictionary[element.path] === undefined) {
				urlDictionary[element.path] = new Set();
				element.methods.forEach((item: any) => {
					urlDictionary[element.path].add(item);
				});
			} else if (element.methods.map((item: any) => urlDictionary[element.path].has(item)).indexOf(true) > -1) {
				urlDictionary[element.path].push(element.methods);
			} else {
				throw (`Duplicate Definition Path:${element.path},METHOD:${element.methods}.File Dictionary:${__dirname + '/controllers/' + item}`);
			}
		});
	} catch (error) {
		config.exitProcessWhileDuplicateDefinitionPath ? logger.error('\x1B[31m%s\x1B[0m', error) : logger.warn(error);
		if (config.exitProcessWhileDuplicateDefinitionPath) process.exit();
	}
	return mapping;
});