const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const TempDay = sequelize.define('TempDay', {
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

module.exports = TempDay;
