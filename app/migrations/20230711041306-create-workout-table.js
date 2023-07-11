'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Workouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subtitle: {
        type: Sequelize.STRING
      },
      setsCount: {
        type: Sequelize.INTEGER
      },
      repsCount: {
        type: Sequelize.INTEGER
      },
      restTime: {
        type: Sequelize.INTEGER
      },
      additionalNotes: {
        type: Sequelize.TEXT
      },
      warmup: {
        type: Sequelize.BOOLEAN
      },
      videoLink: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Workouts');
  }
};
