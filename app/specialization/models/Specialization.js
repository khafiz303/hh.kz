const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Подключаем sequelize из вашего конфигурационного файла
  const  SpecializationType =require('./SpecializationType')
const Specialization  = sequelize.define('Specialization', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});
Specialization.belongsTo(SpecializationType, {foreignKey : 'specializationTypeId'})
SpecializationType.hasMany(Specialization, {foreignKey : 'specializationTypeId' , 
  as: "specializations"
})

module.exports = Specialization ;
