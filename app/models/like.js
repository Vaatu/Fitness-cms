const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;
const Post = require('./post');

const Like = sequelize.define('Like', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Like.belongsTo(Post, { foreignKey: 'postId' });
module.exports = Like;
