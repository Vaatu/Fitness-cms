const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const TempWorkout = sequelize.define('TempWorkout', {
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
  repsCount: {
    type: DataTypes.INTEGER
  },

  restTime: {
    type: DataTypes.INTEGER
  },
    additionalNotes: {
    type: DataTypes.TEXT
  },
  warmup: {
    type: DataTypes.BOOLEAN
  },
    videoLink: {
    type: DataTypes.STRING
  }
});


module.exports = TempWorkout;
