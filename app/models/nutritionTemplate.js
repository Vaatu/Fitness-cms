const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Meal = require('./meal');

const NutritionTemplate = sequelize.define('NutritionTemplate', {
  dayName: {
    type: DataTypes.STRING
  },
  calories: {
    type: DataTypes.FLOAT
  },
  protein: {
    type: DataTypes.FLOAT
  },
  carb: {
    type: DataTypes.FLOAT
  },
  fats: {
    type: DataTypes.FLOAT
  }
});

NutritionTemplate.hasMany(Meal, { foreignKey: 'nutritionTemplateId' });
NutritionTemplate.belongsTo(Coach, { foreignKey: 'coachId' });
NutritionTemplate.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = NutritionTemplate;
