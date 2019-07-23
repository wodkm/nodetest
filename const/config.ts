export const config = {
    server: {
        port: 3000,//服务端口
    },
    database: {
        name: 'oms',
        username: 'root', // 用户名
        password: 'LxQrCv8L', // 口令
        host: '172.16.3.47', // 主机名
        port: 31885 // 端口号
    },
    exitProcessWhileDuplicateDefinitionPath: false,//当router path重复定义时是否结束进程
    log4jsConfigure: {
        appenders: {
            file: {
                type: 'file',
                filename: __dirname + '/logs/cheese.log'
            },
            console: {
                type: 'console',
            }
        },
        categories: {
            default: {
                appenders: ['file', 'console'],
                level: 'info'
            }
        }
    },
    contextPath: '',
    redis: {
        host: '47.74.180.149',
        port: 6379,
    }
}