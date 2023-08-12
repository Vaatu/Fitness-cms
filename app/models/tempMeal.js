const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const TempMeal = sequelize.define('TempMeal', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT
  },
  mealType: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },

});

module.exports = TempMeal;
