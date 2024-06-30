const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');


const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique : true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },



},
{
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});


module.exports = Company;
