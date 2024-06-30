const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Подключаем sequelize из вашего конфигурационного файла
const Resume = require('./Resume')

const ForeignLanguage = sequelize.define('ForeignLanguage', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  }

}, {
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});
ForeignLanguage.belongsTo(Resume, { foreignKey: 'resumeId' }); 
Resume.hasMany(ForeignLanguage, { foreignKey: 'resumeId', as :'foreignLanguages' }); 
// Resume.hasMany(City, { foreignKey: 'CityId' }); 

module.exports = ForeignLanguage;
