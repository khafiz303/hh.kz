const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Подключаем sequelize из вашего конфигурационного файла
const City = require('../../region/City')
const EmploymentType = require('../../employment-type/EmploymentType')
const User = require('../../auth/User')
const Country = require('../../region/Country')

const Resume = sequelize.define('Resume', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  birthday:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  about:{
    type: DataTypes.STRING,
    allowNull: false,
  },

  position:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salary_type:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  main_language:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  skills:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  

  

}, {
  timestamps: true, // Используем правильное имя опции для отключения автоматических timestamp'ов
});
Resume.belongsTo(City, { foreignKey: 'CityId', as :'city'}); 
Resume.belongsTo(User, { foreignKey: 'UserId' }); 
Resume.belongsTo(Country,{foreignKey: 'citizhenship', as : 'citizhenshipObj'})
// Resume.hasMany(City, { foreignKey: 'CityId' }); 

module.exports = Resume;
