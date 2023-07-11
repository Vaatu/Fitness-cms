const Coach = require('../models/coach');
const Meal = require('../models/meal');
const Client = require('../models/client');
const NutritionTemplate = require('../models/nutritionTemplate');

module.exports = (sequelize) => {
    NutritionTemplate.belongsToMany(Client, { through: 'ClientNutritionTemplates' });
    NutritionTemplate.hasMany(Meal, { foreignKey: 'nutritionTemplateId' });
    NutritionTemplate.belongsTo(Coach, { foreignKey: 'coachId' });
    NutritionTemplate.belongsTo(Client, { foreignKey: 'clientId' });
};
