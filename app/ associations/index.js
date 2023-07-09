const coachAssociations = require('./coachAssociations');
const clientAssociations = require('./clientAssociations');

module.exports = (sequelize) => {
  coachAssociations(sequelize);
  clientAssociations(sequelize);
};
