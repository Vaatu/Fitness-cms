const Client = require('../models/client');
const Coach = require('../models/coach');
const NutritionTemplate = require('../models/nutritionTemplate');
const WorkoutTemplate = require('../models/workoutTemplate');

module.exports = (sequelize) => {
  // Client associations
  Client.belongsTo(Coach, { foreignKey: 'coachId' });
  Client.hasMany(NutritionTemplate, { foreignKey: 'clientId', onDelete: 'CASCADE' });
  Client.hasMany(WorkoutTemplate, { foreignKey: 'clientId', onDelete: 'CASCADE' });

  // Associate nutrition templates to client
  NutritionTemplate.belongsTo(Client, { foreignKey: 'clientId' });

  // Associate workout templates to client
  WorkoutTemplate.belongsTo(Client, { foreignKey: 'clientId' });
};
