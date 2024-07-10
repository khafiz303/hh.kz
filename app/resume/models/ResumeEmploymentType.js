const {DataTypes} = require('sequelize')
const sequelize= require('../../../config/db')
const Resume = require('./Resume')
const EmploymentType = require('../../employment-type/EmploymentType')
const ResumeEmploymentType = sequelize.define('ResumeEmploymentType', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
},
{
    timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
  });

  Resume.belongsToMany(EmploymentType, {through:ResumeEmploymentType ,  foreignKey: 'ResumeId', // Название колонки для ResumeId
      otherKey: 'employmentTypeId' , as : 'employmentTypes' // Название колонки для EmploymentTypeId
    }
  );
  
  EmploymentType.belongsToMany(Resume, {
    through: ResumeEmploymentType,
    foreignKey: 'employmentTypeId', // Название колонки для EmploymentTypeId
      otherKey: 'resumeId' // Название колонки для ResumeId
    
  });
  

module.exports =ResumeEmploymentType