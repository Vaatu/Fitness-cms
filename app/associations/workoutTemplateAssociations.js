const Client = require('../models/client');
const WorkoutTemplate = require('../models/workoutTemplate');
const Day = require('../models/day')

module.exports = (sequelize) => {
    WorkoutTemplate.hasMany(Day, { foreignKey: 'workoutTemplateId' });
    WorkoutTemplate.belongsToMany(Client, { through: 'ClientWorkoutTemplates', foreignKey: 'workoutTemplateId' });
};
