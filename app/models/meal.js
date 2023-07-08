const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const NutritionTemplate = require('./nutritionTemplate');

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
  }
});

Meal.belongsTo(NutritionTemplate, { foreignKey: 'nutritionTemplateId' });

module.exports = Meal;
