const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const WorkoutTemplate = sequelize.define('WorkoutTemplate', {
  numberOfWeeks: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = WorkoutTemplate;
