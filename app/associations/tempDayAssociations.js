const TempDay = require('../models/tempDay');
const TempWorkout = require('../models/tempWorkout');

module.exports = (sequelize) => {
  TempDay.hasMany(TempWorkout, { foreignKey: 'tempDayId' });
};
