const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;
const Day = require('./day')

const WorkoutTemplate = sequelize.define('WorkoutTemplate', {
  numberOfWeeks: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
// WorkoutTemplate.hasMany(Day, { foreignKey: 'workoutTemplateId' });

module.exports = WorkoutTemplate;
