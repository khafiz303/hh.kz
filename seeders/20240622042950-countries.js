'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Countries', [
      { name: 'Russia' },
      { name: 'Ukraine' },
      { name: 'Belarus' },
      { name: 'Kazakhstan' },
      { name: 'Uzbekistan' },
      { name: 'Turkmenistan' },
      { name: 'Kyrgyzstan' },
      { name: 'Tajikistan' },
      { name: 'Armenia' },
      { name: 'Azerbaijan' },
      { name: 'Georgia' },
      { name: 'Moldova' }
      // Добавьте другие страны СНГ по необходимости
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};
