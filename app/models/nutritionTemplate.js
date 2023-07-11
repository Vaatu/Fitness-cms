const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

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


module.exports = NutritionTemplate;
