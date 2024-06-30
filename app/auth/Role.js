const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique : true,
  },


},
{
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});

module.exports = Role;
