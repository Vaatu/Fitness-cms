const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;
const Coach = require('./coach');
const NutritionTemplate = require('./nutritionTemplate');
const WorkoutTemplate = require('./workoutTemplate');
 

const Client = sequelize.define('Client', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE
  },
  height: {
    type: DataTypes.FLOAT
  },
  weight: {
    type: DataTypes.FLOAT
  },
  weakness: {
    type: DataTypes.TEXT
  },
  strengths: {
    type: DataTypes.TEXT
  },
  injuries: {
    type: DataTypes.TEXT
  },
  goal: {
    type: DataTypes.TEXT
  },
  medicalHistory: {
    type: DataTypes.TEXT
  },
  gender: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  profileImage: {
    type: DataTypes.STRING
  }
});
// Client.belongsTo(Coach, { foreignKey: 'coachId' });
// Client.belongsTo(NutritionTemplate, { foreignKey: 'nutritionTemplateId' });
// Client.belongsTo(WorkoutTemplate, { foreignKey: 'workoutTemplateId' });

module.exports = Client;