const Client = require('../models/client');
const Coach = require('../models/coach');
const NutritionTemplate = require('../models/nutritionTemplate');
const WorkoutTemplate = require('../models/workoutTemplate');
const TempNutritionTemplate = require('../models/tempNutritionTemplate');
const TempWorkoutTemplate = require('../models/tempWorkoutTemplate');

module.exports = (sequelize) => {
  // Client associations
  Client.belongsToMany(Coach, { through: 'ClientCoach' });
  Client.belongsTo(NutritionTemplate, { foreignKey: 'nutritionTemplateId' });
  Client.belongsTo(WorkoutTemplate, { foreignKey: 'workoutTemplateId' });
  Client.belongsToMany(WorkoutTemplate, { through: 'ClientWorkoutTemplates', foreignKey: 'clientId' });
  Client.belongsToMany(NutritionTemplate, { through: 'ClientNutritionTemplates' });
  //associations after coach unassign a client
  Client.belongsTo(TempNutritionTemplate, { foreignKey: 'tempNutritionTemplateId' });
  Client.belongsTo(TempWorkoutTemplate, { foreignKey: 'tempWorkoutTemplateId' });
  Client.belongsToMany(TempWorkoutTemplate, { through: 'ClientTempWorkoutTemplates', foreignKey: 'clientId' });
  Client.belongsToMany(TempNutritionTemplate, { through: 'ClientTempNutritionTemplates' });

};
