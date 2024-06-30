const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Подключаем sequelize из вашего конфигурационного файла

const AuthCode = sequelize.define('AuthCode', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valid_till: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});

// Экспортируем модель AuthCode
module.exports = AuthCode;





