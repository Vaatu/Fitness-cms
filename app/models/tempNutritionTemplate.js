const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const TempNutritionTemplate = sequelize.define('TempNutritionTemplate', {
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


module.exports = TempNutritionTemplate;
