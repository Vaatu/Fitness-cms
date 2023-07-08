const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Assuming you have a separate file for Sequelize configuration
const Certificate = require('./certificate');
const Post = require('./post');
const WorkoutTemplate = require('./workoutTemplate');
const NutritionTemplate = require('./nutritionTemplate');
const Client = require('./client');


const Coach = sequelize.define('Coach', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  idNumber: {
    type: DataTypes.STRING
  },
  idImage: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  bio: {
    type: DataTypes.TEXT
  }
});
Coach.hasMany(Certificate, { foreignKey: 'coachId' });
Coach.hasMany(Post, { foreignKey: 'coachId' });
Coach.hasMany(Client, { foreignKey: 'coachId' });
Coach.hasMany(WorkoutTemplate, { foreignKey: 'coachId' });
Coach.hasMany(NutritionTemplate, { foreignKey: 'coachId' });

Coach.sync();
module.exports = Coach;