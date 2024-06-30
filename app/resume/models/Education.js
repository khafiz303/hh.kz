const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Подключаем sequelize из вашего конфигурационного файла
const Resume = require('./Resume')

const Education = sequelize.define('Education', {
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  university_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  major:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_date:{
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});
Education.belongsTo(Resume, { foreignKey: 'resumeId' }); 
Resume.hasMany(Education, { foreignKey: 'resumeId' , as : 'education'}); 
// Resume.hasMany(City, { foreignKey: 'CityId' }); 

module.exports = Education;
