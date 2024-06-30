const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Подключаем sequelize из вашего конфигурационного файла
const Resume = require('./Resume')

const WorkingHistory = sequelize.define('WorkingHistory', {
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsibilities: { 
    type: DataTypes.STRING,
    allowNull: false,

  },
  start_date:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date:{
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});
WorkingHistory.belongsTo(Resume, { foreignKey: 'resumeId' }); 
Resume.hasMany(WorkingHistory, { foreignKey: 'resumeId' , as :'workingHistory' }); 
// Resume.hasMany(City, { foreignKey: 'CityId' }); 

module.exports = WorkingHistory;
