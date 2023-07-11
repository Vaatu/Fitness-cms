const Day = require('../models/day');
const Workout = require('../models/workout');
const NutritionTemplate = require('../models/nutritionTemplate');

module.exports = (sequelize) => {
  // Day associations
  Day.hasMany(Workout, { foreignKey: 'dayId', onDelete: 'CASCADE' });
  Day.hasOne(NutritionTemplate, { foreignKey: 'dayId', onDelete: 'CASCADE' });

  // Associate workouts to day
  Workout.belongsTo(Day, { foreignKey: 'dayId' });

  // Associate nutrition template to day
  NutritionTemplate.belongsTo(Day, { foreignKey: 'dayId' });
};
