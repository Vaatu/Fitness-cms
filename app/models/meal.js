const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const Meal = sequelize.define('Meal', {
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

module.exports = Meal;
