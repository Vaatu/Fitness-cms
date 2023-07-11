const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const WorkoutTemplate = sequelize.define('WorkoutTemplate', {
  numberOfWeeks: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = WorkoutTemplate;
