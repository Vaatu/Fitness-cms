const coachAssociations = require('./coachAssociations');
const clientAssociations = require('./clientAssociations');
const certificateAssociations = require('./certificateAssociations');
const commentAssociations = require('./commentAssociations');
const dayAssociations = require('./dayAssociations');
const nutritionTemplateAssociations = require('./nutritionTemplateAssociations');
const postAssociations = require('./postAssociations');
const workoutAssociations = require('./workoutTemplateAssociations');

const tempWorkoutAssociations = require('./tempWorkoutTemplateAssociations'); // 1
const tempDayAssociations = require('./tempDayAssociations');
const tempNutritionTemplateAssociations = require('./tempNutritionTemplateAssociations');


 


module.exports = (sequelize) => {
  coachAssociations(sequelize);
  clientAssociations(sequelize);
  certificateAssociations(sequelize);
  commentAssociations(sequelize);
  dayAssociations(sequelize);
  nutritionTemplateAssociations(sequelize);
  postAssociations(sequelize);
  workoutAssociations(sequelize);
  tempWorkoutAssociations(sequelize);
  tempDayAssociations(sequelize);
  tempNutritionTemplateAssociations(sequelize);
};
