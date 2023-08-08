const coachAssociations = require('./coachAssociations');
const clientAssociations = require('./clientAssociations');
const certificateAssociations = require('./certificateAssociations');
const commentAssociations = require('./commentAssociations');
const dayAssociations = require('./dayAssociations');
const nutritionTemplateAssociations = require('./nutritionTemplateAssociations');
const postAssociations = require('./postAssociations');
const workoutAssociations = require('./workoutTemplateAssociations');

module.exports = (sequelize) => {
  coachAssociations(sequelize);
  clientAssociations(sequelize);
  certificateAssociations(sequelize);
  commentAssociations(sequelize);
  dayAssociations(sequelize);
  nutritionTemplateAssociations(sequelize);
  postAssociations(sequelize);
  workoutAssociations(sequelize);
};
