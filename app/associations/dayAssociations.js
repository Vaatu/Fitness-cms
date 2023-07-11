const Day = require('../models/day');
const Workout = require('../models/workout');

module.exports = (sequelize) => {
  Day.hasMany(Workout, { foreignKey: 'dayId' });
};
