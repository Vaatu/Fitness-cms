const Coach = require('../models/coach');
const Certificate = require('../models/certificate');
const Client = require('../models/client');
const NutritionTemplate = require('../models/nutritionTemplate');
const WorkoutTemplate = require('../models/workoutTemplate');

module.exports = (sequelize) => {
  // Coach associations
  Coach.hasMany(Certificate, { foreignKey: 'coachId', onDelete: 'CASCADE' });
  Coach.hasMany(Post, { foreignKey: 'coachId', onDelete: 'CASCADE' });
  Coach.hasMany(NutritionTemplate, { foreignKey: 'coachId', onDelete: 'CASCADE' });
  Coach.hasMany(WorkoutTemplate, { foreignKey: 'coachId', onDelete: 'CASCADE' });

  // Associate clients to coach
  Coach.hasMany(Client, { foreignKey: 'coachId', onDelete: 'CASCADE' });
  Client.belongsTo(Coach, { foreignKey: 'coachId' });
};
