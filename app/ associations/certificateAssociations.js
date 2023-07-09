const Certificate = require('../models/certificate');
const Coach = require('../models/coach');

module.exports = (sequelize) => {
  // Certificate associations
  Certificate.belongsTo(Coach, { foreignKey: 'coachId' });
};
