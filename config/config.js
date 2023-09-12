const { Sequelize } = require('sequelize');

const db = new Sequelize('yoga_mobile', 'root', 'webmo20$%Ko', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = db;
