const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const TempWorkoutTemplate = sequelize.define('TempWorkoutTemplate', {
  numberOfWeeks: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = TempWorkoutTemplate;
