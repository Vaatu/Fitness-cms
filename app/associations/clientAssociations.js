const Client = require('../models/client');
const Coach = require('../models/coach');
const NutritionTemplate = require('../models/nutritionTemplate');
const WorkoutTemplate = require('../models/workoutTemplate');

module.exports = (sequelize) => {
  // Client associations
  Client.belongsToMany(Coach, { through: 'ClientCoach' });
  Client.belongsTo(NutritionTemplate, { foreignKey: 'nutritionTemplateId' });
  Client.belongsTo(WorkoutTemplate, { foreignKey: 'workoutTemplateId' });
  Client.belongsToMany(WorkoutTemplate, { through: 'ClientWorkoutTemplates', foreignKey: 'clientId' });
  Client.belongsToMany(NutritionTemplate, { through: 'ClientNutritionTemplates' });

};
