import redis from 'redis';
import { config } from '../const/config';
var redisUtil = redis.createClient(config.redis.port, config.redis.host);
// client.auth(123456);  // 如果没有设置密码 是不需要这一步的
// client.on('connect', function () {
// // set 语法
// client.set('name', 'long', function (err, data) {
//     console.log(data)
// })
// // get 语法
// client.get('name', function (err, data) {
//     console.log(data)
// })

// client.lpush('class', '1', function (err: any, data: any) {
//     console.log(data)
// })

// client.lrange('class', 0, -1, function (err, data) {
//     console.log(data)
// })
// })

export = redisUtil;