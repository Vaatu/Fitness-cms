const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Workout = require('./workout');

const Day = sequelize.define('Day', {
  subtitle: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  additionalNotes: {
    type: DataTypes.TEXT
  },
  videoLink: {
    type: DataTypes.STRING
  }
});

Day.hasMany(Workout, { foreignKey: 'dayId' });

module.exports = Day;
