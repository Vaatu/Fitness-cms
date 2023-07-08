const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Day = require('./day');

const Workout = sequelize.define('Workout', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtitle: {
    type: DataTypes.STRING
  },
  setsCount: {
    type: DataTypes.INTEGER
  },
  breakEstimation: {
    type: DataTypes.STRING
  }
});
const Day = require('./day');

WorkoutTemplate.hasMany(Day, { foreignKey: 'workoutTemplateId' });


module.exports = Workout;
