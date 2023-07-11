const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const Day = sequelize.define('Day', {
  subtitle: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  additionalNotes: {
    type: DataTypes.TEXT
  },
});

module.exports = Day;
