const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;
const Coach = require('./coach');

const Certificate = sequelize.define('Certificate', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  }
});
// Certificate.belongsTo(Coach, { foreignKey: 'coachId' });


module.exports = Certificate;