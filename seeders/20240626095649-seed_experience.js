'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Experiences', [
      { duration: 'Нет опыта' },
      { duration: 'от 1 до 3 лет' },
      { duration: 'от 1 до 6 лет' },
      { duration: 'Более 6 лет' } 
      
      // Добавьте другие страны СНГ по необходимости
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Experiences', null, {});
  }
};
