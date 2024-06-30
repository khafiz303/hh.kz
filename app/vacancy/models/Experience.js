const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Подключаем sequelize из вашего конфигурационного файла

const Experience = sequelize.define('Experience', {
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});


module.exports = Experience;
    