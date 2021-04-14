let Sequelize = require("sequelize");

let sequelize = new Sequelize("database", "username", "password", {
  host: "db4free.net",
  dialect: "mysql"
});

module.exports = sequelize;