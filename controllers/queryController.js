'use strict'
const router = require('koa-router')();
const Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: 'mysql',
    port: config.database.port,
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 30000
    // }
});
// sequelize.authenticate().then(
//     () => {
//         console.log('Connection has been established successfully.');
//     }
// ).catch(err => {
//     console.error('Unable to connect to the database:', err);
// });
// var sequelize = new Sequelize(`mysql://${config.database.username}:${config.database.password}@${config.database.host}}/${config.database.name}`);

router.get("/queryInfo", ctx => {
    ctx.response.body = JSON.stringify({ data: 123 });
});

module.exports = router.routes();