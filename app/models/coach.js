const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const Coach = sequelize.define('Coach', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  idNumber: {
    type: DataTypes.STRING
  },
  idImage: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  bio: {
    type: DataTypes.TEXT
  }
});

module.exports = Coach;