const Coach = require('../models/coach');
const Certificate = require('../models/certificate');
const Client = require('../models/client');
const NutritionTemplate = require('../models/nutritionTemplate');
const WorkoutTemplate = require('../models/workoutTemplate');
const Post = require('../models/post')

module.exports = (sequelize) => {
  Coach.hasMany(Certificate, { foreignKey: 'coachId' });
  Coach.hasMany(Post, { foreignKey: 'coachId' });
  Coach.hasMany(Client, { foreignKey: 'coachId' });
  Coach.hasMany(WorkoutTemplate, { foreignKey: 'coachId' });
  Coach.hasMany(NutritionTemplate, { foreignKey: 'coachId' });
};
