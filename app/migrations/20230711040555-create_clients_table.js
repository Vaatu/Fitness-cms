'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      birthday: {
        type: Sequelize.DATE
      },
      height: {
        type: Sequelize.FLOAT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      weakness: {
        type: Sequelize.TEXT
      },
      strengths: {
        type: Sequelize.TEXT
      },
      injuries: {
        type: Sequelize.TEXT
      },
      goal: {
        type: Sequelize.TEXT
      },
      medicalHistory: {
        type: Sequelize.TEXT
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female')
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('In-Person', 'Remote')
      },
      profileImage: {
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
    await queryInterface.dropTable('Clients');
  }
};
