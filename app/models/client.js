const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const Client = sequelize.define('Client', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE
  },
  height: {
    type: DataTypes.FLOAT
  },
  weight: {
    type: DataTypes.FLOAT
  },
  weakness: {
    type: DataTypes.TEXT
  },
  strengths: {
    type: DataTypes.TEXT
  },
  injuries: {
    type: DataTypes.TEXT
  },
  goal: {
    type: DataTypes.TEXT
  },
  medicalHistory: {
    type: DataTypes.TEXT
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female')
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.ENUM('In-Person', 'Remote')
  },
  profileImage: {
    type: DataTypes.STRING
  }
});

module.exports = Client;
