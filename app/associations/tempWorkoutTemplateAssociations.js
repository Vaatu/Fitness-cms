const Client = require('../models/client');
const TempWorkoutTemplate = require('../models/tempWorkoutTemplate');
const TempDay = require('../models/tempDay')

module.exports = (sequelize) => {
    TempWorkoutTemplate.hasMany(TempDay, { foreignKey: 'tempWorkoutTemplateId' });
    TempWorkoutTemplate.belongsToMany(Client, { through: 'ClientTempWorkoutTemplates', foreignKey: 'tempWorkoutTemplateId' });
};
