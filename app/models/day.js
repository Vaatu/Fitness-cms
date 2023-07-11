const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;
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
});

// Day.hasMany(Workout, { foreignKey: 'dayId' });
module.exports = Day;
