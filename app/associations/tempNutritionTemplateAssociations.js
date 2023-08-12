const Coach = require('../models/coach');
const TempMeal = require('../models/tempMeal');
const Client = require('../models/client');
const TempNutritionTemplate = require('../models/tempNutritionTemplate');

module.exports = (sequelize) => {
    TempNutritionTemplate.belongsToMany(Client, { through: 'ClientTempNutritionTemplates' });
    TempNutritionTemplate.hasMany(TempMeal, { foreignKey: 'tempNutritionTemplateId' });
    TempNutritionTemplate.belongsTo(Coach, { foreignKey: 'coachId' });
    TempNutritionTemplate.belongsTo(Client, { foreignKey: 'clientId' });
};
