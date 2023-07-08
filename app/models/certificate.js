const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Assuming you have a separate file for Sequelize configuration
const Coach = require('./coach');

const Certificate = sequelize.define('Certificate', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  }
});
Certificate.belongsTo(Coach, { foreignKey: 'coachId' });

module.exports = Certificate;