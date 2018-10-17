'use strict';
const config = {
    database: {
        name: 'oms',
        username: 'root', // 用户名
        password: 'LxQrCv8L', // 口令
        host: '172.16.3.47', // 主机名
        port: 31885 // 端口号
    },
    exitProcessWhileDuplicateDefinitionPath: false,//当router path重复定义时是否结束进程
}

module.exports = config;