const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Comment;
