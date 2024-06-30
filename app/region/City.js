const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Подключаем sequelize из вашего конфигурационного файла
const Country = require('./Country')
const City = sequelize.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});
City.belongsTo(Country, { foreignKey: 'CountryId' }); 

module.exports = City;
