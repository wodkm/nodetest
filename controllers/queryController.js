'use strict'
const router = require('koa-router')();
const Sequelize = require('sequelize');
const config = require('../const/config');

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

// var sequelize = new Sequelize(`mysql://${config.database.username}:${config.database.password}@${config.database.host}}/${config.database.name}`);

router.get("/query", ctx => {
    sequelize.authenticate().then(
        () => {
            console.log('Connection has been established successfully.');
        }
    ).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
});

module.exports = router.routes();