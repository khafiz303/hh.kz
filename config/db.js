const { Sequelize } = require('sequelize');
const dbConf = require('./config')

const sequelize = new Sequelize(dbConf.development.database, dbConf.development.username, dbConf.development.password, {
  host: dbConf.development.host,
  dialect: dbConf.development.dialect,
});

const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
testConnection();

module.exports = sequelize;
